import express from 'express';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  saveConsultation,
  updateConsultationStatus,
  updateConsultation,
  deleteConsultation,
  getConsultations,
} from './server/storage';
import { syncToGoogleSheet } from './server/googleSheets';
import { sendConsultationAlert, sendTestEmail } from './server/mailer';
import { ConsultationPayload } from './server/types';

// Load environment variables
dotenv.config();

const PORT = 3000;
const HOST = '0.0.0.0';

async function startServer() {
  const app = express();

  // Parse JSON and URL-encoded bodies with generous limit for photo uploads
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // Request logger for API calls
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // Healthcheck endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Safe Garden Full-Stack Server',
      timestamp: new Date().toISOString(),
    });
  });

  // System & Integration status check
  app.get('/api/consultation/status', (req, res) => {
    const records = getConsultations();
    const hasGoogleSheetWebhook = Boolean(process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim());
    const hasGoogleServiceAccount = Boolean(
      process.env.GOOGLE_SHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
    );
    const hasGmail = Boolean(
      (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) ||
      (process.env.SMTP_HOST && process.env.SMTP_USER)
    );

    res.json({
      status: 'ok',
      totalConsultations: records.length,
      integrations: {
        googleSheets: hasGoogleSheetWebhook
          ? 'CONFIGURED (Webhook)'
          : hasGoogleServiceAccount
          ? 'CONFIGURED (Service Account)'
          : 'PENDING_CONFIGURATION (Stored safely in local storage)',
        emailAlerts: hasGmail
          ? 'CONFIGURED'
          : 'PENDING_CONFIGURATION (Awaiting GMAIL_APP_PASSWORD)',
        adminEmail: process.env.ADMIN_EMAIL || 'cuthip@gmail.com',
        gmailUser: process.env.GMAIL_USER || '(미설정)',
      },
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Main Consultation Submission API: POST /api/consultation
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  app.post('/api/consultation', async (req, res) => {
    try {
      const payload = req.body as ConsultationPayload;

      // 1. Mandatory Validation
      if (!payload.name || typeof payload.name !== 'string' || !payload.name.trim()) {
        return res.status(400).json({
          success: false,
          error: '이름을 입력해 주세요.',
        });
      }

      if (!payload.phone || typeof payload.phone !== 'string' || !payload.phone.trim()) {
        return res.status(400).json({
          success: false,
          error: '연락처를 입력해 주세요.',
        });
      }

      if (!payload.location || typeof payload.location !== 'string' || !payload.location.trim()) {
        return res.status(400).json({
          success: false,
          error: '토지 또는 빈집 위치(주소/지번)를 입력해 주세요.',
        });
      }

      if (!Array.isArray(payload.selectedCategories) || payload.selectedCategories.length === 0) {
        return res.status(400).json({
          success: false,
          error: '상담 대상 항목을 최소 1개 이상 선택해 주세요.',
        });
      }

      if (payload.privacyAgreed !== true) {
        return res.status(400).json({
          success: false,
          error: '개인정보 수집 및 이용에 동의해 주세요.',
        });
      }

      // 2. Safe Local Storage Persistence (Zero data loss guarantee)
      const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];
      const record = saveConsultation(payload, { ip, userAgent });
      console.log(`[Consultation] Stored record ${record.id} for client: ${record.name} (${record.phone})`);

      // 3. Asynchronously trigger external integrations in parallel
      const [sheetResult, mailResult] = await Promise.allSettled([
        syncToGoogleSheet(record),
        sendConsultationAlert(record),
      ]);

      const sheetSynced = sheetResult.status === 'fulfilled' && sheetResult.value.synced;
      const emailSent = mailResult.status === 'fulfilled' && mailResult.value.sent;

      // 4. Update status in local storage
      updateConsultationStatus(record.id, { sheetSynced, emailSent });

      // 5. Respond with success
      return res.status(200).json({
        success: true,
        id: record.id,
        submittedAt: record.submittedAt,
        message: '상담 신청이 정상적으로 접수되었습니다.',
        sheetSynced,
        emailSent,
        details: {
          name: record.name,
          phone: record.phone,
          location: record.location,
          selectedCategories: record.selectedCategories,
        },
      });
    } catch (err: any) {
      console.error('[Consultation API Error]:', err);
      return res.status(500).json({
        success: false,
        error: '서버 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        systemError: process.env.NODE_ENV !== 'production' ? err.message : undefined,
      });
    }
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Admin Authentication & Authorization
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const ADMIN_USER = (process.env.ADMIN_USER || 'cuthip').trim();
  const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || 'hip1521!').trim();
  const activeAdminTokens = new Set<string>();

  const requireAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (!token || !activeAdminTokens.has(token)) {
      return res.status(401).json({
        success: false,
        error: '인증이 필요합니다. 관리자 아이디와 비밀번호로 로그인해 주세요.',
      });
    }
    next();
  };

  // Admin Login: ID "cuthip" / Password "hip1521!"
  app.post('/api/admin/login', (req, res) => {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          error: '아이디와 비밀번호를 모두 입력해 주세요.',
        });
      }

      const inputUser = String(username).trim();
      const inputPass = String(password).trim();

      if (inputUser === ADMIN_USER && inputPass === ADMIN_PASSWORD) {
        const token = crypto.randomBytes(32).toString('hex');
        activeAdminTokens.add(token);
        console.log(`[Admin Auth] User '${inputUser}' authenticated successfully.`);
        return res.json({
          success: true,
          token,
          user: {
            username: ADMIN_USER,
            email: process.env.ADMIN_EMAIL || 'cuthip@gmail.com',
            role: 'admin',
          },
        });
      } else {
        return res.status(401).json({
          success: false,
          error: '아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.',
        });
      }
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // Admin Logout
  app.post('/api/admin/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (token) {
      activeAdminTokens.delete(token);
    }
    res.json({ success: true, message: '로그아웃되었습니다.' });
  });

  // Admin Verify Token Check
  app.get('/api/admin/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
    if (token && activeAdminTokens.has(token)) {
      return res.json({
        success: true,
        user: {
          username: ADMIN_USER,
          email: process.env.ADMIN_EMAIL || 'cuthip@gmail.com',
          role: 'admin',
        },
      });
    }
    return res.status(401).json({ success: false, error: '인증 세션이 만료되었습니다.' });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Admin APIs: Consultation Management & Diagnostics (Protected)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // List all consultations (Protected)
  app.get('/api/admin/consultations', requireAdminAuth, (req, res) => {
    try {
      const list = getConsultations();
      res.json({
        success: true,
        data: list,
        total: list.length,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Update consultation status or note (Protected)
  app.patch('/api/admin/consultations/:id', requireAdminAuth, (req, res) => {
    try {
      const { id } = req.params;
      const { status, adminNote } = req.body;
      const updated = updateConsultation(id, { status, adminNote });
      if (!updated) {
        return res.status(404).json({ success: false, error: '상담 내역을 찾을 수 없습니다.' });
      }
      res.json({ success: true, data: updated });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Delete consultation (Protected)
  app.delete('/api/admin/consultations/:id', requireAdminAuth, (req, res) => {
    try {
      const { id } = req.params;
      const deleted = deleteConsultation(id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: '삭제할 상담 내역이 없습니다.' });
      }
      res.json({ success: true, message: '상담 내역이 삭제되었습니다.' });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Test email alert to cuthip@gmail.com (Protected)
  app.post('/api/admin/test-email', requireAdminAuth, async (req, res) => {
    try {
      const target = (req.body.targetEmail as string) || process.env.ADMIN_EMAIL || 'cuthip@gmail.com';
      const result = await sendTestEmail(target);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ sent: false, error: err.message });
    }
  });

  // Resend consultation alert email for a specific record (Protected)
  app.post('/api/admin/resend-email/:id', requireAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const list = getConsultations();
      const record = list.find((item) => item.id === id);
      if (!record) {
        return res.status(404).json({ sent: false, error: '상담 내역을 찾을 수 없습니다.' });
      }
      const mailResult = await sendConsultationAlert(record);
      if (mailResult.sent) {
        updateConsultationStatus(id, { emailSent: true });
      }
      res.json(mailResult);
    } catch (err: any) {
      res.status(500).json({ sent: false, error: err.message });
    }
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Vite Middleware & Static Serving
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Safe Garden] Full-Stack server running at http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Fatal Error]:', err);
  process.exit(1);
});

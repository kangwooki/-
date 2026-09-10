import nodemailer, { Transporter } from 'nodemailer';
import { ConsultationRecord } from './types';

export interface MailSendResult {
  sent: boolean;
  messageId?: string;
  error?: string;
  message?: string;
}

export async function sendConsultationAlert(record: ConsultationRecord): Promise<MailSendResult> {
  const adminEmail = process.env.ADMIN_EMAIL || 'cuthip@gmail.com';
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '').trim();

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  let transporter: Transporter | null = null;

  if (gmailUser && gmailPass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
  } else if (smtpHost && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  if (!transporter) {
    console.log('[Mailer] GMAIL_USER / GMAIL_APP_PASSWORD not configured. Email alert skipped.');
    return {
      sent: false,
      message: '이메일 발신 계정(GMAIL_USER, GMAIL_APP_PASSWORD)이 설정되지 않아 관리자 메일 발송이 보류되었습니다.',
    };
  }

  const subject = `[세이프가든] 신규 현장평가 상담 신청 접수 (${record.name} 고객님 / ${record.selectedCategories.slice(0, 2).join(', ')})`;

  const fileListHtml = record.attachedFiles && record.attachedFiles.length > 0
    ? `<ul>${record.attachedFiles.map((f) => `<li><strong>${f.name}</strong> (${f.size})</li>`).join('')}</ul>`
    : '첨부 파일 없음';

  const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <title>세이프가든 상담 접수 알림</title>
</head>
<body style="margin:0; padding:24px; font-family:'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif; background-color:#F4F1E8; color:#23382A;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e0dacf; box-shadow:0 4px 12px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#23382A; padding:28px 32px; color:#ffffff;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display:inline-block; font-size:11px; font-weight:700; letter-spacing:1px; color:#C9B98B; text-transform:uppercase;">NEW CONSULTATION REQUEST</span>
                    <h1 style="margin:6px 0 0 0; font-size:22px; font-weight:700; color:#F4F1E8;">신규 현장평가 상담이 접수되었습니다</h1>
                    <p style="margin:4px 0 0 0; font-size:12px; color:#C9B98B;">토지를 보고, 식물을 이해하고, 자산을 관리합니다. — 세이프가든</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding:12px 16px; background-color:#F4F1E8; border-radius:8px; border-left:4px solid #23382A;">
                    <strong style="color:#23382A; font-size:14px;">접수 번호: ${record.id}</strong><br/>
                    <span style="color:#6F8068; font-size:12px;">접수 일시: ${record.submittedAt}</span>
                  </td>
                </tr>
              </table>

              <h2 style="font-size:16px; font-weight:700; color:#23382A; border-bottom:2px solid #23382A; padding-bottom:8px; margin-top:0;">1. 신청자 및 현장 정보</h2>
              <table width="100%" border="0" cellspacing="0" cellpadding="10" style="font-size:13px; border-collapse:collapse; margin-bottom:24px;">
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td width="30%" style="background:#faf8f5; font-weight:bold; color:#23382A;">고객명</td>
                  <td style="color:#23382A;"><strong>${record.name}</strong></td>
                </tr>
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td style="background:#faf8f5; font-weight:bold; color:#23382A;">연락처</td>
                  <td style="color:#23382A;"><a href="tel:${record.phone}" style="color:#23382A; font-weight:bold; text-decoration:none;">${record.phone}</a></td>
                </tr>
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td style="background:#faf8f5; font-weight:bold; color:#23382A;">이메일</td>
                  <td style="color:#23382A;">${record.email || '(미입력)'}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td style="background:#faf8f5; font-weight:bold; color:#23382A;">현장 주소 / 위치</td>
                  <td style="color:#23382A;"><strong>${record.location}</strong></td>
                </tr>
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td style="background:#faf8f5; font-weight:bold; color:#23382A;">토지 규모</td>
                  <td style="color:#23382A;">${record.landSize || '(미입력)'}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td style="background:#faf8f5; font-weight:bold; color:#23382A;">식물 / 수목 종류</td>
                  <td style="color:#23382A;">${record.plantTypes || '(미입력)'}</td>
                </tr>
              </table>

              <h2 style="font-size:16px; font-weight:700; color:#23382A; border-bottom:2px solid #23382A; padding-bottom:8px; margin-top:24px;">2. 상담 분야 및 상세 문의</h2>
              <table width="100%" border="0" cellspacing="0" cellpadding="10" style="font-size:13px; border-collapse:collapse; margin-bottom:24px;">
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td width="30%" style="background:#faf8f5; font-weight:bold; color:#23382A;">상담 대상</td>
                  <td>
                    <span style="display:inline-block; padding:4px 10px; background:#23382A; color:#F4F1E8; border-radius:4px; font-weight:600; font-size:12px;">
                      ${record.selectedCategories.join(', ')}
                    </span>
                  </td>
                </tr>
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td style="background:#faf8f5; font-weight:bold; color:#23382A;">상세 내용</td>
                  <td style="color:#23382A; line-height:1.6; white-space:pre-wrap;">${record.details || '(상세 내용 없음)'}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td style="background:#faf8f5; font-weight:bold; color:#23382A;">첨부 파일</td>
                  <td style="color:#23382A; font-size:12px;">${fileListHtml}</td>
                </tr>
                <tr style="border-bottom:1px solid #f0eee8;">
                  <td style="background:#faf8f5; font-weight:bold; color:#23382A;">개인정보 수집 동의</td>
                  <td style="color:${record.privacyAgreed ? '#2E7A34' : '#C53030'}; font-weight:bold;">
                    ${record.privacyAgreed ? '✓ 동의 완료' : '미동의'}
                  </td>
                </tr>
              </table>

              <!-- Quick Action Button -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="tel:${record.phone}" style="display:inline-block; padding:14px 28px; background-color:#23382A; color:#F4F1E8; text-decoration:none; border-radius:8px; font-weight:bold; font-size:14px;">
                      고객에게 바로 전화 걸기 (${record.phone})
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#faf8f5; padding:20px 32px; border-top:1px solid #e0dacf; font-size:11px; color:#6F8068; text-align:center;">
              본 이메일은 세이프가든(Safe Garden) 공식 웹사이트 현장평가 상담 폼을 통해 자동 발송되었습니다.<br/>
              문의 및 기술지원: 세이프가든 시스템 관리팀
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  try {
    console.log(`[Mailer] Sending consultation notification email to ${adminEmail}...`);
    const info = await transporter.sendMail({
      from: `"세이프가든 알림" <${gmailUser || smtpUser || 'no-reply@safegarden.kr'}>`,
      to: adminEmail,
      subject,
      html,
    });
    console.log(`[Mailer] Notification email sent successfully. MessageId: ${info.messageId}`);
    return { sent: true, messageId: info.messageId, message: '관리자 이메일로 알림이 발송되었습니다.' };
  } catch (err: any) {
    console.error('[Mailer Error]:', err.message);
    return { sent: false, error: err.message, message: '이메일 발송 중 오류가 발생했습니다.' };
  }
}

export async function sendTestEmail(targetEmail?: string): Promise<MailSendResult> {
  const adminEmail = targetEmail || process.env.ADMIN_EMAIL || 'cuthip@gmail.com';
  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailPass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '').trim();

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  let transporter: Transporter | null = null;

  if (gmailUser && gmailPass) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });
  } else if (smtpHost && smtpUser && smtpPass) {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }

  if (!transporter) {
    return {
      sent: false,
      message: '발신 계정(GMAIL_USER, GMAIL_APP_PASSWORD)이 설정되지 않았습니다. 구글 2단계 인증 앱 비밀번호 16자리를 환경변수에 설정해 주세요.',
    };
  }

  const subject = `[세이프가든] 알림 메일 테스트 발송 (수신 확인용)`;
  const html = `
    <div style="font-family:sans-serif; padding:24px; background:#F4F1E8; color:#23382A;">
      <div style="max-width:550px; margin:0 auto; background:#fff; padding:32px; border-radius:12px; border:1px solid #e0dacf;">
        <h2 style="color:#23382A; margin-top:0;">🌱 세이프가든 알림 메일 정상 연동 테스트</h2>
        <p style="font-size:14px; line-height:1.6; color:#23382A;">
          축하합니다! <strong>${adminEmail}</strong> 메일 주소로 세이프가든 실시간 알림 시스템이 정상 연동되었습니다.
        </p>
        <p style="font-size:13px; color:#6F8068;">
          앞으로 웹사이트에서 새로운 현장평가 상담 신청이 접수되면 이 메일함으로 신청서 요약본이 즉시 전송됩니다.
        </p>
        <div style="margin-top:20px; font-size:12px; color:#888; border-top:1px solid #eee; pt:12px;">
          발송 시각: ${new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', dateStyle: 'medium', timeStyle: 'medium' }).format(new Date())}
        </div>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"세이프가든" <${gmailUser || smtpUser || 'no-reply@safegarden.kr'}>`,
      to: adminEmail,
      subject,
      html,
    });
    return { sent: true, messageId: info.messageId, message: `${adminEmail} 메일로 테스트 알림이 성공적으로 전송되었습니다!` };
  } catch (err: any) {
    return { sent: false, error: err.message, message: `메일 발송 실패: ${err.message}` };
  }
}


import { google } from 'googleapis';
import { ConsultationRecord } from './types';

export interface SheetSyncResult {
  synced: boolean;
  method?: 'WEBHOOK' | 'SERVICE_ACCOUNT';
  error?: string;
  message?: string;
}

export async function syncToGoogleSheet(record: ConsultationRecord): Promise<SheetSyncResult> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim();
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim();
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  const rowData = {
    submittedAt: record.submittedAt,
    id: record.id,
    name: record.name,
    phone: record.phone,
    email: record.email || '',
    location: record.location,
    landSize: record.landSize || '',
    plantTypes: record.plantTypes || '',
    categories: record.selectedCategories.join(', '),
    details: record.details || '',
    filesCount: record.attachedFiles?.length || 0,
    fileNames: record.attachedFiles?.map((f) => f.name).join(', ') || '',
    privacyAgreed: record.privacyAgreed ? '동의' : '미동의',
  };

  // Method 1: Webhook URL (Google Apps Script Web App)
  if (webhookUrl) {
    try {
      console.log(`[Google Sheets] Sending record ${record.id} to Apps Script Webhook...`);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rowData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      console.log(`[Google Sheets] Successfully synced ${record.id} via Webhook`);
      return { synced: true, method: 'WEBHOOK', message: '구글 시트에 성공적으로 기록되었습니다.' };
    } catch (err: any) {
      console.error('[Google Sheets Webhook Error]:', err.message);
      return { synced: false, method: 'WEBHOOK', error: err.message };
    }
  }

  // Method 2: Google Cloud Service Account
  if (sheetId && serviceEmail && privateKey) {
    try {
      console.log(`[Google Sheets] Appending record ${record.id} via Google Service Account...`);
      const auth = new google.auth.JWT({
        email: serviceEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      // Prepare row values matching column order
      const values = [
        [
          rowData.submittedAt,
          rowData.id,
          rowData.name,
          rowData.phone,
          rowData.email,
          rowData.location,
          rowData.landSize,
          rowData.plantTypes,
          rowData.categories,
          rowData.details,
          rowData.filesCount,
          rowData.fileNames,
          rowData.privacyAgreed,
        ],
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'A:M',
        valueInputOption: 'USER_ENTERED',
        requestBody: { values },
      });

      console.log(`[Google Sheets] Successfully appended ${record.id} to sheet ${sheetId}`);
      return { synced: true, method: 'SERVICE_ACCOUNT', message: '구글 시트에 성공적으로 추가되었습니다.' };
    } catch (err: any) {
      console.error('[Google Sheets API Error]:', err.message);
      return { synced: false, method: 'SERVICE_ACCOUNT', error: err.message };
    }
  }

  // Not configured yet
  console.log('[Google Sheets] Webhook URL or Service Account not configured in .env. Stored locally.');
  return {
    synced: false,
    message: 'Google Sheets 설정(GOOGLE_SHEET_WEBHOOK_URL 또는 Service Account)이 등록되지 않아 로컬에 안전하게 보관되었습니다.',
  };
}

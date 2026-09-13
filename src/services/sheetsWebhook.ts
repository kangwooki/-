import { ConsultationItem } from '../types';

export const SHEETS_WEBHOOK_KEY = 'safegarden_sheets_webhook_url';

export function getGoogleSheetsWebhookUrl(): string {
  try {
    const envUrl = (import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL as string)?.trim();
    if (envUrl) return envUrl;
    const localUrl = localStorage.getItem(SHEETS_WEBHOOK_KEY)?.trim();
    return localUrl || '';
  } catch {
    return '';
  }
}

export function setGoogleSheetsWebhookUrl(url: string): void {
  try {
    const trimmed = url.trim();
    if (!trimmed) {
      localStorage.removeItem(SHEETS_WEBHOOK_KEY);
    } else {
      localStorage.setItem(SHEETS_WEBHOOK_KEY, trimmed);
    }
  } catch (e) {
    console.warn('Failed to save webhook URL to localStorage:', e);
  }
}

/**
 * Sends consultation record directly to Google Apps Script Webhook.
 * Appends row to Google Sheet and triggers instant email to cuthip@gmail.com.
 */
export async function submitToGoogleSheet(
  record: ConsultationItem,
  customUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const url = customUrl || getGoogleSheetsWebhookUrl();
  if (!url) {
    return { success: false, error: '구글 시트 웹앱 URL이 설정되지 않았습니다.' };
  }

  const payload = {
    action: 'submit',
    id: record.id,
    submittedAt: record.submittedAt,
    name: record.name,
    phone: record.phone,
    email: record.email || '',
    location: record.location,
    landSize: record.landSize || '',
    plantTypes: record.plantTypes || '',
    selectedCategories: record.selectedCategories,
    details: record.details || '',
    attachedFiles: record.attachedFiles?.map((f) => ({ name: f.name, size: f.size })) || [],
    status: record.status || '접수',
    adminNote: record.adminNote || '',
  };

  try {
    // We send as text/plain with no-cors fallback to ensure cross-domain browser submissions succeed
    // without being blocked by CORS preflight policies.
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (err: any) {
    console.error('[Google Sheets Submission Error]:', err);
    return { success: false, error: err.message || '전송 실패' };
  }
}

/**
 * Fetches all consultation submissions directly from Google Sheet.
 */
export async function fetchConsultationsFromGoogleSheet(
  customUrl?: string
): Promise<{ success: boolean; data: ConsultationItem[]; error?: string }> {
  const url = customUrl || getGoogleSheetsWebhookUrl();
  if (!url) {
    return { success: false, data: [], error: '구글 시트 URL 미설정' };
  }

  try {
    const target = `${url}${url.includes('?') ? '&' : '?'}action=list&_t=${Date.now()}`;
    const response = await fetch(target, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = await response.json();
    if (json && json.success && Array.isArray(json.data)) {
      return { success: true, data: json.data };
    }
    return { success: false, data: [], error: json?.error || '데이터 파싱 실패' };
  } catch (err: any) {
    console.warn('[Google Sheets Fetch Warning]:', err.message);
    return { success: false, data: [], error: err.message };
  }
}

/**
 * Updates status of a consultation row in Google Sheet.
 */
export async function updateGoogleSheetStatus(
  id: string,
  newStatus: '접수' | '검토중' | '완료',
  customUrl?: string
): Promise<boolean> {
  const url = customUrl || getGoogleSheetsWebhookUrl();
  if (!url) return false;

  try {
    const target = `${url}${url.includes('?') ? '&' : '?'}action=update_status&id=${encodeURIComponent(
      id
    )}&status=${encodeURIComponent(newStatus)}&_t=${Date.now()}`;
    await fetch(target, { mode: 'no-cors' });
    return true;
  } catch (e) {
    console.warn('Failed to update Google Sheet status:', e);
    return false;
  }
}

/**
 * Updates admin note of a consultation row in Google Sheet.
 */
export async function updateGoogleSheetNote(
  id: string,
  note: string,
  customUrl?: string
): Promise<boolean> {
  const url = customUrl || getGoogleSheetsWebhookUrl();
  if (!url) return false;

  try {
    const target = `${url}${url.includes('?') ? '&' : '?'}action=update_note&id=${encodeURIComponent(
      id
    )}&note=${encodeURIComponent(note)}&_t=${Date.now()}`;
    await fetch(target, { mode: 'no-cors' });
    return true;
  } catch (e) {
    console.warn('Failed to update Google Sheet note:', e);
    return false;
  }
}

/**
 * Deletes a consultation row from Google Sheet.
 */
export async function deleteGoogleSheetRow(
  id: string,
  customUrl?: string
): Promise<boolean> {
  const url = customUrl || getGoogleSheetsWebhookUrl();
  if (!url) return false;

  try {
    const target = `${url}${url.includes('?') ? '&' : '?'}action=delete&id=${encodeURIComponent(
      id
    )}&_t=${Date.now()}`;
    await fetch(target, { mode: 'no-cors' });
    return true;
  } catch (e) {
    console.warn('Failed to delete row in Google Sheet:', e);
    return false;
  }
}

/**
 * Sends a test ping to Google Apps Script to verify email delivery to cuthip@gmail.com
 */
export async function testGoogleSheetConnection(
  customUrl?: string
): Promise<{ success: boolean; message: string }> {
  const url = customUrl || getGoogleSheetsWebhookUrl();
  if (!url) {
    return { success: false, message: '구글 시트 웹앱 URL을 먼저 입력해 주세요.' };
  }

  try {
    const target = `${url}${url.includes('?') ? '&' : '?'}action=test&_t=${Date.now()}`;
    const res = await fetch(target);
    const json = await res.json();
    if (json && json.success) {
      return { success: true, message: '구글 시트 연결 및 cuthip@gmail.com 테스트 메일 발송에 성공했습니다!' };
    }
    return { success: false, message: json?.error || '테스트 실패' };
  } catch (err: any) {
    // If CORS prevents reading response, test with no-cors trigger
    try {
      const target = `${url}${url.includes('?') ? '&' : '?'}action=test&_t=${Date.now()}`;
      await fetch(target, { mode: 'no-cors' });
      return {
        success: true,
        message: '테스트 요청이 전송되었습니다. 1분 내로 cuthip@gmail.com 메일함을 확인해 주세요.',
      };
    } catch (fallbackErr: any) {
      return { success: false, message: `연결 오류: ${fallbackErr.message}` };
    }
  }
}

/**
 * Complete Google Apps Script template for user's Google Sheet
 */
export const GOOGLE_APPS_SCRIPT_CODE = `// ============================================================================
// 🌱 세이프가든(Safe Garden) 구글 시트 & 이메일 자동 알림 Apps Script
// 수신 이메일: cuthip@gmail.com
// ============================================================================

const ADMIN_EMAIL = 'cuthip@gmail.com';
const SHEET_NAME = '상담신청내역';

function initSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      '접수번호', '접수일시', '고객성함', '연락처', '이메일',
      '토지/현장위치', '토지면적', '식물/수목종류', '상담분야',
      '상세문의내용', '첨부파일', '상태', '관리자메모'
    ];
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#1E4334');
    headerRange.setFontColor('#FAF8F5');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 140);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 100);
    sheet.setColumnWidth(4, 130);
    sheet.setColumnWidth(5, 180);
    sheet.setColumnWidth(6, 220);
    sheet.setColumnWidth(7, 100);
    sheet.setColumnWidth(8, 120);
    sheet.setColumnWidth(9, 140);
    sheet.setColumnWidth(10, 300);
    sheet.setColumnWidth(11, 100);
    sheet.setColumnWidth(12, 90);
    sheet.setColumnWidth(13, 220);
  }
  return sheet;
}

function doPost(e) {
  try {
    const sheet = initSheet();
    let data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const id = data.id || 'SG-' + Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyyMMdd-HHmmss');
    const submittedAt = data.submittedAt || Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
    const name = data.name || '';
    const phone = data.phone || '';
    const email = data.email || '';
    const location = data.location || '';
    const landSize = data.landSize || '';
    const plantTypes = data.plantTypes || '';
    const categories = Array.isArray(data.selectedCategories) 
      ? data.selectedCategories.join(', ') 
      : (data.categories || data.selectedCategories || '');
    const details = data.details || '';
    const files = data.attachedFiles ? (Array.isArray(data.attachedFiles) ? data.attachedFiles.map(f => f.name).join(', ') : data.attachedFiles) : '';
    const status = data.status || '접수';
    const note = data.adminNote || '';

    // 1. 구글 시트에 상담 데이터 행 추가
    sheet.appendRow([
      id, submittedAt, name, phone, email,
      location, landSize, plantTypes, categories,
      details, files, status, note
    ]);

    // 2. cuthip@gmail.com으로 신규 상담 알림 이메일 자동 발송
    try {
      const emailSubject = '[세이프가든 상담 접수] ' + name + '님 (' + phone + ') - ' + location;
      const emailHtml = 
        '<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1E4334; border-radius: 12px; overflow: hidden; background-color: #ffffff;">' +
          '<div style="background-color: #1E4334; color: #FAF8F5; padding: 24px; text-align: center;">' +
            '<h1 style="margin: 0; font-size: 20px; font-weight: bold;">🌱 세이프가든 신규 현장상담 접수</h1>' +
            '<p style="margin: 8px 0 0; font-size: 13px; color: #A4B89D;">토지 및 식물자산 관리 현장평가 신청서가 도착했습니다.</p>' +
          '</div>' +
          '<div style="padding: 24px;">' +
            '<div style="background-color: #FAF8F5; border-radius: 8px; padding: 16px; margin-bottom: 20px;">' +
              '<table style="width: 100%; font-size: 14px; border-collapse: collapse;">' +
                '<tr><td style="padding: 6px 0; color: #666; width: 100px;">접수번호</td><td style="padding: 6px 0; font-weight: bold; color: #1E4334;">' + id + '</td></tr>' +
                '<tr><td style="padding: 6px 0; color: #666;">접수일시</td><td style="padding: 6px 0; font-weight: bold;">' + submittedAt + '</td></tr>' +
                '<tr><td style="padding: 6px 0; color: #666;">고객성함</td><td style="padding: 6px 0; font-weight: bold; font-size: 16px; color: #1E4334;">' + name + '</td></tr>' +
                '<tr><td style="padding: 6px 0; color: #666;">연락처</td><td style="padding: 6px 0;"><a href="tel:' + phone + '" style="color: #1E4334; font-weight: bold; text-decoration: underline;">' + phone + '</a></td></tr>' +
                '<tr><td style="padding: 6px 0; color: #666;">이메일</td><td style="padding: 6px 0;">' + (email || '(미기재)') + '</td></tr>' +
                '<tr><td style="padding: 6px 0; color: #666;">현장위치</td><td style="padding: 6px 0; font-weight: bold; color: #2B5A42;">' + location + '</td></tr>' +
                '<tr><td style="padding: 6px 0; color: #666;">토지면적</td><td style="padding: 6px 0;">' + (landSize || '(미기재)') + '</td></tr>' +
                '<tr><td style="padding: 6px 0; color: #666;">수목종류</td><td style="padding: 6px 0;">' + (plantTypes || '(미기재)') + '</td></tr>' +
                '<tr><td style="padding: 6px 0; color: #666;">상담분야</td><td style="padding: 6px 0; color: #1E4334; font-weight: bold;">' + categories + '</td></tr>' +
              '</table>' +
            '</div>' +
            (details ? '<div style="margin-bottom: 20px;"><h3 style="font-size: 14px; color: #1E4334; margin: 0 0 8px;">📝 상세 문의 내용</h3><div style="background-color: #f9f9f9; border-left: 4px solid #1E4334; padding: 12px; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">' + details + '</div></div>' : '') +
            '<div style="text-align: center; margin-top: 24px;">' +
              '<a href="https://safegarden.netlify.app/#admin" style="display: inline-block; background-color: #1E4334; color: #FAF8F5; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 14px;">세이프가든 관리자 페이지 열기</a>' +
            '</div>' +
          '</div>' +
          '<div style="background-color: #f1ede7; padding: 12px; text-align: center; font-size: 11px; color: #777;">세이프가든(Safe Garden) 자동알림 시스템 • 대표 김영락</div>' +
        '</div>';

      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: emailSubject,
        htmlBody: emailHtml
      });
    } catch (mailErr) {
      console.error('MailApp send error:', mailErr);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      id: id,
      submittedAt: submittedAt
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = initSheet();
    const action = (e && e.parameter) ? e.parameter.action : 'list';

    if (action === 'update_status') {
      const id = e.parameter.id;
      const status = e.parameter.status;
      updateRowStatus(sheet, id, status);
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'update_note') {
      const id = e.parameter.id;
      const note = e.parameter.note;
      updateRowNote(sheet, id, note);
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'delete') {
      const id = e.parameter.id;
      deleteRowById(sheet, id);
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'test') {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        subject: '[세이프가든] 구글 시트 & 이메일 연동 테스트 성공',
        htmlBody: '<h3>축하합니다!</h3><p>세이프가든 구글 시트 및 cuthip@gmail.com 이메일 알림 연동이 성공적으로 설정되었습니다.</p>'
      });
      return ContentService.createTextOutput(JSON.stringify({ success: true, message: '테스트 완료' })).setMimeType(ContentService.MimeType.JSON);
    }

    // Default: Return list of all consultations
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify({ success: true, data: [] })).setMimeType(ContentService.MimeType.JSON);
    }

    const items = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r[0]) continue;
      items.push({
        id: String(r[0]),
        submittedAt: String(r[1]),
        name: String(r[2]),
        phone: String(r[3]),
        email: String(r[4] || ''),
        location: String(r[5]),
        landSize: String(r[6] || ''),
        plantTypes: String(r[7] || ''),
        selectedCategories: String(r[8] || '').split(',').map(s => s.trim()).filter(Boolean),
        details: String(r[9] || ''),
        attachedFiles: r[10] ? [{ name: String(r[10]), size: '0', type: '' }] : [],
        status: String(r[11] || '접수'),
        adminNote: String(r[12] || '')
      });
    }

    items.reverse();
    return ContentService.createTextOutput(JSON.stringify({ success: true, data: items })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function updateRowStatus(sheet, id, status) {
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      sheet.getRange(i + 1, 12).setValue(status);
      break;
    }
  }
}

function updateRowNote(sheet, id, note) {
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      sheet.getRange(i + 1, 13).setValue(note);
      break;
    }
  }
}

function deleteRowById(sheet, id) {
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
}
`;

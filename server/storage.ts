import fs from 'fs';
import path from 'path';
import { ConsultationRecord, ConsultationPayload } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'consultations.json');

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function saveConsultation(
  payload: ConsultationPayload,
  meta?: { ip?: string; userAgent?: string }
): ConsultationRecord {
  ensureDataDir();

  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const dateCompact = now.toISOString().slice(0, 10).replace(/-/g, '');
  const id = `SG-${dateCompact}-${randomSuffix}`;

  const record: ConsultationRecord = {
    ...payload,
    id,
    submittedAt: formattedDate,
    ipAddress: meta?.ip,
    userAgent: meta?.userAgent,
    sheetSynced: false,
    emailSent: false,
    status: '접수',
  };

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const list: ConsultationRecord[] = JSON.parse(raw);
    list.unshift(record);
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Storage Error] Failed to write consultation to local file:', err);
  }

  return record;
}

export function updateConsultationStatus(
  id: string,
  status: { sheetSynced?: boolean; emailSent?: boolean }
): void {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const list: ConsultationRecord[] = JSON.parse(raw);
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...status };
      fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[Storage Error] Failed to update record status:', err);
  }
}

export function updateConsultation(
  id: string,
  updates: Partial<ConsultationRecord>
): ConsultationRecord | null {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const list: ConsultationRecord[] = JSON.parse(raw);
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
      return list[index];
    }
    return null;
  } catch (err) {
    console.error('[Storage Error] Failed to update record:', err);
    return null;
  }
}

export function deleteConsultation(id: string): boolean {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const list: ConsultationRecord[] = JSON.parse(raw);
    const filtered = list.filter((item) => item.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return filtered.length !== list.length;
  } catch (err) {
    console.error('[Storage Error] Failed to delete record:', err);
    return false;
  }
}

export function getConsultations(): ConsultationRecord[] {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

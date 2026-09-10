export interface ConsultationPayload {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  landSize?: string;
  plantTypes?: string;
  selectedCategories: string[];
  details?: string;
  privacyAgreed: boolean;
  attachedFiles?: {
    name: string;
    size: string;
    type?: string;
    dataUrl?: string;
  }[];
  submittedAt?: string;
}

export interface ConsultationRecord extends ConsultationPayload {
  id: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
  sheetSynced?: boolean;
  emailSent?: boolean;
  status?: '접수' | '검토중' | '완료';
  adminNote?: string;
}

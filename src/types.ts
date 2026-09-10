export type PageTab = 'home' | 'land-asset' | 'vacant-house' | 'consultation' | 'about' | 'admin';

export interface ConsultationFormData {
  name: string;
  phone: string;
  location: string;
  categories: string[];
  details: string;
  files: string[];
}

export interface ConsultationItem {
  id: string;
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
  }[];
  submittedAt: string;
  sheetSynced?: boolean;
  emailSent?: boolean;
  status?: '접수' | '검토중' | '완료';
  adminNote?: string;
}

export interface ServiceCardItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  imageUrl: string;
}

export interface VacantHouseServiceItem {
  number: string;
  title: string;
  subtitle: string;
  items: string[];
  description: string;
  note?: string;
  iconName: string;
}

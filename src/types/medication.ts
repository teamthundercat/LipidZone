import type { MedicationType } from '../data/medications/categories';

export interface MedicationEntry {
  id: string;
  type: string;
  category: MedicationType;
  name: string;
  genericName?: string;
  dosage: string;
  frequency: string;
  purpose: string;
  doctorName?: string;
  expirationDate?: string;
  imageUrl?: string;
  quantity?: string;
  prescribedTo?: string;
  warnings?: string;
  usage?: string;
  heartHealthImpact: {
    level: 'high' | 'medium' | 'low';
    type: 'warning' | 'info';
    details: string[];
    foodInteractions: string[];
  };
}

export interface MedicationForm {
  category: string;
  name: string;
  genericName?: string;
  dosage: string;
  frequency: string;
  purpose: string;
  doctorName?: string;
  expirationDate?: string;
  image?: File;
  quantity?: string;
  prescribedTo?: string;
  warnings?: string;
  usage?: string;
}
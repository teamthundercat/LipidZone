import { MedicationEntry } from '../../types/medication';

const OTC_MEDICATION_KEY = 'nutrition-tracker-otc-medications';

export function saveOTCMedication(medication: MedicationEntry): void {
  const medications = getOTCMedications();
  medications.push(medication);
  localStorage.setItem(OTC_MEDICATION_KEY, JSON.stringify(medications));
}

export function getOTCMedications(): MedicationEntry[] {
  try {
    const stored = localStorage.getItem(OTC_MEDICATION_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to get OTC medications:', error);
    return [];
  }
}

export function deleteOTCMedication(id: string): void {
  const medications = getOTCMedications().filter(med => med.id !== id);
  localStorage.setItem(OTC_MEDICATION_KEY, JSON.stringify(medications));
}
import { MedicationEntry } from '../../types/medication';

const MEDICATION_KEY = 'nutrition-tracker-medications';

export function saveMedication(medication: MedicationEntry): void {
  const medications = getMedications();
  medications.push(medication);
  localStorage.setItem(MEDICATION_KEY, JSON.stringify(medications));
}

export function getMedications(): MedicationEntry[] {
  try {
    const stored = localStorage.getItem(MEDICATION_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to get medications:', error);
    return [];
  }
}

export function deleteMedication(id: string): void {
  const medications = getMedications().filter(med => med.id !== id);
  localStorage.setItem(MEDICATION_KEY, JSON.stringify(medications));
}
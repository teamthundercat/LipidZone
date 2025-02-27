import { MedicationEntry } from '../../types/medication';

const SUPPLEMENT_KEY = 'nutrition-tracker-supplements';

export function saveSupplement(supplement: MedicationEntry): void {
  const supplements = getSupplements();
  supplements.push(supplement);
  localStorage.setItem(SUPPLEMENT_KEY, JSON.stringify(supplements));
}

export function getSupplements(): MedicationEntry[] {
  try {
    const stored = localStorage.getItem(SUPPLEMENT_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to get supplements:', error);
    return [];
  }
}

export function deleteSupplement(id: string): void {
  const supplements = getSupplements().filter(supp => supp.id !== id);
  localStorage.setItem(SUPPLEMENT_KEY, JSON.stringify(supplements));
}
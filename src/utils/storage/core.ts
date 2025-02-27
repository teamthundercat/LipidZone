import { DailyEntry } from '../../types';
import { STORAGE_KEY } from './types';
import { isValidBase64Image } from '../validation';

export function getEntries(): DailyEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const entries = JSON.parse(stored);
    return entries.filter(entry => {
      try {
        return isValidBase64Image(entry.imageUrl);
      } catch {
        return false;
      }
    });
  } catch (error) {
    console.error('Failed to get entries:', error);
    return [];
  }
}

export function saveEntries(entries: DailyEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
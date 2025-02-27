import { DailyEntry } from '../../types';

export const STORAGE_KEY = 'nutrition-tracker-entries';
export const HISTORY_KEY = 'nutrition-tracker-history';

export interface EntryHistory {
  entries: DailyEntry[];
  deletedEntries: Array<DailyEntry & { deletedAt: string }>;
}

interface DailyTotals {
  date: string;
  totals: {
    carbs: number;
    fats: number;
    proteins: number;
    cholesterol: number;
    sodium: number;
  };
  entries: number;
}
import { DailyEntry } from '../../types';
import { HISTORY_KEY, EntryHistory } from './types';

function getHistory(): EntryHistory {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) {
      return { entries: [], deletedEntries: [] };
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Failed to get history:', error);
    return { entries: [], deletedEntries: [] };
  }
}

function saveHistory(history: EntryHistory): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function addToHistory(entry: DailyEntry): void {
  const history = getHistory();
  history.entries.push(entry);
  saveHistory(history);
}

export function archiveEntry(entry: DailyEntry): void {
  const history = getHistory();
  const archivedEntry = {
    ...entry,
    deletedAt: new Date().toISOString()
  };
  history.deletedEntries.push(archivedEntry);
  saveHistory(history);
}

function getEntriesForDate(date: string): DailyEntry[] {
  const history = getHistory();
  return history.entries.filter(entry => 
    entry.date.startsWith(date) && 
    entry.type === 'food'
  );
}

function getDeletedEntriesForDate(date: string): Array<DailyEntry & { deletedAt: string }> {
  const history = getHistory();
  return history.deletedEntries.filter(entry => 
    entry.date.startsWith(date) && 
    entry.type === 'food'
  );
}

function getDailyStats(startDate: string, endDate: string) {
  const history = getHistory();
  const stats = new Map<string, {
    totals: { carbs: number; fats: number; proteins: number; cholesterol: number; sodium: number; };
    entries: number;
  }>();

  // Process active entries
  history.entries
    .filter(entry => 
      entry.date >= startDate && 
      entry.date <= endDate && 
      entry.type === 'food'
    )
    .forEach(entry => {
      const date = entry.date.split('T')[0];
      const current = stats.get(date) || {
        totals: { carbs: 0, fats: 0, proteins: 0, cholesterol: 0, sodium: 0 },
        entries: 0
      };

      stats.set(date, {
        totals: {
          carbs: current.totals.carbs + entry.macronutrients.carbs,
          fats: current.totals.fats + entry.macronutrients.fats,
          proteins: current.totals.proteins + entry.macronutrients.proteins,
          cholesterol: current.totals.cholesterol + entry.macronutrients.cholesterol,
          sodium: current.totals.sodium + entry.macronutrients.sodium,
        },
        entries: current.entries + 1
      });
    });

  return Array.from(stats.entries()).map(([date, data]) => ({
    date,
    ...data
  }));
}
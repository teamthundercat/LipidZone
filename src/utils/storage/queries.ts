import { DailyEntry, DailyTotals } from '../../types';
import { getEntries } from './core';
import { format } from 'date-fns';

export function getDailyEntries(): DailyEntry[] {
  return getEntries().filter(entry => 
    entry.type === 'food' && 
    format(new Date(entry.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  );
}

function getEntriesForDate(date: string): DailyEntry[] {
  const entries = getEntries();
  return entries.filter(entry => {
    if (entry.type !== 'food') return false;
    const entryDate = format(new Date(entry.date), 'yyyy-MM-dd');
    return entryDate === date;
  });
}

export function getDailyTotals(date: string) {
  const entries = getEntriesForDate(date);
  return entries.reduce(
    (acc, entry) => ({
      carbs: acc.carbs + entry.macronutrients.carbs,
      fats: acc.fats + entry.macronutrients.fats,
      proteins: acc.proteins + entry.macronutrients.proteins,
      cholesterol: acc.cholesterol + entry.macronutrients.cholesterol,
      sodium: acc.sodium + entry.macronutrients.sodium,
    }),
    { carbs: 0, fats: 0, proteins: 0, cholesterol: 0, sodium: 0 }
  );
}
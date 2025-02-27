import { DailyEntry } from '../types';
import { imageUrlToBase64 } from './imageUtils';
import { isValidBase64Image } from './validation';

const STORAGE_KEY = 'nutrition-tracker-entries';

export async function saveEntry(entry: DailyEntry): Promise<void> {
  try {
    let imageUrl = entry.imageUrl;
    
    // Convert blob URLs to base64
    if (entry.imageUrl.startsWith('blob:')) {
      imageUrl = await imageUrlToBase64(entry.imageUrl);
    }
    
    // Validate the image data
    if (!isValidBase64Image(imageUrl)) {
      throw new Error('Invalid image data');
    }
    
    const entries = getEntries();
    entries.push({ ...entry, imageUrl });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Failed to save entry:', error);
    throw error;
  }
}

function getEntries(): DailyEntry[] {
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

export function getDailyEntries(): DailyEntry[] {
  const entries = getEntries();
  return entries.filter(entry => 
    entry.type === 'food' && 
    new Date(entry.date).toDateString() === new Date().toDateString()
  );
}

export function getDailyTotals(date: string) {
  const entries = getEntries().filter(entry => entry.date.startsWith(date));
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
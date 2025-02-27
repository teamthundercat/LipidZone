import { v4 as uuidv4 } from 'uuid';
import { DailyEntry, NutritionData } from '../../types';

export function createFoodEntry(imageUrl: string, analysis: NutritionData): DailyEntry {
  return {
    id: uuidv4(),
    date: new Date().toISOString(),
    type: 'food',
    imageUrl,
    description: analysis.description,
    items: analysis.items,
    macronutrients: analysis.macronutrients
  };
}
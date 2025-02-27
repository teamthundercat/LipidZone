import { NutritionData, DailyRecommended } from '../../../types';
import { getNutrientColor } from '../../../utils/nutrients';

interface NutrientData {
  id: keyof typeof import('../../../utils/nutrients').NUTRIENT_STYLES;
  name: string;
  value: number;
  max: number;
  unit: string;
  color: string;
  priority: 'high' | 'medium';
  calories?: number;
  warning?: boolean;
}

export function getNutrientData(data: NutritionData, recommended: DailyRecommended): NutrientData[] {
  return [
    {
      id: 'sodium',
      name: 'Sodium',
      value: data.macronutrients.sodium,
      max: recommended.sodium,
      unit: 'mg',
      color: getNutrientColor('sodium'),
      priority: 'high',
      warning: data.macronutrients.sodium > recommended.sodium * 0.75
    },
    {
      id: 'cholesterol',
      name: 'Cholesterol',
      value: data.macronutrients.cholesterol,
      max: recommended.cholesterol,
      unit: 'mg',
      color: getNutrientColor('cholesterol'),
      priority: 'high',
      warning: data.macronutrients.cholesterol > recommended.cholesterol * 0.75
    },
    {
      id: 'fats',
      name: 'Fats',
      value: data.macronutrients.fats,
      max: recommended.fats,
      unit: 'g',
      color: getNutrientColor('fats'),
      priority: 'medium',
      calories: data.macronutrients.fats * 9,
      warning: data.macronutrients.fats > recommended.fats * 0.75
    },
    {
      id: 'proteins',
      name: 'Proteins',
      value: data.macronutrients.proteins,
      max: recommended.proteins,
      unit: 'g',
      color: getNutrientColor('proteins'),
      priority: 'medium',
      calories: data.macronutrients.proteins * 4
    },
    {
      id: 'carbs',
      name: 'Carbs',
      value: data.macronutrients.carbs,
      max: recommended.carbs,
      unit: 'g',
      color: getNutrientColor('carbs'),
      priority: 'medium',
      calories: data.macronutrients.carbs * 4
    }
  ];
}
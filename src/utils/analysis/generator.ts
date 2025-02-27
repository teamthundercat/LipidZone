import { NutritionData } from '../../types';
import { mockFoodItems } from './mockData';

export function generateMockFoodAnalysis(): NutritionData {
  const numItems = Math.floor(Math.random() * 6) + 3;
  const shuffled = [...mockFoodItems].sort(() => 0.5 - Math.random());
  const selectedItems = shuffled.slice(0, numItems);

  const totalMacros = selectedItems.reduce(
    (acc, item) => ({
      carbs: acc.carbs + item.macronutrients.carbs,
      fats: acc.fats + item.macronutrients.fats,
      proteins: acc.proteins + item.macronutrients.proteins,
      cholesterol: acc.cholesterol + item.macronutrients.cholesterol,
      sodium: acc.sodium + item.macronutrients.sodium,
    }),
    { carbs: 0, fats: 0, proteins: 0, cholesterol: 0, sodium: 0 }
  );

  return {
    description: `Meal containing ${selectedItems.map(item => item.name.toLowerCase()).join(', ')}`,
    items: selectedItems,
    macronutrients: totalMacros
  };
}
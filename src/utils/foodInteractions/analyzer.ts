import { NutritionData } from '../../types';
import { MedicationEntry } from '../../types/medication';
import { FoodInteractionWarning } from '../../types/foodInteractions';
import { FOOD_INTERACTION_RULES } from './rules';
import { getMedications } from '../storage/medication';

function identifyFoodTypes(nutritionData: NutritionData): string[] {
  const foodTypes: string[] = [];
  
  nutritionData.items.forEach(item => {
    const name = item.name.toLowerCase();
    
    if (name.includes('grapefruit')) foodTypes.push('grapefruit');
    if (name.includes('spinach') || name.includes('kale')) foodTypes.push('leafy-greens');
    if (item.macronutrients.sodium > 500) foodTypes.push('salt');
    if (name.includes('banana')) foodTypes.push('banana');
    if (name.includes('coffee') || name.includes('tea')) foodTypes.push('caffeine');
  });

  return [...new Set(foodTypes)];
}

export function analyzeFoodInteractions(nutritionData: NutritionData): FoodInteractionWarning[] {
  const medications = getMedications();
  const foodTypes = identifyFoodTypes(nutritionData);
  const warnings: FoodInteractionWarning[] = [];

  foodTypes.forEach(foodType => {
    medications.forEach(medication => {
      const rule = FOOD_INTERACTION_RULES.find(
        r => r.foodType === foodType && r.medicationType === medication.type
      );

      if (rule) {
        warnings.push({
          severity: rule.severity,
          medicationName: medication.name,
          foodName: nutritionData.items.find(
            item => identifyFoodTypes({ items: [item], macronutrients: item.macronutrients }).includes(foodType)
          )?.name || foodType,
          effect: rule.effect,
          recommendation: rule.recommendation
        });
      }
    });
  });

  return warnings.sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}
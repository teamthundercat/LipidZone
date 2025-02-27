import { FoodItem } from '../types';

interface HeartHealthInfo {
  impact: 'positive' | 'negative' | 'neutral';
  reason: string;
}

// Heart health classification rules
export function getHeartHealthInfo(item: FoodItem): HeartHealthInfo {
  const { macronutrients } = item;
  const name = item.name.toLowerCase();

  // Positive foods
  if (
    name.includes('salmon') ||
    name.includes('fish') ||
    name.includes('avocado') ||
    name.includes('nuts') ||
    name.includes('berries') ||
    name.includes('leafy green') ||
    name.includes('olive oil') ||
    name.includes('whole grain')
  ) {
    return {
      impact: 'positive',
      reason: getPositiveReason(name)
    };
  }

  // Negative indicators
  if (
    macronutrients.sodium > 500 ||
    macronutrients.cholesterol > 100 ||
    (macronutrients.fats > 15 && !name.includes('avocado') && !name.includes('nuts'))
  ) {
    return {
      impact: 'negative',
      reason: getNegativeReason(macronutrients)
    };
  }

  return {
    impact: 'neutral',
    reason: 'Moderate nutritional impact on heart health'
  };
}

function getPositiveReason(name: string): string {
  if (name.includes('salmon') || name.includes('fish')) {
    return 'Rich in omega-3 fatty acids, beneficial for heart health';
  }
  if (name.includes('avocado')) {
    return 'Contains heart-healthy monounsaturated fats';
  }
  if (name.includes('nuts')) {
    return 'Good source of healthy fats and protein';
  }
  if (name.includes('berries')) {
    return 'High in antioxidants that support heart health';
  }
  if (name.includes('leafy green')) {
    return 'Rich in vitamins and minerals that support cardiovascular health';
  }
  if (name.includes('olive oil')) {
    return 'Contains heart-healthy monounsaturated fats';
  }
  if (name.includes('whole grain')) {
    return 'Good source of fiber that helps maintain healthy cholesterol levels';
  }
  return 'Contains nutrients that support heart health';
}

function getNegativeReason(macronutrients: FoodItem['macronutrients']): string {
  if (macronutrients.sodium > 500) {
    return 'High sodium content may impact blood pressure';
  }
  if (macronutrients.cholesterol > 100) {
    return 'High cholesterol content';
  }
  if (macronutrients.fats > 15) {
    return 'High in fats, consider portion control';
  }
  return 'May have elements that should be consumed in moderation';
}
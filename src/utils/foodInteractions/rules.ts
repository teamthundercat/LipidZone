import { FoodInteractionRule } from '../../types/foodInteractions';

export const FOOD_INTERACTION_RULES: FoodInteractionRule[] = [
  {
    foodType: 'grapefruit',
    medicationType: 'statin',
    severity: 'high',
    effect: 'Can increase medication levels in blood',
    recommendation: 'Avoid grapefruit and grapefruit juice while taking statins'
  },
  {
    foodType: 'leafy-greens',
    medicationType: 'anticoagulant',
    severity: 'high',
    effect: 'Can reduce medication effectiveness',
    recommendation: 'Maintain consistent intake of vitamin K-rich foods'
  },
  {
    foodType: 'salt',
    medicationType: 'blood-pressure',
    severity: 'high',
    effect: 'Can interfere with blood pressure control',
    recommendation: 'Limit sodium intake'
  },
  {
    foodType: 'banana',
    medicationType: 'ace-inhibitor',
    severity: 'medium',
    effect: 'Can increase potassium levels',
    recommendation: 'Monitor potassium-rich food intake'
  },
  {
    foodType: 'caffeine',
    medicationType: 'beta-blocker',
    severity: 'medium',
    effect: 'Can reduce medication effectiveness',
    recommendation: 'Limit caffeine consumption'
  }
];
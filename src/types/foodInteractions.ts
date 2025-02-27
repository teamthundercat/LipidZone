export interface FoodInteractionWarning {
  severity: 'high' | 'medium' | 'low';
  medicationName: string;
  foodName: string;
  effect: string;
  recommendation: string;
}

export interface FoodInteractionRule {
  foodType: string;
  medicationType: string;
  severity: 'high' | 'medium' | 'low';
  effect: string;
  recommendation: string;
}
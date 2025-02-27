export type AlcoholFrequency = 
  | 'never'
  | 'monthly'
  | 'weekly'
  | 'several-times-week'
  | 'daily';

export type AlcoholAmount = 
  | 'none'
  | '1-2'
  | '3-4'
  | '5-plus';

interface AlcoholRisk {
  level: 'low' | 'moderate' | 'high';
  description: string;
  recommendations: string[];
}
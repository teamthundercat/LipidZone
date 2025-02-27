export const NUTRIENT_LABELS = {
  carbs: { full: 'Carbohydrates', short: 'Crb' },
  fats: { full: 'Fats', short: 'Fat' },
  proteins: { full: 'Protein', short: 'Pro' },
  cholesterol: { full: 'Cholesterol', short: 'Chol' },
  sodium: { full: 'Sodium', short: 'Salt' }
} as const;

export const NUTRIENT_STYLES = {
  sodium: {
    color: 'text-red-500',
    tip: 'Consider reducing salt intake to maintain healthy blood pressure'
  },
  cholesterol: {
    color: 'text-purple-500',
    tip: 'Monitor cholesterol levels for better heart health'
  },
  fats: {
    color: 'text-orange-500',
    tip: 'Focus on healthy fats from sources like fish and nuts'
  },
  proteins: {
    color: 'text-green-500',
    tip: 'Choose lean proteins for heart health'
  },
  carbs: {
    color: 'text-blue-500',
    tip: 'Opt for whole grains and complex carbohydrates'
  }
} as const;

export function getNutrientColor(nutrientId: keyof typeof NUTRIENT_STYLES): string {
  return NUTRIENT_STYLES[nutrientId].color;
}
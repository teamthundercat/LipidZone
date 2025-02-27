import React from 'react';
import { NutrientRecommendation } from '../../NutrientRecommendation';
import { NutrientData } from '../utils/nutrientCalculations';
import { NUTRIENT_STYLES } from '../../../utils/nutrients';

interface NutrientRecommendationsProps {
  nutrients: NutrientData[];
}

export function NutrientRecommendations({ nutrients }: NutrientRecommendationsProps) {
  // Only show recommendations for nutrients that are concerning in a single meal
  const recommendations = nutrients.filter(nutrient => {
    const percentage = (nutrient.value / nutrient.max) * 100;
    
    // Different thresholds for different nutrients
    switch (nutrient.id) {
      case 'sodium':
      case 'cholesterol':
        // These should be monitored closely even in single meals
        return percentage > 25;
      case 'fats':
        // Fats in a single meal should only trigger if very high
        return percentage > 40;
      case 'carbs':
      case 'proteins':
        // These are less concerning in a single meal
        return false;
    }
  });
  
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Health Considerations</h3>
      <div className="space-y-3">
        {recommendations.map(nutrient => (
          <NutrientRecommendation
            key={nutrient.id}
            name={nutrient.name}
            current={nutrient.value}
            recommended={nutrient.max}
            color={nutrient.color}
            tip={NUTRIENT_STYLES[nutrient.id].tip}
          />
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { DailyRecommended } from '../../types';

interface NutritionOverviewProps {
  totals: {
    carbs: number;
    fats: number;
    proteins: number;
    cholesterol: number;
    sodium: number;
  };
  recommended: DailyRecommended;
}

export function NutritionOverview({ totals, recommended }: NutritionOverviewProps) {
  const nutrients = [
    { 
      name: 'Carbohydrates', 
      current: totals.carbs, 
      target: recommended.carbs, 
      unit: 'g',
      color: 'bg-blue-500' 
    },
    { 
      name: 'Proteins', 
      current: totals.proteins, 
      target: recommended.proteins, 
      unit: 'g',
      color: 'bg-green-500' 
    },
    { 
      name: 'Fats', 
      current: totals.fats, 
      target: recommended.fats, 
      unit: 'g',
      color: 'bg-yellow-500' 
    },
    { 
      name: 'Cholesterol', 
      current: totals.cholesterol, 
      target: recommended.cholesterol, 
      unit: 'mg',
      color: 'bg-purple-500' 
    },
    { 
      name: 'Sodium', 
      current: totals.sodium, 
      target: recommended.sodium, 
      unit: 'mg',
      color: 'bg-red-500' 
    }
  ];
  
  return (
    <div className="space-y-4">
      {nutrients.map(nutrient => {
        const percentage = Math.min(100, Math.round((nutrient.current / nutrient.target) * 100));
        
        return (
          <div key={nutrient.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{nutrient.name}</span>
              <span>
                {nutrient.current} / {nutrient.target} {nutrient.unit}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${nutrient.color} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
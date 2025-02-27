import React from 'react';
import { Heart, Percent } from 'lucide-react';
import { NutrientData } from '../utils/nutrientCalculations';
import { NUTRIENT_STYLES } from '../../../utils/nutrients';

interface HealthIndicatorsProps {
  nutrients: NutrientData[];
  totalCalories: number;
}

export function HealthIndicators({ nutrients, totalCalories }: HealthIndicatorsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Heart Health Indicators */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          <h4 className="font-medium">Heart Health Indicators</h4>
        </div>
        <div className="space-y-3">
          {nutrients
            .filter(n => n.priority === 'high')
            .map(nutrient => (
              <div key={nutrient.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${nutrient.color.replace('text-', 'bg-')}`} />
                    <span className={`font-medium ${nutrient.color}`}>{nutrient.name}</span>
                  </div>
                  <span className={`font-medium ${nutrient.warning ? 'text-red-500' : nutrient.color}`}>
                    {nutrient.value} / {nutrient.max} {nutrient.unit}
                  </span>
                </div>
                <p className="text-sm text-gray-600 pl-5">{NUTRIENT_STYLES[nutrient.id].tip}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Nutrient Balance */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Percent className="w-5 h-5 text-gray-600" />
          <h4 className="font-medium">Nutrient Balance</h4>
        </div>
        <div className="space-y-3">
          {nutrients
            .filter(n => n.priority === 'medium')
            .map(nutrient => {
              const percentage = ((nutrient.calories || 0) / totalCalories * 100) || 0;
              return (
                <div key={nutrient.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${nutrient.color.replace('text-', 'bg-')}`} />
                      <span className={nutrient.color}>{nutrient.name}</span>
                    </div>
                    <span className={`font-medium ${nutrient.color}`}>
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 pl-5">{NUTRIENT_STYLES[nutrient.id].tip}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Utensils, Heart, Flame, Dumbbell, Droplets } from 'lucide-react';
import { DailyRecommended } from '../types';
import { cn } from '../utils/cn';

interface DailyTotalsVisualProps {
  totals: {
    carbs: number;
    fats: number;
    proteins: number;
    cholesterol: number;
    sodium: number;
  };
  recommended: DailyRecommended;
}

export function DailyTotalsVisual({ totals, recommended }: DailyTotalsVisualProps) {
  const nutrients = [
    {
      name: 'Carbs',
      icon: Utensils,
      value: totals.carbs,
      max: recommended.carbs,
      unit: 'g',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Fats',
      icon: Flame,
      value: totals.fats,
      max: recommended.fats,
      unit: 'g',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    },
    {
      name: 'Proteins',
      icon: Dumbbell,
      value: totals.proteins,
      max: recommended.proteins,
      unit: 'g',
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Cholesterol',
      icon: Heart,
      value: totals.cholesterol,
      max: recommended.cholesterol,
      unit: 'mg',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Sodium',
      icon: Droplets,
      value: totals.sodium,
      max: recommended.sodium,
      unit: 'mg',
      color: 'text-red-500',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {nutrients.map(nutrient => {
        const percentage = (nutrient.value / nutrient.max) * 100;
        const isExceeded = percentage > 100;

        return (
          <div key={nutrient.name} className="flex flex-col items-center text-center">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-2",
              nutrient.bgColor,
              isExceeded && "animate-pulse"
            )}>
              <nutrient.icon className={cn("w-8 h-8", nutrient.color)} />
            </div>
            <div className={cn("font-medium", nutrient.color)}>
              {nutrient.name}
            </div>
            <div className="text-sm mt-1">
              <span className={cn("font-bold", isExceeded && "text-red-500")}>
                {nutrient.value}
              </span>
              <span className="text-gray-500">
                /{nutrient.max}{nutrient.unit}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round(percentage)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';

interface NutrientRecommendationProps {
  name: string;
  current: number;
  recommended: number;
  color: string;
  tip: string;
}

export function NutrientRecommendation({ name, current, recommended, color, tip }: NutrientRecommendationProps) {
  const percentage = Math.round((current / recommended) * 100);
  
  return (
    <div className={cn(
      "flex items-start gap-2 p-3 rounded-md",
      "bg-opacity-10 border border-opacity-20",
      color.replace('text-', 'bg-'),
      color.replace('text-', 'border-')
    )}>
      <AlertTriangle className={cn("w-5 h-5 mt-0.5 shrink-0", color)} />
      <div>
        <p className={cn("font-medium", color)}>
          {name} is at {percentage}% of daily value
        </p>
        <p className="text-sm mt-1 text-gray-600">{tip}</p>
      </div>
    </div>
  );
}
import React from 'react';
import { cn } from '../../utils/cn';

interface NutrientDonutProps {
  name: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

export function NutrientDonut({ name, value, max, unit, color }: NutrientDonutProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = `${(percentage * circumference) / 100} ${circumference}`;
  const strokeColor = color.replace('text-', 'stroke-');

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="56"
            cy="56"
            r="40"
            className="fill-none stroke-gray-200"
            strokeWidth="8"
          />
          <circle
            cx="56"
            cy="56"
            r="40"
            className={cn(
              "fill-none transition-all duration-500",
              strokeColor,
              value === 0 ? "opacity-30" : "opacity-100"
            )}
            strokeWidth="8"
            strokeDasharray={value === 0 ? `${circumference * 0.01} ${circumference}` : strokeDasharray}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={cn("text-lg font-bold", color)}>{value}</span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
      </div>
      <span className={cn("mt-2 text-sm font-medium", color)}>{name}</span>
    </div>
  );
}
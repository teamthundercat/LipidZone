import React from 'react';
import { NutrientDonut } from '../NutrientDonut';
import { NutrientData } from '../utils/nutrientCalculations';

interface NutrientCirclesProps {
  nutrients: NutrientData[];
}

export function NutrientCircles({ nutrients }: NutrientCirclesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {nutrients.map(({ id, ...nutrient }) => (
        <NutrientDonut key={id} {...nutrient} />
      ))}
    </div>
  );
}
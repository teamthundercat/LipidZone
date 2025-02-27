import React from 'react';
import { NutritionData } from '../types';

const NUTRIENT_COLORS = {
  Carbs: 'text-blue-500',
  Fats: 'text-orange-500',
  Proteins: 'text-green-500',
  Cholesterol: 'text-purple-500',
  Sodium: 'text-red-500'
} as const;

interface NutritionCardProps {
  data: NutritionData;
}

export function NutritionCard({ data }: NutritionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
      <p className="text-gray-700 mb-4">{data.description}</p>
      
      <div className="mb-6">
        <h4 className="text-md font-medium mb-3">Identified Items:</h4>
        <div className="space-y-3">
          {data.items.map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-gray-500">{item.portion}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(item.macronutrients).map(([key, value]) => {
                  const label = key.charAt(0).toUpperCase() + key.slice(1);
                  const unit = key === 'cholesterol' || key === 'sodium' ? 'mg' : 'g';
                  const colorClass = NUTRIENT_COLORS[label];
                  
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <span className={`${colorClass} font-medium`}>{label}</span>
                      <span className={`${colorClass} font-medium`}>
                        {value} {unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-md font-medium mb-3">Total Nutrients:</h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(data.macronutrients).map(([key, value]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            const unit = key === 'cholesterol' || key === 'sodium' ? 'mg' : 'g';
            const colorClass = NUTRIENT_COLORS[label];
            
            return (
              <div key={key} className="flex justify-between items-center">
                <span className={`${colorClass} font-medium`}>{label}</span>
                <span className={`${colorClass} font-medium`}>
                  {value} {unit}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
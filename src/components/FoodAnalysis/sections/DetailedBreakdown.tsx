import React from 'react';
import { NutritionData, FoodItem } from '../../../types';
import { NUTRIENT_STYLES, NUTRIENT_LABELS } from '../../../utils/nutrients';
import { getHeartHealthInfo } from '../../../utils/heartHealth';
import { cn } from '../../../utils/cn';

interface FoodItemCardProps {
  item: FoodItem;
  healthInfo: ReturnType<typeof getHeartHealthInfo>;
  variant: 'positive' | 'negative' | 'neutral';
}

function FoodItemCard({ item, healthInfo, variant }: FoodItemCardProps) {
  const variantStyles = {
    positive: 'bg-green-50 border-green-100',
    negative: 'bg-orange-50 border-orange-100',
    neutral: 'bg-gray-50 border-gray-100'
  };

  return (
    <div className={cn(
      "p-4 rounded-lg border",
      variantStyles[variant]
    )}>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{item.name}</span>
        <span className="text-sm text-gray-500">{item.portion}</span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{healthInfo.reason}</p>
      
      {/* Updated grid layout for better spacing */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-sm">
        {Object.entries(item.macronutrients).map(([key, value]) => {
          const nutrientKey = key as keyof typeof NUTRIENT_LABELS;
          const label = NUTRIENT_LABELS[nutrientKey].short;
          const unit = key === 'cholesterol' || key === 'sodium' ? 'mg' : 'g';
          const color = NUTRIENT_STYLES[nutrientKey].color;
          
          return (
            <div key={key} className="flex items-center justify-between">
              <span className={cn(color, "font-medium shrink-0 mr-2")}>{label}</span>
              <span className={cn(color, "font-medium tabular-nums")}>
                {value}{unit}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DetailedBreakdown({ data }: { data: NutritionData }) {
  // Test data with maximum values
  const maxValues = {
    carbs: 400, // ~4 meals worth
    fats: 120,  // ~4 meals worth
    proteins: 200, // ~4 meals worth
    cholesterol: 1200, // 4x daily limit
    sodium: 9200 // 4x daily limit
  };

  // Add a test item with maximum values
  const testData = {
    ...data,
    items: [
      ...data.items,
      {
        name: "Test Maximum Values",
        portion: "1 serving",
        macronutrients: maxValues
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Detailed Breakdown</h3>
      <div className="space-y-4">
        {testData.items.map((item, index) => {
          const healthInfo = getHeartHealthInfo(item);
          return (
            <FoodItemCard
              key={index}
              item={item}
              healthInfo={healthInfo}
              variant={healthInfo.impact}
            />
          );
        })}
      </div>
    </div>
  );
}
import React from 'react';
import { Scale } from 'lucide-react';
import { UserProfile } from '../../../types';
import { calculateDailyCalories } from '../../../utils/nutrition';

interface CaloricImpactProps {
  calories: number;
  profile: UserProfile;
}

export function CaloricImpact({ calories, profile }: CaloricImpactProps) {
  const dailyCalories = calculateDailyCalories(profile);
  const percentage = Math.round((calories / dailyCalories) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-3">
        <Scale className="w-5 h-5 text-gray-600" />
        <h4 className="font-medium">Caloric Impact</h4>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <p className="text-2xl font-bold text-gray-900">
          {calories.toFixed(0)}
        </p>
        <p className="text-gray-600">
          of {dailyCalories} recommended kcal
        </p>
      </div>
      <div className="mb-3">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 rounded-full ${
              percentage > 40 ? 'bg-orange-500' : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {percentage}% of daily recommended intake
        </p>
      </div>
      <p className="text-sm text-gray-600">
        {percentage > 40 
          ? "This meal represents a significant portion of your daily calories. Consider lighter meals for the rest of the day."
          : "This meal fits well within your daily caloric needs."}
      </p>
    </div>
  );
}
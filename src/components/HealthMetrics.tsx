import React from 'react';
import { Activity, Scale, Info, Heart } from 'lucide-react';
import { UserProfile } from '../types';
import { calculateBMI, getBMICategory } from '../utils/health';
import { calculateDailyCalories } from '../utils/nutrition';
import { cn } from '../utils/cn';

interface HealthMetricsProps {
  profile: UserProfile;
}

export function HealthMetrics({ profile }: HealthMetricsProps) {
  const bmi = calculateBMI(profile);
  const bmiInfo = getBMICategory(bmi);
  const dailyCalories = calculateDailyCalories(profile);

  return (
    <div className="space-y-6">
      {/* BMI Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Body Mass Index (BMI)</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-2xl font-bold">{bmi}</span>
              <span className={cn("ml-2 font-medium", bmiInfo.color)}>
                {bmiInfo.category}
              </span>
            </div>
            <p className="text-sm text-gray-600">{bmiInfo.description}</p>
          </div>
          
          <div className="w-full md:w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500",
                bmi < 18.5 ? "bg-yellow-500 w-1/4" :
                bmi < 25 ? "bg-green-500 w-2/4" :
                bmi < 30 ? "bg-yellow-500 w-3/4" :
                "bg-red-500 w-full"
              )}
            />
          </div>
        </div>
      </div>

      {/* Daily Energy Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Daily Energy Needs</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-2xl font-bold">{dailyCalories}</span>
              <span className="ml-2 text-gray-600">kcal</span>
            </div>
            <p className="text-sm text-gray-600">
              Estimated daily caloric needs based on your profile and activity level
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <div className="text-sm font-medium text-blue-800">Carbs</div>
              <div className="text-lg font-bold text-blue-900">{Math.round(dailyCalories * 0.5 / 4)}g</div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <div className="text-sm font-medium text-green-800">Protein</div>
              <div className="text-lg font-bold text-green-900">{Math.round(dailyCalories * 0.25 / 4)}g</div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <div className="text-sm font-medium text-orange-800">Fats</div>
              <div className="text-lg font-bold text-orange-900">{Math.round(dailyCalories * 0.25 / 9)}g</div>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Health Risk Factors */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Heart Health Risk Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">BMI Status</h4>
            <div className={cn(
              "text-sm",
              bmiInfo.color
            )}>
              {bmi >= 25 ? (
                "Elevated BMI may increase cardiovascular risk. Consider weight management strategies."
              ) : (
                "BMI is within a healthy range, which is beneficial for heart health."
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Activity Level</h4>
            <div className="text-sm text-gray-600">
              {profile.heartHealth?.activityLevel === 'sedentary' ? (
                "Low activity level may increase cardiovascular risk. Consider increasing physical activity."
              ) : (
                "Regular physical activity helps maintain heart health."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
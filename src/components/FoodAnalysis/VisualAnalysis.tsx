import React from 'react';
import { NutrientCircles } from './sections/NutrientCircles';
import { CaloricImpact } from './sections/CaloricImpact';
import { HealthIndicators } from './sections/HealthIndicators';
import { DetailedBreakdown } from './sections/DetailedBreakdown';
import { NutrientRecommendations } from './sections/NutrientRecommendations';
import { NutritionData, DailyRecommended, UserProfile } from '../../types';
import { Heart } from 'lucide-react';
import { getNutrientData } from './utils/nutrientCalculations';

interface VisualAnalysisProps {
  data: NutritionData;
  recommended: DailyRecommended;
  profile: UserProfile;
}

export function VisualAnalysis({ data, recommended, profile }: VisualAnalysisProps) {
  const nutrients = getNutrientData(data, recommended);
  const totalCalories = nutrients.reduce((sum, n) => sum + (n.calories || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-red-500" />
          <h3 className="text-lg font-semibold">Nutrition Analysis</h3>
        </div>

        {/* 1. Circle Graphs */}
        <NutrientCircles nutrients={nutrients} />
      </div>

      {/* 2. Caloric Impact */}
      <CaloricImpact calories={totalCalories} profile={profile} />

      {/* 3. Health and Balance */}
      <HealthIndicators nutrients={nutrients} totalCalories={totalCalories} />

      {/* 4. Health Considerations */}
      <NutrientRecommendations nutrients={nutrients} />

      {/* 5. Detailed Breakdown */}
      <DetailedBreakdown data={data} />
    </div>
  );
}
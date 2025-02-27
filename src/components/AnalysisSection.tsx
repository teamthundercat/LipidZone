import React from 'react';
import { VisualAnalysis } from './FoodAnalysis/VisualAnalysis';
import { NutritionCard } from './NutritionCard';
import { FoodWarningBanner } from './FoodInteractions/FoodWarningBanner';
import { NutritionData, DailyRecommended, UploadType, UserProfile } from '../types';
import { analyzeFoodInteractions } from '../utils/foodInteractions/analyzer';

interface AnalysisSectionProps {
  type: UploadType;
  analysis: NutritionData | null;
  recommended?: DailyRecommended;
  profile: UserProfile;
}

export function AnalysisSection({ type, analysis, recommended, profile }: AnalysisSectionProps) {
  if (!analysis) return null;

  const foodInteractions = type === 'food' ? analyzeFoodInteractions(analysis) : [];

  return (
    <div className="space-y-6">
      {foodInteractions.length > 0 && (
        <div className="space-y-3">
          {foodInteractions.map((warning, index) => (
            <FoodWarningBanner key={index} warning={warning} />
          ))}
        </div>
      )}

      {type === 'food' && recommended ? (
        <VisualAnalysis 
          data={analysis} 
          recommended={recommended}
          profile={profile}
        />
      ) : (
        <NutritionCard data={analysis} />
      )}
    </div>
  );
}
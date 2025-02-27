import React from 'react';
import { Heart, Activity, Cigarette, Moon, Droplet, Beer } from 'lucide-react';
import { HeartHealthMetrics } from '../../types';
import { AlcoholUseForm } from './AlcoholUseForm';
import { ActivityLevelForm } from './ActivityLevelForm';
import { TobaccoUseForm } from './TobaccoUseForm';
import { SleepForm } from './SleepForm';
import { HealthMetricsForm } from './HealthMetricsForm';

interface HeartHealthFormProps {
  metrics: HeartHealthMetrics | undefined;
  onUpdate: (metrics: HeartHealthMetrics) => void;
}

const defaultMetrics: HeartHealthMetrics = {
  tobacco: false,
  activityLevel: 'moderate',
  physicalActivity: {
    minutesPerWeek: 150,
    intensity: 'moderate',
    type: 'both'
  },
  sleep: {
    hoursPerNight: 7,
    quality: 'good'
  },
  alcohol: {
    frequency: 'never',
    amountPerSession: 'none'
  }
};

export function HeartHealthForm({ metrics = defaultMetrics, onUpdate }: HeartHealthFormProps) {
  const handleChange = (field: keyof HeartHealthMetrics, value: any) => {
    onUpdate({ ...metrics, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Tobacco Use Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Tobacco Use</h2>
        <TobaccoUseForm 
          tobacco={metrics.tobacco}
          onChange={(value) => handleChange('tobacco', value)}
        />
      </div>

      {/* Physical Activity Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Physical Activity</h2>
        <ActivityLevelForm
          activityLevel={metrics.activityLevel}
          physicalActivity={metrics.physicalActivity}
          onChange={(level, activity) => {
            handleChange('activityLevel', level);
            handleChange('physicalActivity', activity);
          }}
        />
      </div>

      {/* Sleep Patterns Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Sleep Patterns</h2>
        <SleepForm
          sleep={metrics.sleep}
          onChange={(value) => handleChange('sleep', value)}
        />
      </div>

      {/* Alcohol Consumption Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Alcohol Consumption</h2>
        <AlcoholUseForm
          frequency={metrics.alcohol.frequency}
          amountPerSession={metrics.alcohol.amountPerSession}
          lastDrink={metrics.alcohol.lastDrink}
          onUpdate={(value) => handleChange('alcohol', value)}
        />
      </div>

      {/* Health Metrics Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Health Metrics</h2>
        <HealthMetricsForm
          bloodPressure={metrics.bloodPressure}
          bloodGlucose={metrics.bloodGlucose}
          onChange={(field, value) => handleChange(field, value)}
        />
      </div>
    </div>
  );
}
import React from 'react';
import { HeartHealthMetrics } from '../../types';

interface ActivityLevelFormProps {
  activityLevel: HeartHealthMetrics['activityLevel'];
  physicalActivity: HeartHealthMetrics['physicalActivity'];
  onChange: (level: HeartHealthMetrics['activityLevel'], activity: HeartHealthMetrics['physicalActivity']) => void;
}

export function ActivityLevelForm({ activityLevel, physicalActivity, onChange }: ActivityLevelFormProps) {
  const handleActivityChange = (field: keyof HeartHealthMetrics['physicalActivity'], value: any) => {
    onChange(activityLevel, {
      ...physicalActivity,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Minutes per Week
          </label>
          <input
            type="number"
            value={physicalActivity.minutesPerWeek}
            onChange={(e) => handleActivityChange('minutesPerWeek', parseInt(e.target.value) || 0)}
            min="0"
            max="1000"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Intensity Level
          </label>
          <select
            value={physicalActivity.intensity}
            onChange={(e) => handleActivityChange('intensity', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Exercise Type
          </label>
          <select
            value={physicalActivity.type}
            onChange={(e) => handleActivityChange('type', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="cardio">Cardio</option>
            <option value="strength">Strength Training</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>
    </div>
  );
}
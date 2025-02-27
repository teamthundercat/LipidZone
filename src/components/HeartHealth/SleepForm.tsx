import React from 'react';
import { HeartHealthMetrics } from '../../types';

interface SleepFormProps {
  sleep: HeartHealthMetrics['sleep'];
  onChange: (sleep: HeartHealthMetrics['sleep']) => void;
}

export function SleepForm({ sleep, onChange }: SleepFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Hours per Night
        </label>
        <input
          type="number"
          value={sleep.hoursPerNight}
          onChange={(e) => onChange({
            ...sleep,
            hoursPerNight: parseFloat(e.target.value) || 0
          })}
          min="0"
          max="24"
          step="0.5"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Sleep Quality
        </label>
        <select
          value={sleep.quality}
          onChange={(e) => onChange({
            ...sleep,
            quality: e.target.value as HeartHealthMetrics['sleep']['quality']
          })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="poor">Poor</option>
          <option value="fair">Fair</option>
          <option value="good">Good</option>
          <option value="excellent">Excellent</option>
        </select>
      </div>
    </div>
  );
}
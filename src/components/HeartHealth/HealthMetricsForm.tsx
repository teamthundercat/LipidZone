import React from 'react';
import { Droplet } from 'lucide-react';
import { HeartHealthMetrics } from '../../types';
import { InfoTooltip } from './InfoTooltip';

interface HealthMetricsFormProps {
  bloodPressure?: HeartHealthMetrics['bloodPressure'];
  bloodGlucose?: HeartHealthMetrics['bloodGlucose'];
  onChange: (field: keyof HeartHealthMetrics, value: any) => void;
}

const BLOOD_PRESSURE_INFO = [
  'Blood pressure categories:',
  '• Normal: Less than 120/80 mmHg',
  '• Elevated: 120-129/<80 mmHg',
  '• Stage 1: 130-139/80-89 mmHg',
  '• Stage 2: 140+/90+ mmHg',
  '• Crisis: 180+/120+ mmHg'
];

const BLOOD_GLUCOSE_INFO = [
  'Blood glucose ranges:',
  '• Normal fasting: 70-99 mg/dL',
  '• Prediabetes: 100-125 mg/dL',
  '• Diabetes: 126+ mg/dL',
  'Measure after 8 hours fasting'
];

export function HealthMetricsForm({ bloodPressure, bloodGlucose, onChange }: HealthMetricsFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Droplet className="w-5 h-5 text-gray-500" />
        <label className="block text-sm font-medium text-gray-700">
          Health Metrics
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-sm text-gray-600">
              Blood Pressure (optional)
            </label>
            <InfoTooltip content={BLOOD_PRESSURE_INFO} />
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Systolic"
              value={bloodPressure?.systolic || ''}
              onChange={(e) => onChange('bloodPressure', {
                ...bloodPressure,
                systolic: parseInt(e.target.value) || undefined
              })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-500">/</span>
            <input
              type="number"
              placeholder="Diastolic"
              value={bloodPressure?.diastolic || ''}
              onChange={(e) => onChange('bloodPressure', {
                ...bloodPressure,
                diastolic: parseInt(e.target.value) || undefined
              })}
              className="w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <label className="block text-sm text-gray-600">
              Blood Glucose (optional)
            </label>
            <InfoTooltip content={BLOOD_GLUCOSE_INFO} />
          </div>
          <input
            type="number"
            placeholder="mg/dL"
            value={bloodGlucose || ''}
            onChange={(e) => onChange('bloodGlucose', parseInt(e.target.value) || undefined)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
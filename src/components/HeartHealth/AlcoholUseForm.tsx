import React from 'react';
import { AlcoholFrequency, AlcoholAmount } from '../../types/alcohol';
import { cn } from '../../utils/cn';

interface AlcoholUseFormProps {
  frequency: AlcoholFrequency;
  amountPerSession: AlcoholAmount;
  lastDrink?: string;
  onUpdate: (data: { frequency: AlcoholFrequency; amountPerSession: AlcoholAmount; lastDrink?: string }) => void;
}

export function AlcoholUseForm({ frequency, amountPerSession, lastDrink, onUpdate }: AlcoholUseFormProps) {
  const handleChange = (field: string, value: string) => {
    onUpdate({
      frequency: field === 'frequency' ? value as AlcoholFrequency : frequency,
      amountPerSession: field === 'amount' ? value as AlcoholAmount : amountPerSession,
      lastDrink: field === 'lastDrink' ? value : lastDrink
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Frequency</label>
        <select
          value={frequency}
          onChange={(e) => handleChange('frequency', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="never">Never</option>
          <option value="monthly">Monthly or less</option>
          <option value="weekly">2-4 times a month</option>
          <option value="several-times-week">2-3 times a week</option>
          <option value="daily">4 or more times a week</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount per Session</label>
        <select
          value={amountPerSession}
          onChange={(e) => handleChange('amount', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="none">None</option>
          <option value="1-2">1-2 drinks</option>
          <option value="3-4">3-4 drinks</option>
          <option value="5-plus">5 or more drinks</option>
        </select>
      </div>

      {frequency !== 'never' && (
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Last Alcoholic Drink</label>
          <input
            type="date"
            value={lastDrink || ''}
            onChange={(e) => handleChange('lastDrink', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
}
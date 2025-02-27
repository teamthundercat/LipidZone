import React, { useState } from 'react';
import { Globe, Calendar, Clock, DollarSign } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LocalizationSettingsProps {
  initialSettings?: {
    dateFormat: string;
    timeFormat: string;
    timezone: string;
    currency: string;
    measurementUnit: 'metric' | 'imperial';
  };
  onSave: (settings: any) => void;
}

export function LocalizationSettings({ 
  initialSettings = {
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    timezone: 'America/New_York',
    currency: 'USD',
    measurementUnit: 'imperial' as const
  }, 
  onSave 
}: LocalizationSettingsProps) {
  const [settings, setSettings] = useState(initialSettings);

  const handleChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(settings);
  };

  return (
    <div className="space-y-6">
      {/* Date, Time, and Calendar Formatting */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
          <Calendar className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Date, Time, and Calendar</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => handleChange('dateFormat', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="MMM D, YYYY">MMM D, YYYY</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">Example: {
                settings.dateFormat === 'MM/DD/YYYY' ? '05/15/2023' :
                settings.dateFormat === 'DD/MM/YYYY' ? '15/05/2023' :
                settings.dateFormat === 'YYYY-MM-DD' ? '2023-05-15' :
                'May 15, 2023'
              }</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
              <select
                value={settings.timeFormat}
                onChange={(e) => handleChange('timeFormat', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="12h">12-hour (AM/PM)</option>
                <option value="24h">24-hour</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">Example: {
                settings.timeFormat === '12h' ? '3:45 PM' : '15:45'
              }</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                <option value="Europe/Paris">Central European Time (CET)</option>
                <option value="Asia/Tokyo">Japan Standard Time (JST)</option>
                <option value="Australia/Sydney">Australian Eastern Time (AET)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Currency and Number Formatting */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
          <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Currency and Numbers</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
                <option value="JPY">Japanese Yen (¥)</option>
                <option value="CAD">Canadian Dollar (C$)</option>
                <option value="AUD">Australian Dollar (A$)</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">Example: {
                settings.currency === 'USD' ? '$1,234.56' :
                settings.currency === 'EUR' ? '€1.234,56' :
                settings.currency === 'GBP' ? '£1,234.56' :
                settings.currency === 'JPY' ? '¥1,235' :
                settings.currency === 'CAD' ? 'C$1,234.56' :
                'A$1,234.56'
              }</p>
            </div>
          </div>
        </div>
      </div>

      {/* Measurement Units */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
          <Globe className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Measurement Units</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Unit System</label>
              <div className="flex space-x-4">
                <label className={cn(
                  "flex items-center p-3 border rounded-lg cursor-pointer",
                  settings.measurementUnit === 'imperial' ? "border-blue-500 bg-blue-50" : "border-gray-300"
                )}>
                  <input
                    type="radio"
                    name="measurementUnit"
                    value="imperial"
                    checked={settings.measurementUnit === 'imperial'}
                    onChange={() => handleChange('measurementUnit', 'imperial')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">Imperial</span>
                    <span className="block text-xs text-gray-500">Pounds, inches, Fahrenheit</span>
                  </div>
                </label>
                
                <label className={cn(
                  "flex items-center p-3 border rounded-lg cursor-pointer",
                  settings.measurementUnit === 'metric' ? "border-blue-500 bg-blue-50" : "border-gray-300"
                )}>
                  <input
                    type="radio"
                    name="measurementUnit"
                    value="metric"
                    checked={settings.measurementUnit === 'metric'}
                    onChange={() => handleChange('measurementUnit', 'metric')}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">Metric</span>
                    <span className="block text-xs text-gray-500">Kilograms, centimeters, Celsius</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
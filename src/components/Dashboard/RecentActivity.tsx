import React from 'react';
import { DailyEntry } from '../../types';
import { format } from 'date-fns';
import { Utensils } from 'lucide-react';

interface RecentActivityProps {
  entries: DailyEntry[];
}

export function RecentActivity({ entries }: RecentActivityProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No activity recorded today. Track your first meal!
      </div>
    );
  }
  
  // Sort entries by date, newest first
  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <div className="space-y-4">
      {sortedEntries.map(entry => (
        <div key={entry.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="p-2 bg-blue-100 rounded-md">
            <Utensils className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between">
              <p className="font-medium text-gray-900 truncate">{entry.description}</p>
              <p className="text-sm text-gray-500">{format(new Date(entry.date), 'h:mm a')}</p>
            </div>
            <div className="mt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Carbs: {entry.macronutrients.carbs}g
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Protein: {entry.macronutrients.proteins}g
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                Fats: {entry.macronutrients.fats}g
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
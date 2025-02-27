import React from 'react';
import { DailyEntry } from '../types';
import { format, isWithinLast24Hours } from '../utils/date';
import { Utensils } from 'lucide-react';
import { DeleteButton } from './DeleteButton';
import { deleteEntry, deleteAllEntries } from '../utils/storage/mutations';

interface RecentUploadsProps {
  entries: DailyEntry[];
  onSelect: (entry: DailyEntry) => void;
  onDelete: () => void;
}

export function RecentUploads({ entries, onSelect, onDelete }: RecentUploadsProps) {
  const recentFoodEntries = entries
    .filter(entry => entry.type === 'food' && isWithinLast24Hours(new Date(entry.date)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (recentFoodEntries.length === 0) {
    return null;
  }

  const handleDelete = async (id: string) => {
    deleteEntry(id);
    onDelete();
  };

  const handleDeleteAll = async () => {
    deleteAllEntries();
    onDelete();
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Uploads (Last 24 Hours)</h3>
        {recentFoodEntries.length > 1 && (
          <button
            onClick={handleDeleteAll}
            className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
          >
            Delete All
          </button>
        )}
      </div>
      <div className="space-y-4">
        {recentFoodEntries.map((entry) => (
          <div
            key={entry.id}
            className="group bg-white rounded-lg shadow-sm p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Utensils className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 cursor-pointer" onClick={() => onSelect(entry)}>
                <div className="flex justify-between items-start mb-3">
                  <p className="text-gray-600">{entry.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {format(new Date(entry.date), 'h:mm a')}
                    </span>
                    <DeleteButton onClick={() => handleDelete(entry.id)} small />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <MacroItem label="Carbs" value={entry.macronutrients.carbs} unit="g" />
                  <MacroItem label="Fats" value={entry.macronutrients.fats} unit="g" />
                  <MacroItem label="Proteins" value={entry.macronutrients.proteins} unit="g" />
                  <MacroItem label="Cholesterol" value={entry.macronutrients.cholesterol} unit="mg" />
                  <MacroItem label="Sodium" value={entry.macronutrients.sodium} unit="mg" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface MacroItemProps {
  label: string;
  value: number;
  unit: string;
}

function MacroItem({ label, value, unit }: MacroItemProps) {
  return (
    <div>
      <span className="text-gray-500">{label}:</span>{' '}
      <span className="font-medium">{value}{unit}</span>
    </div>
  );
}
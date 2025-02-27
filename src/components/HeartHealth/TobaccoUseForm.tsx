import React from 'react';
import { Cigarette } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TobaccoUseFormProps {
  tobacco: boolean;
  onChange: (value: boolean) => void;
}

export function TobaccoUseForm({ tobacco, onChange }: TobaccoUseFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label className={cn(
        "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
        !tobacco ? "bg-green-50 border-green-100" : "hover:bg-gray-50"
      )}>
        <input
          type="radio"
          checked={!tobacco}
          onChange={() => onChange(false)}
          className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
        />
        <div>
          <span className="font-medium text-gray-900">Non-smoker</span>
          <p className="text-sm text-gray-500 mt-1">No tobacco use</p>
        </div>
      </label>

      <label className={cn(
        "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
        tobacco ? "bg-red-50 border-red-100" : "hover:bg-gray-50"
      )}>
        <input
          type="radio"
          checked={tobacco}
          onChange={() => onChange(true)}
          className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
        />
        <div>
          <span className="font-medium text-gray-900">Smoker</span>
          <p className="text-sm text-gray-500 mt-1">Current tobacco use</p>
        </div>
      </label>
    </div>
  );
}
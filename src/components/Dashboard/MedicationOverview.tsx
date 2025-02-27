import React from 'react';
import { MedicationEntry } from '../../types/medication';
import { Pill, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MedicationOverviewProps {
  medications: MedicationEntry[];
}

export function MedicationOverview({ medications }: MedicationOverviewProps) {
  if (medications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No medications added yet.
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {medications.map(medication => (
        <div 
          key={medication.id}
          className={cn(
            "p-3 rounded-lg border",
            medication.heartHealthImpact.level === 'high' 
              ? "border-red-200 bg-red-50" 
              : medication.heartHealthImpact.level === 'medium'
                ? "border-yellow-200 bg-yellow-50"
                : "border-green-200 bg-green-50"
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-2 rounded-md",
              medication.heartHealthImpact.level === 'high' 
                ? "bg-red-100" 
                : medication.heartHealthImpact.level === 'medium'
                  ? "bg-yellow-100"
                  : "bg-green-100"
            )}>
              <Pill className={cn(
                "h-4 w-4",
                medication.heartHealthImpact.level === 'high' 
                  ? "text-red-600" 
                  : medication.heartHealthImpact.level === 'medium'
                    ? "text-yellow-600"
                    : "text-green-600"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{medication.name}</p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>{medication.frequency}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {medications.length > 0 && (
        <div className="pt-2">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all medications
          </a>
        </div>
      )}
    </div>
  );
}
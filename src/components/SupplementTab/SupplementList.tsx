import React from 'react';
import { Leaf, AlertTriangle, Heart, Clock, FileText, X } from 'lucide-react';
import { MedicationEntry } from '../../types/medication';
import { cn } from '../../utils/cn';

interface SupplementListProps {
  supplements: MedicationEntry[];
  onDelete: (id: string) => void;
  onShowInfo: (type: string) => void;
}

export function SupplementList({ supplements, onDelete, onShowInfo }: SupplementListProps) {
  // Filter supplements by supplement category
  const filteredSupplements = supplements.filter(supp => 
    supp.category?.toLowerCase() === 'supplement'
  );

  if (filteredSupplements.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No supplements added yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {filteredSupplements.map((supplement) => (
        <div 
          key={supplement.id}
          className={cn(
            "border rounded-lg overflow-hidden",
            supplement.heartHealthImpact.level === 'high' ? 'border-red-200' : 'border-gray-200'
          )}
        >
          <div className={cn(
            "p-4",
            supplement.heartHealthImpact.level === 'high' ? 'bg-red-50' : 'bg-green-50'
          )}>
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                supplement.heartHealthImpact.level === 'high' ? 'bg-red-100' : 'bg-green-100'
              )}>
                <Leaf className={cn(
                  "w-5 h-5",
                  supplement.heartHealthImpact.level === 'high' ? 'text-red-600' : 'text-green-600'
                )} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{supplement.name}</h4>
                    <p className="text-sm text-gray-600">{supplement.dosage}</p>
                  </div>
                  <button
                    onClick={() => onDelete(supplement.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{supplement.frequency}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>{supplement.purpose}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className={cn(
                  "w-4 h-4",
                  supplement.heartHealthImpact.level === 'high' ? 'text-red-500' : 'text-gray-400'
                )} />
                <span>{supplement.heartHealthImpact.level.charAt(0).toUpperCase() + supplement.heartHealthImpact.level.slice(1)} Impact</span>
              </div>
            </div>

            {supplement.heartHealthImpact.level !== 'low' && (
              <div className="mt-4">
                <button
                  onClick={() => onShowInfo(supplement.type)}
                  className={cn(
                    "flex items-center gap-2 text-sm px-4 py-2 rounded-md w-full",
                    supplement.heartHealthImpact.level === 'high'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  )}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>View heart health considerations</span>
                </button>
              </div>
            )}

            {supplement.heartHealthImpact.foodInteractions?.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium mb-2">Food Interactions:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {supplement.heartHealthImpact.foodInteractions.map((interaction, index) => (
                    <li key={index}>{interaction}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
import React from 'react';
import { Package, AlertTriangle, Heart, Clock, FileText, X } from 'lucide-react';
import { MedicationEntry } from '../../types/medication';
import { cn } from '../../utils/cn';

interface OTCListProps {
  medications: MedicationEntry[];
  onDelete: (id: string) => void;
  onShowInfo: (type: string) => void;
}

export function OTCList({ medications, onDelete, onShowInfo }: OTCListProps) {
  // Filter medications by OTC category
  const filteredMeds = medications.filter(med => 
    med.category?.toLowerCase() === 'otc'
  );

  if (filteredMeds.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No over-the-counter medications added yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {filteredMeds.map((med) => (
        <div 
          key={med.id}
          className={cn(
            "border rounded-lg overflow-hidden",
            med.heartHealthImpact.level === 'high' ? 'border-red-200' : 'border-gray-200'
          )}
        >
          <div className={cn(
            "p-4",
            med.heartHealthImpact.level === 'high' ? 'bg-red-50' : 'bg-gray-50'
          )}>
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                med.heartHealthImpact.level === 'high' ? 'bg-red-100' : 'bg-gray-100'
              )}>
                <Package className={cn(
                  "w-5 h-5",
                  med.heartHealthImpact.level === 'high' ? 'text-red-600' : 'text-gray-600'
                )} />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{med.name}</h4>
                    <p className="text-sm text-gray-600">{med.dosage}</p>
                  </div>
                  <button
                    onClick={() => onDelete(med.id)}
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
                <span>{med.frequency}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>{med.purpose}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className={cn(
                  "w-4 h-4",
                  med.heartHealthImpact.level === 'high' ? 'text-red-500' : 'text-gray-400'
                )} />
                <span>{med.heartHealthImpact.level.charAt(0).toUpperCase() + med.heartHealthImpact.level.slice(1)} Impact</span>
              </div>
            </div>

            {med.heartHealthImpact.level !== 'low' && (
              <div className="mt-4">
                <button
                  onClick={() => onShowInfo(med.type)}
                  className={cn(
                    "flex items-center gap-2 text-sm px-4 py-2 rounded-md w-full",
                    med.heartHealthImpact.level === 'high'
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  )}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>View heart health considerations</span>
                </button>
              </div>
            )}

            {med.heartHealthImpact.foodInteractions?.length > 0 && (
              <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium mb-2">Food Interactions:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {med.heartHealthImpact.foodInteractions.map((interaction, index) => (
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
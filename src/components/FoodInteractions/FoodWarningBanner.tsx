import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { FoodInteractionWarning } from '../../types/foodInteractions';

interface FoodWarningBannerProps {
  warning: FoodInteractionWarning;
}

export function FoodWarningBanner({ warning }: FoodWarningBannerProps) {
  const severityStyles = {
    high: 'bg-red-50 border-red-200 text-red-700',
    medium: 'bg-orange-50 border-orange-200 text-orange-700',
    low: 'bg-yellow-50 border-yellow-200 text-yellow-700'
  };

  return (
    <div className={cn(
      'rounded-lg border p-4',
      severityStyles[warning.severity]
    )}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <div className="font-medium">
            Interaction between {warning.foodName} and {warning.medicationName}
          </div>
          <p className="text-sm">{warning.effect}</p>
          <p className="text-sm font-medium">{warning.recommendation}</p>
        </div>
      </div>
    </div>
  );
}
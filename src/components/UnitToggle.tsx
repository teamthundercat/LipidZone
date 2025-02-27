import React from 'react';
import { UnitSystem } from '../types';

interface UnitToggleProps {
  value: UnitSystem;
  onChange: (system: UnitSystem) => void;
}

export function UnitToggle({ value, onChange }: UnitToggleProps) {
  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        onClick={() => onChange('metric')}
        className={`
          px-3 py-1 text-sm font-medium rounded-l-md border
          ${value === 'metric'
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }
        `}
      >
        Metric
      </button>
      <button
        onClick={() => onChange('standard')}
        className={`
          px-3 py-1 text-sm font-medium rounded-r-md border-t border-r border-b -ml-px
          ${value === 'standard'
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }
        `}
      >
        US
      </button>
    </div>
  );
}
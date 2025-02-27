import React from 'react';
import { Info } from 'lucide-react';

interface InfoTooltipProps {
  content: string | string[];
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  const tooltipContent = Array.isArray(content) ? content : [content];
  
  return (
    <div className="group relative">
      <Info className="w-4 h-4 text-gray-400 cursor-help" />
      <div className="invisible group-hover:visible absolute left-0 top-6 w-72 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10">
        {tooltipContent.map((text, index) => (
          <p key={index} className={index > 0 ? 'mt-1' : ''}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
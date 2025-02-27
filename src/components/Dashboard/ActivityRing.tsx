import React from 'react';

interface ActivityRingProps {
  percentages: Array<{
    value: number;
    color: string;
  }>;
  size?: number;
  strokeWidth?: number;
}

export function ActivityRing({ 
  percentages, 
  size = 160, 
  strokeWidth = 12 
}: ActivityRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute">
        {/* Background circles */}
        {percentages.map((_, index) => {
          const offset = index * (strokeWidth + 2);
          const currentRadius = radius - offset;
          
          return (
            <circle
              key={`bg-${index}`}
              cx={center}
              cy={center}
              r={currentRadius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth={strokeWidth}
            />
          );
        })}
      </svg>
      
      {/* Progress circles */}
      <svg width={size} height={size} className="transform -rotate-90">
        {percentages.map((item, index) => {
          const offset = index * (strokeWidth + 2);
          const currentRadius = radius - offset;
          const currentCircumference = 2 * Math.PI * currentRadius;
          const strokeDashoffset = currentCircumference - (item.value / 100) * currentCircumference;
          
          return (
            <circle
              key={`progress-${index}`}
              cx={center}
              cy={center}
              r={currentRadius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={currentCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          );
        })}
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">
          {Math.round(
            percentages.reduce((sum, item) => sum + item.value, 0) / percentages.length
          )}%
        </span>
        <span className="text-xs text-gray-500">Daily Goal</span>
      </div>
    </div>
  );
}
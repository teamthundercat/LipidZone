import React from 'react';
import { Activity, Utensils, Pill, Scale, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string;
  unit?: string;
  description: string;
  trend: 'positive' | 'negative' | 'neutral';
  icon: 'calories' | 'weight' | 'medication' | 'food';
}

export function StatCard({ title, value, unit, description, trend, icon }: StatCardProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'calories':
        return <Activity className="h-5 w-5 text-blue-500" />;
      case 'weight':
        return <Scale className="h-5 w-5 text-purple-500" />;
      case 'medication':
        return <Pill className="h-5 w-5 text-red-500" />;
      case 'food':
        return <Utensils className="h-5 w-5 text-green-500" />;
    }
  };
  
  const renderTrend = () => {
    switch (trend) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-100 rounded-md">
          {renderIcon()}
        </div>
        <div className="flex items-center">
          {renderTrend()}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">
          {value}
          {unit && <span className="text-sm font-normal text-gray-500 ml-1">{unit}</span>}
        </p>
        <p className={cn(
          "text-sm",
          trend === 'positive' ? "text-green-500" : 
          trend === 'negative' ? "text-red-500" : "text-gray-500"
        )}>
          {description}
        </p>
      </div>
    </div>
  );
}
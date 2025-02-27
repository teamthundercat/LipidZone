import React, { useState, useEffect } from 'react';
import { DailyTotals } from './DailyTotals';
import { HistoryView } from './HistoryView';
import { TrendsView } from './TrendsView';
import { UserProfile } from '../../types';
import { calculateDailyRecommended } from '../../utils/nutrition';
import { Calendar, History, TrendingUp } from 'lucide-react';

interface ProgressTabProps {
  profile: UserProfile;
  initialSection?: 'history' | 'totals' | 'trends';
}

export function ProgressTab({ profile, initialSection = 'history' }: ProgressTabProps) {
  const [activeSection, setActiveSection] = useState<'history' | 'totals' | 'trends'>(initialSection);
  const recommended = calculateDailyRecommended(profile);
  
  // Update active section when initialSection prop changes
  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const getSectionIcon = () => {
    switch (activeSection) {
      case 'history':
        return <History className="w-5 h-5 text-blue-600 mr-2" />;
      case 'totals':
        return <Calendar className="w-5 h-5 text-blue-600 mr-2" />;
      case 'trends':
        return <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'history':
        return 'Nutrition History';
      case 'totals':
        return 'Daily Totals';
      case 'trends':
        return 'Nutrition Trends';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'totals':
        return <DailyTotals recommended={recommended} />;
      case 'history':
        return <HistoryView />;
      case 'trends':
        return <TrendsView recommended={recommended} />;
      default:
        return <HistoryView />;
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        {getSectionIcon()}
        {getSectionTitle()}
      </h1>
      {renderContent()}
    </div>
  );
}
import React from 'react';
import { DailyProgressCalendar } from '../DailyProgressCalendar';
import { DailyRecommended } from '../../types';

interface TrendsViewProps {
  recommended: DailyRecommended;
}

export function TrendsView({ recommended }: TrendsViewProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-6">Nutrition Trends</h2>
      <DailyProgressCalendar recommended={recommended} />
    </div>
  );
}
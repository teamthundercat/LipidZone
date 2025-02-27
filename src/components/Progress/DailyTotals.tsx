import React, { useState } from 'react';
import { format } from 'date-fns';
import { DailyTotalsVisual } from '../DailyTotalsVisual';
import { DailyRecommended } from '../../types';
import { getDailyTotals } from '../../utils/storage/queries';

interface DailyTotalsProps {
  recommended: DailyRecommended;
}

export function DailyTotals({ recommended }: DailyTotalsProps) {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const totals = getDailyTotals(selectedDate);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <DailyTotalsVisual totals={totals} recommended={recommended} />
    </div>
  );
}
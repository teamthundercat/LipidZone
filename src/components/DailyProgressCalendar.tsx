import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DailyRecommended } from '../types';
import { getDailyTotals } from '../utils/storage';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameMonth } from 'date-fns';

interface DailyProgressCalendarProps {
  recommended: DailyRecommended;
}

export function DailyProgressCalendar({ recommended }: DailyProgressCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDayStatus = (date: Date) => {
    if (!isSameMonth(date, currentDate)) return 'inactive';
    
    const totals = getDailyTotals(format(date, 'yyyy-MM-dd'));
    const hasEntries = Object.values(totals).some(value => value > 0);
    
    if (!hasEntries) return 'empty';

    const isOverLimit = 
      totals.carbs > recommended.carbs ||
      totals.proteins > recommended.proteins ||
      totals.fats > recommended.fats ||
      totals.cholesterol > recommended.cholesterol ||
      totals.sodium > recommended.sodium;

    return isOverLimit ? 'exceeded' : 'tracked';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Monthly Overview</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {days.map(day => {
          const status = getDayStatus(day);
          return (
            <div
              key={day.toString()}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-sm
                ${status === 'inactive' ? 'text-gray-300' : ''}
                ${status === 'empty' ? 'text-gray-600' : ''}
                ${status === 'tracked' ? 'bg-blue-100 text-blue-700 font-medium' : ''}
                ${status === 'exceeded' ? 'bg-red-100 text-red-700 font-medium' : ''}
              `}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100" />
          <span>Within Limits</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100" />
          <span>Exceeded Limits</span>
        </div>
      </div>
    </div>
  );
}
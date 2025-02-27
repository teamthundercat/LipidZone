import React, { useState } from 'react';
import { format } from 'date-fns';
import { getDailyEntries } from '../../utils/storage/queries';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import { cn } from '../../utils/cn';

export function HistoryView() {
  const [sortField, setSortField] = useState<'date' | 'cholesterol' | 'carbs' | 'fats' | 'proteins' | 'sodium'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Get all entries and group by date
  const allEntries = getDailyEntries();
  
  // Create daily totals for table display
  const dailyTotals = allEntries.reduce((acc, entry) => {
    const date = entry.date.split('T')[0];
    
    if (!acc[date]) {
      acc[date] = {
        date,
        cholesterol: 0,
        carbs: 0,
        fats: 0,
        proteins: 0,
        sodium: 0,
        entries: 0
      };
    }
    
    acc[date].cholesterol += entry.macronutrients.cholesterol;
    acc[date].carbs += entry.macronutrients.carbs;
    acc[date].fats += entry.macronutrients.fats;
    acc[date].proteins += entry.macronutrients.proteins;
    acc[date].sodium += entry.macronutrients.sodium;
    acc[date].entries += 1;
    
    return acc;
  }, {} as Record<string, {
    date: string;
    cholesterol: number;
    carbs: number;
    fats: number;
    proteins: number;
    sodium: number;
    entries: number;
  }>);
  
  // Convert to array and sort
  const sortedTotals = Object.values(dailyTotals).sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  const handleSort = (field: 'date' | 'cholesterol' | 'carbs' | 'fats' | 'proteins' | 'sodium') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (field !== sortField) return null;
    
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1">
                  <span>Date</span>
                  <SortIcon field="date" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('cholesterol')}
              >
                <div className="flex items-center gap-1">
                  <span>Cholesterol</span>
                  <SortIcon field="cholesterol" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('carbs')}
              >
                <div className="flex items-center gap-1">
                  <span>Carbs</span>
                  <SortIcon field="carbs" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('fats')}
              >
                <div className="flex items-center gap-1">
                  <span>Fats</span>
                  <SortIcon field="fats" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('proteins')}
              >
                <div className="flex items-center gap-1">
                  <span>Proteins</span>
                  <SortIcon field="proteins" />
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('sodium')}
              >
                <div className="flex items-center gap-1">
                  <span>Sodium</span>
                  <SortIcon field="sodium" />
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entries
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTotals.map((day) => (
              <tr key={day.date} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {format(new Date(day.date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {day.cholesterol} mg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {day.carbs} g
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {day.fats} g
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {day.proteins} g
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {day.sodium} mg
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {day.entries}
                </td>
              </tr>
            ))}
            
            {sortedTotals.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No history data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
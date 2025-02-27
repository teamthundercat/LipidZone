import React from 'react';
import { Utensils, PillIcon, User, BarChart3 } from 'lucide-react';
import { cn } from '../utils/cn';

type TabType = 'food' | 'medication' | 'profile' | 'progress';

interface TabSelectorProps {
  selected: TabType;
  onSelect: (type: TabType) => void;
}

const TABS = [
  { id: 'food', label: 'Food', icon: Utensils, color: 'text-green-500' },
  { id: 'medication', label: 'Medication', icon: PillIcon, color: 'text-blue-500' },
  { id: 'progress', label: 'Progress', icon: BarChart3, color: 'text-purple-500' },
  { id: 'profile', label: 'Profile', icon: User, color: 'text-orange-500' }
] as const;

export function TabSelector({ selected, onSelect }: TabSelectorProps) {
  return (
    <>
      {/* Desktop Menu - Single Row */}
      <div className="hidden md:flex gap-4 bg-white p-2 rounded-lg shadow-sm">
        {TABS.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => onSelect(id as TabType)}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors",
              selected === id
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Icon className={cn("w-5 h-5", selected === id ? "text-white" : color)} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Menu - Two Rows */}
      <div className="md:hidden grid grid-cols-2 gap-2 bg-white p-2 rounded-lg shadow-sm">
        {TABS.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => onSelect(id as TabType)}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-3 rounded-md transition-colors",
              selected === id
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            <Icon className={cn("w-5 h-5", selected === id ? "text-white" : color)} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
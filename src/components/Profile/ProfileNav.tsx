import React from 'react';
import { User, Activity, Heart, Key, UserCircle, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ProfileSection = 'account' | 'personal' | 'health' | 'heart' | 'api';

interface ProfileNavProps {
  active: ProfileSection;
  onSelect: (section: ProfileSection) => void;
}

export function ProfileNav({ active, onSelect }: ProfileNavProps) {
  const sections = [
    { id: 'account' as const, label: 'Account Details', icon: UserCircle },
    { id: 'personal' as const, label: 'Personal Information', icon: User },
    { id: 'health' as const, label: 'Health Metrics', icon: Activity },
    { id: 'heart' as const, label: 'Heart Health', icon: Heart },
    { id: 'api' as const, label: 'API Settings', icon: Key }
  ];

  return (
    <nav className="bg-white rounded-lg shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row">
        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
              "border-b sm:border-b-0 sm:border-r last:border-0",
              active === id
                ? "bg-blue-50 text-blue-600 border-blue-100"
                : "text-gray-600 hover:bg-gray-50 border-gray-100"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
import React from 'react';
import { Key, Globe, Shield, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

export type SettingsSection = 'api' | 'localization' | 'license' | 'upgrade';

interface SettingsNavProps {
  active: SettingsSection;
  onSelect: (section: SettingsSection) => void;
}

export function SettingsNav({ active, onSelect }: SettingsNavProps) {
  const sections = [
    { id: 'api' as const, label: 'API', icon: Key },
    { id: 'localization' as const, label: 'Localization', icon: Globe },
    { id: 'license' as const, label: 'License Details', icon: Shield },
    { id: 'upgrade' as const, label: 'Upgrade Options', icon: Zap }
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
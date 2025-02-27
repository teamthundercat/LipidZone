import React, { useState, useEffect } from 'react';
import { ApiSettings } from '../ApiSettings';
import { LocalizationSettings } from './LocalizationSettings';
import { LicenseDetails } from './LicenseDetails';
import { UpgradeOptions } from './UpgradeOptions';
import { Key, Globe, Shield, Zap } from 'lucide-react';

interface SettingsTabProps {
  apiKey?: string;
  onApiKeyUpdate: (key: string) => void;
  initialSection?: 'api' | 'localization' | 'license' | 'upgrade';
}

export function SettingsTab({ apiKey, onApiKeyUpdate, initialSection = 'api' }: SettingsTabProps) {
  const [activeSection, setActiveSection] = useState<'api' | 'localization' | 'license' | 'upgrade'>(initialSection);

  // Update active section when initialSection prop changes
  useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  const getSectionIcon = () => {
    switch (activeSection) {
      case 'api':
        return <Key className="w-5 h-5 text-blue-600 mr-2" />;
      case 'localization':
        return <Globe className="w-5 h-5 text-blue-600 mr-2" />;
      case 'license':
        return <Shield className="w-5 h-5 text-blue-600 mr-2" />;
      case 'upgrade':
        return <Zap className="w-5 h-5 text-blue-600 mr-2" />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'api':
        return 'API Settings';
      case 'localization':
        return 'Localization Settings';
      case 'license':
        return 'License Details';
      case 'upgrade':
        return 'Upgrade Options';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'api':
        return (
          <ApiSettings 
            apiKey={apiKey}
            onUpdate={onApiKeyUpdate}
          />
        );
      case 'localization':
        return (
          <LocalizationSettings 
            onSave={() => {}}
          />
        );
      case 'license':
        return (
          <LicenseDetails />
        );
      case 'upgrade':
        return (
          <UpgradeOptions />
        );
      default:
        return null;
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
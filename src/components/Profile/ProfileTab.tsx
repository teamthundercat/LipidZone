import React, { useState, useEffect } from 'react';
import { ProfileNav, type ProfileSection } from './ProfileNav';
import { PersonalInfo } from './PersonalInfo';
import { HealthMetrics } from '../HealthMetrics';
import { HeartHealthForm } from '../HeartHealth/HeartHealthForm';
import { ApiSettings } from '../ApiSettings';
import { AccountDetails } from './AccountDetails';
import { UserProfile } from '../../types';
import { saveProfile } from '../../utils/storage/profile';
import { getAccount } from '../../utils/storage/account';
import { User, Activity, Heart, Key, UserCircle } from 'lucide-react';

interface ProfileTabProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  apiKey?: string;
  onApiKeyUpdate: (key: string) => void;
  initialSection?: ProfileSection;
}

export function ProfileTab({ profile, onUpdate, apiKey, onApiKeyUpdate, initialSection = 'account' }: ProfileTabProps) {
  const [activeSection, setActiveSection] = useState<ProfileSection>(initialSection || 'account');
  const accountData = getAccount();

  // Save profile changes to localStorage
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const getSectionIcon = () => {
    switch (activeSection) {
      case 'account':
        return <UserCircle className="w-5 h-5 text-blue-600 mr-2" />;
      case 'personal':
        return <User className="w-5 h-5 text-blue-600 mr-2" />;
      case 'health':
        return <Activity className="w-5 h-5 text-blue-600 mr-2" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-blue-600 mr-2" />;
      case 'api':
        return <Key className="w-5 h-5 text-blue-600 mr-2" />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'account':
        return 'Account Details';
      case 'personal':
        return 'Personal Information';
      case 'health':
        return 'Health Metrics';
      case 'heart':
        return 'Heart Health';
      case 'api':
        return 'API Settings';
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        {getSectionIcon()}
        {getSectionTitle()}
      </h1>
      
      <ProfileNav active={activeSection} onSelect={setActiveSection} />
      
      {activeSection === 'account' && (
        <AccountDetails 
          data={accountData}
          onUpdate={() => {}}
          onPasswordChange={() => {}}
          onLicenseUpdate={() => {}}
        />
      )}
      
      {activeSection === 'personal' && (
        <PersonalInfo profile={profile} onUpdate={onUpdate} />
      )}
      
      {activeSection === 'health' && (
        <HealthMetrics profile={profile} />
      )}
      
      {activeSection === 'heart' && (
        <HeartHealthForm 
          metrics={profile.heartHealth}
          onUpdate={(heartHealth) => onUpdate({ ...profile, heartHealth })}
        />
      )}
      
      {activeSection === 'api' && (
        <ApiSettings apiKey={apiKey} onUpdate={onApiKeyUpdate} />
      )}
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { TabSelector } from './components/TabSelector';
import { UploadSection } from './components/UploadSection';
import { AnalysisSection } from './components/AnalysisSection';
import { RecentUploads } from './components/RecentUploads';
import { ProfileTab } from './components/Profile';
import { MedicationTab } from './components/MedicationTab';
import { ProgressTab } from './components/Progress';
import { useImageAnalysis } from './hooks/useImageAnalysis';
import { calculateDailyRecommended } from './utils/nutrition';
import { saveProfile, getProfile } from './utils/storage/profile';
import { setupTestMedications } from './utils/testing/setupTestData';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard';
import { SettingsTab } from './components/Settings';
import type { UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'food' | 'medication' | 'otc' | 'supplement' | 'history' | 'profile' | 'settings'>('dashboard');
  const [activeSubTab, setActiveSubTab] = useState<string>('today');
  const [profile, setProfile] = useState<UserProfile>(getProfile());
  const [apiKey, setApiKey] = useState<string>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const {
    foodImage,
    medicationImage,
    foodAnalysis,
    medicationAnalysis,
    entries,
    handleImageSelect,
    handleEntrySelect,
    refreshEntries
  } = useImageAnalysis();

  // Set up test medications
  useEffect(() => {
    setupTestMedications();
  }, []);

  // Update profile in localStorage whenever it changes
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  // Check if we're on mobile and collapse sidebar by default
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleTabSelect = (tab: 'dashboard' | 'food' | 'medication' | 'otc' | 'supplement' | 'history' | 'profile' | 'settings', subTab?: string) => {
    setActiveTab(tab);
    if (subTab) {
      setActiveSubTab(subTab);
    } else {
      // Set default subtab for each main tab
      switch (tab) {
        case 'dashboard':
          setActiveSubTab('today');
          break;
        case 'food':
          setActiveSubTab('upload');
          break;
        case 'medication':
          setActiveSubTab('select');
          break;
        case 'otc':
          setActiveSubTab('select');
          break;
        case 'supplement':
          setActiveSubTab('select');
          break;
        case 'history':
          setActiveSubTab('history');
          break;
        case 'profile':
          setActiveSubTab('account');
          break;
        case 'settings':
          setActiveSubTab('api');
          break;
      }
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            profile={profile} 
            entries={entries}
            recommended={calculateDailyRecommended(profile)}
            activeView={activeSubTab}
          />
        );
      case 'profile':
        return (
          <ProfileTab 
            profile={profile} 
            onUpdate={setProfile}
            apiKey={apiKey}
            onApiKeyUpdate={setApiKey}
            initialSection={activeSubTab}
          />
        );
      case 'medication':
        return (
          <MedicationTab 
            initialCategory="prescription"
            initialTab={activeSubTab}
          />
        );
      case 'otc':
        return (
          <MedicationTab 
            initialCategory="otc"
            initialTab={activeSubTab}
          />
        );
      case 'supplement':
        return (
          <MedicationTab 
            initialCategory="supplement"
            initialTab={activeSubTab}
          />
        );
      case 'history':
        return (
          <ProgressTab 
            profile={profile} 
            initialSection="history"
          />
        );
      case 'settings':
        return (
          <SettingsTab 
            apiKey={apiKey}
            onApiKeyUpdate={setApiKey}
            initialSection={activeSubTab}
          />
        );
      case 'food':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UploadSection
                type="food"
                image={foodImage}
                onImageSelect={(file) => handleImageSelect(file, 'food')}
              />
              <AnalysisSection
                type="food"
                analysis={foodAnalysis}
                recommended={calculateDailyRecommended(profile)}
                profile={profile}
              />
            </div>
            <RecentUploads 
              entries={entries} 
              onSelect={handleEntrySelect}
              onDelete={refreshEntries}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        onSelect={handleTabSelect} 
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header profile={profile} />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { SupplementUploader } from './SupplementUploader';
import { SupplementList } from './SupplementList';
import { Notification } from '../ui/Notification';
import { useSupplementAnalysis } from '../../hooks/useSupplementAnalysis';
import { getSupplements } from '../../utils/storage/supplement';
import { setupTestSupplements } from '../../utils/testing/setupTestData';
import type { MedicationForm } from '../../types/medication';
import { Leaf, ClipboardList, PlusCircle, List, Camera, FileText } from 'lucide-react';
import { ManualEntryForm } from './ManualEntryForm';

interface SupplementTabProps {
  initialTab?: string;
}

export function SupplementTab({ initialTab = 'mysupplements' }: SupplementTabProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [supplements, setSupplements] = useState(getSupplements());
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const { isAnalyzing, error, analyzeImage, analyzeSupplementForm, removeSupplement } = useSupplementAnalysis();

  useEffect(() => {
    setupTestSupplements();
    setSupplements(getSupplements());
  }, []);

  // Update active tab when initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleImageSelect = async (file: File) => {
    const result = await analyzeImage(file);
    if (result) {
      setSupplements(getSupplements());
      setNotification(`${result.name} has been added to your supplements`);
    }
  };

  const handleSupplementSelect = async (form: MedicationForm) => {
    try {
      const result = await analyzeSupplementForm(form);
      if (result) {
        setSupplements(getSupplements());
        setNotification(`${result.name} has been added to your supplements`);
      }
    } catch (error) {
      setNotification('Failed to add supplement. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    const supplement = supplements.find(supp => supp.id === id);
    if (supplement) {
      removeSupplement(id);
      setSupplements(getSupplements());
      setNotification(`${supplement.name} has been removed from your supplements`);
    }
  };

  const getSectionIcon = () => {
    switch (activeTab) {
      case 'mysupplements':
        return <ClipboardList className="w-5 h-5 text-blue-600 mr-2" />;
      case 'addnew':
        return <PlusCircle className="w-5 h-5 text-blue-600 mr-2" />;
      case 'select':
        return <List className="w-5 h-5 text-blue-600 mr-2" />;
      case 'photo':
        return <Camera className="w-5 h-5 text-blue-600 mr-2" />;
      case 'label':
        return <FileText className="w-5 h-5 text-blue-600 mr-2" />;
      default:
        return <Leaf className="w-5 h-5 text-blue-600 mr-2" />;
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'mysupplements':
        return 'My Supplements';
      case 'addnew':
        return 'Add New Supplement';
      case 'select':
        return 'Select Supplement';
      case 'photo':
        return 'Take Photo of Supplement';
      case 'label':
        return 'Upload Supplement Label';
      default:
        return 'Dietary Supplements';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'mysupplements':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SupplementList
              supplements={supplements}
              onDelete={handleDelete}
              onShowInfo={(type) => setSelectedType(type)}
            />
          </div>
        );
      case 'addnew':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ManualEntryForm onSubmit={handleSupplementSelect} />
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Your Supplements</h4>
              <SupplementList
                supplements={supplements}
                onDelete={handleDelete}
                onShowInfo={(type) => setSelectedType(type)}
              />
            </div>
          </div>
        );
      case 'select':
      case 'photo':
      case 'label':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <SupplementUploader 
              onImageSelect={handleImageSelect}
              onSupplementSelect={handleSupplementSelect}
              initialTab={activeTab as 'select' | 'photo' | 'label'}
            />
          </div>
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
      
      <div className="space-y-6">
        {renderContent()}

        {/* Status Messages */}
        {isAnalyzing && (
          <div className="bg-blue-50 text-blue-700 p-4 rounded-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
            <span>Analyzing supplement...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        )}

        {notification && (
          <Notification
            message={notification}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
}
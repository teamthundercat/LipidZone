import React, { useState, useEffect } from 'react';
import { OTCUploader } from './OTCUploader';
import { OTCList } from './OTCList';
import { Notification } from '../ui/Notification';
import { useOTCAnalysis } from '../../hooks/useOTCAnalysis';
import { getOTCMedications } from '../../utils/storage/otcMedication';
import { setupTestOTCMedications } from '../../utils/testing/setupTestData';
import type { MedicationForm } from '../../types/medication';
import { Package, ClipboardList, PlusCircle, List, Camera, FileText } from 'lucide-react';
import { ManualEntryForm } from './ManualEntryForm';

interface OTCTabProps {
  initialTab?: string;
}

export function OTCTab({ initialTab = 'myotc' }: OTCTabProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [medications, setMedications] = useState(getOTCMedications());
  const [selectedMedType, setSelectedMedType] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const { isAnalyzing, error, analyzeImage, analyzeOTCForm, removeOTCMedication } = useOTCAnalysis();

  useEffect(() => {
    setupTestOTCMedications();
    setMedications(getOTCMedications());
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
      setMedications(getOTCMedications());
      setNotification(`${result.name} has been added to your OTC medications`);
    }
  };

  const handleMedicationSelect = async (form: MedicationForm) => {
    try {
      const result = await analyzeOTCForm(form);
      if (result) {
        setMedications(getOTCMedications());
        setNotification(`${result.name} has been added to your OTC medications`);
      }
    } catch (error) {
      setNotification('Failed to add OTC medication. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    const medication = medications.find(med => med.id === id);
    if (medication) {
      removeOTCMedication(id);
      setMedications(getOTCMedications());
      setNotification(`${medication.name} has been removed from your OTC medications`);
    }
  };

  const getSectionIcon = () => {
    switch (activeTab) {
      case 'myotc':
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
        return <Package className="w-5 h-5 text-blue-600 mr-2" />;
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'myotc':
        return 'My OTC Medications';
      case 'addnew':
        return 'Add New OTC Medication';
      case 'select':
        return 'Select OTC Medication';
      case 'photo':
        return 'Take Photo of OTC Medication';
      case 'label':
        return 'Upload OTC Medication Label';
      default:
        return 'Over-the-Counter Medications';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'myotc':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <OTCList
              medications={medications}
              onDelete={handleDelete}
              onShowInfo={(type) => setSelectedMedType(type)}
            />
          </div>
        );
      case 'addnew':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ManualEntryForm onSubmit={handleMedicationSelect} />
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Your OTC Medications</h4>
              <OTCList
                medications={medications}
                onDelete={handleDelete}
                onShowInfo={(type) => setSelectedMedType(type)}
              />
            </div>
          </div>
        );
      case 'select':
      case 'photo':
      case 'label':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <OTCUploader 
              onImageSelect={handleImageSelect}
              onMedicationSelect={handleMedicationSelect}
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
            <span>Analyzing OTC medication...</span>
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
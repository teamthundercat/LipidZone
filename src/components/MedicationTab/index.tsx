import React, { useState, useEffect } from 'react';
import { MedicationUploader } from './MedicationUploader';
import { MedicationList } from './MedicationList';
import { Notification } from '../ui/Notification';
import { useMedicationAnalysis } from '../../hooks/useMedicationAnalysis';
import { getMedications } from '../../utils/storage/medication';
import { setupTestMedications } from '../../utils/testing/setupTestData';
import type { MedicationForm } from '../../types/medication';
import { Pill, Package, Leaf, ClipboardList, PlusCircle, List, Camera, FileText } from 'lucide-react';
import { ManualEntryForm } from './ManualEntryForm';

interface MedicationTabProps {
  initialCategory?: 'prescription' | 'otc' | 'supplement';
  initialTab?: string;
}

export function MedicationTab({ initialCategory = 'prescription', initialTab = 'select' }: MedicationTabProps) {
  const [activeSection, setActiveSection] = useState<'prescription' | 'otc' | 'supplement'>(initialCategory);
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [medications, setMedications] = useState(getMedications());
  const [selectedMedType, setSelectedMedType] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const { isAnalyzing, error, analyzeImage, analyzeMedicationForm, removeMedication } = useMedicationAnalysis();

  useEffect(() => {
    setupTestMedications();
    setMedications(getMedications());
  }, []);

  // Update active section when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setActiveSection(initialCategory);
    }
  }, [initialCategory]);

  // Update active tab when initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleImageSelect = async (file: File) => {
    const result = await analyzeImage(file);
    if (result) {
      setMedications(getMedications());
      setNotification(`${result.name} has been added to your medications`);
    }
  };

  const handleMedicationSelect = async (form: MedicationForm) => {
    try {
      const result = await analyzeMedicationForm(form);
      if (result) {
        setMedications(getMedications());
        setNotification(`${result.name} has been added to your medications`);
      }
    } catch (error) {
      setNotification('Failed to add medication. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    const medication = medications.find(med => med.id === id);
    if (medication) {
      removeMedication(id);
      setMedications(getMedications());
      setNotification(`${medication.name} has been removed from your medications`);
    }
  };

  const getSectionIcon = () => {
    switch (activeTab) {
      case 'myprescriptions':
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
        return <Pill className="w-5 h-5 text-blue-600 mr-2" />;
    }
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'myprescriptions':
        return 'My Prescriptions';
      case 'addnew':
        return 'Add New Prescription';
      case 'select':
        return 'Select Medication';
      case 'photo':
        return 'Take Photo of Medication';
      case 'label':
        return 'Upload Medication Label';
      default:
        return 'Prescription Medications';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'myprescriptions':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <MedicationList
              medications={medications}
              onDelete={handleDelete}
              onShowInfo={(type) => setSelectedMedType(type)}
              category={activeSection}
            />
          </div>
        );
      case 'addnew':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ManualEntryForm onSubmit={handleMedicationSelect} />
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Your Prescriptions</h4>
              <MedicationList
                medications={medications}
                onDelete={handleDelete}
                onShowInfo={(type) => setSelectedMedType(type)}
                category={activeSection}
              />
            </div>
          </div>
        );
      case 'select':
      case 'photo':
      case 'label':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <MedicationUploader 
              onImageSelect={handleImageSelect}
              onMedicationSelect={handleMedicationSelect}
              category={activeSection}
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
            <span>Analyzing medication...</span>
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
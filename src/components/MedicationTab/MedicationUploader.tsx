import React, { useState, useEffect } from 'react';
import { Camera, FileText, List } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';
import { MedicationSelector } from './MedicationSelector';
import { PhotoGuidelines } from './PhotoGuidelines';
import type { MedicationForm } from '../../types/medication';
import { cn } from '../../utils/cn';

interface MedicationUploaderProps {
  onImageSelect: (file: File) => void;
  onMedicationSelect: (data: MedicationForm) => void;
  category: 'prescription' | 'otc' | 'supplement';
  initialTab?: 'select' | 'photo' | 'label';
}

type InputTab = 'select' | 'photo' | 'label';

export function MedicationUploader({ 
  onImageSelect, 
  onMedicationSelect,
  category,
  initialTab = 'select'
}: MedicationUploaderProps) {
  const [activeTab, setActiveTab] = useState<InputTab>(initialTab);

  // Update active tab when initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'select':
        return (
          <MedicationSelector 
            onSelect={onMedicationSelect} 
            category={category}
          />
        );

      case 'photo':
      case 'label':
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-2 mb-4">
              {activeTab === 'photo' ? (
                <Camera className="w-5 h-5 text-blue-500 mt-1" />
              ) : (
                <FileText className="w-5 h-5 text-blue-500 mt-1" />
              )}
              <div>
                <h4 className="font-medium">
                  {activeTab === 'photo' ? 'Take a Photo' : 'Upload Label'}
                </h4>
                <p className="text-sm text-gray-600">
                  {activeTab === 'photo' 
                    ? `Capture your ${category === 'supplement' ? 'supplement container' : 'medication bottle'}`
                    : `Share a clear image of the ${category === 'supplement' ? 'supplement' : 'medication'} label`
                  }
                </p>
              </div>
            </div>
            <PhotoGuidelines />
            <ImageUploader onImageSelect={onImageSelect} type="medication" />
          </div>
        );
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}
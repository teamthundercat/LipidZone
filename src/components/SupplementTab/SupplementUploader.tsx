import React, { useState, useEffect } from 'react';
import { Camera, FileText, List } from 'lucide-react';
import { ImageUploader } from '../ImageUploader';
import { SupplementSelector } from './SupplementSelector';
import { PhotoGuidelines } from './PhotoGuidelines';
import type { MedicationForm } from '../../types/medication';
import { cn } from '../../utils/cn';

interface SupplementUploaderProps {
  onImageSelect: (file: File) => void;
  onSupplementSelect: (data: MedicationForm) => void;
  initialTab?: 'select' | 'photo' | 'label';
}

type InputTab = 'select' | 'photo' | 'label';

export function SupplementUploader({ 
  onImageSelect, 
  onSupplementSelect,
  initialTab = 'select'
}: SupplementUploaderProps) {
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
          <SupplementSelector 
            onSelect={onSupplementSelect}
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
                    ? 'Capture your supplement container'
                    : 'Share a clear image of the supplement label'
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
import React from 'react';
import { ImageUploader } from './ImageUploader';
import { UploadGuidelines } from './UploadGuidelines';
import { UploadType } from '../types';

interface UploadSectionProps {
  type: UploadType;
  image: File | null;
  onImageSelect: (file: File) => void;
}

export function UploadSection({ type, image, onImageSelect }: UploadSectionProps) {
  return (
    <div className="space-y-4">
      {type === 'food' && <UploadGuidelines />}
      <ImageUploader onImageSelect={onImageSelect} type={type} />
      {image && (
        <div className="mt-4">
          <img
            src={URL.createObjectURL(image)}
            alt={`Selected ${type}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, Pill } from 'lucide-react';
import { cn } from '../utils/cn';
import { UploadType } from '../types';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  type: UploadType;
}

export function ImageUploader({ onImageSelect, type }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        {type === 'food' ? (
          <Image className="w-8 h-8 text-gray-400" />
        ) : (
          <Pill className="w-8 h-8 text-gray-400" />
        )}
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4" />
          <span className="text-sm text-gray-600">
            {isDragActive
              ? "Drop the image here"
              : `Upload ${type} image`}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Drag and drop or click to select
        </p>
      </div>
    </div>
  );
}
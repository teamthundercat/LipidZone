import React from 'react';
import { Camera, CheckCircle, XCircle } from 'lucide-react';

export function PhotoGuidelines() {
  return (
    <div className="bg-blue-50 rounded-lg p-4">
      <h4 className="font-medium flex items-center gap-2 mb-3">
        <Camera className="w-4 h-4" />
        Photo Guidelines
      </h4>
      
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
          <p>Take clear, well-lit photos of OTC medication labels</p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
          <p>Ensure all text is clearly visible and in focus</p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
          <p>Include active ingredients, dosage, and warnings</p>
        </div>
        <div className="flex items-start gap-2">
          <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
          <p>Avoid shadows or glare on the label</p>
        </div>
        <div className="flex items-start gap-2">
          <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
          <p>Don't crop out any important information</p>
        </div>
      </div>
    </div>
  );
}
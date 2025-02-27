import React from 'react';
import { Camera, XCircle, CheckCircle } from 'lucide-react';

export function UploadGuidelines() {
  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-4">
      <h4 className="font-medium flex items-center gap-2 mb-3">
        <Camera className="w-4 h-4" />
        Photo Guidelines
      </h4>
      
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
          <p>Capture the entire plate or food item in a single shot</p>
        </div>
        <div className="flex items-start gap-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
          <p>Include all items you plan to consume, including drinks and sides</p>
        </div>
        <div className="flex items-start gap-2">
          <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
          <p>Avoid partial or cropped images of food items</p>
        </div>
        <div className="flex items-start gap-2">
          <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
          <p>Don't take separate photos of individual items from the same meal</p>
        </div>
      </div>
    </div>
  );
}
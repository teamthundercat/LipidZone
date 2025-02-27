import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { MedicationForm } from '../../types/medication';

interface ManualEntryFormProps {
  onSubmit: (data: MedicationForm) => void;
}

export function ManualEntryForm({ onSubmit }: ManualEntryFormProps) {
  const [formData, setFormData] = useState<MedicationForm>({
    category: 'OTC',
    name: '',
    genericName: '',
    dosage: '',
    frequency: '',
    purpose: '',
    expirationDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    
    // Reset form
    setFormData({
      category: 'OTC',
      name: '',
      genericName: '',
      dosage: '',
      frequency: '',
      purpose: '',
      expirationDate: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700 border border-yellow-200">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          Enter the details of your over-the-counter medication. All fields marked with * are required.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medication Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Active Ingredient
          </label>
          <input
            type="text"
            name="genericName"
            value={formData.genericName}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Strength/Dosage *
          </label>
          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            required
            placeholder="e.g., 200mg, 500mg"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequency *
          </label>
          <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
            placeholder="e.g., Every 4-6 hours"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="text"
            name="quantity"
            value={formData.quantity || ''}
            onChange={handleChange}
            placeholder="e.g., 30 tablets, 1 bottle"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purpose/Condition *
        </label>
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          required
          placeholder="e.g., Pain relief, Allergy relief"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Warnings/Side Effects
        </label>
        <textarea
          name="warnings"
          value={formData.warnings || ''}
          onChange={handleChange}
          rows={3}
          placeholder="List any warnings or potential side effects"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Usage Instructions
        </label>
        <textarea
          name="usage"
          value={formData.usage || ''}
          onChange={handleChange}
          rows={3}
          placeholder="Special instructions for taking this medication"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Expiration Date
        </label>
        <input
          type="date"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add OTC Medication
        </button>
      </div>
    </form>
  );
}
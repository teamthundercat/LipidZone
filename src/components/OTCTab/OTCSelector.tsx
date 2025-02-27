import React, { useState } from 'react';
import { AlertTriangle, Info, Activity, Clock, Calendar, AlertCircle, Zap, Coffee, Package, Heart, FlaskRound as Flask, Shield, FileText, Plus, Edit, ArrowUpDown } from 'lucide-react';
import { MedicationForm } from '../../types/medication';
import { OTC_MEDICATIONS } from '../../data/medications/categories';
import { cn } from '../../utils/cn';

interface OTCSelectorProps {
  onSelect: (data: MedicationForm) => void;
}

// Define medication info categories with icons
const MEDICATION_INFO_CATEGORIES = [
  { id: 'mechanism', label: 'Mechanism of Action', icon: Activity },
  { id: 'indications', label: 'Indications & Usage', icon: FileText },
  { id: 'dosage', label: 'Dosage & Administration', icon: Clock },
  { id: 'sideEffects', label: 'Potential Side Effects', icon: AlertCircle },
  { id: 'drugInteractions', label: 'Drug Interactions', icon: Zap },
  { id: 'foodInteractions', label: 'Food Interactions', icon: Coffee }
];

export function OTCSelector({ onSelect }: OTCSelectorProps) {
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
  const [selectedInfoCategory, setSelectedInfoCategory] = useState<string>('mechanism');
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [sortOrder, setSortOrder] = useState<'name' | 'type' | 'risk'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleMedicationClick = (medicationId: string) => {
    if (selectedMedication === medicationId) {
      setShowActionButtons(!showActionButtons);
    } else {
      setSelectedMedication(medicationId);
      setShowActionButtons(true);
    }
  };

  const handleAddMedication = () => {
    if (!selectedMedication) return;
    
    const medication = OTC_MEDICATIONS.find(med => med.name === selectedMedication);
    if (!medication) return;
    
    onSelect({
      category: 'OTC',
      name: medication.name,
      genericName: medication.generic,
      dosage: '',
      frequency: '',
      purpose: medication.type,
      doctorName: '',
      expirationDate: ''
    });
    
    // Reset selection
    setSelectedMedication(null);
    setShowActionButtons(false);
  };

  const handleSort = (order: 'name' | 'type' | 'risk') => {
    if (sortOrder === order) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort order and reset direction to ascending
      setSortOrder(order);
      setSortDirection('asc');
    }
  };

  // Sort medications based on current sort settings
  const sortedMedications = [...OTC_MEDICATIONS].sort((a, b) => {
    let comparison = 0;
    
    if (sortOrder === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortOrder === 'type') {
      comparison = a.type.localeCompare(b.type);
    } else if (sortOrder === 'risk') {
      const riskOrder = { low: 1, medium: 2, high: 3 };
      comparison = riskOrder[a.risk as 'low' | 'medium' | 'high'] - riskOrder[b.risk as 'low' | 'medium' | 'high'];
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700 border border-yellow-200 mb-4">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          Select an over-the-counter medication from the grid below. Click on a medication to view detailed information.
        </p>
      </div>

      {/* Info Category Selector */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Select information to display:</h3>
        <div className="flex flex-wrap gap-2">
          {MEDICATION_INFO_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedInfoCategory(category.id)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                selectedInfoCategory === category.id
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
              )}
            >
              <category.icon className="w-3 h-3" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Color Coding Reference */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Risk Level Color Coding:</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-100 border border-green-200"></div>
              <span className="text-xs text-gray-600">Low Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-200"></div>
              <span className="text-xs text-gray-600">Medium Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
              <span className="text-xs text-gray-600">High Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleSort('name')}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
            sortOrder === 'name'
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          )}
        >
          <span>Sort by Name</span>
          {sortOrder === 'name' && (
            <ArrowUpDown className="w-3 h-3" />
          )}
        </button>
        <button
          onClick={() => handleSort('type')}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
            sortOrder === 'type'
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          )}
        >
          <span>Sort by Type</span>
          {sortOrder === 'type' && (
            <ArrowUpDown className="w-3 h-3" />
          )}
        </button>
        <button
          onClick={() => handleSort('risk')}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
            sortOrder === 'risk'
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          )}
        >
          <span>Sort by Risk</span>
          {sortOrder === 'risk' && (
            <ArrowUpDown className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Medication Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMedications.map(medication => {
          const isSelected = selectedMedication === medication.name;
          const infoCategory = MEDICATION_INFO_CATEGORIES.find(cat => cat.id === selectedInfoCategory);
          const InfoIcon = infoCategory?.icon || Info;
          
          return (
            <div 
              key={medication.name}
              className={cn(
                "border rounded-lg overflow-hidden transition-all",
                isSelected ? "border-blue-300 shadow-md" : "border-gray-200 hover:border-blue-200",
                medication.risk === 'high' ? "bg-red-50" : 
                medication.risk === 'medium' ? "bg-yellow-50" : "bg-green-50"
              )}
            >
              <div 
                className={cn(
                  "p-4 cursor-pointer",
                  medication.risk === 'high' ? "bg-red-100/50" : 
                  medication.risk === 'medium' ? "bg-yellow-100/50" : "bg-green-100/50"
                )}
                onClick={() => handleMedicationClick(medication.name)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    medication.risk === 'high' ? "bg-red-100" : 
                    medication.risk === 'medium' ? "bg-yellow-100" : "bg-green-100"
                  )}>
                    <Package className={cn(
                      "w-5 h-5",
                      medication.risk === 'high' ? "text-red-600" : 
                      medication.risk === 'medium' ? "text-yellow-600" : "text-green-600"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{medication.name}</h4>
                    <p className="text-sm text-gray-600">{medication.generic}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white">
                <div className="flex items-start gap-2 mb-3">
                  <InfoIcon className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">{infoCategory?.label}</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedInfoCategory === 'mechanism' && medication.purpose}
                      {selectedInfoCategory === 'indications' && medication.purpose}
                      {selectedInfoCategory === 'dosage' && 'Follow package directions or as directed by healthcare provider'}
                      {selectedInfoCategory === 'sideEffects' && medication.details?.join(', ')}
                      {selectedInfoCategory === 'drugInteractions' && 'Consult with healthcare provider about potential drug interactions'}
                      {selectedInfoCategory === 'foodInteractions' && 'Take with food to reduce stomach upset'}
                    </p>
                  </div>
                </div>

                {isSelected && showActionButtons && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={handleAddMedication}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to My OTC Medications</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { useState } from 'react';
import { MedicationEntry, MedicationForm } from '../types/medication';
import { analyzeMedicationImage } from '../utils/analysis/medicationAnalysis';
import { createMedicationFromForm } from '../utils/analysis/medicationForm';
import { createSupplementFromForm } from '../utils/analysis/supplementForm';
import { saveMedication, deleteMedication } from '../utils/storage/medication';

export function useMedicationAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File): Promise<MedicationEntry | null> => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = await analyzeMedicationImage(file);
      await saveMedication(result);
      
      return result;
    } catch (err) {
      setError('Failed to analyze medication image');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeMedicationForm = async (form: MedicationForm): Promise<MedicationEntry | null> => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = form.category === 'SUPPLEMENT'
        ? createSupplementFromForm(form)
        : createMedicationFromForm(form);
        
      await saveMedication(result);
      
      return result;
    } catch (err) {
      setError('Failed to process medication information');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeMedication = (id: string) => {
    try {
      deleteMedication(id);
    } catch (err) {
      setError('Failed to delete medication');
    }
  };

  return {
    isAnalyzing,
    error,
    analyzeImage,
    analyzeMedicationForm,
    removeMedication
  };
}
import { useState } from 'react';
import { MedicationEntry, MedicationForm } from '../types/medication';
import { analyzeOTCImage } from '../utils/analysis/otcAnalysis';
import { createOTCFromForm } from '../utils/analysis/otcForm';
import { saveOTCMedication, deleteOTCMedication } from '../utils/storage/otcMedication';

export function useOTCAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File): Promise<MedicationEntry | null> => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = await analyzeOTCImage(file);
      await saveOTCMedication(result);
      
      return result;
    } catch (err) {
      setError('Failed to analyze OTC medication image');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeOTCForm = async (form: MedicationForm): Promise<MedicationEntry | null> => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = createOTCFromForm(form);
      await saveOTCMedication(result);
      
      return result;
    } catch (err) {
      setError('Failed to process OTC medication information');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeOTCMedication = (id: string) => {
    try {
      deleteOTCMedication(id);
    } catch (err) {
      setError('Failed to delete OTC medication');
    }
  };

  return {
    isAnalyzing,
    error,
    analyzeImage,
    analyzeOTCForm,
    removeOTCMedication
  };
}
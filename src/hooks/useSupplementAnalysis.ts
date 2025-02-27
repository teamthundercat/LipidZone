import { useState } from 'react';
import { MedicationEntry, MedicationForm } from '../types/medication';
import { analyzeSupplementImage } from '../utils/analysis/supplementAnalysis';
import { createSupplementFromForm } from '../utils/analysis/supplementForm';
import { saveSupplement, deleteSupplement } from '../utils/storage/supplement';

export function useSupplementAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = async (file: File): Promise<MedicationEntry | null> => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = await analyzeSupplementImage(file);
      await saveSupplement(result);
      
      return result;
    } catch (err) {
      setError('Failed to analyze supplement image');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeSupplementForm = async (form: MedicationForm): Promise<MedicationEntry | null> => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = createSupplementFromForm(form);
      await saveSupplement(result);
      
      return result;
    } catch (err) {
      setError('Failed to process supplement information');
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeSupplement = (id: string) => {
    try {
      deleteSupplement(id);
    } catch (err) {
      setError('Failed to delete supplement');
    }
  };

  return {
    isAnalyzing,
    error,
    analyzeImage,
    analyzeSupplementForm,
    removeSupplement
  };
}
import { useState, useCallback } from 'react';
import { NutritionData, DailyEntry } from '../types';
import { base64ToFile } from '../utils/imageUtils';
import { generateMockFoodAnalysis } from '../utils/analysis/generator';
import { createFoodEntry } from '../utils/analysis/entry';
import { saveEntry, getDailyEntries, deleteEntry } from '../utils/storage';

export function useImageAnalysis() {
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [medicationImage, setMedicationImage] = useState<File | null>(null);
  const [foodAnalysis, setFoodAnalysis] = useState<NutritionData | null>(null);
  const [medicationAnalysis, setMedicationAnalysis] = useState<NutritionData | null>(null);
  const [entries, setEntries] = useState<DailyEntry[]>(getDailyEntries());

  const refreshEntries = useCallback(() => {
    const updatedEntries = getDailyEntries();
    setEntries(updatedEntries);
    
    // Clear current analysis and image if no entries remain
    if (updatedEntries.length === 0) {
      setFoodImage(null);
      setFoodAnalysis(null);
      setMedicationImage(null);
      setMedicationAnalysis(null);
    }
  }, []);

  const handleImageSelect = async (file: File, type: 'food' | 'medication') => {
    try {
      if (type === 'food') {
        setFoodImage(file);
        setMedicationImage(null);
        
        const analysis = generateMockFoodAnalysis();
        setFoodAnalysis(analysis);
        
        const imageUrl = URL.createObjectURL(file);
        const newEntry = createFoodEntry(imageUrl, analysis);
        await saveEntry(newEntry);
        
        refreshEntries();
        setMedicationAnalysis(null);
      } else {
        setMedicationImage(file);
        setFoodImage(null);
        setMedicationAnalysis({
          description: "Medication analysis",
          items: [],
          macronutrients: { carbs: 0, fats: 0, proteins: 0, cholesterol: 0, sodium: 0 }
        });
        setFoodAnalysis(null);
      }
    } catch (error) {
      console.error('Failed to process image:', error);
      throw error;
    }
  };

  const handleEntrySelect = async (entry: DailyEntry) => {
    if (entry.type === 'food') {
      try {
        const file = base64ToFile(entry.imageUrl, 'food-image.jpg');
        setFoodImage(file);
        setFoodAnalysis({
          description: entry.description,
          items: entry.items || [],
          macronutrients: entry.macronutrients
        });
      } catch (error) {
        console.error('Failed to load image:', error);
        throw error;
      }
    }
  };

  return {
    foodImage,
    medicationImage,
    foodAnalysis,
    medicationAnalysis,
    entries,
    handleImageSelect,
    handleEntrySelect,
    refreshEntries
  };
}
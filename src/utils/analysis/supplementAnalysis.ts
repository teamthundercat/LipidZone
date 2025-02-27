import { MedicationEntry } from '../../types/medication';
import { SUPPLEMENT_IMPACTS } from '../../data/supplements/heartHealthImpacts';
import { v4 as uuidv4 } from 'uuid';

export async function analyzeSupplementImage(imageFile: File): Promise<MedicationEntry> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, always return a known supplement
    const supplementTypes = Object.keys(SUPPLEMENT_IMPACTS);
    const randomType = supplementTypes[Math.floor(Math.random() * supplementTypes.length)];
    const supplement = SUPPLEMENT_IMPACTS[randomType];
    
    if (!supplement) {
      throw new Error('Unable to analyze supplement image');
    }

    // Get expiration date 2 years from now
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 2);

    return {
      id: uuidv4(),
      type: supplement.type,
      category: 'supplement',
      name: supplement.name,
      dosage: '1000mg',
      frequency: 'Once daily',
      purpose: 'Nutritional support',
      expirationDate: expirationDate.toISOString().split('T')[0],
      heartHealthImpact: {
        level: supplement.risk as 'high' | 'medium' | 'low',
        type: 'info',
        details: supplement.details,
        foodInteractions: supplement.foodInteractions
      }
    };
  } catch (error) {
    console.error('Failed to analyze supplement image:', error);
    throw new Error('Unable to analyze supplement image. Please try entering details manually.');
  }
}
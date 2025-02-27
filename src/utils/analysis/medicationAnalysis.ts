import { MedicationEntry } from '../../types/medication';
import { MEDICATION_CATEGORIES } from '../../data/medications/categories';
import { HEART_HEALTH_IMPACTS } from '../../data/medications/heartHealthImpacts';
import { v4 as uuidv4 } from 'uuid';

export async function analyzeMedicationImage(imageFile: File): Promise<MedicationEntry> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, always return a known medication
    const medicationType = 'atorvastatin';
    const impact = HEART_HEALTH_IMPACTS[medicationType];
    
    if (!impact) {
      throw new Error('Unable to analyze medication image');
    }

    // Get expiration date 1 year from now
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    return {
      id: uuidv4(),
      type: medicationType,
      category: 'prescription',
      name: impact.name,
      genericName: 'Atorvastatin',
      dosage: '10mg',
      frequency: 'Once daily',
      purpose: 'Cholesterol management',
      doctorName: 'Dr. Smith',
      expirationDate: expirationDate.toISOString().split('T')[0],
      heartHealthImpact: {
        level: 'high',
        type: 'warning',
        details: impact.details,
        foodInteractions: impact.foodInteractions
      }
    };
  } catch (error) {
    console.error('Failed to analyze medication image:', error);
    throw new Error('Unable to analyze medication image. Please try entering details manually.');
  }
}
import { MedicationEntry } from '../../types/medication';
import { OTC_MEDICATIONS } from '../../data/medications/categories';
import { v4 as uuidv4 } from 'uuid';

export async function analyzeOTCImage(imageFile: File): Promise<MedicationEntry> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo purposes, always return a known OTC medication
    const randomIndex = Math.floor(Math.random() * OTC_MEDICATIONS.length);
    const medication = OTC_MEDICATIONS[randomIndex];
    
    if (!medication) {
      throw new Error('Unable to analyze OTC medication image');
    }

    // Get expiration date 1 year from now
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    return {
      id: uuidv4(),
      type: medication.type,
      category: 'otc',
      name: medication.name,
      genericName: medication.generic,
      dosage: '500mg',
      frequency: 'As needed',
      purpose: medication.purpose,
      expirationDate: expirationDate.toISOString().split('T')[0],
      heartHealthImpact: {
        level: medication.risk as 'high' | 'medium' | 'low',
        type: 'warning',
        details: medication.details,
        foodInteractions: [
          'Take with food to reduce stomach upset',
          'Monitor for interactions with other medications',
          'Follow recommended dosing schedule'
        ]
      }
    };
  } catch (error) {
    console.error('Failed to analyze OTC medication image:', error);
    throw new Error('Unable to analyze OTC medication image. Please try entering details manually.');
  }
}
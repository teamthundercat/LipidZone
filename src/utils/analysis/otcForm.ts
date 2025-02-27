import { v4 as uuidv4 } from 'uuid';
import { MedicationForm, MedicationEntry } from '../../types/medication';
import { OTC_MEDICATIONS } from '../../data/medications/categories';

export function createOTCFromForm(form: MedicationForm): MedicationEntry {
  try {
    // Find matching OTC medication if possible
    const medication = OTC_MEDICATIONS.find(med => 
      med.name.toLowerCase() === form.name.toLowerCase() || 
      med.generic.toLowerCase() === form.name.toLowerCase()
    );
    
    // Create entry with either found medication details or generic details
    return {
      id: uuidv4(),
      type: medication?.type || 'otc',
      category: 'otc',
      name: form.name,
      genericName: form.genericName || medication?.generic || '',
      dosage: form.dosage || 'As directed',
      frequency: form.frequency || 'As needed',
      purpose: form.purpose || medication?.purpose || 'Pain relief',
      doctorName: form.doctorName,
      expirationDate: form.expirationDate,
      quantity: form.quantity,
      warnings: form.warnings,
      usage: form.usage,
      heartHealthImpact: {
        level: medication?.risk as 'high' | 'medium' | 'low' || 'medium',
        type: 'warning',
        details: medication?.details || [
          'Follow package directions',
          'Do not exceed recommended dosage',
          'Consult healthcare provider if symptoms persist'
        ],
        foodInteractions: [
          'Take with food to reduce stomach upset',
          'Avoid alcohol unless approved by your doctor',
          'Stay hydrated while taking this medication'
        ]
      }
    };
  } catch (error) {
    console.error('Failed to create OTC medication:', error);
    throw error;
  }
}
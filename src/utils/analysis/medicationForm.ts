import { v4 as uuidv4 } from 'uuid';
import { MedicationForm } from '../../types/medication';
import { HEART_HEALTH_IMPACTS } from '../../data/medications/heartHealthImpacts';
import { OTC_MEDICATIONS } from '../../data/medications/categories';

export function createMedicationFromForm(form: MedicationForm) {
  try {
    // Handle OTC medications
    if (form.category === 'OTC') {
      const medication = OTC_MEDICATIONS.find(med => med.name === form.name);
      
      if (!medication) {
        throw new Error(`Invalid OTC medication: ${form.name}`);
      }

      return {
        id: uuidv4(),
        type: medication.type,
        category: form.category.toLowerCase(),
        name: form.name,
        genericName: form.genericName || medication.generic,
        dosage: form.dosage || 'As directed',
        frequency: form.frequency || 'As needed',
        purpose: medication.purpose,
        doctorName: form.doctorName,
        expirationDate: form.expirationDate,
        quantity: form.quantity,
        prescribedTo: form.prescribedTo,
        warnings: form.warnings,
        usage: form.usage,
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
    }

    // Handle prescription medications
    if (form.category === 'PRESCRIPTION') {
      const impact = HEART_HEALTH_IMPACTS[form.purpose as keyof typeof HEART_HEALTH_IMPACTS] || {
        type: 'prescription',
        name: form.name,
        risk: 'medium',
        details: [
          'Follow prescribed dosage',
          'Take as directed by your healthcare provider',
          'Report any side effects to your doctor'
        ],
        foodInteractions: [
          'Take with food unless directed otherwise',
          'Avoid alcohol unless approved by your doctor',
          'Maintain consistent diet while on this medication'
        ]
      };

      return {
        id: uuidv4(),
        type: form.purpose || 'prescription',
        category: form.category.toLowerCase(),
        name: form.name,
        genericName: form.genericName,
        dosage: form.dosage || 'As prescribed',
        frequency: form.frequency || 'As prescribed',
        purpose: form.purpose || impact.name,
        doctorName: form.doctorName,
        expirationDate: form.expirationDate,
        quantity: form.quantity,
        prescribedTo: form.prescribedTo,
        warnings: form.warnings,
        usage: form.usage,
        heartHealthImpact: {
          level: impact.risk || 'medium',
          type: 'warning',
          details: impact.details || [],
          foodInteractions: impact.foodInteractions || []
        }
      };
    }

    // Handle supplements
    if (form.category === 'SUPPLEMENT') {
      return {
        id: uuidv4(),
        type: 'supplement',
        category: form.category.toLowerCase(),
        name: form.name,
        genericName: form.genericName,
        dosage: form.dosage || 'As directed',
        frequency: form.frequency || 'Daily',
        purpose: form.purpose || 'Nutritional support',
        doctorName: form.doctorName,
        expirationDate: form.expirationDate,
        quantity: form.quantity,
        prescribedTo: form.prescribedTo,
        warnings: form.warnings,
        usage: form.usage,
        heartHealthImpact: {
          level: 'low',
          type: 'info',
          details: ['Natural supplement', 'Follow recommended dosage'],
          foodInteractions: ['Take as directed by healthcare provider']
        }
      };
    }

    // Default case for any other category
    return {
      id: uuidv4(),
      type: 'medication',
      category: 'prescription',
      name: form.name,
      genericName: form.genericName,
      dosage: form.dosage,
      frequency: form.frequency,
      purpose: form.purpose,
      doctorName: form.doctorName,
      expirationDate: form.expirationDate,
      quantity: form.quantity,
      prescribedTo: form.prescribedTo,
      warnings: form.warnings,
      usage: form.usage,
      heartHealthImpact: {
        level: 'medium',
        type: 'warning',
        details: ['Follow prescribed dosage', 'Take as directed'],
        foodInteractions: ['Consult your healthcare provider about food interactions']
      }
    };
  } catch (error) {
    console.error('Failed to create medication:', error);
    throw error;
  }
}
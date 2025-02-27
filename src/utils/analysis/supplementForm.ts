import { v4 as uuidv4 } from 'uuid';
import { MedicationForm } from '../../types/medication';
import { SupplementEntry } from '../../types/supplement';
import { SUPPLEMENT_IMPACTS } from '../../data/supplements/heartHealthImpacts';

export function createSupplementFromForm(form: MedicationForm): SupplementEntry {
  // Find the supplement by name (case-insensitive)
  const supplementType = Object.entries(SUPPLEMENT_IMPACTS).find(([_, impact]) => 
    impact.name.toLowerCase() === form.name.toLowerCase()
  )?.[0];

  if (!supplementType) {
    throw new Error(`Invalid supplement: ${form.name}`);
  }

  const impact = SUPPLEMENT_IMPACTS[supplementType];

  return {
    id: uuidv4(),
    type: impact.type,
    name: impact.name, // Use the exact name from the impacts data
    dosage: form.dosage || 'As directed',
    frequency: form.frequency || 'Daily',
    purpose: form.purpose || 'Heart Health Support',
    heartHealthImpact: {
      level: impact.risk as 'high' | 'medium' | 'low',
      type: 'info',
      details: impact.details,
      foodInteractions: impact.foodInteractions
    }
  };
}
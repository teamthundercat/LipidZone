export const MEDICATION_CATEGORIES = {
  PRESCRIPTION: 'prescription',
  OTC: 'otc',
  SUPPLEMENT: 'supplement'
} as const;

export type MedicationType = typeof MEDICATION_CATEGORIES[keyof typeof MEDICATION_CATEGORIES];

const MEDICATION_LABELS = {
  [MEDICATION_CATEGORIES.PRESCRIPTION]: 'Prescription Medications',
  [MEDICATION_CATEGORIES.OTC]: 'Over-the-Counter Medications',
  [MEDICATION_CATEGORIES.SUPPLEMENT]: 'Supplements'
} as const;

// Common OTC medications for heart health with risk levels
export const OTC_MEDICATIONS = [
  {
    name: 'Aspirin (Low Dose)',
    generic: 'Acetylsalicylic acid',
    type: 'blood-thinner',
    purpose: 'Heart attack and stroke prevention',
    risk: 'high',
    details: [
      'Can increase bleeding risk',
      'Interacts with blood thinners',
      'May affect blood pressure medications'
    ]
  },
  {
    name: 'Advil',
    generic: 'Ibuprofen',
    type: 'nsaid',
    purpose: 'Pain and inflammation',
    risk: 'high',
    details: [
      'Can increase blood pressure',
      'May affect kidney function',
      'Increases bleeding risk'
    ]
  },
  {
    name: 'Aleve',
    generic: 'Naproxen',
    type: 'nsaid',
    purpose: 'Pain and inflammation',
    risk: 'high',
    details: [
      'Can increase blood pressure',
      'May affect kidney function',
      'Increases bleeding risk'
    ]
  },
  {
    name: 'Tylenol',
    generic: 'Acetaminophen',
    type: 'pain-reliever',
    purpose: 'Pain relief',
    risk: 'medium',
    details: [
      'Generally safe for heart patients',
      'Monitor liver function',
      'Follow dosing instructions carefully'
    ]
  },
  {
    name: 'Pepcid',
    generic: 'Famotidine',
    type: 'antacid',
    purpose: 'Heartburn relief',
    risk: 'low',
    details: [
      'Generally safe with heart medications',
      'Monitor kidney function',
      'May affect absorption of other medications'
    ]
  }
];
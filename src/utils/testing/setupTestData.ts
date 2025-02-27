import { MedicationEntry } from '../../types/medication';
import { v4 as uuidv4 } from 'uuid';

const testMedications: MedicationEntry[] = [
  {
    id: uuidv4(),
    type: 'anticoagulant',
    category: 'prescription',
    name: 'Edoxaban (Savaysa)',
    dosage: '60mg',
    frequency: 'Once daily',
    purpose: 'Prevent blood clots',
    heartHealthImpact: {
      level: 'high',
      type: 'warning',
      details: [
        'Direct oral anticoagulant (DOAC)',
        'Prevents blood clots',
        'Reduces stroke risk',
        'Important for atrial fibrillation'
      ],
      foodInteractions: [
        'Take with or without food',
        'Avoid supplements containing edoxaban',
        'Monitor vitamin K intake'
      ]
    }
  },
  {
    id: uuidv4(),
    type: 'anticoagulant',
    category: 'prescription',
    name: 'Dipyridamole (Persantine)',
    dosage: '75mg',
    frequency: 'Four times daily',
    purpose: 'Blood thinner',
    heartHealthImpact: {
      level: 'high',
      type: 'warning',
      details: [
        'Antiplatelet medication',
        'Prevents blood clots',
        'Used with stress tests',
        'May be combined with aspirin'
      ],
      foodInteractions: [
        'Take on empty stomach',
        'Avoid caffeine for 12 hours before use',
        'Space from antacids by 2 hours'
      ]
    }
  },
  {
    id: uuidv4(),
    type: 'ace-inhibitor',
    category: 'prescription',
    name: 'Perindopril (Aceon)',
    dosage: '4mg',
    frequency: 'Once daily',
    purpose: 'Blood pressure control',
    heartHealthImpact: {
      level: 'high',
      type: 'warning',
      details: [
        'ACE inhibitor medication',
        'Lowers blood pressure',
        'Protects kidney function',
        'Reduces heart attack and stroke risk'
      ],
      foodInteractions: [
        'Monitor potassium intake',
        'Avoid salt substitutes',
        'Limit alcohol consumption',
        'Take consistently with or without food'
      ]
    }
  }
];

const testOTCMedications: MedicationEntry[] = [
  {
    id: uuidv4(),
    type: 'nsaid',
    category: 'otc',
    name: 'Advil',
    genericName: 'Ibuprofen',
    dosage: '200mg',
    frequency: 'Every 4-6 hours as needed',
    purpose: 'Pain and inflammation',
    heartHealthImpact: {
      level: 'high',
      type: 'warning',
      details: [
        'Can increase blood pressure',
        'May affect kidney function',
        'Increases bleeding risk'
      ],
      foodInteractions: [
        'Take with food to reduce stomach upset',
        'Avoid alcohol while taking this medication',
        'Stay hydrated while taking this medication'
      ]
    }
  },
  {
    id: uuidv4(),
    type: 'pain-reliever',
    category: 'otc',
    name: 'Tylenol',
    genericName: 'Acetaminophen',
    dosage: '500mg',
    frequency: 'Every 4-6 hours as needed',
    purpose: 'Pain relief',
    heartHealthImpact: {
      level: 'medium',
      type: 'info',
      details: [
        'Generally safe for heart patients',
        'Monitor liver function',
        'Follow dosing instructions carefully'
      ],
      foodInteractions: [
        'Can be taken with or without food',
        'Limit alcohol consumption',
        'Do not exceed recommended daily dose'
      ]
    }
  }
];

const testSupplements: MedicationEntry[] = [
  {
    id: uuidv4(),
    type: 'fish-oil',
    category: 'supplement',
    name: 'Fish Oil',
    dosage: '1000mg',
    frequency: 'Once daily',
    purpose: 'Heart health support',
    heartHealthImpact: {
      level: 'medium',
      type: 'info',
      details: [
        'May reduce triglycerides',
        'Contains omega-3 fatty acids',
        'Supports heart health',
        'Anti-inflammatory properties'
      ],
      foodInteractions: [
        'May cause a fishy aftertaste and bad breath',
        'Can cause gas, nausea, vomiting or diarrhea',
        'May interact with blood-thinning medications',
        'Take with food to reduce side effects'
      ]
    }
  },
  {
    id: uuidv4(),
    type: 'vitamin-d',
    category: 'supplement',
    name: 'Vitamin D3',
    dosage: '2000 IU',
    frequency: 'Once daily',
    purpose: 'Bone health',
    heartHealthImpact: {
      level: 'low',
      type: 'info',
      details: [
        'Supports calcium absorption',
        'May support immune function',
        'Important for bone health',
        'May have cardiovascular benefits'
      ],
      foodInteractions: [
        'Take with a meal containing fat for better absorption',
        'No significant food interactions',
        'Avoid taking with high-fiber meals which may reduce absorption'
      ]
    }
  }
];

export function setupTestMedications() {
  localStorage.setItem('nutrition-tracker-medications', JSON.stringify(testMedications));
}

export function setupTestOTCMedications() {
  localStorage.setItem('nutrition-tracker-otc-medications', JSON.stringify(testOTCMedications));
}

export function setupTestSupplements() {
  localStorage.setItem('nutrition-tracker-supplements', JSON.stringify(testSupplements));
}
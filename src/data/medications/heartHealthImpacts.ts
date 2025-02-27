export const HEART_HEALTH_IMPACTS = {
  // Statins
  'atorvastatin': {
    type: 'statin',
    name: 'Atorvastatin (Lipitor®)',
    risk: 'high',
    details: [
      'Lowers LDL cholesterol',
      'May affect liver function',
      'Monitor for muscle pain',
      'Take in evening'
    ],
    foodInteractions: [
      'Avoid grapefruit juice',
      'Take with or without food',
      'Limit alcohol consumption',
      'Monitor fiber intake'
    ]
  },

  'rosuvastatin': {
    type: 'statin',
    name: 'Rosuvastatin (Crestor®)',
    risk: 'high',
    details: [
      'Potent LDL cholesterol reducer',
      'May affect liver enzymes',
      'Monitor muscle symptoms',
      'Evening dosing preferred'
    ],
    foodInteractions: [
      'Avoid grapefruit products',
      'Take with or without food',
      'Limit alcohol intake',
      'Asian patients may need lower doses'
    ]
  },

  'simvastatin': {
    type: 'statin',
    name: 'Simvastatin (Zocor®)',
    risk: 'high',
    details: [
      'Reduces LDL cholesterol',
      'Take in the evening',
      'Higher risk of muscle problems',
      'Monitor liver function'
    ],
    foodInteractions: [
      'Strictly avoid grapefruit products',
      'Take in the evening',
      'Limit alcohol consumption',
      'Space from certain antibiotics'
    ]
  },

  // Niacin
  'niacin': {
    type: 'niacin',
    name: 'Niacin (Niaspan®)',
    risk: 'high',
    details: [
      'Raises HDL (good) cholesterol',
      'Lowers LDL and triglycerides',
      'Can cause flushing reaction',
      'Take with aspirin to reduce flushing'
    ],
    foodInteractions: [
      'Take with a low-fat meal',
      'Avoid hot beverages when taking',
      'Avoid alcohol and spicy foods',
      'Space from caffeine by 1-2 hours'
    ]
  },

  // Fibrates
  'gemfibrozil': {
    type: 'fibrate',
    name: 'Gemfibrozil (Lopid®)',
    risk: 'high',
    details: [
      'Lowers triglycerides',
      'Raises HDL cholesterol',
      'Can interact with statins',
      'Take 30 minutes before meals'
    ],
    foodInteractions: [
      'Take 30 minutes before meals',
      'Avoid grapefruit juice',
      'Limit alcohol consumption',
      'High-fat meals reduce effectiveness'
    ]
  },

  'fenofibrate': {
    type: 'fibrate',
    name: 'Fenofibrate (Tricor®)',
    risk: 'high',
    details: [
      'Lowers triglycerides',
      'Raises HDL cholesterol',
      'Can be used with statins',
      'Monitor liver function'
    ],
    foodInteractions: [
      'Take with food for better absorption',
      'Consistent meal timing recommended',
      'Avoid excessive alcohol',
      'Monitor for muscle pain with statins'
    ]
  },

  // PCSK9 Inhibitors
  'evolocumab': {
    type: 'pcsk9',
    name: 'Evolocumab (Repatha®)',
    risk: 'high',
    details: [
      'Lowers LDL cholesterol',
      'Injectable medication',
      'Used when statins insufficient',
      'Monitor injection site'
    ],
    foodInteractions: [
      'No significant food interactions',
      'Store properly in refrigerator',
      'Can be taken with other medications',
      'Follow injection schedule carefully'
    ]
  },

  'alirocumab': {
    type: 'pcsk9',
    name: 'Alirocumab (Praluent®)',
    risk: 'high',
    details: [
      'Powerful LDL cholesterol reducer',
      'Injectable medication',
      'Alternative to statins',
      'Monitor injection sites'
    ],
    foodInteractions: [
      'No major food interactions',
      'Maintain proper refrigeration',
      'Can be used with other medications',
      'Follow prescribed schedule'
    ]
  },

  // Bile Acid Sequestrants
  'cholestyramine': {
    type: 'bile-acid',
    name: 'Cholestyramine (Questran®)',
    risk: 'high',
    details: [
      'Binds bile acids',
      'Lowers LDL cholesterol',
      'Can affect other medications',
      'May cause constipation'
    ],
    foodInteractions: [
      'Take before meals',
      'Space from other medications by 4 hours',
      'Mix with fluids or soft foods',
      'May decrease vitamin absorption'
    ]
  }
} as const;

type HeartHealthImpactType = keyof typeof HEART_HEALTH_IMPACTS;
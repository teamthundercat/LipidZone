import { SupplementImpact } from '../../types/supplement';

export const SUPPLEMENT_IMPACTS: Record<string, SupplementImpact> = {
  BERBERINE: {
    type: 'berberine',
    name: 'Berberine',
    risk: 'high',
    details: [
      'May reduce LDL cholesterol and triglycerides',
      'Natural compound found in several plants',
      'Can affect blood sugar levels',
      'Requires careful monitoring'
    ],
    foodInteractions: [
      'May cause diarrhea, constipation, gas, nausea or vomiting',
      'May cause harm during pregnancy and breastfeeding',
      'Take with meals to reduce stomach upset',
      'Monitor blood sugar if taking diabetes medications'
    ]
  },
  FISH_OIL: {
    type: 'fish-oil',
    name: 'Fish Oil',
    risk: 'medium',
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
  },
  FLAXSEED: {
    type: 'flaxseed',
    name: 'Ground Flaxseed',
    risk: 'medium',
    details: [
      'May reduce LDL cholesterol',
      'High in fiber and omega-3s',
      'Contains lignans',
      'Supports heart health'
    ],
    foodInteractions: [
      'May cause gas, bloating or diarrhea',
      'May interact with blood-thinning medications',
      'Take with plenty of water',
      'Space from other medications by 2 hours'
    ]
  },
  GARLIC: {
    type: 'garlic',
    name: 'Garlic Extract',
    risk: 'medium',
    details: [
      'May slightly reduce cholesterol',
      'Natural blood thinner',
      'Supports heart health',
      'Anti-inflammatory properties'
    ],
    foodInteractions: [
      'May cause bad breath and body odor',
      'Can cause nausea, vomiting and gas',
      'May interact with blood-thinning medications',
      'Take with food to reduce stomach upset'
    ]
  },
  GREEN_TEA: {
    type: 'green-tea',
    name: 'Green Tea Extract',
    risk: 'medium',
    details: [
      'May lower LDL cholesterol',
      'Contains beneficial antioxidants',
      'Supports heart health',
      'May help with blood pressure'
    ],
    foodInteractions: [
      'May cause nausea, vomiting, gas or diarrhea',
      'May interact with blood-thinning medications',
      'Contains caffeine - monitor intake',
      'Take between meals'
    ]
  },
  NIACIN: {
    type: 'niacin',
    name: 'Niacin (Vitamin B3)',
    risk: 'high',
    details: [
      'May lower LDL cholesterol and triglycerides',
      'May improve HDL cholesterol',
      'Requires careful dosing',
      'Monitor liver function'
    ],
    foodInteractions: [
      'May cause itching and flushing',
      'Effects more common at higher doses',
      'Take with food to reduce flushing',
      'Avoid hot beverages when taking'
    ]
  },
  PLANT_STEROLS: {
    type: 'plant-sterols',
    name: 'Plant Stanols and Sterols',
    risk: 'medium',
    details: [
      'May reduce LDL cholesterol',
      'Particularly effective for familial hypercholesterolemia',
      'Natural compounds found in plants',
      'Blocks cholesterol absorption'
    ],
    foodInteractions: [
      'May cause diarrhea',
      'Take with meals for best absorption',
      'May reduce absorption of fat-soluble vitamins',
      'Space from other medications'
    ]
  }
} as const;
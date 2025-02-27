export interface SupplementImpact {
  type: string;
  name: string;
  risk: 'high' | 'medium' | 'low';
  details: string[];
  foodInteractions: string[];
}

export interface SupplementEntry {
  id: string;
  type: string;
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  heartHealthImpact: {
    level: 'high' | 'medium' | 'low';
    type: 'warning' | 'info';
    details: string[];
    foodInteractions: string[];
  };
}
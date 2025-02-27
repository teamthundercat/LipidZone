export interface UserProfile {
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  unitSystem: UnitSystem;
  heartHealth?: HeartHealthMetrics;
}

// ... rest of the types remain the same
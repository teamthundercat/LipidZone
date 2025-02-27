import { UserProfile } from '../types';

export function calculateBMI(profile: UserProfile): number {
  // Convert height to meters if using standard units (inches)
  const heightInMeters = profile.unitSystem === 'standard' 
    ? profile.height * 0.0254  // Convert inches to meters
    : profile.height / 100;    // Convert cm to meters

  // Convert weight to kg if using standard units (pounds)
  const weightInKg = profile.unitSystem === 'standard'
    ? profile.weight * 0.453592  // Convert pounds to kg
    : profile.weight;

  const bmi = weightInKg / (heightInMeters * heightInMeters);
  return Math.round(bmi * 10) / 10; // Round to 1 decimal place
}

export function getBMICategory(bmi: number): {
  category: string;
  color: string;
  description: string;
} {
  if (bmi < 18.5) {
    return {
      category: 'Underweight',
      color: 'text-yellow-500',
      description: 'BMI is below the healthy range'
    };
  } else if (bmi < 25) {
    return {
      category: 'Healthy',
      color: 'text-green-500',
      description: 'BMI is within the healthy range'
    };
  } else if (bmi < 30) {
    return {
      category: 'Overweight',
      color: 'text-yellow-500',
      description: 'BMI is above the healthy range'
    };
  } else {
    return {
      category: 'Obese',
      color: 'text-red-500',
      description: 'BMI indicates obesity'
    };
  }
}
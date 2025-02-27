import { UserProfile, DailyRecommended } from '../types';

export function calculateDailyCalories(profile: UserProfile): number {
  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr;
  if (profile.gender === 'male') {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  } else {
    bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
  }

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  };

  // Use heart health activity level if available, otherwise assume moderate
  const activityLevel = profile.heartHealth?.activityLevel || 'moderate';
  return Math.round(bmr * activityMultipliers[activityLevel]);
}

export function calculateDailyRecommended(profile: UserProfile): DailyRecommended {
  const dailyCalories = calculateDailyCalories(profile);

  return {
    carbs: Math.round((dailyCalories * 0.5) / 4), // 50% of calories from carbs, 4 calories per gram
    proteins: Math.round((dailyCalories * 0.25) / 4), // 25% of calories from protein, 4 calories per gram
    fats: Math.round((dailyCalories * 0.25) / 9), // 25% of calories from fat, 9 calories per gram
    cholesterol: 300, // mg, standard recommendation
    sodium: 2300 // mg, standard recommendation
  };
}
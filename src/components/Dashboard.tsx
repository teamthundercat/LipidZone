import React from 'react';
import { UserProfile, DailyEntry, DailyRecommended } from '../types';
import { StatCard, ActivityRing, RecentActivity, NutritionOverview, MedicationOverview } from './Dashboard/index';
import { getDailyTotals } from '../utils/storage/queries';
import { format } from 'date-fns';
import { calculateBMI } from '../utils/health';
import { calculateDailyCalories } from '../utils/nutrition';
import { getMedications } from '../utils/storage/medication';
import { LayoutDashboard } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  entries: DailyEntry[];
  recommended: DailyRecommended;
  activeView?: string;
}

export function Dashboard({ profile, entries, recommended, activeView }: DashboardProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const totals = getDailyTotals(today);
  const medications = getMedications();
  const bmi = calculateBMI(profile);
  const dailyCalories = calculateDailyCalories(profile);
  
  // Calculate percentage of daily targets
  const carbsPercentage = Math.min(100, Math.round((totals.carbs / recommended.carbs) * 100));
  const proteinsPercentage = Math.min(100, Math.round((totals.proteins / recommended.proteins) * 100));
  const fatsPercentage = Math.min(100, Math.round((totals.fats / recommended.fats) * 100));
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center">
        <LayoutDashboard className="w-6 h-6 text-blue-600 mr-2" />
        Dashboard
      </h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Daily Calories"
          value={`${dailyCalories}`}
          unit="kcal"
          description="Recommended daily intake"
          trend="neutral"
          icon="calories"
        />
        <StatCard 
          title="BMI"
          value={bmi.toFixed(1)}
          description={bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese"}
          trend={bmi < 18.5 || bmi >= 25 ? "negative" : "positive"}
          icon="weight"
        />
        <StatCard 
          title="Medications"
          value={`${medications.length}`}
          description="Active medications"
          trend="neutral"
          icon="medication"
        />
        <StatCard 
          title="Food Entries"
          value={`${entries.length}`}
          description="Today's tracked meals"
          trend={entries.length > 0 ? "positive" : "neutral"}
          icon="food"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nutrition Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Nutrition Overview</h2>
            <NutritionOverview 
              totals={totals}
              recommended={recommended}
            />
          </div>
          
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <RecentActivity entries={entries} />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Daily Progress */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Daily Progress</h2>
            <div className="flex justify-center mb-6">
              <ActivityRing 
                percentages={[
                  { value: carbsPercentage, color: '#3B82F6' }, // blue
                  { value: proteinsPercentage, color: '#10B981' }, // green
                  { value: fatsPercentage, color: '#F59E0B' }, // yellow
                ]}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-medium text-gray-500">Carbs</div>
                <div className="text-blue-500 font-semibold">{carbsPercentage}%</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Protein</div>
                <div className="text-green-500 font-semibold">{proteinsPercentage}%</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Fats</div>
                <div className="text-yellow-500 font-semibold">{fatsPercentage}%</div>
              </div>
            </div>
          </div>
          
          {/* Medication Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Medication Overview</h2>
            <MedicationOverview medications={medications.slice(0, 3)} />
          </div>
        </div>
      </div>
    </div>
  );
}
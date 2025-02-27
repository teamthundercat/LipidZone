import React, { useState } from 'react';
import { AlertTriangle, Info, Activity, Clock, Calendar, AlertCircle, Zap, Coffee, Pill, Heart, FlaskRound as Flask, Shield, FileText, Plus, Edit, ArrowUpDown } from 'lucide-react';
import { MedicationForm } from '../../types/medication';
import { HEART_HEALTH_IMPACTS } from '../../data/medications/heartHealthImpacts';
import { OTC_MEDICATIONS } from '../../data/medications/categories';
import { cn } from '../../utils/cn';

interface MedicationSelectorProps {
  onSelect: (data: MedicationForm) => void;
  category: 'prescription' | 'otc' | 'supplement';
}

// Define medication info categories with icons
const MEDICATION_INFO_CATEGORIES = [
  { id: 'mechanism', label: 'Mechanism of Action', icon: Activity },
  { id: 'indications', label: 'Indications & Usage', icon: FileText },
  { id: 'dosage', label: 'Dosage & Administration', icon: Clock },
  { id: 'sideEffects', label: 'Potential Side Effects', icon: AlertCircle },
  { id: 'drugInteractions', label: 'Drug Interactions', icon: Zap },
  { id: 'foodInteractions', label: 'Food Interactions', icon: Coffee },
  { id: 'supplementInteractions', label: 'Supplement Interactions', icon: Pill },
  { id: 'contraindications', label: 'Contraindications', icon: Shield },
  { id: 'monitoring', label: 'Monitoring & Lab Tests', icon: Flask },
  { id: 'storage', label: 'Storage & Handling', icon: Calendar }
];

// Detailed information for cholesterol medications
const CHOLESTEROL_MEDICATIONS = [
  {
    id: 'atorvastatin',
    name: 'Atorvastatin (Lipitor®)',
    type: 'statin',
    generic: 'Atorvastatin',
    brand: 'Lipitor',
    risk: 'medium',
    info: {
      mechanism: 'Blocks liver enzyme HMG-CoA reductase to reduce cholesterol production',
      indications: 'High LDL cholesterol, cardiovascular disease prevention',
      dosage: '10-80mg once daily, preferably in the evening',
      sideEffects: 'Muscle pain, liver enzyme elevation, digestive issues',
      drugInteractions: 'Interacts with certain antibiotics, antifungals, and other cholesterol medications',
      foodInteractions: 'Avoid grapefruit juice; can be taken with or without food',
      supplementInteractions: 'May deplete CoQ10; red yeast rice contains natural statins and should be avoided',
      contraindications: 'Pregnancy, breastfeeding, active liver disease',
      monitoring: 'Liver function tests, lipid panel, muscle symptoms',
      storage: 'Store at room temperature away from moisture and heat'
    }
  },
  {
    id: 'rosuvastatin',
    name: 'Rosuvastatin (Crestor®)',
    type: 'statin',
    generic: 'Rosuvastatin',
    brand: 'Crestor',
    risk: 'medium',
    info: {
      mechanism: 'Potent inhibitor of HMG-CoA reductase, reducing cholesterol synthesis',
      indications: 'High LDL cholesterol, mixed dyslipidemia, atherosclerosis',
      dosage: '5-40mg once daily, can be taken any time of day',
      sideEffects: 'Muscle pain, weakness, headache, nausea',
      drugInteractions: 'Cyclosporine, gemfibrozil, certain HIV medications',
      foodInteractions: 'Can be taken with or without food; avoid excessive alcohol',
      supplementInteractions: 'CoQ10 depletion; vitamin D may affect efficacy',
      contraindications: 'Pregnancy, active liver disease, Asian patients may need lower doses',
      monitoring: 'Liver enzymes, kidney function, lipid panel',
      storage: 'Store at room temperature in a dry place'
    }
  },
  {
    id: 'simvastatin',
    name: 'Simvastatin (Zocor®)',
    type: 'statin',
    generic: 'Simvastatin',
    brand: 'Zocor',
    risk: 'high',
    info: {
      mechanism: 'Inhibits HMG-CoA reductase, reducing cholesterol production',
      indications: 'Hyperlipidemia, coronary heart disease risk reduction',
      dosage: '5-40mg once daily in the evening',
      sideEffects: 'Higher risk of muscle problems, especially at doses >20mg',
      drugInteractions: 'Many significant interactions with antibiotics, antifungals, calcium channel blockers',
      foodInteractions: 'Strictly avoid grapefruit products; take in the evening',
      supplementInteractions: 'Red yeast rice contains natural statins; CoQ10 depletion',
      contraindications: 'Pregnancy, active liver disease, concomitant strong CYP3A4 inhibitors',
      monitoring: 'Liver function, muscle symptoms, lipid panel',
      storage: 'Store at room temperature away from moisture and light'
    }
  },
  {
    id: 'pravastatin',
    name: 'Pravastatin (Pravachol®)',
    type: 'statin',
    generic: 'Pravastatin',
    brand: 'Pravachol',
    risk: 'low',
    info: {
      mechanism: 'Inhibits HMG-CoA reductase with less systemic exposure',
      indications: 'Hyperlipidemia, prevention of cardiovascular events',
      dosage: '10-80mg once daily, can be taken any time',
      sideEffects: 'Generally fewer muscle side effects than other statins',
      drugInteractions: 'Fewer interactions than other statins',
      foodInteractions: 'Can be taken with or without food',
      supplementInteractions: 'CoQ10 depletion possible but less common',
      contraindications: 'Pregnancy, active liver disease',
      monitoring: 'Liver function, lipid panel',
      storage: 'Store at room temperature away from moisture'
    }
  },
  {
    id: 'lovastatin',
    name: 'Lovastatin (Mevacor®)',
    type: 'statin',
    generic: 'Lovastatin',
    brand: 'Mevacor',
    risk: 'medium',
    info: {
      mechanism: 'First approved statin, inhibits HMG-CoA reductase',
      indications: 'Hypercholesterolemia, coronary heart disease prevention',
      dosage: '10-80mg daily with evening meal',
      sideEffects: 'Muscle pain, liver enzyme elevation, digestive issues',
      drugInteractions: 'Interacts with many medications via CYP3A4 pathway',
      foodInteractions: 'Must be taken with food; avoid grapefruit',
      supplementInteractions: 'Red yeast rice contains lovastatin; CoQ10 depletion',
      contraindications: 'Pregnancy, active liver disease',
      monitoring: 'Liver function, muscle symptoms, lipid panel',
      storage: 'Store at room temperature away from moisture and heat'
    }
  },
  {
    id: 'fluvastatin',
    name: 'Fluvastatin (Lescol®)',
    type: 'statin',
    generic: 'Fluvastatin',
    brand: 'Lescol',
    risk: 'low',
    info: {
      mechanism: 'Inhibits HMG-CoA reductase with unique metabolism',
      indications: 'Hyperlipidemia, coronary atherosclerosis',
      dosage: '20-80mg daily, preferably in the evening',
      sideEffects: 'Headache, insomnia, muscle pain (less common)',
      drugInteractions: 'Fewer interactions than other statins',
      foodInteractions: 'Can be taken with or without food',
      supplementInteractions: 'CoQ10 depletion possible',
      contraindications: 'Pregnancy, active liver disease',
      monitoring: 'Liver function, lipid panel',
      storage: 'Store at room temperature away from moisture'
    }
  },
  {
    id: 'pitavastatin',
    name: 'Pitavastatin (Livalo®)',
    type: 'statin',
    generic: 'Pitavastatin',
    brand: 'Livalo',
    risk: 'low',
    info: {
      mechanism: 'Newer statin with unique metabolism, not dependent on CYP3A4',
      indications: 'Primary hyperlipidemia, mixed dyslipidemia',
      dosage: '1-4mg once daily, any time of day',
      sideEffects: 'Muscle pain, back pain, constipation (generally well-tolerated)',
      drugInteractions: 'Fewer drug interactions than most statins',
      foodInteractions: 'Can be taken with or without food',
      supplementInteractions: 'CoQ10 depletion possible but less common',
      contraindications: 'Pregnancy, active liver disease, cyclosporine coadministration',
      monitoring: 'Liver function, lipid panel',
      storage: 'Store at room temperature away from moisture and heat'
    }
  },
  {
    id: 'ezetimibe',
    name: 'Ezetimibe (Zetia®)',
    type: 'absorption-inhibitor',
    generic: 'Ezetimibe',
    brand: 'Zetia',
    risk: 'low',
    info: {
      mechanism: 'Blocks intestinal absorption of cholesterol rather than production',
      indications: 'Primary hyperlipidemia, homozygous familial hypercholesterolemia',
      dosage: '10mg once daily, any time of day',
      sideEffects: 'Generally well-tolerated; diarrhea, joint pain',
      drugInteractions: 'Fibrates, cyclosporine',
      foodInteractions: 'Can be taken with or without food',
      supplementInteractions: 'Plant sterols may reduce efficacy',
      contraindications: 'Hypersensitivity, active liver disease when combined with a statin',
      monitoring: 'Lipid panel, liver function when combined with statin',
      storage: 'Store at room temperature away from moisture and heat'
    }
  },
  {
    id: 'alirocumab',
    name: 'Alirocumab (Praluent®)',
    type: 'pcsk9-inhibitor',
    generic: 'Alirocumab',
    brand: 'Praluent',
    risk: 'medium',
    info: {
      mechanism: 'Monoclonal antibody that blocks PCSK9, increasing LDL receptor recycling',
      indications: 'Familial hypercholesterolemia, clinical atherosclerotic disease',
      dosage: '75-150mg subcutaneous injection every 2 weeks',
      sideEffects: 'Injection site reactions, nasopharyngitis, influenza',
      drugInteractions: 'Few significant drug interactions',
      foodInteractions: 'No known food interactions',
      supplementInteractions: 'No significant supplement interactions reported',
      contraindications: 'Serious hypersensitivity to alirocumab',
      monitoring: 'Lipid panel',
      storage: 'Refrigerate; may be kept at room temperature up to 30 days'
    }
  },
  {
    id: 'evolocumab',
    name: 'Evolocumab (Repatha®)',
    type: 'pcsk9-inhibitor',
    generic: 'Evolocumab',
    brand: 'Repatha',
    risk: 'medium',
    info: {
      mechanism: 'Monoclonal antibody that blocks PCSK9, increasing LDL receptor availability',
      indications: 'Familial hypercholesterolemia, clinical atherosclerotic disease',
      dosage: '140mg every 2 weeks or 420mg monthly subcutaneous injection',
      sideEffects: 'Injection site reactions, upper respiratory infection, flu-like symptoms',
      drugInteractions: 'Few significant drug interactions',
      foodInteractions: 'No known food interactions',
      supplementInteractions: 'No significant supplement interactions reported',
      contraindications: 'Serious hypersensitivity to evolocumab',
      monitoring: 'Lipid panel',
      storage: 'Refrigerate; may be kept at room temperature up to 30 days'
    }
  },
  {
    id: 'bempedoic-acid',
    name: 'Bempedoic Acid (Nexletol®)',
    type: 'acl-inhibitor',
    generic: 'Bempedoic Acid',
    brand: 'Nexletol',
    risk: 'medium',
    info: {
      mechanism: 'Inhibits ATP citrate lyase (ACL), reducing cholesterol synthesis upstream of HMG-CoA reductase',
      indications: 'Adjunct to diet and maximally tolerated statin therapy for heterozygous familial hypercholesterolemia or established atherosclerotic cardiovascular disease',
      dosage: '180mg once daily, with or without food',
      sideEffects: 'Upper respiratory tract infection, muscle spasms, hyperuricemia, back pain',
      drugInteractions: 'Pravastatin, simvastatin',
      foodInteractions: 'Can be taken with or without food',
      supplementInteractions: 'Limited data available',
      contraindications: 'None listed in labeling',
      monitoring: 'Lipid panel, uric acid levels, tendon rupture risk',
      storage: 'Store at room temperature'
    }
  },
  {
    id: 'icosapent-ethyl',
    name: 'Icosapent Ethyl (Vascepa®)',
    type: 'omega-3',
    generic: 'Icosapent Ethyl',
    brand: 'Vascepa',
    risk: 'low',
    info: {
      mechanism: 'Purified EPA omega-3 fatty acid that reduces triglyceride production and may have anti-inflammatory effects',
      indications: 'Severe hypertriglyceridemia, cardiovascular risk reduction',
      dosage: '2g twice daily with food',
      sideEffects: 'Joint pain, pharyngitis, peripheral edema',
      drugInteractions: 'Anticoagulants, antiplatelet agents',
      foodInteractions: 'Take with food',
      supplementInteractions: 'Fish oil supplements may provide additive effects',
      contraindications: 'Known hypersensitivity',
      monitoring: 'Lipid panel, bleeding risk if on anticoagulants',
      storage: 'Store at room temperature'
    }
  },
  {
    id: 'colesevelam',
    name: 'Colesevelam (Welchol®)',
    type: 'bile-acid-sequestrant',
    generic: 'Colesevelam',
    brand: 'Welchol',
    risk: 'low',
    info: {
      mechanism: 'Binds bile acids in intestine, increasing conversion of cholesterol to bile acids',
      indications: 'Primary hyperlipidemia, type 2 diabetes (glycemic control)',
      dosage: '3.75g daily in 1-2 doses with meals',
      sideEffects: 'Constipation, dyspepsia, nausea',
      drugInteractions: 'Many drugs should be taken 4 hours apart from colesevelam',
      foodInteractions: 'Take with meals and plenty of water',
      supplementInteractions: 'May reduce absorption of fat-soluble vitamins (A, D, E, K)',
      contraindications: 'Bowel obstruction, triglycerides >500 mg/dL',
      monitoring: 'Lipid panel, blood glucose if diabetic',
      storage: 'Store at room temperature'
    }
  },
  {
    id: 'cholestyramine',
    name: 'Cholestyramine (Questran®)',
    type: 'bile-acid-sequestrant',
    generic: 'Cholestyramine',
    brand: 'Questran',
    risk: 'medium',
    info: {
      mechanism: 'Binds bile acids in intestine, increasing conversion of cholesterol to bile acids',
      indications: 'Primary hyperlipidemia, pruritus due to bile acid accumulation',
      dosage: '4-8g 1-2 times daily before meals',
      sideEffects: 'Constipation, abdominal discomfort, nausea, gas',
      drugInteractions: 'Many drugs should be taken 4-6 hours apart from cholestyramine',
      foodInteractions: 'Take before meals with plenty of water',
      supplementInteractions: 'Decreases absorption of fat-soluble vitamins (A, D, E, K)',
      contraindications: 'Complete biliary obstruction',
      monitoring: 'Lipid panel, fat-soluble vitamin levels',
      storage: 'Store at room temperature in a dry place'
    }
  },
  {
    id: 'fenofibrate',
    name: 'Fenofibrate (Tricor®)',
    type: 'fibrate',
    generic: 'Fenofibrate',
    brand: 'Tricor',
    risk: 'medium',
    info: {
      mechanism: 'Activates PPAR-alpha, reducing triglyceride production and increasing HDL',
      indications: 'Hypertriglyceridemia, mixed dyslipidemia',
      dosage: '48-145mg once daily with food',
      sideEffects: 'Abdominal pain, back pain, headache, elevated liver enzymes',
      drugInteractions: 'Statins (increased myopathy risk), warfarin, cyclosporine',
      foodInteractions: 'Take with food for better absorption',
      supplementInteractions: 'Fish oil may have additive effects',
      contraindications: 'Severe renal impairment, active liver disease, gallbladder disease',
      monitoring: 'Liver function, renal function, CBC, lipid panel',
      storage: 'Store at room temperature away from moisture and heat'
    }
  },
  {
    id: 'gemfibrozil',
    name: 'Gemfibrozil (Lopid®)',
    type: 'fibrate',
    generic: 'Gemfibrozil',
    brand: 'Lopid',
    risk: 'high',
    info: {
      mechanism: 'Activates PPAR-alpha, reducing triglyceride production and increasing HDL',
      indications: 'Hypertriglyceridemia, reduction of coronary heart disease risk',
      dosage: '600mg twice daily, 30 minutes before meals',
      sideEffects: 'Dyspepsia, abdominal pain, diarrhea, fatigue',
      drugInteractions: 'Significant interaction with statins (contraindicated with some)',
      foodInteractions: 'Take 30 minutes before meals',
      supplementInteractions: 'Fish oil may have additive effects',
      contraindications: 'Severe renal or hepatic impairment, gallbladder disease',
      monitoring: 'Liver function, CBC, lipid panel',
      storage: 'Store at room temperature away from moisture and heat'
    }
  },
  {
    id: 'niacin',
    name: 'Niacin (Niaspan®)',
    type: 'vitamin-b3',
    generic: 'Niacin',
    brand: 'Niaspan',
    risk: 'medium',
    info: {
      mechanism: 'Inhibits hepatic triglyceride synthesis and VLDL secretion, increases HDL',
      indications: 'Dyslipidemia, hypertriglyceridemia',
      dosage: '500-2000mg daily at bedtime, titrate slowly',
      sideEffects: 'Flushing, pruritus, headache, increased glucose',
      drugInteractions: 'Statins (myopathy risk), antihypertensives',
      foodInteractions: 'Take with a low-fat snack at bedtime; avoid alcohol and hot beverages',
      supplementInteractions: 'No significant interactions',
      contraindications: 'Active liver disease, active peptic ulcer, arterial bleeding',
      monitoring: 'Liver function, glucose, uric acid, lipid panel',
      storage: 'Store at room temperature away from moisture and heat'
    }
  },
  {
    id: 'lomitapide',
    name: 'Lomitapide (Juxtapid®)',
    type: 'mtp-inhibitor',
    generic: 'Lomitapide',
    brand: 'Juxtapid',
    risk: 'high',
    info: {
      mechanism: 'Inhibits microsomal triglyceride transfer protein (MTP), reducing VLDL production',
      indications: 'Homozygous familial hypercholesterolemia',
      dosage: '5-60mg once daily, titrated slowly',
      sideEffects: 'Diarrhea, nausea, vomiting, abdominal pain, elevated liver enzymes',
      drugInteractions: 'Many via CYP3A4 pathway',
      foodInteractions: 'Take with water 2 hours after evening meal; low-fat diet required',
      supplementInteractions: 'Vitamin E and fatty acid supplements recommended',
      contraindications: 'Pregnancy, moderate/severe hepatic impairment',
      monitoring: 'Liver function (REMS program required), lipid panel',
      storage: 'Store at room temperature away from moisture and heat'
    }
  },
  {
    id: 'evinacumab',
    name: 'Evinacumab (Evkeeza®)',
    type: 'angptl3-inhibitor',
    generic: 'Evinacumab',
    brand: 'Evkeeza',
    risk: 'medium',
    info: {
      mechanism: 'Monoclonal antibody that inhibits ANGPTL3, reducing LDL-C and triglycerides',
      indications: 'Homozygous familial hypercholesterolemia',
      dosage: '15 mg/kg IV infusion every 4 weeks',
      sideEffects: 'Nasopharyngitis, influenza-like illness, dizziness, rhinorrhea',
      drugInteractions: 'Limited data available',
      foodInteractions: 'No known food interactions (IV administration)',
      supplementInteractions: 'No known supplement interactions',
      contraindications: 'Serious hypersensitivity to evinacumab',
      monitoring: 'Lipid panel',
      storage: 'Refrigerate; protect from light'
    }
  },
  {
    id: 'inclisiran',
    name: 'Inclisiran (Leqvio®)',
    type: 'sirna',
    generic: 'Inclisiran',
    brand: 'Leqvio',
    risk: 'medium',
    info: {
      mechanism: 'Small interfering RNA that inhibits PCSK9 production in the liver',
      indications: 'Heterozygous familial hypercholesterolemia, clinical atherosclerotic disease',
      dosage: 'Initial dose, second dose at 3 months, then every 6 months',
      sideEffects: 'Injection site reaction, arthralgia, urinary tract infection',
      drugInteractions: 'No significant drug interactions identified',
      foodInteractions: 'No known food interactions',
      supplementInteractions: 'No known supplement interactions',
      contraindications: 'Severe hypersensitivity to inclisiran',
      monitoring: 'Lipid panel',
      storage: 'Refrigerate; may be kept at room temperature up to 24 hours'
    }
  }
];

export function MedicationSelector({ onSelect, category }: MedicationSelectorProps) {
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
  const [selectedInfoCategory, setSelectedInfoCategory] = useState<string>('mechanism');
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [sortOrder, setSortOrder] = useState<'name' | 'type' | 'risk'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleMedicationClick = (medicationId: string) => {
    if (selectedMedication === medicationId) {
      setShowActionButtons(!showActionButtons);
    } else {
      setSelectedMedication(medicationId);
      setShowActionButtons(true);
    }
  };

  const handleAddMedication = () => {
    if (!selectedMedication) return;
    
    const medication = CHOLESTEROL_MEDICATIONS.find(med => med.id === selectedMedication);
    if (!medication) return;
    
    onSelect({
      category: 'PRESCRIPTION',
      name: medication.name,
      genericName: medication.generic,
      dosage: '',
      frequency: '',
      purpose: medication.type,
      doctorName: '',
      expirationDate: ''
    });
    
    // Reset selection
    setSelectedMedication(null);
    setShowActionButtons(false);
  };

  const handleEditMedication = () => {
    if (!selectedMedication) return;
    
    const medication = CHOLESTEROL_MEDICATIONS.find(med => med.id === selectedMedication);
    if (!medication) return;
    
    onSelect({
      category: 'PRESCRIPTION',
      name: medication.name,
      genericName: medication.generic,
      dosage: '',
      frequency: '',
      purpose: medication.type,
      doctorName: '',
      expirationDate: ''
    });
    
    // Reset selection
    setSelectedMedication(null);
    setShowActionButtons(false);
  };

  const handleSort = (order: 'name' | 'type' | 'risk') => {
    if (sortOrder === order) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort order and reset direction to ascending
      setSortOrder(order);
      setSortDirection('asc');
    }
  };

  // Sort medications based on current sort settings
  const sortedMedications = [...CHOLESTEROL_MEDICATIONS].sort((a, b) => {
    let comparison = 0;
    
    if (sortOrder === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortOrder === 'type') {
      comparison = a.type.localeCompare(b.type);
    } else if (sortOrder === 'risk') {
      const riskOrder = { low: 1, medium: 2, high: 3 };
      comparison = riskOrder[a.risk] - riskOrder[b.risk];
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700 border border-yellow-200 mb-4">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>
          Select a cholesterol medication from the grid below. Click on a medication to view detailed information.
        </p>
      </div>

      {/* Info Category Selector */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Select information to display:</h3>
        <div className="flex flex-wrap gap-2">
          {MEDICATION_INFO_CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedInfoCategory(category.id)}
              className={cn(
                "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full transition-colors",
                selectedInfoCategory === category.id
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
              )}
            >
              <category.icon className="w-3 h-3" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Color Coding Reference */}
        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Risk Level Color Coding:</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-100 border border-green-200"></div>
              <span className="text-xs text-gray-600">Low Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-yellow-100 border border-yellow-200"></div>
              <span className="text-xs text-gray-600">Medium Risk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div>
              <span className="text-xs text-gray-600">High Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleSort('name')}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
            sortOrder === 'name'
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          )}
        >
          <span>Sort by Name</span>
          {sortOrder === 'name' && (
            <ArrowUpDown className="w-3 h-3" />
          )}
        </button>
        <button
          onClick={() => handleSort('type')}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
            sortOrder === 'type'
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          )}
        >
          <span>Sort by Type</span>
          {sortOrder === 'type' && (
            <ArrowUpDown className="w-3 h-3" />
          )}
        </button>
        <button
          onClick={() => handleSort('risk')}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
            sortOrder === 'risk'
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          )}
        >
          <span>Sort by Risk</span>
          {sortOrder === 'risk' && (
            <ArrowUpDown className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* Medication Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMedications.map(medication => {
          const isSelected = selectedMedication === medication.id;
          const infoCategory = MEDICATION_INFO_CATEGORIES.find(cat => cat.id === selectedInfoCategory);
          const InfoIcon = infoCategory?.icon || Info;
          
          return (
            <div 
              key={medication.id}
              className={cn(
                "border rounded-lg overflow-hidden transition-all",
                isSelected ? "border-blue-300 shadow-md" : "border-gray-200 hover:border-blue-200",
                medication.risk === 'high' ? "bg-red-50" : 
                medication.risk === 'medium' ? "bg-yellow-50" : "bg-green-50"
              )}
            >
              <div 
                className={cn(
                  "p-4 cursor-pointer",
                  medication.risk === 'high' ? "bg-red-100/50" : 
                  medication.risk === 'medium' ? "bg-yellow-100/50" : "bg-green-100/50"
                )}
                onClick={() => handleMedicationClick(medication.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    medication.risk === 'high' ? "bg-red-100" : 
                    medication.risk === 'medium' ? "bg-yellow-100" : "bg-green-100"
                  )}>
                    <Pill className={cn(
                      "w-5 h-5",
                      medication.risk === 'high' ? "text-red-600" : 
                      medication.risk === 'medium' ? "text-yellow-600" : "text-green-600"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{medication.name}</h4>
                    <p className="text-sm text-gray-600">{medication.type.replace('-', ' ')}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white">
                <div className="flex items-start gap-2 mb-3">
                  <InfoIcon className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-sm font-medium text-gray-700">{infoCategory?.label}</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {medication.info[selectedInfoCategory as keyof typeof medication.info]}
                    </p>
                  </div>
                </div>

                {isSelected && showActionButtons && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={handleAddMedication}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to My Prescriptions</span>
                    </button>
                    <button
                      onClick={handleEditMedication}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
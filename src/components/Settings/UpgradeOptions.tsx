import React, { useState } from 'react';
import { Shield, Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function UpgradeOptions() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  // Plan features
  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, annually: 0 },
      description: 'Basic nutrition tracking for personal use',
      features: [
        { name: 'Food Analysis', value: '5/day', included: true },
        { name: 'Nutrition Tracking', value: 'Basic', included: true },
        { name: 'Heart Health Insights', value: 'Basic', included: true },
        { name: 'Medication Tracking', value: '3 max', included: true },
        { name: 'AI Provider Options', value: 'OpenAI only', included: true }
      ],
      current: true,
      discount: 0
    },
    {
      name: 'Pro',
      price: { 
        monthly: 10, 
        annually: 102 // 15% off
      },
      description: 'Advanced nutrition and medication tracking',
      features: [
        { name: 'Food Analysis', value: 'Unlimited', included: true },
        { name: 'Advanced Reports', value: '', included: true },
        { name: 'Heart Health Insights', value: 'Advanced', included: true },
        { name: 'Medication Tracking', value: 'Unlimited', included: true },
        { name: 'BYOK OpenAI GPT-40', value: '', included: true }
      ],
      current: false,
      discount: 15
    },
    {
      name: 'Premium',
      price: { 
        monthly: 20, 
        annually: 180 // 25% off
      },
      description: 'Complete health monitoring solution',
      features: [
        { name: 'Food Analysis', value: 'Unlimited', included: true },
        { name: 'Custom Reports', value: '', included: true },
        { name: 'Heart Health Insights', value: 'Premium', included: true },
        { name: 'All AI Providers', value: '', included: true },
        { name: 'Advanced Interactions', value: '', included: true }
      ],
      popular: true,
      current: false,
      discount: 25
    },
    {
      name: 'Lifetime',
      price: { 
        monthly: 300, 
        annually: 300 // One-time payment
      },
      description: 'One-time payment for lifetime access',
      features: [
        { name: 'All Premium Features', value: '', included: true },
        { name: 'Lifetime Updates', value: '', included: true },
        { name: 'Priority Support', value: '', included: true },
        { name: 'Early Access', value: '', included: true },
        { name: 'Custom Integrations', value: '', included: true }
      ],
      current: false,
      lifetime: true
    }
  ];

  // Feature comparison table data organized by categories
  const featureComparisonData = [
    {
      category: "DASHBOARD",
      features: [
        { feature: "Health Metrics Dashboard", free: "Basic", pro: "Advanced", premium: "Premium", lifetime: "Premium" },
        { feature: "Progress Tracking", free: "7 days", pro: "90 days", premium: "Unlimited", lifetime: "Unlimited" },
        { feature: "Nutritional Goal Setting", free: "Basic", pro: "Advanced", premium: "Premium", lifetime: "Premium" }
      ]
    },
    {
      category: "HISTORY",
      features: [
        { feature: "Data Export", free: "CSV", pro: "CSV, PDF", premium: "CSV, PDF, API", lifetime: "CSV, PDF, API" },
        { feature: "Custom Reports", free: "No", pro: "Basic", premium: "Advanced", lifetime: "Advanced" }
      ]
    },
    {
      category: "FOOD",
      features: [
        { feature: "Food Analysis", free: "5/day", pro: "Unlimited", premium: "Unlimited", lifetime: "Unlimited" },
        { feature: "Nutrition Tracking", free: "Basic", pro: "Advanced", premium: "Advanced", lifetime: "Advanced" },
        { feature: "Meal Planning", free: "No", pro: "Basic", premium: "Advanced", lifetime: "Advanced" },
        { feature: "Recipe Analysis", free: "No", pro: "Yes", premium: "Yes", lifetime: "Yes" },
        { feature: "Food-Medication Interactions", free: "Basic", pro: "Advanced", premium: "Premium", lifetime: "Premium" }
      ]
    },
    {
      category: "PRESCRIPTIONS",
      features: [
        { feature: "Medication Tracking", free: "3 max", pro: "Unlimited", premium: "Unlimited", lifetime: "Unlimited" },
        { feature: "Medication Reminders", free: "No", pro: "Yes", premium: "Yes", lifetime: "Yes" }
      ]
    },
    {
      category: "OTC",
      features: [
        { feature: "OTC Tracking", free: "No", pro: "Yes", premium: "Yes", lifetime: "Yes" },
        { feature: "OTC Interactions", free: "No", pro: "Basic", premium: "Advanced", lifetime: "Advanced" }
      ]
    },
    {
      category: "SUPPLEMENTS",
      features: [
        { feature: "Supplement Tracking", free: "No", pro: "Yes", premium: "Yes", lifetime: "Yes" },
        { feature: "Supplement Interactions", free: "No", pro: "Basic", premium: "Advanced", lifetime: "Advanced" }
      ]
    },
    {
      category: "PROFILE",
      features: [
        { feature: "Heart Health Insights", free: "Basic", pro: "Advanced", premium: "Premium", lifetime: "Premium" },
        { feature: "Multi-device Sync", free: "No", pro: "3 devices", premium: "Unlimited", lifetime: "Unlimited" },
        { feature: "Family Accounts", free: "No", pro: "Up to 2", premium: "Up to 5", lifetime: "Up to 5" },
        { feature: "Offline Mode", free: "No", pro: "Limited", premium: "Full", lifetime: "Full" }
      ]
    },
    {
      category: "SETTINGS",
      features: [
        { feature: "AI Provider Options", free: "OpenAI only", pro: "OpenAI", premium: "All Providers", lifetime: "All Providers" },
        { feature: "BYOK (Bring Your Own Key)", free: "No", pro: "Yes", premium: "Yes", lifetime: "Yes" },
        { feature: "Priority Support", free: "No", pro: "No", premium: "Yes", lifetime: "Yes" },
        { feature: "Early Access to Features", free: "No", pro: "No", premium: "Yes", lifetime: "Yes" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <p className="text-gray-600">Simple pricing. No hidden fees. Advanced features for your health journey.</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors",
              billingCycle === 'monthly' 
                ? "bg-blue-500 text-white" 
                : "text-gray-700 hover:bg-gray-200"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annually')}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-colors relative",
              billingCycle === 'annually' 
                ? "bg-blue-500 text-white" 
                : "text-gray-700 hover:bg-gray-200"
            )}
          >
            Annually
            {billingCycle === 'annually' && plans[1].discount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                Save
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={cn(
              "bg-white rounded-lg border overflow-hidden relative flex flex-col",
              plan.current ? "border-blue-300 shadow-md" : "border-gray-200"
            )}
          >
            {plan.popular && (
              <div className="absolute -right-12 top-6 bg-red-500 text-white px-12 py-1 transform rotate-45">
                Popular
              </div>
            )}
            
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
              <div className="mb-4">
                {plan.lifetime ? (
                  <>
                    <span className="text-3xl font-bold">${plan.price.annually}</span>
                    <span className="text-gray-500 text-sm"> one-time</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-bold">
                      ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annually}
                    </span>
                    {!plan.lifetime && (
                      <span className="text-gray-500 text-sm">
                        /{billingCycle === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                    {billingCycle === 'annually' && plan.discount > 0 && (
                      <span className="ml-2 text-green-600 text-sm font-medium">
                        {plan.discount}% off
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-6">{plan.description}</p>
              
              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                    )}
                    <span className="text-sm">
                      {feature.value && `${feature.value} `}{feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="px-6 pb-6 mt-auto">
              <button
                className={cn(
                  "w-full py-2 px-4 rounded-md font-medium transition-colors",
                  plan.current 
                    ? "bg-gray-200 text-gray-800 cursor-default" 
                    : "bg-blue-500 text-white hover:bg-blue-600"
                )}
              >
                {plan.current ? 'Your Current Plan' : 'Change Plan'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Comparison Table */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6 text-center">Feature Comparison</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 border-b">Feature</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-b">Free</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-b">Pro</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-b">Premium</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-700 border-b">Lifetime</th>
              </tr>
            </thead>
            <tbody>
              {featureComparisonData.map((category, categoryIndex) => (
                <React.Fragment key={categoryIndex}>
                  {/* Category Header Row */}
                  <tr>
                    <td 
                      colSpan={5} 
                      className="py-2 px-4 font-bold text-gray-800 bg-gray-100 border-b border-gray-200"
                    >
                      {category.category}
                    </td>
                  </tr>
                  
                  {/* Feature Rows */}
                  {category.features.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 text-sm text-gray-700 border-b">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-sm text-gray-700 border-b">
                        {row.free === "Yes" ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : row.free === "No" ? (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          row.free
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-700 border-b">
                        {row.pro === "Yes" ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : row.pro === "No" ? (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          row.pro
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-700 border-b">
                        {row.premium === "Yes" ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : row.premium === "No" ? (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          row.premium
                        )}
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-700 border-b">
                        {row.lifetime === "Yes" ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : row.lifetime === "No" ? (
                          <X className="w-5 h-5 text-red-500 mx-auto" />
                        ) : (
                          row.lifetime
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
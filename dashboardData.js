export const dashboardData = {
  generatedAt: '2026-04-28T15:30:00.000Z',
  businesses: [
    { id: 'dental', name: 'Dental Clinics', type: 'NHS + Private', dailyRevenue: 48250, dailyProfit: 14200, status: 'Attention' },
    { id: 'medical', name: 'Medical Clinics', type: 'Clinical services', dailyRevenue: 31800, dailyProfit: 9800, status: 'Healthy' },
    { id: 'sofina-ai', name: 'AI App', type: 'AI product', dailyRevenue: 9200, dailyProfit: 3300, status: 'Growth' },
    { id: 'vr-product', name: 'VR Product', type: 'Product sales', dailyRevenue: 6400, dailyProfit: -1200, status: 'Underperforming' },
    { id: 'property-investments', name: 'Property + Investments', type: 'Assets', dailyRevenue: 12850, dailyProfit: 7600, status: 'Healthy' }
  ],
  dental: {
    sites: [
      { clinic: 'Clinic A', appointments: 92, appointmentTarget: 110, patientsPerSession: 11.8, udaPercent: 91 },
      { clinic: 'Clinic B', appointments: 124, appointmentTarget: 120, patientsPerSession: 14.2, udaPercent: 104 },
      { clinic: 'Clinic C', appointments: 76, appointmentTarget: 96, patientsPerSession: 9.4, udaPercent: 78 }
    ],
    alerts: [
      { clinic: 'Clinic A', metric: 'appointments', message: '18 appointments below target today.' },
      { clinic: 'Clinic C', metric: 'uda', message: 'UDA performance below 80% threshold.' }
    ]
  },
  finance: [
    { period: 'today', revenue: 108500, costs: 74800, profit: 33700 },
    { period: 'month', revenue: 2240000, costs: 1545000, profit: 695000 },
    { period: 'forecast', revenue: 2710000, costs: 1810000, profit: 900000 }
  ],
  marketing: [
    { channel: 'Google Ads', leads: 318, conversionRate: 18.4, costPerLead: 31 },
    { channel: 'Meta Ads', leads: 226, conversionRate: 11.8, costPerLead: 24 },
    { channel: 'Organic / Referral', leads: 142, conversionRate: 27.2, costPerLead: 6 }
  ],
  compliance: {
    overallCompletionRate: 86,
    managers: [
      { manager: 'Practice Manager A', site: 'Clinic A', completed: 43, total: 50, completionRate: 86, overdue: 3 },
      { manager: 'Practice Manager B', site: 'Clinic B', completed: 57, total: 60, completionRate: 95, overdue: 0 },
      { manager: 'Practice Manager C', site: 'Clinic C', completed: 31, total: 45, completionRate: 69, overdue: 8 },
      { manager: 'Operations Manager', site: 'Medical Clinics', completed: 38, total: 42, completionRate: 90, overdue: 1 }
    ]
  },
  alerts: [
    { priority: 'high', business: 'Dental Clinics', message: 'Clinic C is 18 UDA points below target.' },
    { priority: 'high', business: 'VR Product', message: 'Negative daily profit detected.' },
    { priority: 'high', business: 'Compliance', message: 'Clinic C manager compliance is below 75% with 8 overdue tasks.' },
    { priority: 'medium', business: 'Dental Clinics', message: 'Appointment target missed by 34 appointments.' },
    { priority: 'medium', business: 'Marketing', message: 'Google Ads CPL increased 12% week-on-week.' }
  ]
};

import type { DateRange } from '@/contexts/DateRangeContext';
import type { RangedStats, RangedChanges } from '@/lib/rangedData';
import type { ServiceData, LeadSource, Technician, Customer, OverdueInvoice, Alert, Job, MonthlyRevenue } from '@/types';

// ─── KPI stats ─────────────────────────────────────────────────────────────

export const rangedStats: Record<DateRange, RangedStats> = {
  today: {
    totalRevenue: 2200,     avgJobValue: 220,       profitMargin: 31,
    outstandingInvoices: 8900, revenuePerTechnician: 440,
    ltv: 1240, crr: 71, cac: 198, ltvCacRatio: 6.3, repeatCustomerRate: 58, avgReviewRating: 4.5,
    jobCompletionRate: 93,  firstTimeFixRate: 86,   avgResponseTimeHours: 2.8,
    technicianUtilization: 82, callbackRate: 7,     activeJobs: 8,
    leadConversionRate: 32, estimatesWon: 60,       costPerLead: 30,
    totalLeads: 8,          totalConversions: 3,
  },
  '7d': {
    totalRevenue: 12300,    avgJobValue: 234,       profitMargin: 30,
    outstandingInvoices: 8900, revenuePerTechnician: 2460,
    ltv: 1240, crr: 71, cac: 198, ltvCacRatio: 6.3, repeatCustomerRate: 58, avgReviewRating: 4.5,
    jobCompletionRate: 92,  firstTimeFixRate: 84,   avgResponseTimeHours: 3.0,
    technicianUtilization: 74, callbackRate: 8,     activeJobs: 8,
    leadConversionRate: 30, estimatesWon: 58,       costPerLead: 31,
    totalLeads: 56,         totalConversions: 17,
  },
  '30d': {
    totalRevenue: 52400,    avgJobValue: 248,       profitMargin: 29,
    outstandingInvoices: 8900, revenuePerTechnician: 10480,
    ltv: 1240, crr: 71, cac: 198, ltvCacRatio: 6.3, repeatCustomerRate: 58, avgReviewRating: 4.5,
    jobCompletionRate: 92,  firstTimeFixRate: 83,   avgResponseTimeHours: 3.1,
    technicianUtilization: 71, callbackRate: 9,     activeJobs: 8,
    leadConversionRate: 29, estimatesWon: 57,       costPerLead: 32,
    totalLeads: 248,        totalConversions: 72,
  },
  quarter: {
    totalRevenue: 150200,   avgJobValue: 242,       profitMargin: 28,
    outstandingInvoices: 8900, revenuePerTechnician: 30040,
    ltv: 1240, crr: 70, cac: 204, ltvCacRatio: 6.1, repeatCustomerRate: 56, avgReviewRating: 4.4,
    jobCompletionRate: 91,  firstTimeFixRate: 82,   avgResponseTimeHours: 3.2,
    technicianUtilization: 70, callbackRate: 9,     activeJobs: 8,
    leadConversionRate: 28, estimatesWon: 56,       costPerLead: 33,
    totalLeads: 712,        totalConversions: 199,
  },
  year: {
    totalRevenue: 238600,   avgJobValue: 238,       profitMargin: 27,
    outstandingInvoices: 8900, revenuePerTechnician: 47720,
    ltv: 1240, crr: 69, cac: 210, ltvCacRatio: 5.9, repeatCustomerRate: 54, avgReviewRating: 4.4,
    jobCompletionRate: 90,  firstTimeFixRate: 81,   avgResponseTimeHours: 3.4,
    technicianUtilization: 68, callbackRate: 10,    activeJobs: 8,
    leadConversionRate: 27, estimatesWon: 55,       costPerLead: 35,
    totalLeads: 1248,       totalConversions: 337,
  },
};

// ─── Period-over-period % changes ──────────────────────────────────────────

export const rangedChanges: Record<DateRange, RangedChanges> = {
  today: {
    totalRevenue: 8.2,       avgJobValue: 3.1,        profitMargin: 2.3,
    outstandingInvoices: 1.4, revenuePerTechnician: 8.2,
    ltv: 0.3,  crr: 0.8,  cac: -1.5,  ltvCacRatio: 0.9,
    repeatCustomerRate: 0.6, avgReviewRating: 0.0,
    jobCompletionRate: 1.8,  firstTimeFixRate: 4.2,   avgResponseTimeHours: -14.3,
    technicianUtilization: 6.1, callbackRate: -12.5,  activeJobs: 3.2,
    leadConversionRate: 4.8, estimatesWon: 5.3,       costPerLead: -2.8,
    totalLeads: 6.3,         totalConversions: 8.7,
  },
  '7d': {
    totalRevenue: 5.4,       avgJobValue: 1.9,        profitMargin: 2.1,
    outstandingInvoices: 0.9, revenuePerTechnician: 5.4,
    ltv: 0.3,  crr: 0.8,  cac: -1.2,  ltvCacRatio: 0.7,
    repeatCustomerRate: 0.6, avgReviewRating: 0.0,
    jobCompletionRate: 0.8,  firstTimeFixRate: 2.7,   avgResponseTimeHours: -10.0,
    technicianUtilization: 3.4, callbackRate: -9.1,   activeJobs: 3.2,
    leadConversionRate: 3.6, estimatesWon: 4.1,       costPerLead: -5.2,
    totalLeads: 5.1,         totalConversions: 7.4,
  },
  '30d': {
    totalRevenue: 3.8,       avgJobValue: 1.6,        profitMargin: 1.9,
    outstandingInvoices: -1.2, revenuePerTechnician: 3.8,
    ltv: 0.3,  crr: 0.8,  cac: -1.8,  ltvCacRatio: 1.1,
    repeatCustomerRate: 1.2, avgReviewRating: 0.1,
    jobCompletionRate: 0.4,  firstTimeFixRate: 0.9,   avgResponseTimeHours: -6.5,
    technicianUtilization: 2.2, callbackRate: -4.2,   activeJobs: 3.2,
    leadConversionRate: 1.8, estimatesWon: 1.4,       costPerLead: -2.6,
    totalLeads: 5.8,         totalConversions: 4.3,
  },
  quarter: {
    totalRevenue: 5.2,       avgJobValue: 0.9,        profitMargin: 1.5,
    outstandingInvoices: 2.8, revenuePerTechnician: 5.2,
    ltv: 0.3,  crr: 0.8,  cac: -1.1,  ltvCacRatio: 0.8,
    repeatCustomerRate: 1.4, avgReviewRating: 0.1,
    jobCompletionRate: 0.3,  firstTimeFixRate: 0.6,   avgResponseTimeHours: -5.9,
    technicianUtilization: 1.7, callbackRate: -3.8,   activeJobs: 3.2,
    leadConversionRate: 2.4, estimatesWon: 1.9,       costPerLead: -3.8,
    totalLeads: 6.4,         totalConversions: 5.1,
  },
  year: {
    totalRevenue: 9.7,       avgJobValue: 2.8,        profitMargin: 2.1,
    outstandingInvoices: 3.6, revenuePerTechnician: 9.7,
    ltv: 0.8,  crr: 1.5,  cac: -2.9,  ltvCacRatio: 3.2,
    repeatCustomerRate: 2.1, avgReviewRating: 0.0,
    jobCompletionRate: 0.8,  firstTimeFixRate: 1.9,   avgResponseTimeHours: -11.2,
    technicianUtilization: 3.6, callbackRate: -8.3,   activeJobs: 3.2,
    leadConversionRate: 2.6, estimatesWon: 2.9,       costPerLead: -3.9,
    totalLeads: 8.2,         totalConversions: 9.4,
  },
};

// ─── Monthly revenue (for Reports page) ────────────────────────────────────

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jun', revenue: 48200, jobs: 201 },
  { month: 'Jul', revenue: 51800, jobs: 217 },
  { month: 'Aug', revenue: 49200, jobs: 206 },
  { month: 'Sep', revenue: 52400, jobs: 220 },
  { month: 'Oct', revenue: 46800, jobs: 196 },
  { month: 'Nov', revenue: 43200, jobs: 181 },
  { month: 'Dec', revenue: 38800, jobs: 163 },
  { month: 'Jan', revenue: 56400, jobs: 236 },
  { month: 'Feb', revenue: 54200, jobs: 227 },
  { month: 'Mar', revenue: 48200, jobs: 201 },
  { month: 'Apr', revenue: 50200, jobs: 210 },
  { month: 'May', revenue: 52400, jobs: 220 },
];

// ─── Revenue chart ─────────────────────────────────────────────────────────

export const revenueChartData: Record<DateRange, { label: string; revenue: number }[]> = {
  today: [
    { label: '8 AM',  revenue: 160  },
    { label: '9 AM',  revenue: 340  },
    { label: '10 AM', revenue: 680  },
    { label: '11 AM', revenue: 940  },
    { label: '12 PM', revenue: 1100 },
    { label: '1 PM',  revenue: 1420 },
    { label: '2 PM',  revenue: 1790 },
    { label: '3 PM',  revenue: 2200 },
  ],
  '7d': [
    { label: 'Mon', revenue: 1620 },
    { label: 'Tue', revenue: 1840 },
    { label: 'Wed', revenue: 1680 },
    { label: 'Thu', revenue: 2000 },
    { label: 'Fri', revenue: 2360 },
    { label: 'Sat', revenue: 1730 },
    { label: 'Sun', revenue: 1070 },
  ],
  '30d': [
    { label: 'Apr 14', revenue: 12280 },
    { label: 'Apr 21', revenue: 13640 },
    { label: 'Apr 28', revenue: 12960 },
    { label: 'May 5',  revenue: 13440 },
  ],
  quarter: [
    { label: 'Mar', revenue: 48200 },
    { label: 'Apr', revenue: 50200 },
    { label: 'May', revenue: 52400 },
  ],
  year: [
    { label: 'Jun', revenue: 48200 },
    { label: 'Jul', revenue: 51800 },
    { label: 'Aug', revenue: 49200 },
    { label: 'Sep', revenue: 52400 },
    { label: 'Oct', revenue: 46800 },
    { label: 'Nov', revenue: 43200 },
    { label: 'Dec', revenue: 38800 },
    { label: 'Jan', revenue: 56400 },
    { label: 'Feb', revenue: 54200 },
    { label: 'Mar', revenue: 48200 },
    { label: 'Apr', revenue: 50200 },
    { label: 'May', revenue: 52400 },
  ],
};

// ─── Service revenue ────────────────────────────────────────────────────────

export const rangedServiceData: Record<DateRange, ServiceData[]> = {
  today: [
    { service: 'Drain Cleaning',   revenue: 760,   jobs: 4,  color: '#0ea5e9' },
    { service: 'Plumbing Repair',  revenue: 620,   jobs: 3,  color: '#0284c7' },
    { service: 'Water Heater',     revenue: 470,   jobs: 1,  color: '#f97316' },
    { service: 'Emergency',        revenue: 230,   jobs: 1,  color: '#dc2626' },
    { service: 'Pipe Repair',      revenue: 120,   jobs: 1,  color: '#64748b' },
  ],
  '7d': [
    { service: 'Drain Cleaning',   revenue: 4270,  jobs: 23, color: '#0ea5e9' },
    { service: 'Plumbing Repair',  revenue: 3470,  jobs: 14, color: '#0284c7' },
    { service: 'Water Heater',     revenue: 2630,  jobs: 7,  color: '#f97316' },
    { service: 'Emergency',        revenue: 1270,  jobs: 5,  color: '#dc2626' },
    { service: 'Pipe Repair',      revenue: 660,   jobs: 3,  color: '#64748b' },
  ],
  '30d': [
    { service: 'Drain Cleaning',   revenue: 18200, jobs: 94, color: '#0ea5e9' },
    { service: 'Plumbing Repair',  revenue: 14800, jobs: 59, color: '#0284c7' },
    { service: 'Water Heater',     revenue: 11200, jobs: 28, color: '#f97316' },
    { service: 'Emergency',        revenue: 5400,  jobs: 22, color: '#dc2626' },
    { service: 'Pipe Repair',      revenue: 2800,  jobs: 8,  color: '#64748b' },
  ],
  quarter: [
    { service: 'Drain Cleaning',   revenue: 52100, jobs: 271, color: '#0ea5e9' },
    { service: 'Plumbing Repair',  revenue: 42400, jobs: 170, color: '#0284c7' },
    { service: 'Water Heater',     revenue: 32100, jobs: 80,  color: '#f97316' },
    { service: 'Emergency',        revenue: 15500, jobs: 63,  color: '#dc2626' },
    { service: 'Pipe Repair',      revenue: 8100,  jobs: 23,  color: '#64748b' },
  ],
  year: [
    { service: 'Drain Cleaning',   revenue: 82800, jobs: 433, color: '#0ea5e9' },
    { service: 'Plumbing Repair',  revenue: 67300, jobs: 272, color: '#0284c7' },
    { service: 'Water Heater',     revenue: 51100, jobs: 128, color: '#f97316' },
    { service: 'Emergency',        revenue: 24600, jobs: 100, color: '#dc2626' },
    { service: 'Pipe Repair',      revenue: 12800, jobs: 37,  color: '#64748b' },
  ],
};

// ─── Lead sources ───────────────────────────────────────────────────────────

export const rangedLeadSources: Record<DateRange, LeadSource[]> = {
  today: [
    { source: 'Referrals',      leads: 3,   conversions: 1,  spend: 0,     color: '#d97706' },
    { source: 'Google Ads',     leads: 2,   conversions: 1,  spend: 90,    color: '#2563eb' },
    { source: 'Organic Search', leads: 2,   conversions: 0,  spend: 35,    color: '#16a34a' },
    { source: 'Yelp',           leads: 1,   conversions: 0,  spend: 28,    color: '#dc2626' },
    { source: 'Nextdoor',       leads: 0,   conversions: 0,  spend: 0,     color: '#0ea5e9' },
  ],
  '7d': [
    { source: 'Referrals',      leads: 18,  conversions: 8,  spend: 0,     color: '#d97706' },
    { source: 'Google Ads',     leads: 15,  conversions: 4,  spend: 505,   color: '#2563eb' },
    { source: 'Organic Search', leads: 12,  conversions: 3,  spend: 188,   color: '#16a34a' },
    { source: 'Yelp',           leads: 8,   conversions: 2,  spend: 156,   color: '#dc2626' },
    { source: 'Nextdoor',       leads: 3,   conversions: 1,  spend: 0,     color: '#0ea5e9' },
  ],
  '30d': [
    { source: 'Referrals',      leads: 78,  conversions: 34, spend: 0,     color: '#d97706' },
    { source: 'Google Ads',     leads: 68,  conversions: 18, spend: 2200,  color: '#2563eb' },
    { source: 'Organic Search', leads: 52,  conversions: 14, spend: 820,   color: '#16a34a' },
    { source: 'Yelp',           leads: 34,  conversions: 8,  spend: 680,   color: '#dc2626' },
    { source: 'Nextdoor',       leads: 16,  conversions: 4,  spend: 0,     color: '#0ea5e9' },
  ],
  quarter: [
    { source: 'Referrals',      leads: 224, conversions: 98, spend: 0,     color: '#d97706' },
    { source: 'Google Ads',     leads: 196, conversions: 52, spend: 6320,  color: '#2563eb' },
    { source: 'Organic Search', leads: 150, conversions: 40, spend: 2360,  color: '#16a34a' },
    { source: 'Yelp',           leads: 98,  conversions: 24, spend: 1960,  color: '#dc2626' },
    { source: 'Nextdoor',       leads: 44,  conversions: 11, spend: 0,     color: '#0ea5e9' },
  ],
  year: [
    { source: 'Referrals',      leads: 392, conversions: 172, spend: 0,    color: '#d97706' },
    { source: 'Google Ads',     leads: 344, conversions: 91,  spend: 11100, color: '#2563eb' },
    { source: 'Organic Search', leads: 264, conversions: 71,  spend: 4140,  color: '#16a34a' },
    { source: 'Yelp',           leads: 172, conversions: 43,  spend: 3440,  color: '#dc2626' },
    { source: 'Nextdoor',       leads: 76,  conversions: 20,  spend: 0,    color: '#0ea5e9' },
  ],
};

// ─── Technician utilization ─────────────────────────────────────────────────

export const rangedTechUtilization: Record<DateRange, { name: string; utilization: number }[]> = {
  today:   [{ name: 'Maria', utilization: 88 }, { name: 'Carlos', utilization: 84 }, { name: 'Pete', utilization: 83 }, { name: 'Amy', utilization: 78 }, { name: 'Ben', utilization: 80 }],
  '7d':    [{ name: 'Maria', utilization: 83 }, { name: 'Carlos', utilization: 79 }, { name: 'Pete', utilization: 79 }, { name: 'Amy', utilization: 75 }, { name: 'Ben', utilization: 76 }],
  '30d':   [{ name: 'Maria', utilization: 77 }, { name: 'Carlos', utilization: 74 }, { name: 'Pete', utilization: 74 }, { name: 'Amy', utilization: 70 }, { name: 'Ben', utilization: 71 }],
  quarter: [{ name: 'Maria', utilization: 75 }, { name: 'Carlos', utilization: 72 }, { name: 'Pete', utilization: 71 }, { name: 'Amy', utilization: 68 }, { name: 'Ben', utilization: 69 }],
  year:    [{ name: 'Maria', utilization: 73 }, { name: 'Carlos', utilization: 70 }, { name: 'Pete', utilization: 69 }, { name: 'Amy', utilization: 66 }, { name: 'Ben', utilization: 67 }],
};

// ─── New vs retained customer chart ────────────────────────────────────────

export const rangedCustomerChart: Record<DateRange, { month: string; new: number; retained: number }[]> = {
  today:   [{ month: 'Today',  new: 2,  retained: 8   }],
  '7d':    [{ month: 'Mon', new: 2, retained: 12 }, { month: 'Tue', new: 3, retained: 14 }, { month: 'Wed', new: 2, retained: 11 }, { month: 'Thu', new: 3, retained: 13 }, { month: 'Fri', new: 4, retained: 16 }, { month: 'Sat', new: 3, retained: 12 }, { month: 'Sun', new: 1, retained: 8 }],
  '30d':   [{ month: 'Apr 14', new: 7, retained: 32 }, { month: 'Apr 21', new: 9, retained: 35 }, { month: 'Apr 28', new: 8, retained: 33 }, { month: 'May 5', new: 8, retained: 34 }],
  quarter: [{ month: 'Mar', new: 26, retained: 98 }, { month: 'Apr', new: 29, retained: 104 }, { month: 'May', new: 32, retained: 109 }],
  year:    [{ month: 'Jun', new: 26, retained: 96 }, { month: 'Jul', new: 29, retained: 102 }, { month: 'Aug', new: 24, retained: 98 }, { month: 'Sep', new: 28, retained: 104 }, { month: 'Oct', new: 22, retained: 96 }, { month: 'Nov', new: 18, retained: 88 }, { month: 'Dec', new: 20, retained: 86 }, { month: 'Jan', new: 24, retained: 90 }, { month: 'Feb', new: 22, retained: 92 }, { month: 'Mar', new: 26, retained: 98 }, { month: 'Apr', new: 29, retained: 104 }, { month: 'May', new: 32, retained: 109 }],
};

// ─── Technician roster ──────────────────────────────────────────────────────

export const technicians: Technician[] = [
  { id: 'r1', name: 'Maria Valdez',  hoursWorked: 168, billableHours: 130, jobsCompleted: 48, revenue: 12800, firstTimeFixRate: 88, callbackRate: 7  },
  { id: 'r2', name: 'Carlos Reyes',  hoursWorked: 168, billableHours: 124, jobsCompleted: 44, revenue: 11200, firstTimeFixRate: 85, callbackRate: 8  },
  { id: 'r3', name: 'Pete Hoffman',  hoursWorked: 160, billableHours: 118, jobsCompleted: 42, revenue: 10600, firstTimeFixRate: 84, callbackRate: 9  },
  { id: 'r4', name: 'Amy Walsh',     hoursWorked: 160, billableHours: 112, jobsCompleted: 38, revenue: 9800,  firstTimeFixRate: 82, callbackRate: 10 },
  { id: 'r5', name: 'Ben Torres',    hoursWorked: 152, billableHours: 108, jobsCompleted: 34, revenue: 8000,  firstTimeFixRate: 80, callbackRate: 12 },
];

// ─── Customers ──────────────────────────────────────────────────────────────

export const customers: Customer[] = [
  { id: 'rc1', name: 'River Heights Apartments', email: 'mgr@riverheights.com',   totalJobs: 6, totalSpent: 4600, lastJobDate: '2025-05-10', rating: 5 },
  { id: 'rc2', name: 'Frank Castellano',          email: 'f.castellano@email.com', totalJobs: 8, totalSpent: 2800, lastJobDate: '2025-05-09', rating: 4 },
  { id: 'rc3', name: 'The Pike Restaurant',        email: 'ops@pikecafe.com',       totalJobs: 6, totalSpent: 2200, lastJobDate: '2025-05-11', rating: 4 },
  { id: 'rc4', name: 'Dave & Sue Mitchell',        email: 'd.mitchell@email.com',   totalJobs: 5, totalSpent: 1960, lastJobDate: '2025-05-11', rating: 5 },
  { id: 'rc5', name: 'Nina Okafor',                email: 'n.okafor@email.com',     totalJobs: 4, totalSpent: 1360, lastJobDate: '2025-05-09', rating: 5 },
  { id: 'rc6', name: 'Steve Kowalski',             email: 's.kowalski@email.com',   totalJobs: 2, totalSpent: 840,  lastJobDate: '2025-05-08', rating: 3 },
];

// ─── Overdue invoices ───────────────────────────────────────────────────────

export const overdueInvoices: OverdueInvoice[] = [
  { id: 'INV-2205', customer: 'River Heights Apartments', service: 'Water Heater Install', amount: 1200, daysOverdue: 2,  phone: '(720) 555-8800' },
  { id: 'INV-2203', customer: 'Steve Kowalski',           service: 'Plumbing Repair',      amount: 420,  daysOverdue: 3,  phone: '(720) 555-4521' },
  { id: 'INV-2201', customer: 'Frank Castellano',         service: 'Drain Cleaning',        amount: 280,  daysOverdue: 4,  phone: '(720) 555-6634' },
];

// ─── Alerts ─────────────────────────────────────────────────────────────────

export const alerts: Alert[] = [
  { id: 'ra1', type: 'bad-review',      title: '3-Star Review on Google',         description: 'Steve Kowalski — "Took 3 hours to show up. Fixed it but not happy."', severity: 'high'   },
  { id: 'ra2', type: 'overdue-invoice', title: 'Invoice #2205 Overdue',           description: 'River Heights Apartments — $1,200 — 2 days past due',                  severity: 'high'   },
  { id: 'ra3', type: 'callback',        title: 'High Callback Rate — Ben Torres', description: '2 callback jobs this month, above the 1-job team average',              severity: 'medium' },
  { id: 'ra4', type: 'overdue-invoice', title: 'Invoice #2201 Overdue',           description: 'Frank Castellano — $280 — 4 days past due',                             severity: 'medium' },
];

// ─── Recent jobs ─────────────────────────────────────────────────────────────

export const recentJobs: Job[] = [
  { id: 'J-2208', customer: 'Dave & Sue Mitchell',        service: 'Drain Cleaning',     technician: 'Maria Valdez',  date: '2025-05-11', status: 'completed',   value: 180,  isPaid: true  },
  { id: 'J-2207', customer: 'The Pike Restaurant',         service: 'Emergency Plumbing', technician: 'Carlos Reyes',  date: '2025-05-11', status: 'in-progress', value: 420,  isPaid: false },
  { id: 'J-2206', customer: 'Frank Castellano',            service: 'Plumbing Repair',    technician: 'Pete Hoffman',  date: '2025-05-10', status: 'completed',   value: 280,  isPaid: true  },
  { id: 'J-2205', customer: 'River Heights Apartments',    service: 'Water Heater',       technician: 'Maria Valdez',  date: '2025-05-10', status: 'completed',   value: 1200, isPaid: false, daysOverdue: 2 },
  { id: 'J-2204', customer: 'Nina Okafor',                 service: 'Pipe Repair',        technician: 'Amy Walsh',     date: '2025-05-09', status: 'completed',   value: 340,  isPaid: true  },
  { id: 'J-2203', customer: 'Steve Kowalski',              service: 'Plumbing Repair',    technician: 'Ben Torres',    date: '2025-05-08', status: 'completed',   value: 420,  isPaid: false, daysOverdue: 3 },
  { id: 'J-2202', customer: 'Dave & Sue Mitchell',         service: 'Drain Cleaning',     technician: 'Carlos Reyes',  date: '2025-05-08', status: 'completed',   value: 180,  isPaid: true  },
  { id: 'J-2201', customer: 'Frank Castellano',            service: 'Drain Cleaning',     technician: 'Pete Hoffman',  date: '2025-05-07', status: 'completed',   value: 280,  isPaid: false, daysOverdue: 4 },
  { id: 'J-2200', customer: 'River Heights Apartments',    service: 'Pipe Repair',        technician: 'Maria Valdez',  date: '2025-05-07', status: 'completed',   value: 480,  isPaid: true  },
  { id: 'J-2199', customer: 'Nina Okafor',                 service: 'Plumbing Repair',    technician: 'Amy Walsh',     date: '2025-05-06', status: 'cancelled',   value: 0,    isPaid: false },
];

import type { DateRange } from '@/contexts/DateRangeContext';
import type { RangedStats, RangedChanges } from '@/lib/rangedData';
import type { ServiceData, LeadSource, Technician, Customer, OverdueInvoice, Alert, Job, MonthlyRevenue } from '@/types';

// ─── KPI stats ─────────────────────────────────────────────────────────────

export const rangedStats: Record<DateRange, RangedStats> = {
  today: {
    totalRevenue: 3720,     avgJobValue: 465,       profitMargin: 36,
    outstandingInvoices: 14200, revenuePerTechnician: 744,
    ltv: 2180, crr: 74, cac: 218, ltvCacRatio: 10.0, repeatCustomerRate: 61, avgReviewRating: 4.8,
    jobCompletionRate: 95,  firstTimeFixRate: 91,   avgResponseTimeHours: 2.1,
    technicianUtilization: 84, callbackRate: 5,     activeJobs: 11,
    leadConversionRate: 38, estimatesWon: 66,       costPerLead: 24,
    totalLeads: 13,         totalConversions: 5,
  },
  '7d': {
    totalRevenue: 17400,    avgJobValue: 471,       profitMargin: 35,
    outstandingInvoices: 14200, revenuePerTechnician: 3480,
    ltv: 2180, crr: 74, cac: 218, ltvCacRatio: 10.0, repeatCustomerRate: 61, avgReviewRating: 4.8,
    jobCompletionRate: 94,  firstTimeFixRate: 89,   avgResponseTimeHours: 2.3,
    technicianUtilization: 80, callbackRate: 6,     activeJobs: 11,
    leadConversionRate: 37, estimatesWon: 64,       costPerLead: 25,
    totalLeads: 74,         totalConversions: 27,
  },
  '30d': {
    totalRevenue: 68400,    avgJobValue: 468,       profitMargin: 34,
    outstandingInvoices: 14200, revenuePerTechnician: 13680,
    ltv: 2180, crr: 74, cac: 218, ltvCacRatio: 10.0, repeatCustomerRate: 61, avgReviewRating: 4.8,
    jobCompletionRate: 94,  firstTimeFixRate: 88,   avgResponseTimeHours: 2.4,
    technicianUtilization: 77, callbackRate: 6,     activeJobs: 11,
    leadConversionRate: 36, estimatesWon: 63,       costPerLead: 26,
    totalLeads: 316,        totalConversions: 114,
  },
  quarter: {
    totalRevenue: 198600,   avgJobValue: 461,       profitMargin: 33,
    outstandingInvoices: 14200, revenuePerTechnician: 39720,
    ltv: 2180, crr: 73, cac: 224, ltvCacRatio: 9.7, repeatCustomerRate: 59, avgReviewRating: 4.8,
    jobCompletionRate: 93,  firstTimeFixRate: 87,   avgResponseTimeHours: 2.5,
    technicianUtilization: 76, callbackRate: 7,     activeJobs: 11,
    leadConversionRate: 35, estimatesWon: 62,       costPerLead: 27,
    totalLeads: 910,        totalConversions: 319,
  },
  year: {
    totalRevenue: 788400,   avgJobValue: 458,       profitMargin: 33,
    outstandingInvoices: 14200, revenuePerTechnician: 157680,
    ltv: 2180, crr: 72, cac: 230, ltvCacRatio: 9.5, repeatCustomerRate: 57, avgReviewRating: 4.7,
    jobCompletionRate: 92,  firstTimeFixRate: 86,   avgResponseTimeHours: 2.7,
    technicianUtilization: 74, callbackRate: 7,     activeJobs: 11,
    leadConversionRate: 34, estimatesWon: 61,       costPerLead: 28,
    totalLeads: 3640,       totalConversions: 1238,
  },
};

// ─── Period-over-period % changes ──────────────────────────────────────────

export const rangedChanges: Record<DateRange, RangedChanges> = {
  today: {
    totalRevenue: 7.4,       avgJobValue: 2.8,        profitMargin: 2.6,
    outstandingInvoices: 1.6, revenuePerTechnician: 7.4,
    ltv: 0.4,  crr: 1.0,  cac: -1.8,  ltvCacRatio: 1.1,
    repeatCustomerRate: 0.7, avgReviewRating: 0.0,
    jobCompletionRate: 2.0,  firstTimeFixRate: 5.0,   avgResponseTimeHours: -16.0,
    technicianUtilization: 5.8, callbackRate: -16.7,  activeJobs: 4.0,
    leadConversionRate: 5.6, estimatesWon: 6.1,       costPerLead: -4.0,
    totalLeads: 8.3,         totalConversions: 11.1,
  },
  '7d': {
    totalRevenue: 6.2,       avgJobValue: 2.1,        profitMargin: 2.3,
    outstandingInvoices: 1.1, revenuePerTechnician: 6.2,
    ltv: 0.4,  crr: 1.0,  cac: -1.4,  ltvCacRatio: 0.8,
    repeatCustomerRate: 0.7, avgReviewRating: 0.0,
    jobCompletionRate: 1.2,  firstTimeFixRate: 3.2,   avgResponseTimeHours: -11.8,
    technicianUtilization: 4.0, callbackRate: -11.1,  activeJobs: 4.0,
    leadConversionRate: 3.9, estimatesWon: 4.4,       costPerLead: -6.0,
    totalLeads: 6.6,         totalConversions: 8.1,
  },
  '30d': {
    totalRevenue: 4.8,       avgJobValue: 1.7,        profitMargin: 2.1,
    outstandingInvoices: -0.6, revenuePerTechnician: 4.8,
    ltv: 0.4,  crr: 1.0,  cac: -2.0,  ltvCacRatio: 1.3,
    repeatCustomerRate: 1.4, avgReviewRating: 0.1,
    jobCompletionRate: 0.6,  firstTimeFixRate: 1.4,   avgResponseTimeHours: -7.7,
    technicianUtilization: 3.1, callbackRate: -6.3,   activeJobs: 4.0,
    leadConversionRate: 2.6, estimatesWon: 2.1,       costPerLead: -3.7,
    totalLeads: 7.2,         totalConversions: 5.8,
  },
  quarter: {
    totalRevenue: 7.1,       avgJobValue: 1.3,        profitMargin: 1.8,
    outstandingInvoices: 2.4, revenuePerTechnician: 7.1,
    ltv: 0.4,  crr: 1.0,  cac: -1.3,  ltvCacRatio: 0.9,
    repeatCustomerRate: 1.5, avgReviewRating: 0.1,
    jobCompletionRate: 0.4,  firstTimeFixRate: 0.9,   avgResponseTimeHours: -7.1,
    technicianUtilization: 2.4, callbackRate: -5.9,   activeJobs: 4.0,
    leadConversionRate: 3.2, estimatesWon: 2.6,       costPerLead: -4.2,
    totalLeads: 8.4,         totalConversions: 6.9,
  },
  year: {
    totalRevenue: 9.1,       avgJobValue: 2.7,        profitMargin: 2.4,
    outstandingInvoices: 3.8, revenuePerTechnician: 9.1,
    ltv: 1.2,  crr: 2.2,  cac: -3.6,  ltvCacRatio: 4.6,
    repeatCustomerRate: 2.6, avgReviewRating: 0.2,
    jobCompletionRate: 1.2,  firstTimeFixRate: 2.6,   avgResponseTimeHours: -14.5,
    technicianUtilization: 4.6, callbackRate: -12.5,  activeJobs: 4.0,
    leadConversionRate: 3.4, estimatesWon: 3.8,       costPerLead: -5.2,
    totalLeads: 10.4,        totalConversions: 12.1,
  },
};

// ─── Monthly revenue ────────────────────────────────────────────────────────

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jun', revenue: 71200, jobs: 152 },
  { month: 'Jul', revenue: 74800, jobs: 160 },
  { month: 'Aug', revenue: 72400, jobs: 155 },
  { month: 'Sep', revenue: 66800, jobs: 143 },
  { month: 'Oct', revenue: 63200, jobs: 135 },
  { month: 'Nov', revenue: 61400, jobs: 131 },
  { month: 'Dec', revenue: 64800, jobs: 138 },
  { month: 'Jan', revenue: 67200, jobs: 144 },
  { month: 'Feb', revenue: 65600, jobs: 140 },
  { month: 'Mar', revenue: 68400, jobs: 146 },
  { month: 'Apr', revenue: 70800, jobs: 151 },
  { month: 'May', revenue: 68400, jobs: 146 },
];

// ─── Revenue chart ──────────────────────────────────────────────────────────

export const revenueChartData: Record<DateRange, { label: string; revenue: number }[]> = {
  today: [
    { label: '8 AM',  revenue: 240  },
    { label: '9 AM',  revenue: 490  },
    { label: '10 AM', revenue: 980  },
    { label: '11 AM', revenue: 1440 },
    { label: '12 PM', revenue: 1680 },
    { label: '1 PM',  revenue: 2160 },
    { label: '2 PM',  revenue: 2800 },
    { label: '3 PM',  revenue: 3720 },
  ],
  '7d': [
    { label: 'Mon', revenue: 2280 },
    { label: 'Tue', revenue: 2640 },
    { label: 'Wed', revenue: 2420 },
    { label: 'Thu', revenue: 2860 },
    { label: 'Fri', revenue: 3480 },
    { label: 'Sat', revenue: 2580 },
    { label: 'Sun', revenue: 1140 },
  ],
  '30d': [
    { label: 'Apr 14', revenue: 16200 },
    { label: 'Apr 21', revenue: 18100 },
    { label: 'Apr 28', revenue: 17200 },
    { label: 'May 5',  revenue: 16900 },
  ],
  quarter: [
    { label: 'Mar', revenue: 68400 },
    { label: 'Apr', revenue: 70800 },
    { label: 'May', revenue: 68400 },
  ],
  year: [
    { label: 'Jun', revenue: 71200 },
    { label: 'Jul', revenue: 74800 },
    { label: 'Aug', revenue: 72400 },
    { label: 'Sep', revenue: 66800 },
    { label: 'Oct', revenue: 63200 },
    { label: 'Nov', revenue: 61400 },
    { label: 'Dec', revenue: 64800 },
    { label: 'Jan', revenue: 67200 },
    { label: 'Feb', revenue: 65600 },
    { label: 'Mar', revenue: 68400 },
    { label: 'Apr', revenue: 70800 },
    { label: 'May', revenue: 68400 },
  ],
};

// ─── Service revenue ────────────────────────────────────────────────────────

export const rangedServiceData: Record<DateRange, ServiceData[]> = {
  today: [
    { service: 'Panel Upgrade',    revenue: 1480, jobs: 2,  color: '#f59e0b' },
    { service: 'Wiring & Outlets', revenue: 840,  jobs: 3,  color: '#d97706' },
    { service: 'EV Charger',       revenue: 680,  jobs: 1,  color: '#10b981' },
    { service: 'Generator',        revenue: 490,  jobs: 1,  color: '#6366f1' },
    { service: 'Lighting',         revenue: 230,  jobs: 1,  color: '#64748b' },
  ],
  '7d': [
    { service: 'Panel Upgrade',    revenue: 6960, jobs: 9,  color: '#f59e0b' },
    { service: 'Wiring & Outlets', revenue: 3940, jobs: 14, color: '#d97706' },
    { service: 'EV Charger',       revenue: 3200, jobs: 5,  color: '#10b981' },
    { service: 'Generator',        revenue: 2300, jobs: 4,  color: '#6366f1' },
    { service: 'Lighting',         revenue: 1000, jobs: 5,  color: '#64748b' },
  ],
  '30d': [
    { service: 'Panel Upgrade',    revenue: 27400, jobs: 37, color: '#f59e0b' },
    { service: 'Wiring & Outlets', revenue: 16800, jobs: 60, color: '#d97706' },
    { service: 'EV Charger',       revenue: 12600, jobs: 20, color: '#10b981' },
    { service: 'Generator',        revenue: 7400,  jobs: 14, color: '#6366f1' },
    { service: 'Lighting',         revenue: 4200,  jobs: 15, color: '#64748b' },
  ],
  quarter: [
    { service: 'Panel Upgrade',    revenue: 79400, jobs: 107, color: '#f59e0b' },
    { service: 'Wiring & Outlets', revenue: 48700, jobs: 174, color: '#d97706' },
    { service: 'EV Charger',       revenue: 36500, jobs: 58,  color: '#10b981' },
    { service: 'Generator',        revenue: 21400, jobs: 40,  color: '#6366f1' },
    { service: 'Lighting',         revenue: 12600, jobs: 45,  color: '#64748b' },
  ],
  year: [
    { service: 'Panel Upgrade',    revenue: 244200, jobs: 330, color: '#f59e0b' },
    { service: 'Wiring & Outlets', revenue: 149800, jobs: 536, color: '#d97706' },
    { service: 'EV Charger',       revenue: 112200, jobs: 179, color: '#10b981' },
    { service: 'Generator',        revenue: 66000,  jobs: 124, color: '#6366f1' },
    { service: 'Lighting',         revenue: 38600,  jobs: 138, color: '#64748b' },
  ],
};

// ─── Lead sources ───────────────────────────────────────────────────────────

export const rangedLeadSources: Record<DateRange, LeadSource[]> = {
  today: [
    { source: 'Google Ads',     leads: 5,   conversions: 2,  spend: 148,  color: '#2563eb' },
    { source: 'Referrals',      leads: 4,   conversions: 2,  spend: 0,    color: '#d97706' },
    { source: 'Organic Search', leads: 3,   conversions: 1,  spend: 62,   color: '#16a34a' },
    { source: 'Yelp',           leads: 1,   conversions: 0,  spend: 40,   color: '#dc2626' },
  ],
  '7d': [
    { source: 'Google Ads',     leads: 28,  conversions: 11, spend: 820,  color: '#2563eb' },
    { source: 'Referrals',      leads: 22,  conversions: 10, spend: 0,    color: '#d97706' },
    { source: 'Organic Search', leads: 16,  conversions: 5,  spend: 340,  color: '#16a34a' },
    { source: 'Yelp',           leads: 8,   conversions: 1,  spend: 220,  color: '#dc2626' },
  ],
  '30d': [
    { source: 'Google Ads',     leads: 120, conversions: 46, spend: 3520, color: '#2563eb' },
    { source: 'Referrals',      leads: 96,  conversions: 43, spend: 0,    color: '#d97706' },
    { source: 'Organic Search', leads: 68,  conversions: 22, spend: 1480, color: '#16a34a' },
    { source: 'Yelp',           leads: 32,  conversions: 6,  spend: 960,  color: '#dc2626' },
  ],
  quarter: [
    { source: 'Google Ads',     leads: 346, conversions: 132, spend: 10140, color: '#2563eb' },
    { source: 'Referrals',      leads: 276, conversions: 124, spend: 0,     color: '#d97706' },
    { source: 'Organic Search', leads: 196, conversions: 63,  spend: 4260,  color: '#16a34a' },
    { source: 'Yelp',           leads: 92,  conversions: 17,  spend: 2760,  color: '#dc2626' },
  ],
  year: [
    { source: 'Google Ads',     leads: 1384, conversions: 530, spend: 40560, color: '#2563eb' },
    { source: 'Referrals',      leads: 1104, conversions: 496, spend: 0,     color: '#d97706' },
    { source: 'Organic Search', leads: 784,  conversions: 252, spend: 17040, color: '#16a34a' },
    { source: 'Yelp',           leads: 368,  conversions: 68,  spend: 11040, color: '#dc2626' },
  ],
};

// ─── Technician utilization ─────────────────────────────────────────────────

export const rangedTechUtilization: Record<DateRange, { name: string; utilization: number }[]> = {
  today:   [{ name: 'Jordan', utilization: 91 }, { name: 'Deb',   utilization: 88 }, { name: 'Ray',   utilization: 86 }, { name: 'Nina',  utilization: 82 }, { name: 'Chris', utilization: 79 }],
  '7d':    [{ name: 'Jordan', utilization: 86 }, { name: 'Deb',   utilization: 83 }, { name: 'Ray',   utilization: 81 }, { name: 'Nina',  utilization: 78 }, { name: 'Chris', utilization: 75 }],
  '30d':   [{ name: 'Jordan', utilization: 82 }, { name: 'Deb',   utilization: 79 }, { name: 'Ray',   utilization: 77 }, { name: 'Nina',  utilization: 74 }, { name: 'Chris', utilization: 71 }],
  quarter: [{ name: 'Jordan', utilization: 80 }, { name: 'Deb',   utilization: 77 }, { name: 'Ray',   utilization: 75 }, { name: 'Nina',  utilization: 72 }, { name: 'Chris', utilization: 69 }],
  year:    [{ name: 'Jordan', utilization: 78 }, { name: 'Deb',   utilization: 75 }, { name: 'Ray',   utilization: 73 }, { name: 'Nina',  utilization: 70 }, { name: 'Chris', utilization: 67 }],
};

// ─── New vs retained customer chart ────────────────────────────────────────

export const rangedCustomerChart: Record<DateRange, { month: string; new: number; retained: number }[]> = {
  today:   [{ month: 'Today',  new: 3,  retained: 16   }],
  '7d':    [{ month: 'Mon', new: 4, retained: 18 }, { month: 'Tue', new: 5, retained: 20 }, { month: 'Wed', new: 3, retained: 17 }, { month: 'Thu', new: 5, retained: 21 }, { month: 'Fri', new: 6, retained: 24 }, { month: 'Sat', new: 4, retained: 18 }, { month: 'Sun', new: 2, retained: 10 }],
  '30d':   [{ month: 'Apr 14', new: 11, retained: 45 }, { month: 'Apr 21', new: 14, retained: 49 }, { month: 'Apr 28', new: 12, retained: 47 }, { month: 'May 5', new: 13, retained: 48 }],
  quarter: [{ month: 'Mar', new: 42, retained: 136 }, { month: 'Apr', new: 46, retained: 142 }, { month: 'May', new: 44, retained: 140 }],
  year:    [{ month: 'Jun', new: 44, retained: 136 }, { month: 'Jul', new: 48, retained: 142 }, { month: 'Aug', new: 42, retained: 138 }, { month: 'Sep', new: 38, retained: 132 }, { month: 'Oct', new: 34, retained: 128 }, { month: 'Nov', new: 30, retained: 122 }, { month: 'Dec', new: 34, retained: 126 }, { month: 'Jan', new: 38, retained: 130 }, { month: 'Feb', new: 36, retained: 131 }, { month: 'Mar', new: 42, retained: 136 }, { month: 'Apr', new: 46, retained: 142 }, { month: 'May', new: 44, retained: 140 }],
};

// ─── Technician roster ──────────────────────────────────────────────────────

export const technicians: Technician[] = [
  { id: 'e1', name: 'Jordan Mills',  hoursWorked: 168, billableHours: 144, jobsCompleted: 34, revenue: 16800, firstTimeFixRate: 93, callbackRate: 4 },
  { id: 'e2', name: 'Deb Carter',    hoursWorked: 168, billableHours: 138, jobsCompleted: 31, revenue: 15200, firstTimeFixRate: 91, callbackRate: 5 },
  { id: 'e3', name: 'Ray Okafor',    hoursWorked: 160, billableHours: 130, jobsCompleted: 29, revenue: 14400, firstTimeFixRate: 90, callbackRate: 6 },
  { id: 'e4', name: 'Nina Patel',    hoursWorked: 160, billableHours: 124, jobsCompleted: 26, revenue: 12600, firstTimeFixRate: 87, callbackRate: 7 },
  { id: 'e5', name: 'Chris Webb',    hoursWorked: 152, billableHours: 114, jobsCompleted: 22, revenue: 9400,  firstTimeFixRate: 84, callbackRate: 9 },
];

// ─── Customers ──────────────────────────────────────────────────────────────

export const customers: Customer[] = [
  { id: 'ec1', name: 'Greenfield Builders',    email: 'ops@greenfieldbuilders.com', totalJobs: 9,  totalSpent: 14200, lastJobDate: '2025-05-11', rating: 5 },
  { id: 'ec2', name: 'Paul & Karen Nguyen',    email: 'p.nguyen@email.com',         totalJobs: 6,  totalSpent: 4800,  lastJobDate: '2025-05-09', rating: 5 },
  { id: 'ec3', name: 'Sun Valley Gym',         email: 'mgr@sunvalleygym.com',       totalJobs: 7,  totalSpent: 6200,  lastJobDate: '2025-05-10', rating: 4 },
  { id: 'ec4', name: 'Derek Okafor',           email: 'd.okafor@email.com',         totalJobs: 4,  totalSpent: 2800,  lastJobDate: '2025-05-08', rating: 5 },
  { id: 'ec5', name: 'Maria Castillo',         email: 'm.castillo@email.com',       totalJobs: 3,  totalSpent: 1960,  lastJobDate: '2025-05-09', rating: 4 },
  { id: 'ec6', name: 'West Mesa Auto',         email: 'svc@westmesaauto.com',       totalJobs: 2,  totalSpent: 1840,  lastJobDate: '2025-05-07', rating: 4 },
];

// ─── Overdue invoices ───────────────────────────────────────────────────────

export const overdueInvoices: OverdueInvoice[] = [
  { id: 'INV-3318', customer: 'Greenfield Builders', service: 'Panel Upgrade',    amount: 2400, daysOverdue: 3,  phone: '(602) 555-1100' },
  { id: 'INV-3314', customer: 'Sun Valley Gym',       service: 'EV Charger Install', amount: 1680, daysOverdue: 5,  phone: '(602) 555-8820' },
  { id: 'INV-3309', customer: 'West Mesa Auto',        service: 'Wiring & Outlets', amount: 920,  daysOverdue: 9,  phone: '(602) 555-4490' },
];

// ─── Alerts ─────────────────────────────────────────────────────────────────

export const alerts: Alert[] = [
  { id: 'ea1', type: 'overdue-invoice', title: 'Invoice #3318 Overdue',         description: 'Greenfield Builders — $2,400 — 3 days past due',                             severity: 'high'   },
  { id: 'ea2', type: 'bad-review',      title: '2-Star Review on Google',        description: 'Maria Castillo — "Tech arrived late and left a mess. Disappointed."',         severity: 'high'   },
  { id: 'ea3', type: 'overdue-invoice', title: 'Invoice #3314 Overdue',         description: 'Sun Valley Gym — $1,680 — 5 days past due',                                   severity: 'medium' },
  { id: 'ea4', type: 'callback',        title: 'High Callback Rate — Chris Webb', description: '2 callback jobs this month, above the 1-job team average',                   severity: 'medium' },
];

// ─── Recent jobs ─────────────────────────────────────────────────────────────

export const recentJobs: Job[] = [
  { id: 'J-3322', customer: 'Greenfield Builders',  service: 'Panel Upgrade',      technician: 'Jordan Mills', date: '2025-05-11', status: 'completed',   value: 2400, isPaid: false, daysOverdue: 3  },
  { id: 'J-3321', customer: 'Paul & Karen Nguyen',  service: 'EV Charger Install', technician: 'Deb Carter',   date: '2025-05-11', status: 'in-progress', value: 1680, isPaid: false },
  { id: 'J-3320', customer: 'Sun Valley Gym',        service: 'Wiring & Outlets',   technician: 'Ray Okafor',   date: '2025-05-10', status: 'completed',   value: 840,  isPaid: true  },
  { id: 'J-3319', customer: 'Derek Okafor',          service: 'Generator Install',  technician: 'Jordan Mills', date: '2025-05-10', status: 'completed',   value: 2200, isPaid: true  },
  { id: 'J-3318', customer: 'Sun Valley Gym',        service: 'EV Charger Install', technician: 'Nina Patel',   date: '2025-05-09', status: 'completed',   value: 1680, isPaid: false, daysOverdue: 5  },
  { id: 'J-3317', customer: 'Maria Castillo',        service: 'Ceiling Fan Install',technician: 'Chris Webb',   date: '2025-05-09', status: 'completed',   value: 240,  isPaid: true  },
  { id: 'J-3316', customer: 'West Mesa Auto',         service: 'Wiring & Outlets',   technician: 'Deb Carter',   date: '2025-05-08', status: 'completed',   value: 920,  isPaid: false, daysOverdue: 9  },
  { id: 'J-3315', customer: 'Paul & Karen Nguyen',  service: 'Lighting Upgrade',   technician: 'Ray Okafor',   date: '2025-05-08', status: 'completed',   value: 480,  isPaid: true  },
  { id: 'J-3314', customer: 'Greenfield Builders',  service: 'Wiring & Outlets',   technician: 'Jordan Mills', date: '2025-05-07', status: 'completed',   value: 1120, isPaid: true  },
  { id: 'J-3313', customer: 'Derek Okafor',          service: 'Panel Upgrade',      technician: 'Deb Carter',   date: '2025-05-07', status: 'cancelled',   value: 0,    isPaid: false },
];

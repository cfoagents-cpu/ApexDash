import type { DateRange } from '@/contexts/DateRangeContext';
import type { RangedStats, RangedChanges } from '@/lib/rangedData';
import type { ServiceData, LeadSource, Technician, Customer, OverdueInvoice, Alert, Job, MonthlyRevenue } from '@/types';

// ─── KPI stats ─────────────────────────────────────────────────────────────
// Roofing: high avg job value, fewer jobs, strong spring/summer seasonality.

export const rangedStats: Record<DateRange, RangedStats> = {
  today: {
    totalRevenue: 9800,     avgJobValue: 3267,      profitMargin: 28,
    outstandingInvoices: 42600, revenuePerTechnician: 2450,
    ltv: 4200, crr: 58, cac: 380, ltvCacRatio: 11.1, repeatCustomerRate: 38, avgReviewRating: 4.6,
    jobCompletionRate: 92,  firstTimeFixRate: 89,   avgResponseTimeHours: 4.2,
    technicianUtilization: 88, callbackRate: 4,     activeJobs: 6,
    leadConversionRate: 29, estimatesWon: 54,       costPerLead: 58,
    totalLeads: 10,         totalConversions: 3,
  },
  '7d': {
    totalRevenue: 54600,    avgJobValue: 3250,      profitMargin: 27,
    outstandingInvoices: 42600, revenuePerTechnician: 13650,
    ltv: 4200, crr: 58, cac: 380, ltvCacRatio: 11.1, repeatCustomerRate: 38, avgReviewRating: 4.6,
    jobCompletionRate: 91,  firstTimeFixRate: 88,   avgResponseTimeHours: 4.4,
    technicianUtilization: 84, callbackRate: 5,     activeJobs: 6,
    leadConversionRate: 28, estimatesWon: 53,       costPerLead: 60,
    totalLeads: 60,         totalConversions: 17,
  },
  '30d': {
    totalRevenue: 214800,   avgJobValue: 3184,      profitMargin: 26,
    outstandingInvoices: 42600, revenuePerTechnician: 53700,
    ltv: 4200, crr: 58, cac: 380, ltvCacRatio: 11.1, repeatCustomerRate: 38, avgReviewRating: 4.6,
    jobCompletionRate: 90,  firstTimeFixRate: 87,   avgResponseTimeHours: 4.6,
    technicianUtilization: 80, callbackRate: 5,     activeJobs: 6,
    leadConversionRate: 27, estimatesWon: 52,       costPerLead: 62,
    totalLeads: 248,        totalConversions: 67,
  },
  quarter: {
    totalRevenue: 598400,   avgJobValue: 3120,      profitMargin: 25,
    outstandingInvoices: 42600, revenuePerTechnician: 149600,
    ltv: 4200, crr: 57, cac: 392, ltvCacRatio: 10.7, repeatCustomerRate: 36, avgReviewRating: 4.5,
    jobCompletionRate: 89,  firstTimeFixRate: 86,   avgResponseTimeHours: 4.8,
    technicianUtilization: 78, callbackRate: 6,     activeJobs: 6,
    leadConversionRate: 26, estimatesWon: 51,       costPerLead: 65,
    totalLeads: 714,        totalConversions: 186,
  },
  year: {
    totalRevenue: 1124000,  avgJobValue: 3080,      profitMargin: 24,
    outstandingInvoices: 42600, revenuePerTechnician: 281000,
    ltv: 4200, crr: 56, cac: 404, ltvCacRatio: 10.4, repeatCustomerRate: 34, avgReviewRating: 4.5,
    jobCompletionRate: 88,  firstTimeFixRate: 85,   avgResponseTimeHours: 5.0,
    technicianUtilization: 74, callbackRate: 6,     activeJobs: 6,
    leadConversionRate: 25, estimatesWon: 50,       costPerLead: 68,
    totalLeads: 1480,       totalConversions: 370,
  },
};

// ─── Period-over-period % changes ──────────────────────────────────────────

export const rangedChanges: Record<DateRange, RangedChanges> = {
  today: {
    totalRevenue: 12.4,      avgJobValue: 3.2,        profitMargin: 1.8,
    outstandingInvoices: 2.8, revenuePerTechnician: 12.4,
    ltv: 0.2,  crr: 0.6,  cac: -1.1,  ltvCacRatio: 0.7,
    repeatCustomerRate: 0.4, avgReviewRating: 0.0,
    jobCompletionRate: 1.6,  firstTimeFixRate: 3.8,   avgResponseTimeHours: -9.8,
    technicianUtilization: 7.2, callbackRate: -20.0,  activeJobs: 5.1,
    leadConversionRate: 4.4, estimatesWon: 5.6,       costPerLead: -3.2,
    totalLeads: 9.8,         totalConversions: 12.4,
  },
  '7d': {
    totalRevenue: 9.8,       avgJobValue: 2.4,        profitMargin: 1.6,
    outstandingInvoices: 1.9, revenuePerTechnician: 9.8,
    ltv: 0.2,  crr: 0.6,  cac: -0.8,  ltvCacRatio: 0.5,
    repeatCustomerRate: 0.4, avgReviewRating: 0.0,
    jobCompletionRate: 1.1,  firstTimeFixRate: 2.6,   avgResponseTimeHours: -8.2,
    technicianUtilization: 5.6, callbackRate: -16.7,  activeJobs: 5.1,
    leadConversionRate: 3.2, estimatesWon: 4.1,       costPerLead: -5.1,
    totalLeads: 7.4,         totalConversions: 9.6,
  },
  '30d': {
    totalRevenue: 14.2,      avgJobValue: 2.8,        profitMargin: 2.2,
    outstandingInvoices: -1.4, revenuePerTechnician: 14.2,
    ltv: 0.2,  crr: 0.6,  cac: -1.4,  ltvCacRatio: 1.2,
    repeatCustomerRate: 1.1, avgReviewRating: 0.1,
    jobCompletionRate: 0.6,  firstTimeFixRate: 1.2,   avgResponseTimeHours: -6.3,
    technicianUtilization: 4.1, callbackRate: -9.1,   activeJobs: 5.1,
    leadConversionRate: 2.8, estimatesWon: 2.4,       costPerLead: -4.4,
    totalLeads: 11.2,        totalConversions: 8.6,
  },
  quarter: {
    totalRevenue: 18.6,      avgJobValue: 2.1,        profitMargin: 1.4,
    outstandingInvoices: 3.4, revenuePerTechnician: 18.6,
    ltv: 0.2,  crr: 0.6,  cac: -0.9,  ltvCacRatio: 0.7,
    repeatCustomerRate: 1.2, avgReviewRating: 0.1,
    jobCompletionRate: 0.4,  firstTimeFixRate: 0.7,   avgResponseTimeHours: -5.8,
    technicianUtilization: 3.2, callbackRate: -8.3,   activeJobs: 5.1,
    leadConversionRate: 3.6, estimatesWon: 3.2,       costPerLead: -5.6,
    totalLeads: 12.8,        totalConversions: 10.2,
  },
  year: {
    totalRevenue: 16.4,      avgJobValue: 3.4,        profitMargin: 2.6,
    outstandingInvoices: 4.2, revenuePerTechnician: 16.4,
    ltv: 1.4,  crr: 2.4,  cac: -4.1,  ltvCacRatio: 5.8,
    repeatCustomerRate: 3.2, avgReviewRating: 0.2,
    jobCompletionRate: 1.4,  firstTimeFixRate: 3.2,   avgResponseTimeHours: -16.2,
    technicianUtilization: 5.8, callbackRate: -14.3,  activeJobs: 5.1,
    leadConversionRate: 4.2, estimatesWon: 4.8,       costPerLead: -6.8,
    totalLeads: 14.6,        totalConversions: 14.8,
  },
};

// ─── Monthly revenue (seasonal — spring/summer peak) ───────────────────────

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jun', revenue: 186400, jobs: 60 },
  { month: 'Jul', revenue: 198200, jobs: 64 },
  { month: 'Aug', revenue: 214800, jobs: 68 },
  { month: 'Sep', revenue: 192600, jobs: 62 },
  { month: 'Oct', revenue: 124800, jobs: 40 },
  { month: 'Nov', revenue: 62400,  jobs: 20 },
  { month: 'Dec', revenue: 43800,  jobs: 14 },
  { month: 'Jan', revenue: 46800,  jobs: 15 },
  { month: 'Feb', revenue: 78000,  jobs: 25 },
  { month: 'Mar', revenue: 140400, jobs: 45 },
  { month: 'Apr', revenue: 183600, jobs: 59 },
  { month: 'May', revenue: 214800, jobs: 68 },
];

// ─── Revenue chart ──────────────────────────────────────────────────────────

export const revenueChartData: Record<DateRange, { label: string; revenue: number }[]> = {
  today: [
    { label: '8 AM',  revenue: 0     },
    { label: '9 AM',  revenue: 3267  },
    { label: '10 AM', revenue: 6534  },
    { label: '11 AM', revenue: 6534  },
    { label: '12 PM', revenue: 6534  },
    { label: '1 PM',  revenue: 9800  },
    { label: '2 PM',  revenue: 9800  },
    { label: '3 PM',  revenue: 9800  },
  ],
  '7d': [
    { label: 'Mon', revenue: 6534  },
    { label: 'Tue', revenue: 9800  },
    { label: 'Wed', revenue: 6534  },
    { label: 'Thu', revenue: 9800  },
    { label: 'Fri', revenue: 13067 },
    { label: 'Sat', revenue: 6534  },
    { label: 'Sun', revenue: 3267  },
  ],
  '30d': [
    { label: 'Apr 14', revenue: 52400  },
    { label: 'Apr 21', revenue: 58600  },
    { label: 'Apr 28', revenue: 49200  },
    { label: 'May 5',  revenue: 54600  },
  ],
  quarter: [
    { label: 'Mar', revenue: 140400 },
    { label: 'Apr', revenue: 183600 },
    { label: 'May', revenue: 214800 },
  ],
  year: [
    { label: 'Jun', revenue: 186400 },
    { label: 'Jul', revenue: 198200 },
    { label: 'Aug', revenue: 214800 },
    { label: 'Sep', revenue: 192600 },
    { label: 'Oct', revenue: 124800 },
    { label: 'Nov', revenue: 62400  },
    { label: 'Dec', revenue: 43800  },
    { label: 'Jan', revenue: 46800  },
    { label: 'Feb', revenue: 78000  },
    { label: 'Mar', revenue: 140400 },
    { label: 'Apr', revenue: 183600 },
    { label: 'May', revenue: 214800 },
  ],
};

// ─── Service revenue ────────────────────────────────────────────────────────

export const rangedServiceData: Record<DateRange, ServiceData[]> = {
  today: [
    { service: 'Roof Replacement', revenue: 6534,   jobs: 2,  color: '#b45309' },
    { service: 'Storm Damage',     revenue: 3267,   jobs: 1,  color: '#dc2626' },
    { service: 'Roof Repair',      revenue: 0,      jobs: 0,  color: '#d97706' },
    { service: 'Gutter Install',   revenue: 0,      jobs: 0,  color: '#64748b' },
  ],
  '7d': [
    { service: 'Roof Replacement', revenue: 32670,  jobs: 10, color: '#b45309' },
    { service: 'Storm Damage',     revenue: 9800,   jobs: 3,  color: '#dc2626' },
    { service: 'Roof Repair',      revenue: 8160,   jobs: 4,  color: '#d97706' },
    { service: 'Gutter Install',   revenue: 3970,   jobs: 5,  color: '#64748b' },
  ],
  '30d': [
    { service: 'Roof Replacement', revenue: 128880, jobs: 40, color: '#b45309' },
    { service: 'Storm Damage',     revenue: 38640,  jobs: 12, color: '#dc2626' },
    { service: 'Roof Repair',      revenue: 32220,  jobs: 16, color: '#d97706' },
    { service: 'Gutter Install',   revenue: 15060,  jobs: 19, color: '#64748b' },
  ],
  quarter: [
    { service: 'Roof Replacement', revenue: 359040, jobs: 112, color: '#b45309' },
    { service: 'Storm Damage',     revenue: 107680, jobs: 34,  color: '#dc2626' },
    { service: 'Roof Repair',      revenue: 89760,  jobs: 44,  color: '#d97706' },
    { service: 'Gutter Install',   revenue: 41920,  jobs: 54,  color: '#64748b' },
  ],
  year: [
    { service: 'Roof Replacement', revenue: 674400, jobs: 212, color: '#b45309' },
    { service: 'Storm Damage',     revenue: 202320, jobs: 64,  color: '#dc2626' },
    { service: 'Roof Repair',      revenue: 168600, jobs: 84,  color: '#d97706' },
    { service: 'Gutter Install',   revenue: 78680,  jobs: 102, color: '#64748b' },
  ],
};

// ─── Lead sources ───────────────────────────────────────────────────────────

export const rangedLeadSources: Record<DateRange, LeadSource[]> = {
  today: [
    { source: 'Google Ads',     leads: 4,   conversions: 1,  spend: 290,  color: '#2563eb' },
    { source: 'Referrals',      leads: 3,   conversions: 1,  spend: 0,    color: '#d97706' },
    { source: 'Organic Search', leads: 2,   conversions: 1,  spend: 120,  color: '#16a34a' },
    { source: 'Direct Mail',    leads: 1,   conversions: 0,  spend: 80,   color: '#7c3aed' },
  ],
  '7d': [
    { source: 'Google Ads',     leads: 22,  conversions: 6,  spend: 1620, color: '#2563eb' },
    { source: 'Referrals',      leads: 18,  conversions: 7,  spend: 0,    color: '#d97706' },
    { source: 'Organic Search', leads: 12,  conversions: 3,  spend: 680,  color: '#16a34a' },
    { source: 'Direct Mail',    leads: 8,   conversions: 1,  spend: 440,  color: '#7c3aed' },
  ],
  '30d': [
    { source: 'Google Ads',     leads: 96,  conversions: 26, spend: 7040, color: '#2563eb' },
    { source: 'Referrals',      leads: 78,  conversions: 29, spend: 0,    color: '#d97706' },
    { source: 'Organic Search', leads: 48,  conversions: 13, spend: 2960, color: '#16a34a' },
    { source: 'Direct Mail',    leads: 26,  conversions: 4,  spend: 1920, color: '#7c3aed' },
  ],
  quarter: [
    { source: 'Google Ads',     leads: 276, conversions: 74, spend: 20240, color: '#2563eb' },
    { source: 'Referrals',      leads: 224, conversions: 83, spend: 0,     color: '#d97706' },
    { source: 'Organic Search', leads: 138, conversions: 37, spend: 8520,  color: '#16a34a' },
    { source: 'Direct Mail',    leads: 76,  conversions: 11, spend: 5520,  color: '#7c3aed' },
  ],
  year: [
    { source: 'Google Ads',     leads: 576, conversions: 154, spend: 42240, color: '#2563eb' },
    { source: 'Referrals',      leads: 468, conversions: 174, spend: 0,     color: '#d97706' },
    { source: 'Organic Search', leads: 288, conversions: 78,  spend: 17760, color: '#16a34a' },
    { source: 'Direct Mail',    leads: 148, conversions: 22,  spend: 11520, color: '#7c3aed' },
  ],
};

// ─── Technician utilization ─────────────────────────────────────────────────

export const rangedTechUtilization: Record<DateRange, { name: string; utilization: number }[]> = {
  today:   [{ name: 'Kurt',  utilization: 92 }, { name: 'Eddie', utilization: 90 }, { name: 'Sam',   utilization: 88 }, { name: 'Trina', utilization: 84 }],
  '7d':    [{ name: 'Kurt',  utilization: 88 }, { name: 'Eddie', utilization: 85 }, { name: 'Sam',   utilization: 83 }, { name: 'Trina', utilization: 80 }],
  '30d':   [{ name: 'Kurt',  utilization: 84 }, { name: 'Eddie', utilization: 81 }, { name: 'Sam',   utilization: 79 }, { name: 'Trina', utilization: 76 }],
  quarter: [{ name: 'Kurt',  utilization: 82 }, { name: 'Eddie', utilization: 79 }, { name: 'Sam',   utilization: 77 }, { name: 'Trina', utilization: 74 }],
  year:    [{ name: 'Kurt',  utilization: 74 }, { name: 'Eddie', utilization: 72 }, { name: 'Sam',   utilization: 70 }, { name: 'Trina', utilization: 67 }],
};

// ─── New vs retained customer chart ────────────────────────────────────────

export const rangedCustomerChart: Record<DateRange, { month: string; new: number; retained: number }[]> = {
  today:   [{ month: 'Today', new: 2,  retained: 4   }],
  '7d':    [{ month: 'Mon', new: 2, retained: 6 }, { month: 'Tue', new: 3, retained: 8 }, { month: 'Wed', new: 2, retained: 6 }, { month: 'Thu', new: 3, retained: 7 }, { month: 'Fri', new: 4, retained: 9 }, { month: 'Sat', new: 3, retained: 7 }, { month: 'Sun', new: 1, retained: 4 }],
  '30d':   [{ month: 'Apr 14', new: 9, retained: 20 }, { month: 'Apr 21', new: 12, retained: 24 }, { month: 'Apr 28', new: 10, retained: 22 }, { month: 'May 5', new: 11, retained: 23 }],
  quarter: [{ month: 'Mar', new: 28, retained: 62 }, { month: 'Apr', new: 34, retained: 72 }, { month: 'May', new: 38, retained: 79 }],
  year:    [{ month: 'Jun', new: 34, retained: 62 }, { month: 'Jul', new: 36, retained: 66 }, { month: 'Aug', new: 38, retained: 72 }, { month: 'Sep', new: 32, retained: 65 }, { month: 'Oct', new: 18, retained: 44 }, { month: 'Nov', new: 8,  retained: 22 }, { month: 'Dec', new: 6,  retained: 18 }, { month: 'Jan', new: 8,  retained: 18 }, { month: 'Feb', new: 14, retained: 28 }, { month: 'Mar', new: 28, retained: 62 }, { month: 'Apr', new: 34, retained: 72 }, { month: 'May', new: 38, retained: 79 }],
};

// ─── Technician roster ──────────────────────────────────────────────────────

export const technicians: Technician[] = [
  { id: 'p1', name: 'Kurt Davis',    hoursWorked: 168, billableHours: 148, jobsCompleted: 22, revenue: 72600, firstTimeFixRate: 92, callbackRate: 3 },
  { id: 'p2', name: 'Eddie Morales', hoursWorked: 168, billableHours: 144, jobsCompleted: 20, revenue: 65800, firstTimeFixRate: 90, callbackRate: 4 },
  { id: 'p3', name: 'Sam Johansson', hoursWorked: 160, billableHours: 136, jobsCompleted: 18, revenue: 56200, firstTimeFixRate: 88, callbackRate: 5 },
  { id: 'p4', name: 'Trina Bell',    hoursWorked: 160, billableHours: 128, jobsCompleted: 14, revenue: 20200, firstTimeFixRate: 84, callbackRate: 7 },
];

// ─── Customers ──────────────────────────────────────────────────────────────

export const customers: Customer[] = [
  { id: 'pc1', name: 'Crestview HOA',           email: 'board@crestviewhoa.com',    totalJobs: 8,  totalSpent: 42400, lastJobDate: '2025-05-11', rating: 5 },
  { id: 'pc2', name: 'Mike & Donna Hargrove',   email: 'm.hargrove@email.com',      totalJobs: 2,  totalSpent: 12600, lastJobDate: '2025-05-10', rating: 5 },
  { id: 'pc3', name: 'Riverside Church',         email: 'admin@riversidechurch.org', totalJobs: 3,  totalSpent: 18400, lastJobDate: '2025-05-09', rating: 4 },
  { id: 'pc4', name: 'Jesse Fontaine',           email: 'j.fontaine@email.com',      totalJobs: 1,  totalSpent: 6800,  lastJobDate: '2025-05-08', rating: 5 },
  { id: 'pc5', name: 'Sunset Storage',           email: 'ops@sunsetstore.com',       totalJobs: 2,  totalSpent: 9600,  lastJobDate: '2025-05-07', rating: 4 },
  { id: 'pc6', name: 'Carol & Ben Whitfield',    email: 'c.whitfield@email.com',     totalJobs: 1,  totalSpent: 11200, lastJobDate: '2025-05-06', rating: 3 },
];

// ─── Overdue invoices ───────────────────────────────────────────────────────

export const overdueInvoices: OverdueInvoice[] = [
  { id: 'INV-4412', customer: 'Crestview HOA',       service: 'Roof Replacement', amount: 14800, daysOverdue: 4,  phone: '(214) 555-3300' },
  { id: 'INV-4408', customer: 'Riverside Church',     service: 'Storm Damage',     amount: 9200,  daysOverdue: 6,  phone: '(214) 555-7712' },
  { id: 'INV-4404', customer: 'Carol & Ben Whitfield',service: 'Roof Replacement', amount: 11200, daysOverdue: 11, phone: '(214) 555-6640' },
  { id: 'INV-4399', customer: 'Sunset Storage',       service: 'Roof Repair',      amount: 4800,  daysOverdue: 18, phone: '(214) 555-9914' },
];

// ─── Alerts ─────────────────────────────────────────────────────────────────

export const alerts: Alert[] = [
  { id: 'pa1', type: 'overdue-invoice', title: 'Invoice #4412 Overdue',          description: 'Crestview HOA — $14,800 — 4 days past due',                                   severity: 'high'   },
  { id: 'pa2', type: 'bad-review',      title: '3-Star Review on Google',          description: 'Carol & Ben Whitfield — "Crew was rushed. Found loose shingles after."',      severity: 'high'   },
  { id: 'pa3', type: 'overdue-invoice', title: 'Invoice #4408 Overdue',          description: 'Riverside Church — $9,200 — 6 days past due',                                  severity: 'medium' },
  { id: 'pa4', type: 'callback',        title: 'High Callback Rate — Trina Bell', description: '2 callback jobs this month, above the 1-job team average',                    severity: 'medium' },
  { id: 'pa5', type: 'overdue-invoice', title: 'Invoice #4404 Overdue',          description: 'Carol & Ben Whitfield — $11,200 — 11 days past due',                           severity: 'low'    },
];

// ─── Recent jobs ─────────────────────────────────────────────────────────────

export const recentJobs: Job[] = [
  { id: 'J-4416', customer: 'Crestview HOA',         service: 'Roof Replacement', technician: 'Kurt Davis',    date: '2025-05-11', status: 'completed',   value: 14800, isPaid: false, daysOverdue: 4  },
  { id: 'J-4415', customer: 'Mike & Donna Hargrove', service: 'Roof Replacement', technician: 'Eddie Morales', date: '2025-05-11', status: 'in-progress', value: 12600, isPaid: false },
  { id: 'J-4414', customer: 'Riverside Church',       service: 'Gutter Install',   technician: 'Sam Johansson', date: '2025-05-10', status: 'completed',   value: 2800,  isPaid: true  },
  { id: 'J-4413', customer: 'Jesse Fontaine',         service: 'Storm Damage',     technician: 'Kurt Davis',    date: '2025-05-10', status: 'completed',   value: 6800,  isPaid: true  },
  { id: 'J-4412', customer: 'Riverside Church',       service: 'Storm Damage',     technician: 'Eddie Morales', date: '2025-05-09', status: 'completed',   value: 9200,  isPaid: false, daysOverdue: 6  },
  { id: 'J-4411', customer: 'Sunset Storage',         service: 'Roof Repair',      technician: 'Trina Bell',    date: '2025-05-09', status: 'completed',   value: 4800,  isPaid: false, daysOverdue: 18 },
  { id: 'J-4410', customer: 'Crestview HOA',          service: 'Roof Inspection',  technician: 'Sam Johansson', date: '2025-05-08', status: 'completed',   value: 280,   isPaid: true  },
  { id: 'J-4409', customer: 'Carol & Ben Whitfield',  service: 'Roof Replacement', technician: 'Kurt Davis',    date: '2025-05-08', status: 'completed',   value: 11200, isPaid: false, daysOverdue: 11 },
  { id: 'J-4408', customer: 'Sunset Storage',         service: 'Gutter Install',   technician: 'Trina Bell',    date: '2025-05-07', status: 'completed',   value: 4800,  isPaid: true  },
  { id: 'J-4407', customer: 'Mike & Donna Hargrove',  service: 'Roof Inspection',  technician: 'Eddie Morales', date: '2025-05-06', status: 'cancelled',   value: 0,     isPaid: false },
];

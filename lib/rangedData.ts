import type { DateRange } from '@/contexts/DateRangeContext';
import type { ServiceData, LeadSource } from '@/types';

// ─── Chart data ────────────────────────────────────────────────────────────
// Each range shows a different time granularity on the revenue line chart.

export const revenueChartData: Record<DateRange, { label: string; revenue: number }[]> = {
  today: [
    { label: '8 AM', revenue: 280 },
    { label: '9 AM', revenue: 570 },
    { label: '10 AM', revenue: 1140 },
    { label: '11 AM', revenue: 1640 },
    { label: '12 PM', revenue: 1920 },
    { label: '1 PM', revenue: 2480 },
    { label: '2 PM', revenue: 3120 },
    { label: '3 PM', revenue: 3840 },
  ],
  '7d': [
    { label: 'Mon', revenue: 2840 },
    { label: 'Tue', revenue: 3200 },
    { label: 'Wed', revenue: 2960 },
    { label: 'Thu', revenue: 3480 },
    { label: 'Fri', revenue: 4100 },
    { label: 'Sat', revenue: 3020 },
    { label: 'Sun', revenue: 1800 },
  ],
  '30d': [
    { label: 'Apr 14', revenue: 21400 },
    { label: 'Apr 21', revenue: 23800 },
    { label: 'Apr 28', revenue: 22600 },
    { label: 'May 5', revenue: 23400 },
  ],
  quarter: [
    { label: 'Mar', revenue: 82100 },
    { label: 'Apr', revenue: 87600 },
    { label: 'May', revenue: 91200 },
  ],
  year: [
    { label: 'Jun', revenue: 92400 },
    { label: 'Jul', revenue: 98200 },
    { label: 'Aug', revenue: 89500 },
    { label: 'Sep', revenue: 78300 },
    { label: 'Oct', revenue: 71200 },
    { label: 'Nov', revenue: 68800 },
    { label: 'Dec', revenue: 74500 },
    { label: 'Jan', revenue: 79200 },
    { label: 'Feb', revenue: 76800 },
    { label: 'Mar', revenue: 82100 },
    { label: 'Apr', revenue: 87600 },
    { label: 'May', revenue: 91200 },
  ],
};

// ─── KPI stats by date range ───────────────────────────────────────────────
// These are the numbers shown on the KPI cards and throughout the dashboard.
// Swap these out for real API calls when you have live data.

export interface RangedStats {
  // Money
  totalRevenue: number;
  avgJobValue: number;
  profitMargin: number;
  outstandingInvoices: number;
  revenuePerTechnician: number;
  // Customers (mostly static — lifetime metrics don't change with range)
  ltv: number;
  crr: number;
  cac: number;
  ltvCacRatio: number;
  repeatCustomerRate: number;
  avgReviewRating: number;
  // Operations
  jobCompletionRate: number;
  firstTimeFixRate: number;
  avgResponseTimeHours: number;
  technicianUtilization: number;
  callbackRate: number;
  activeJobs: number;
  // Sales
  leadConversionRate: number;
  estimatesWon: number;
  costPerLead: number;
  totalLeads: number;
  totalConversions: number;
}

export const rangedStats: Record<DateRange, RangedStats> = {
  today: {
    totalRevenue: 3840,
    avgJobValue: 295,
    profitMargin: 34,
    outstandingInvoices: 24500,
    revenuePerTechnician: 320,
    ltv: 1840,
    crr: 78,
    cac: 245,
    ltvCacRatio: 7.5,
    repeatCustomerRate: 62,
    avgReviewRating: 4.7,
    jobCompletionRate: 96,
    firstTimeFixRate: 92,
    avgResponseTimeHours: 1.8,
    technicianUtilization: 79,
    callbackRate: 6,
    activeJobs: 23,
    leadConversionRate: 36,
    estimatesWon: 64,
    costPerLead: 28,
    totalLeads: 14,
    totalConversions: 5,
  },
  '7d': {
    totalRevenue: 21400,
    avgJobValue: 289,
    profitMargin: 32,
    outstandingInvoices: 24500,
    revenuePerTechnician: 1783,
    ltv: 1840,
    crr: 78,
    cac: 245,
    ltvCacRatio: 7.5,
    repeatCustomerRate: 62,
    avgReviewRating: 4.7,
    jobCompletionRate: 95,
    firstTimeFixRate: 88,
    avgResponseTimeHours: 2.1,
    technicianUtilization: 76,
    callbackRate: 7,
    activeJobs: 23,
    leadConversionRate: 35,
    estimatesWon: 62,
    costPerLead: 27,
    totalLeads: 98,
    totalConversions: 34,
  },
  '30d': {
    totalRevenue: 91200,
    avgJobValue: 287,
    profitMargin: 32,
    outstandingInvoices: 24500,
    revenuePerTechnician: 7600,
    ltv: 1840,
    crr: 78,
    cac: 245,
    ltvCacRatio: 7.5,
    repeatCustomerRate: 62,
    avgReviewRating: 4.7,
    jobCompletionRate: 94,
    firstTimeFixRate: 87,
    avgResponseTimeHours: 2.3,
    technicianUtilization: 74,
    callbackRate: 8,
    activeJobs: 23,
    leadConversionRate: 34,
    estimatesWon: 61,
    costPerLead: 28,
    totalLeads: 430,
    totalConversions: 162,
  },
  quarter: {
    totalRevenue: 260900,
    avgJobValue: 284,
    profitMargin: 31,
    outstandingInvoices: 24500,
    revenuePerTechnician: 21742,
    ltv: 1840,
    crr: 77,
    cac: 252,
    ltvCacRatio: 7.3,
    repeatCustomerRate: 61,
    avgReviewRating: 4.7,
    jobCompletionRate: 93,
    firstTimeFixRate: 86,
    avgResponseTimeHours: 2.4,
    technicianUtilization: 73,
    callbackRate: 8,
    activeJobs: 23,
    leadConversionRate: 33,
    estimatesWon: 60,
    costPerLead: 29,
    totalLeads: 1240,
    totalConversions: 409,
  },
  year: {
    totalRevenue: 417000,
    avgJobValue: 286,
    profitMargin: 31,
    outstandingInvoices: 24500,
    revenuePerTechnician: 34750,
    ltv: 1840,
    crr: 76,
    cac: 258,
    ltvCacRatio: 7.1,
    repeatCustomerRate: 60,
    avgReviewRating: 4.6,
    jobCompletionRate: 93,
    firstTimeFixRate: 86,
    avgResponseTimeHours: 2.5,
    technicianUtilization: 72,
    callbackRate: 9,
    activeJobs: 23,
    leadConversionRate: 33,
    estimatesWon: 59,
    costPerLead: 30,
    totalLeads: 2180,
    totalConversions: 719,
  },
};

// ─── Service revenue by range ──────────────────────────────────────────────
// Proportions stay consistent; absolute numbers scale with the period revenue.

export const rangedServiceData: Record<DateRange, ServiceData[]> = {
  today: [
    { service: 'HVAC Service', revenue: 1190, jobs: 4,  color: '#1d4ed8' },
    { service: 'AC Install',   revenue: 930,  jobs: 1,  color: '#2563eb' },
    { service: 'Plumbing',     revenue: 780,  jobs: 4,  color: '#3b82f6' },
    { service: 'Electrical',   revenue: 520,  jobs: 2,  color: '#60a5fa' },
    { service: 'Pest Control', revenue: 270,  jobs: 1,  color: '#93c5fd' },
    { service: 'Landscaping',  revenue: 150,  jobs: 1,  color: '#bfdbfe' },
  ],
  '7d': [
    { service: 'HVAC Service', revenue: 6640, jobs: 23, color: '#1d4ed8' },
    { service: 'AC Install',   revenue: 5180, jobs: 7,  color: '#2563eb' },
    { service: 'Plumbing',     revenue: 4360, jobs: 20, color: '#3b82f6' },
    { service: 'Electrical',   revenue: 2880, jobs: 13, color: '#60a5fa' },
    { service: 'Pest Control', revenue: 1450, jobs: 7,  color: '#93c5fd' },
    { service: 'Landscaping',  revenue: 890,  jobs: 4,  color: '#bfdbfe' },
  ],
  '30d': [
    { service: 'HVAC Service', revenue: 28400, jobs: 98, color: '#1d4ed8' },
    { service: 'AC Install',   revenue: 22100, jobs: 31, color: '#2563eb' },
    { service: 'Plumbing',     revenue: 18600, jobs: 87, color: '#3b82f6' },
    { service: 'Electrical',   revenue: 12300, jobs: 54, color: '#60a5fa' },
    { service: 'Pest Control', revenue: 6200,  jobs: 31, color: '#93c5fd' },
    { service: 'Landscaping',  revenue: 3600,  jobs: 15, color: '#bfdbfe' },
  ],
  quarter: [
    { service: 'HVAC Service', revenue: 81100,  jobs: 280, color: '#1d4ed8' },
    { service: 'AC Install',   revenue: 63200,  jobs: 89,  color: '#2563eb' },
    { service: 'Plumbing',     revenue: 53200,  jobs: 249, color: '#3b82f6' },
    { service: 'Electrical',   revenue: 35200,  jobs: 154, color: '#60a5fa' },
    { service: 'Pest Control', revenue: 17700,  jobs: 89,  color: '#93c5fd' },
    { service: 'Landscaping',  revenue: 10300,  jobs: 43,  color: '#bfdbfe' },
  ],
  year: [
    { service: 'HVAC Service', revenue: 129600, jobs: 448, color: '#1d4ed8' },
    { service: 'AC Install',   revenue: 100900, jobs: 142, color: '#2563eb' },
    { service: 'Plumbing',     revenue: 85100,  jobs: 399, color: '#3b82f6' },
    { service: 'Electrical',   revenue: 56300,  jobs: 247, color: '#60a5fa' },
    { service: 'Pest Control', revenue: 28400,  jobs: 142, color: '#93c5fd' },
    { service: 'Landscaping',  revenue: 16300,  jobs: 68,  color: '#bfdbfe' },
  ],
};

// ─── Lead sources by range ─────────────────────────────────────────────────
// Total leads match rangedStats.totalLeads for each period.

export const rangedLeadSources: Record<DateRange, LeadSource[]> = {
  today: [
    { source: 'Google Ads',      leads: 6,  conversions: 2, spend: 170,  color: '#2563eb' },
    { source: 'Organic Search',  leads: 3,  conversions: 1, spend: 55,   color: '#16a34a' },
    { source: 'Referrals',       leads: 3,  conversions: 2, spend: 0,    color: '#d97706' },
    { source: 'Yelp',            leads: 1,  conversions: 0, spend: 45,   color: '#dc2626' },
    { source: 'Facebook Ads',    leads: 1,  conversions: 0, spend: 30,   color: '#7c3aed' },
    { source: 'Door Hangers',    leads: 0,  conversions: 0, spend: 15,   color: '#059669' },
  ],
  '7d': [
    { source: 'Google Ads',      leads: 42, conversions: 15, spend: 890,  color: '#2563eb' },
    { source: 'Organic Search',  leads: 23, conversions: 9,  spend: 280,  color: '#16a34a' },
    { source: 'Referrals',       leads: 17, conversions: 9,  spend: 0,    color: '#d97706' },
    { source: 'Yelp',            leads: 9,  conversions: 3,  spend: 230,  color: '#dc2626' },
    { source: 'Facebook Ads',    leads: 5,  conversions: 1,  spend: 150,  color: '#7c3aed' },
    { source: 'Door Hangers',    leads: 2,  conversions: 0,  spend: 75,   color: '#059669' },
  ],
  '30d': [
    { source: 'Google Ads',      leads: 142, conversions: 51, spend: 3840, color: '#2563eb' },
    { source: 'Organic Search',  leads: 98,  conversions: 38, spend: 1200, color: '#16a34a' },
    { source: 'Referrals',       leads: 76,  conversions: 42, spend: 0,    color: '#d97706' },
    { source: 'Yelp',            leads: 54,  conversions: 17, spend: 980,  color: '#dc2626' },
    { source: 'Facebook Ads',    leads: 38,  conversions: 9,  spend: 640,  color: '#7c3aed' },
    { source: 'Door Hangers',    leads: 22,  conversions: 5,  spend: 320,  color: '#059669' },
  ],
  quarter: [
    { source: 'Google Ads',      leads: 408, conversions: 147, spend: 11050, color: '#2563eb' },
    { source: 'Organic Search',  leads: 282, conversions: 109, spend: 3450,  color: '#16a34a' },
    { source: 'Referrals',       leads: 219, conversions: 121, spend: 0,     color: '#d97706' },
    { source: 'Yelp',            leads: 156, conversions: 49,  spend: 2820,  color: '#dc2626' },
    { source: 'Facebook Ads',    leads: 110, conversions: 26,  spend: 1840,  color: '#7c3aed' },
    { source: 'Door Hangers',    leads: 65,  conversions: 15,  spend: 920,   color: '#059669' },
  ],
  year: [
    { source: 'Google Ads',      leads: 718, conversions: 258, spend: 19400, color: '#2563eb' },
    { source: 'Organic Search',  leads: 496, conversions: 192, spend: 6080,  color: '#16a34a' },
    { source: 'Referrals',       leads: 385, conversions: 212, spend: 0,     color: '#d97706' },
    { source: 'Yelp',            leads: 274, conversions: 86,  spend: 4960,  color: '#dc2626' },
    { source: 'Facebook Ads',    leads: 193, conversions: 46,  spend: 3240,  color: '#7c3aed' },
    { source: 'Door Hangers',    leads: 114, conversions: 26,  spend: 1620,  color: '#059669' },
  ],
};

// ─── Technician utilization by range ──────────────────────────────────────
// Today is higher (active shifts); year is lower (includes slower winter months).

export const rangedTechUtilization: Record<DateRange, { name: string; utilization: number }[]> = {
  today: [
    { name: 'Sarah',   utilization: 92 },
    { name: 'Alicia',  utilization: 88 },
    { name: 'Marcus',  utilization: 86 },
    { name: 'Derek',   utilization: 82 },
    { name: 'Brandon', utilization: 84 },
    { name: 'Tanya',   utilization: 79 },
    { name: 'Jose',    utilization: 76 },
    { name: 'Kyle',    utilization: 72 },
  ],
  '7d': [
    { name: 'Sarah',   utilization: 87 },
    { name: 'Alicia',  utilization: 83 },
    { name: 'Marcus',  utilization: 82 },
    { name: 'Derek',   utilization: 79 },
    { name: 'Brandon', utilization: 78 },
    { name: 'Tanya',   utilization: 76 },
    { name: 'Jose',    utilization: 73 },
    { name: 'Kyle',    utilization: 70 },
  ],
  '30d': [
    { name: 'Sarah',   utilization: 83 },
    { name: 'Alicia',  utilization: 79 },
    { name: 'Marcus',  utilization: 80 },
    { name: 'Derek',   utilization: 76 },
    { name: 'Brandon', utilization: 75 },
    { name: 'Tanya',   utilization: 74 },
    { name: 'Jose',    utilization: 71 },
    { name: 'Kyle',    utilization: 68 },
  ],
  quarter: [
    { name: 'Sarah',   utilization: 81 },
    { name: 'Alicia',  utilization: 77 },
    { name: 'Marcus',  utilization: 78 },
    { name: 'Derek',   utilization: 74 },
    { name: 'Brandon', utilization: 73 },
    { name: 'Tanya',   utilization: 72 },
    { name: 'Jose',    utilization: 69 },
    { name: 'Kyle',    utilization: 66 },
  ],
  year: [
    { name: 'Sarah',   utilization: 79 },
    { name: 'Alicia',  utilization: 75 },
    { name: 'Marcus',  utilization: 76 },
    { name: 'Derek',   utilization: 72 },
    { name: 'Brandon', utilization: 70 },
    { name: 'Tanya',   utilization: 69 },
    { name: 'Jose',    utilization: 67 },
    { name: 'Kyle',    utilization: 63 },
  ],
};

// ─── New vs retained customers chart data by range ─────────────────────────

export const rangedCustomerChart: Record<DateRange, { month: string; new: number; retained: number }[]> = {
  today: [
    { month: 'Today', new: 3, retained: 18 },
  ],
  '7d': [
    { month: 'Mon', new: 5,  retained: 32 },
    { month: 'Tue', new: 7,  retained: 35 },
    { month: 'Wed', new: 4,  retained: 28 },
    { month: 'Thu', new: 6,  retained: 33 },
    { month: 'Fri', new: 8,  retained: 38 },
    { month: 'Sat', new: 6,  retained: 30 },
    { month: 'Sun', new: 3,  retained: 20 },
  ],
  '30d': [
    { month: 'Apr 14', new: 12, retained: 58 },
    { month: 'Apr 21', new: 15, retained: 62 },
    { month: 'Apr 28', new: 13, retained: 59 },
    { month: 'May 5',  new: 14, retained: 60 },
  ],
  quarter: [
    { month: 'Mar', new: 45, retained: 213 },
    { month: 'Apr', new: 50, retained: 218 },
    { month: 'May', new: 47, retained: 221 },
  ],
  year: [
    { month: 'Jun', new: 48,  retained: 210 },
    { month: 'Jul', new: 52,  retained: 218 },
    { month: 'Aug', new: 44,  retained: 214 },
    { month: 'Sep', new: 38,  retained: 209 },
    { month: 'Oct', new: 32,  retained: 204 },
    { month: 'Nov', new: 28,  retained: 199 },
    { month: 'Dec', new: 34,  retained: 203 },
    { month: 'Jan', new: 40,  retained: 207 },
    { month: 'Feb', new: 36,  retained: 208 },
    { month: 'Mar', new: 45,  retained: 213 },
    { month: 'Apr', new: 50,  retained: 218 },
    { month: 'May', new: 47,  retained: 221 },
  ],
};

// ─── Period-over-period % changes ─────────────────────────────────────────
// Each value is the % change vs the equivalent prior period (+ = up, - = down).
// today → vs yesterday | 7d → vs prev 7d | 30d → vs prev 30d | etc.

export type RangedChanges = Record<keyof RangedStats, number | null>;

export const rangedChanges: Record<DateRange, RangedChanges> = {
  today: {
    totalRevenue: 6.7,       avgJobValue: 2.4,        profitMargin: 3.0,
    outstandingInvoices: 2.1, revenuePerTechnician: 6.7,
    ltv: 0.5,  crr: 1.3,  cac: -2.0,  ltvCacRatio: 1.4,
    repeatCustomerRate: 0.8, avgReviewRating: 0.0,
    jobCompletionRate: 2.1,  firstTimeFixRate: 5.7,   avgResponseTimeHours: -18.2,
    technicianUtilization: 5.3, callbackRate: -14.3,  activeJobs: 4.5,
    leadConversionRate: 5.9, estimatesWon: 6.7,       costPerLead: -3.4,
    totalLeads: 7.7,         totalConversions: 11.1,
  },
  '7d': {
    totalRevenue: 8.1,       avgJobValue: 2.1,        profitMargin: 3.2,
    outstandingInvoices: 1.8, revenuePerTechnician: 8.1,
    ltv: 0.5,  crr: 1.3,  cac: -1.6,  ltvCacRatio: 1.2,
    repeatCustomerRate: 0.8, avgReviewRating: 0.0,
    jobCompletionRate: 1.1,  firstTimeFixRate: 3.4,   avgResponseTimeHours: -12.5,
    technicianUtilization: 4.1, callbackRate: -12.5,  activeJobs: 4.5,
    leadConversionRate: 6.1, estimatesWon: 5.2,       costPerLead: -6.9,
    totalLeads: 6.3,         totalConversions: 9.7,
  },
  '30d': {
    totalRevenue: 4.1,       avgJobValue: 1.8,        profitMargin: 3.2,
    outstandingInvoices: -0.8, revenuePerTechnician: 4.1,
    ltv: 0.5,  crr: 1.3,  cac: -2.4,  ltvCacRatio: 2.3,
    repeatCustomerRate: 1.6, avgReviewRating: 0.2,
    jobCompletionRate: 0.5,  firstTimeFixRate: 1.2,   avgResponseTimeHours: -8.0,
    technicianUtilization: 2.8, callbackRate: -5.0,   activeJobs: 8.7,
    leadConversionRate: 2.1, estimatesWon: 1.7,       costPerLead: -3.3,
    totalLeads: 6.8,         totalConversions: 5.2,
  },
  quarter: {
    totalRevenue: 6.5,       avgJobValue: 1.1,        profitMargin: 2.6,
    outstandingInvoices: 3.2, revenuePerTechnician: 6.5,
    ltv: 0.5,  crr: 1.3,  cac: -1.6,  ltvCacRatio: 1.8,
    repeatCustomerRate: 1.7, avgReviewRating: 0.2,
    jobCompletionRate: 0.5,  firstTimeFixRate: 0.8,   avgResponseTimeHours: -7.7,
    technicianUtilization: 2.1, callbackRate: -5.0,   activeJobs: 4.5,
    leadConversionRate: 3.0, estimatesWon: 2.4,       costPerLead: -5.0,
    totalLeads: 7.8,         totalConversions: 6.5,
  },
  year: {
    totalRevenue: 8.3,       avgJobValue: 2.5,        profitMargin: 2.3,
    outstandingInvoices: 4.1, revenuePerTechnician: 8.3,
    ltv: 1.1,  crr: 2.0,  cac: -3.4,  ltvCacRatio: 4.4,
    repeatCustomerRate: 2.4, avgReviewRating: 0.1,
    jobCompletionRate: 1.1,  firstTimeFixRate: 2.4,   avgResponseTimeHours: -13.8,
    technicianUtilization: 4.3, callbackRate: -10.0,  activeJobs: 4.5,
    leadConversionRate: 3.1, estimatesWon: 3.5,       costPerLead: -4.8,
    totalLeads: 9.6,         totalConversions: 11.2,
  },
};

// ─── Period label ──────────────────────────────────────────────────────────
// Used in page subtitles: "Revenue — Last 7 Days"

export const periodLabel: Record<DateRange, string> = {
  today: 'Today, May 12 2025',
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  quarter: 'This Quarter (Mar – May 2025)',
  year: 'This Year (Jun 2024 – May 2025)',
};

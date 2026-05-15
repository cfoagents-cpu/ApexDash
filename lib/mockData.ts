import type {
  Job,
  Technician,
  LeadSource,
  MonthlyRevenue,
  ServiceData,
  Alert,
  Customer,
  OverdueInvoice,
  MonthlyCustomerData,
} from '@/types';

// ─── Revenue ───────────────────────────────────────────────────────────────

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Jun', revenue: 92400, jobs: 318 },
  { month: 'Jul', revenue: 98200, jobs: 340 },
  { month: 'Aug', revenue: 89500, jobs: 308 },
  { month: 'Sep', revenue: 78300, jobs: 271 },
  { month: 'Oct', revenue: 71200, jobs: 246 },
  { month: 'Nov', revenue: 68800, jobs: 238 },
  { month: 'Dec', revenue: 74500, jobs: 257 },
  { month: 'Jan', revenue: 79200, jobs: 274 },
  { month: 'Feb', revenue: 76800, jobs: 266 },
  { month: 'Mar', revenue: 82100, jobs: 284 },
  { month: 'Apr', revenue: 87600, jobs: 302 },
  { month: 'May', revenue: 91200, jobs: 316 },
];

export const serviceData: ServiceData[] = [
  { service: 'HVAC Service', revenue: 28400, jobs: 98, color: '#1d4ed8' },
  { service: 'AC Install', revenue: 22100, jobs: 31, color: '#2563eb' },
  { service: 'Plumbing', revenue: 18600, jobs: 87, color: '#3b82f6' },
  { service: 'Electrical', revenue: 12300, jobs: 54, color: '#60a5fa' },
  { service: 'Pest Control', revenue: 6200, jobs: 31, color: '#93c5fd' },
  { service: 'Landscaping', revenue: 3600, jobs: 15, color: '#bfdbfe' },
];

// ─── Customers ─────────────────────────────────────────────────────────────

export const monthlyCustomerData: MonthlyCustomerData[] = [
  { month: 'Jun', new: 48, retained: 210 },
  { month: 'Jul', new: 52, retained: 218 },
  { month: 'Aug', new: 44, retained: 214 },
  { month: 'Sep', new: 38, retained: 209 },
  { month: 'Oct', new: 32, retained: 204 },
  { month: 'Nov', new: 28, retained: 199 },
  { month: 'Dec', new: 34, retained: 203 },
  { month: 'Jan', new: 40, retained: 207 },
  { month: 'Feb', new: 36, retained: 208 },
  { month: 'Mar', new: 45, retained: 213 },
  { month: 'Apr', new: 50, retained: 218 },
  { month: 'May', new: 47, retained: 221 },
];

export const customers: Customer[] = [
  { id: 'c1', name: 'Robert & Linda Marsh', email: 'r.marsh@email.com', totalJobs: 8, totalSpent: 9420, lastJobDate: '2025-05-11', rating: 5 },
  { id: 'c2', name: 'Michelle Thompson', email: 'm.thompson@email.com', totalJobs: 9, totalSpent: 4120, lastJobDate: '2025-04-28', rating: 4 },
  { id: 'c3', name: 'James Park', email: 'j.park@email.com', totalJobs: 6, totalSpent: 3820, lastJobDate: '2025-05-07', rating: 5 },
  { id: 'c4', name: 'David & Marie Foster', email: 'foster@email.com', totalJobs: 3, totalSpent: 6840, lastJobDate: '2025-05-09', rating: 4 },
  { id: 'c5', name: 'Sandra Patel', email: 's.patel@email.com', totalJobs: 12, totalSpent: 2480, lastJobDate: '2025-05-09', rating: 5 },
  { id: 'c6', name: 'Carla Martinez', email: 'c.martinez@email.com', totalJobs: 4, totalSpent: 2640, lastJobDate: '2025-05-07', rating: 4 },
  { id: 'c7', name: 'Helen Nguyen', email: 'h.nguyen@email.com', totalJobs: 7, totalSpent: 2190, lastJobDate: '2025-05-08', rating: 5 },
  { id: 'c8', name: 'Patricia Owen', email: 'p.owen@email.com', totalJobs: 5, totalSpent: 1840, lastJobDate: '2025-05-10', rating: 5 },
  { id: 'c9', name: 'Kevin Huang', email: 'k.huang@email.com', totalJobs: 2, totalSpent: 1100, lastJobDate: '2025-05-10', rating: 4 },
  { id: 'c10', name: 'Tony Guerrero', email: 't.guerrero@email.com', totalJobs: 1, totalSpent: 285, lastJobDate: '2025-05-11' },
];

// ─── Lead Sources ──────────────────────────────────────────────────────────

export const leadSources: LeadSource[] = [
  { source: 'Google Ads', leads: 142, conversions: 51, spend: 3840, color: '#2563eb' },
  { source: 'Organic Search', leads: 98, conversions: 38, spend: 1200, color: '#16a34a' },
  { source: 'Referrals', leads: 76, conversions: 42, spend: 0, color: '#d97706' },
  { source: 'Yelp', leads: 54, conversions: 17, spend: 980, color: '#dc2626' },
  { source: 'Facebook Ads', leads: 38, conversions: 9, spend: 640, color: '#7c3aed' },
  { source: 'Door Hangers', leads: 22, conversions: 5, spend: 320, color: '#059669' },
];

// ─── Technicians ───────────────────────────────────────────────────────────

export const technicians: Technician[] = [
  { id: 't1', name: 'Sarah Chen', hoursWorked: 168, billableHours: 140, jobsCompleted: 52, revenue: 15600, firstTimeFixRate: 94, callbackRate: 4 },
  { id: 't2', name: 'Alicia Davis', hoursWorked: 168, billableHours: 132, jobsCompleted: 50, revenue: 14400, firstTimeFixRate: 93, callbackRate: 5 },
  { id: 't3', name: 'Marcus Johnson', hoursWorked: 168, billableHours: 134, jobsCompleted: 48, revenue: 14200, firstTimeFixRate: 91, callbackRate: 6 },
  { id: 't4', name: 'Derek Williams', hoursWorked: 160, billableHours: 122, jobsCompleted: 44, revenue: 13800, firstTimeFixRate: 88, callbackRate: 8 },
  { id: 't5', name: 'Brandon Lee', hoursWorked: 168, billableHours: 126, jobsCompleted: 46, revenue: 12900, firstTimeFixRate: 89, callbackRate: 7 },
  { id: 't6', name: 'Tanya Brooks', hoursWorked: 160, billableHours: 118, jobsCompleted: 42, revenue: 11800, firstTimeFixRate: 87, callbackRate: 9 },
  { id: 't7', name: 'Jose Reyes', hoursWorked: 152, billableHours: 108, jobsCompleted: 38, revenue: 11200, firstTimeFixRate: 85, callbackRate: 11 },
  { id: 't8', name: 'Kyle Murphy', hoursWorked: 144, billableHours: 98, jobsCompleted: 34, revenue: 9600, firstTimeFixRate: 82, callbackRate: 12 },
];

// ─── Jobs ──────────────────────────────────────────────────────────────────

export const recentJobs: Job[] = [
  { id: 'J-1042', customer: 'Robert & Linda Marsh', service: 'AC Installation', technician: 'Sarah Chen', date: '2025-05-11', status: 'completed', value: 3800, isPaid: true },
  { id: 'J-1041', customer: 'Tony Guerrero', service: 'HVAC Service', technician: 'Marcus Johnson', date: '2025-05-11', status: 'in-progress', value: 285, isPaid: false },
  { id: 'J-1040', customer: 'Patricia Owen', service: 'Plumbing', technician: 'Derek Williams', date: '2025-05-10', status: 'completed', value: 420, isPaid: true },
  { id: 'J-1039', customer: 'Kevin Huang', service: 'Electrical', technician: 'Brandon Lee', date: '2025-05-10', status: 'completed', value: 560, isPaid: false, daysOverdue: 1 },
  { id: 'J-1038', customer: 'Sandra Patel', service: 'Pest Control', technician: 'Kyle Murphy', date: '2025-05-09', status: 'completed', value: 180, isPaid: true },
  { id: 'J-1037', customer: 'David & Marie Foster', service: 'AC Installation', technician: 'Sarah Chen', date: '2025-05-09', status: 'completed', value: 4200, isPaid: false, daysOverdue: 2 },
  { id: 'J-1036', customer: 'Helen Nguyen', service: 'HVAC Service', technician: 'Alicia Davis', date: '2025-05-08', status: 'completed', value: 310, isPaid: true },
  { id: 'J-1035', customer: 'Frank Simmons', service: 'Plumbing', technician: 'Jose Reyes', date: '2025-05-08', status: 'cancelled', value: 0, isPaid: false },
  { id: 'J-1034', customer: 'Carla Martinez', service: 'Landscaping', technician: 'Tanya Brooks', date: '2025-05-07', status: 'completed', value: 650, isPaid: false, daysOverdue: 4 },
  { id: 'J-1033', customer: 'James Park', service: 'Electrical', technician: 'Brandon Lee', date: '2025-05-07', status: 'completed', value: 890, isPaid: true },
];

// ─── Alerts ────────────────────────────────────────────────────────────────

export const alerts: Alert[] = [
  { id: 'a1', type: 'overdue-invoice', title: 'Invoice #1037 Overdue', description: 'David & Marie Foster — $4,200 — 2 days past due', severity: 'high' },
  { id: 'a2', type: 'bad-review', title: 'New 2-Star Review on Google', description: 'Frank Simmons — "Cancelled last minute, very unprofessional."', severity: 'high' },
  { id: 'a3', type: 'overdue-invoice', title: 'Invoice #1034 Overdue', description: 'Carla Martinez — $650 — 4 days past due', severity: 'medium' },
  { id: 'a4', type: 'callback', title: 'High Callback Rate — Jose Reyes', description: '3 callback jobs this month, above the 2-job team average', severity: 'medium' },
  { id: 'a5', type: 'overdue-invoice', title: 'Invoice #1039 Overdue', description: 'Kevin Huang — $560 — 1 day past due', severity: 'low' },
];

// ─── Overdue Invoices ──────────────────────────────────────────────────────

export const overdueInvoices: OverdueInvoice[] = [
  { id: 'INV-1037', customer: 'David & Marie Foster', service: 'AC Installation', amount: 4200, daysOverdue: 2, phone: '(555) 234-5678' },
  { id: 'INV-1028', customer: 'Robert Chang', service: 'HVAC Service', amount: 1850, daysOverdue: 8, phone: '(555) 345-6789' },
  { id: 'INV-1019', customer: 'Amy Kowalski', service: 'Electrical', amount: 720, daysOverdue: 15, phone: '(555) 456-7890' },
  { id: 'INV-1034', customer: 'Carla Martinez', service: 'Landscaping', amount: 650, daysOverdue: 4, phone: '(555) 567-8901' },
  { id: 'INV-1039', customer: 'Kevin Huang', service: 'Electrical', amount: 560, daysOverdue: 1, phone: '(555) 678-9012' },
  { id: 'INV-1011', customer: 'Bob Fitzgerald', service: 'Plumbing', amount: 380, daysOverdue: 22, phone: '(555) 789-0123' },
  { id: 'INV-1004', customer: 'Diana Flores', service: 'Pest Control', amount: 180, daysOverdue: 31, phone: '(555) 890-1234' },
];

// ─── Summary KPIs ──────────────────────────────────────────────────────────
// To swap in real data later, replace these values with API calls or database queries.

export const summaryStats = {
  // Money
  totalRevenueMTD: 91200,
  totalRevenueQTD: 260900,
  totalRevenueYTD: 417000,
  avgJobValue: 287,
  profitMargin: 32,
  outstandingInvoices: 24500,
  revenuePerTechnician: 7600,

  // Customers
  ltv: 1840,
  crr: 78,
  cac: 245,
  ltvCacRatio: 7.5,
  repeatCustomerRate: 62,
  avgReviewRating: 4.7,

  // Operations
  jobCompletionRate: 94,
  firstTimeFixRate: 87,
  avgResponseTimeHours: 2.3,
  technicianUtilization: 74,
  callbackRate: 8,
  activeJobs: 23,

  // Sales
  leadConversionRate: 34,
  estimatesWon: 61,
  costPerLead: 28,
  totalLeads: 430,
  totalConversions: 162,
};

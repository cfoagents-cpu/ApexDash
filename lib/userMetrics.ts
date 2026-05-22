import { supabase } from './supabase';
import type { DateRange } from '@/contexts/DateRangeContext';
import type { RangedStats, RangedChanges } from './rangedData';
import type { MonthlyRevenue, Job, Technician, LeadSource, ServiceData, Customer, OverdueInvoice, Alert } from '@/types';

export interface MonthlyEntry {
  month: string;
  year: number;
  revenue: number;
  jobs: number;
  new_customers: number;
  leads: number;
}

export interface BusinessAverages {
  avg_job_value: number;
  profit_margin: number;
  outstanding_invoices: number;
  ltv: number;
  crr: number;
  cac: number;
  repeat_customer_rate: number;
  avg_review_rating: number;
  job_completion_rate: number;
  first_time_fix_rate: number;
  avg_response_time: number;
  technician_utilization: number;
  callback_rate: number;
  lead_conversion_rate: number;
  estimates_won: number;
  cost_per_lead: number;
}

export interface StoredService {
  service: string;
  revenue: number;
  jobs: number;
}

export interface StoredLeadSource {
  source: string;
  leads: number;
  conversions: number;
  spend: number;
}

export interface StoredTechnician {
  name: string;
  hoursWorked: number;
  billableHours: number;
  jobsCompleted: number;
  revenue: number;
  firstTimeFixRate: number;
  callbackRate: number;
}

export interface StoredJob {
  customer: string;
  service: string;
  technician: string;
  date: string;
  status: 'completed' | 'in-progress' | 'scheduled' | 'cancelled';
  value: number;
  isPaid: boolean;
  daysOverdue?: number;
}

export interface StoredCustomer {
  name: string;
  email: string;
  totalJobs: number;
  totalSpent: number;
  lastJobDate: string;
  rating?: number;
}

export interface StoredInvoice {
  customer: string;
  service: string;
  amount: number;
  daysOverdue: number;
}

export interface UserMetrics {
  monthly_data: MonthlyEntry[];
  averages: BusinessAverages;
  prev_averages?: BusinessAverages;
  services: StoredService[];
  lead_sources: StoredLeadSource[];
  technicians_data: StoredTechnician[];
  recent_jobs: StoredJob[];
  customers_data: StoredCustomer[];
  overdue_invoices_data: StoredInvoice[];
}

export const EMPTY_AVERAGES: BusinessAverages = {
  avg_job_value: 0, profit_margin: 0, outstanding_invoices: 0,
  ltv: 0, crr: 0, cac: 0, repeat_customer_rate: 0, avg_review_rating: 0,
  job_completion_rate: 0, first_time_fix_rate: 0, avg_response_time: 0,
  technician_utilization: 0, callback_rate: 0, lead_conversion_rate: 0,
  estimates_won: 0, cost_per_lead: 0,
};

export const EMPTY_METRICS: UserMetrics = {
  monthly_data: [], averages: EMPTY_AVERAGES,
  services: [], lead_sources: [], technicians_data: [],
  recent_jobs: [], customers_data: [], overdue_invoices_data: [],
};

export function getLast12Months(): { month: string; year: number }[] {
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
    return { month: MONTHS[d.getMonth()], year: d.getFullYear() };
  });
}

export async function fetchUserMetrics(): Promise<UserMetrics | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data } = await supabase
    .from('business_metrics')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  if (!data) return null;

  const averages: BusinessAverages = {
    avg_job_value: data.avg_job_value ?? 0,
    profit_margin: data.profit_margin ?? 0,
    outstanding_invoices: data.outstanding_invoices ?? 0,
    ltv: data.ltv ?? 0,
    crr: data.crr ?? 0,
    cac: data.cac ?? 0,
    repeat_customer_rate: data.repeat_customer_rate ?? 0,
    avg_review_rating: data.avg_review_rating ?? 0,
    job_completion_rate: data.job_completion_rate ?? 0,
    first_time_fix_rate: data.first_time_fix_rate ?? 0,
    avg_response_time: data.avg_response_time ?? 0,
    technician_utilization: data.technician_utilization ?? 0,
    callback_rate: data.callback_rate ?? 0,
    lead_conversion_rate: data.lead_conversion_rate ?? 0,
    estimates_won: data.estimates_won ?? 0,
    cost_per_lead: data.cost_per_lead ?? 0,
  };

  const prev = data.prev_averages as Partial<BusinessAverages> | null;
  const prev_averages: BusinessAverages | undefined = prev ? {
    avg_job_value: prev.avg_job_value ?? 0,
    profit_margin: prev.profit_margin ?? 0,
    outstanding_invoices: prev.outstanding_invoices ?? 0,
    ltv: prev.ltv ?? 0, crr: prev.crr ?? 0, cac: prev.cac ?? 0,
    repeat_customer_rate: prev.repeat_customer_rate ?? 0,
    avg_review_rating: prev.avg_review_rating ?? 0,
    job_completion_rate: prev.job_completion_rate ?? 0,
    first_time_fix_rate: prev.first_time_fix_rate ?? 0,
    avg_response_time: prev.avg_response_time ?? 0,
    technician_utilization: prev.technician_utilization ?? 0,
    callback_rate: prev.callback_rate ?? 0,
    lead_conversion_rate: prev.lead_conversion_rate ?? 0,
    estimates_won: prev.estimates_won ?? 0,
    cost_per_lead: prev.cost_per_lead ?? 0,
  } : undefined;

  return {
    monthly_data: data.monthly_data ?? [],
    averages,
    prev_averages,
    services: data.services ?? [],
    lead_sources: data.lead_sources ?? [],
    technicians_data: data.technicians_data ?? [],
    recent_jobs: data.recent_jobs ?? [],
    customers_data: data.customers_data ?? [],
    overdue_invoices_data: data.overdue_invoices_data ?? [],
  };
}

export async function saveUserMetrics(metrics: UserMetrics): Promise<void> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  await supabase.from('business_metrics').upsert({
    user_id: session.user.id,
    ...metrics.averages,
    prev_averages: metrics.prev_averages ?? null,
    monthly_data: metrics.monthly_data,
    services: metrics.services,
    lead_sources: metrics.lead_sources,
    technicians_data: metrics.technicians_data,
    recent_jobs: metrics.recent_jobs,
    customers_data: metrics.customers_data,
    overdue_invoices_data: metrics.overdue_invoices_data,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id' });
}

const SERVICE_COLORS = ['#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe','#dbeafe','#eff6ff'];
const LEAD_COLORS   = ['#2563eb','#16a34a','#d97706','#dc2626','#7c3aed','#059669','#0891b2','#ea580c'];
const ALL_RANGES: DateRange[] = ['today','7d','30d','quarter','year'];

function sum(entries: MonthlyEntry[], key: keyof MonthlyEntry, count: number): number {
  return entries.slice(-count).reduce((acc, e) => acc + (Number(e[key]) || 0), 0);
}

function buildStats(revenue: number, jobs: number, leads: number, newCustomers: number, a: BusinessAverages, techCount: number): RangedStats {
  const ltvCacRatio = a.cac > 0 ? Math.round((a.ltv / a.cac) * 10) / 10 : 0;
  return {
    totalRevenue: revenue,
    avgJobValue: a.avg_job_value,
    profitMargin: a.profit_margin,
    outstandingInvoices: a.outstanding_invoices,
    revenuePerTechnician: techCount > 0 ? Math.round(revenue / techCount) : 0,
    ltv: a.ltv,
    crr: a.crr,
    cac: a.cac,
    ltvCacRatio,
    repeatCustomerRate: a.repeat_customer_rate,
    avgReviewRating: a.avg_review_rating,
    jobCompletionRate: a.job_completion_rate,
    firstTimeFixRate: a.first_time_fix_rate,
    avgResponseTimeHours: a.avg_response_time,
    technicianUtilization: a.technician_utilization,
    callbackRate: a.callback_rate,
    activeJobs: jobs,
    leadConversionRate: a.lead_conversion_rate,
    estimatesWon: a.estimates_won,
    costPerLead: a.cost_per_lead,
    totalLeads: leads,
    totalConversions: leads > 0 ? Math.round(leads * a.lead_conversion_rate / 100) : 0,
  };
}

function pctChange(current: number, prev: number): number {
  if (prev === 0) return 0;
  return Math.round(((current - prev) / prev) * 100 * 10) / 10;
}

function chg(current: number, prev: number): number | null {
  if (!prev) return null;
  return Math.round(((current - prev) / prev) * 100 * 10) / 10;
}

function buildChanges(
  curRev: number, prevRev: number,
  curJobs: number, prevJobs: number,
  curLeads: number, prevLeads: number,
  curCust: number, prevCust: number,
  cur?: BusinessAverages, prev?: BusinessAverages,
): RangedChanges {
  return {
    totalRevenue:          chg(curRev,   prevRev),
    activeJobs:            chg(curJobs,  prevJobs),
    totalLeads:            chg(curLeads, prevLeads),
    totalConversions:      chg(curCust,  prevCust),
    avgJobValue:           cur && prev ? chg(cur.avg_job_value,        prev.avg_job_value)        : null,
    profitMargin:          cur && prev ? chg(cur.profit_margin,         prev.profit_margin)         : null,
    outstandingInvoices:   cur && prev ? chg(cur.outstanding_invoices,  prev.outstanding_invoices)  : null,
    revenuePerTechnician:  chg(curRev, prevRev),
    ltv:                   cur && prev ? chg(cur.ltv,                   prev.ltv)                   : null,
    crr:                   cur && prev ? chg(cur.crr,                   prev.crr)                   : null,
    cac:                   cur && prev ? chg(cur.cac,                   prev.cac)                   : null,
    ltvCacRatio:           cur && prev && prev.cac > 0 ? chg(cur.ltv / cur.cac, prev.ltv / prev.cac) : null,
    repeatCustomerRate:    cur && prev ? chg(cur.repeat_customer_rate,  prev.repeat_customer_rate)  : null,
    avgReviewRating:       cur && prev ? chg(cur.avg_review_rating,     prev.avg_review_rating)     : null,
    jobCompletionRate:     cur && prev ? chg(cur.job_completion_rate,   prev.job_completion_rate)   : null,
    firstTimeFixRate:      cur && prev ? chg(cur.first_time_fix_rate,   prev.first_time_fix_rate)   : null,
    avgResponseTimeHours:  cur && prev ? chg(cur.avg_response_time,     prev.avg_response_time)     : null,
    technicianUtilization: cur && prev ? chg(cur.technician_utilization,prev.technician_utilization): null,
    callbackRate:          cur && prev ? chg(cur.callback_rate,         prev.callback_rate)         : null,
    leadConversionRate:    cur && prev ? chg(cur.lead_conversion_rate,  prev.lead_conversion_rate)  : null,
    estimatesWon:          cur && prev ? chg(cur.estimates_won,         prev.estimates_won)         : null,
    costPerLead:           cur && prev ? chg(cur.cost_per_lead,         prev.cost_per_lead)         : null,
  };
}

export function metricsToBusinessData(metrics: UserMetrics) {
  const { monthly_data: raw, averages: a } = metrics;
  const entries = getLast12Months().map(({ month, year }) => {
    const found = raw.find(e => e.month === month && e.year === year);
    return found ?? { month, year, revenue: 0, jobs: 0, new_customers: 0, leads: 0 };
  });

  const rev30 = sum(entries, 'revenue', 1);
  const revQ  = sum(entries, 'revenue', 3);
  const revY  = sum(entries, 'revenue', 12);
  const rev7d = Math.round(rev30 / 4);
  const revToday = Math.round(rev30 / 30);

  const leads30 = sum(entries, 'leads', 1);
  const leadsQ  = sum(entries, 'leads', 3);
  const leadsY  = sum(entries, 'leads', 12);

  const cust30 = sum(entries, 'new_customers', 1);
  const custQ  = sum(entries, 'new_customers', 3);
  const custY  = sum(entries, 'new_customers', 12);

  const revPrev30   = entries.length >= 2 ? entries[entries.length - 2].revenue : 0;
  const revPrevQ    = entries.length >= 6 ? entries.slice(-6, -3).reduce((s, e) => s + e.revenue, 0) : 0;
  const jobsPrev30  = entries.length >= 2 ? entries[entries.length - 2].jobs : 0;
  const jobsPrevQ   = entries.length >= 6 ? entries.slice(-6, -3).reduce((s, e) => s + e.jobs, 0) : 0;
  const jobsPrevY   = entries.length >= 12 ? entries.slice(0, 12).reduce((s, e) => s + e.jobs, 0) : 0;
  const leadsPrev30 = entries.length >= 2 ? entries[entries.length - 2].leads : 0;
  const leadsPrevQ  = entries.length >= 6 ? entries.slice(-6, -3).reduce((s, e) => s + e.leads, 0) : 0;
  const leadsPrevY  = entries.length >= 12 ? entries.slice(0, 12).reduce((s, e) => s + e.leads, 0) : 0;
  const custPrev30  = entries.length >= 2 ? entries[entries.length - 2].new_customers : 0;
  const custPrevQ   = entries.length >= 6 ? entries.slice(-6, -3).reduce((s, e) => s + e.new_customers, 0) : 0;
  const custPrevY   = entries.length >= 12 ? entries.slice(0, 12).reduce((s, e) => s + e.new_customers, 0) : 0;

  // Convert detail data
  const serviceData: ServiceData[] = (metrics.services ?? [])
    .filter(s => s.service)
    .map((s, i) => ({ ...s, color: SERVICE_COLORS[i % SERVICE_COLORS.length] }));

  const convertedLeadSources: LeadSource[] = (metrics.lead_sources ?? [])
    .filter(ls => ls.source)
    .map((ls, i) => ({ ...ls, color: LEAD_COLORS[i % LEAD_COLORS.length] }));

  const convertedTechnicians: Technician[] = (metrics.technicians_data ?? [])
    .filter(t => t.name)
    .map((t, i) => ({ id: `t${i + 1}`, ...t }));

  const convertedJobs: Job[] = (metrics.recent_jobs ?? [])
    .filter(j => j.customer)
    .map((j, i) => ({ id: `J-${1000 + i + 1}`, ...j }));

  const convertedCustomers: Customer[] = (metrics.customers_data ?? [])
    .filter(c => c.name)
    .map((c, i) => ({ id: `c${i + 1}`, ...c }));

  const convertedInvoices: OverdueInvoice[] = (metrics.overdue_invoices_data ?? [])
    .filter(inv => inv.customer)
    .map((inv, i) => ({ id: `INV-${1000 + i + 1}`, phone: '', ...inv }));

  // Auto-generate alerts
  const alerts: Alert[] = [];
  convertedInvoices.forEach((inv, i) => {
    alerts.push({
      id: `alert-inv-${i}`,
      type: 'overdue-invoice',
      title: `Invoice ${inv.id} Overdue`,
      description: `${inv.customer} — $${inv.amount.toLocaleString()} — ${inv.daysOverdue} days past due`,
      severity: inv.daysOverdue > 14 ? 'high' : inv.daysOverdue > 7 ? 'medium' : 'low',
    });
  });
  convertedTechnicians.forEach((tech, i) => {
    if (tech.callbackRate > 10) {
      alerts.push({
        id: `alert-cb-${i}`,
        type: 'callback',
        title: `High Callback Rate — ${tech.name}`,
        description: `${tech.callbackRate}% callback rate, above the 10% target`,
        severity: tech.callbackRate > 15 ? 'high' : 'medium',
      });
    }
  });

  const techCount = convertedTechnicians.length;

  const techUtilData = convertedTechnicians.map(t => ({
    name: t.name.split(' ')[0],
    utilization: Math.round((t.billableHours / Math.max(1, t.hoursWorked)) * 100),
  }));

  const jobs30 = sum(entries, 'jobs', 1);
  const rangedStats: Record<DateRange, RangedStats> = {
    today:   buildStats(revToday,  Math.max(1, Math.round(jobs30/30)), Math.round(leads30/30), Math.round(cust30/30), a, techCount),
    '7d':    buildStats(rev7d,     Math.max(1, Math.round(jobs30/4)),  Math.round(leads30/4),  Math.round(cust30/4),  a, techCount),
    '30d':   buildStats(rev30,     jobs30,                             leads30, cust30, a, techCount),
    quarter: buildStats(revQ,      sum(entries,'jobs',3),              leadsQ,  custQ,  a, techCount),
    year:    buildStats(revY,      sum(entries,'jobs',12),             leadsY,  custY,  a, techCount),
  };

  const p = metrics.prev_averages;
  const rangedChanges: Record<DateRange, RangedChanges> = {
    today:   buildChanges(revToday, Math.round(revPrev30/30),  Math.round(jobs30/30),  Math.round(jobsPrev30/30),  Math.round(leads30/30),  Math.round(leadsPrev30/30),  Math.round(cust30/30),  Math.round(custPrev30/30),  a, p),
    '7d':    buildChanges(rev7d,    Math.round(revPrev30/4),   Math.round(jobs30/4),   Math.round(jobsPrev30/4),   Math.round(leads30/4),   Math.round(leadsPrev30/4),   Math.round(cust30/4),   Math.round(custPrev30/4),   a, p),
    '30d':   buildChanges(rev30,    revPrev30,                 jobs30,                 jobsPrev30,                 leads30,                 leadsPrev30,                 cust30,                 custPrev30,                 a, p),
    quarter: buildChanges(revQ,     revPrevQ,                  sum(entries,'jobs',3),  jobsPrevQ,                  leadsQ,                  leadsPrevQ,                  custQ,                  custPrevQ,                  a, p),
    year:    buildChanges(revY,     0,                         sum(entries,'jobs',12), jobsPrevY,                  leadsY,                  leadsPrevY,                  custY,                  custPrevY,                  a, p),
  };

  const revenueChartData: Record<DateRange, { label: string; revenue: number }[]> = {
    today: Array.from({ length: 8 }, (_, i) => ({
      label: `${8 + i} AM`,
      revenue: Math.round((revToday / 8) * (i + 1)),
    })),
    '7d': ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((label, i) => ({
      label, revenue: Math.round(rev7d / 7 * (i < 5 ? 1.2 : 0.7)),
    })),
    '30d': Array.from({ length: 4 }, (_, i) => ({
      label: `Week ${i + 1}`,
      revenue: Math.round(rev30 / 4),
    })),
    quarter: entries.slice(-3).map(e => ({ label: e.month, revenue: e.revenue })),
    year:    entries.map(e => ({ label: e.month, revenue: e.revenue })),
  };

  const monthlyRevenue: MonthlyRevenue[] = entries.map(e => ({
    month: e.month,
    revenue: e.revenue,
    jobs: e.jobs,
  }));

  const rangedCustomerChart: Record<DateRange, { month: string; new: number; retained: number }[]> = {
    today:   [{ month: 'Today', new: Math.round(cust30/30), retained: Math.round(cust30/30 * 3) }],
    '7d':    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(m => ({ month: m, new: Math.round(cust30/30), retained: Math.round(cust30/30 * 3) })),
    '30d':   [{ month: entries[entries.length-1].month, new: cust30, retained: Math.round(cust30 * 3) }],
    quarter: entries.slice(-3).map(e => ({ month: e.month, new: e.new_customers, retained: Math.round(e.new_customers * 3) })),
    year:    entries.map(e => ({ month: e.month, new: e.new_customers, retained: Math.round(e.new_customers * 3) })),
  };

  return {
    stats: rangedStats,
    changes: rangedChanges,
    revenueChartData,
    serviceData:     Object.fromEntries(ALL_RANGES.map(r => [r, serviceData]))         as Record<DateRange, ServiceData[]>,
    leadSources:     Object.fromEntries(ALL_RANGES.map(r => [r, convertedLeadSources])) as Record<DateRange, LeadSource[]>,
    techUtilization: Object.fromEntries(ALL_RANGES.map(r => [r, techUtilData]))         as Record<DateRange, { name: string; utilization: number }[]>,
    customerChart: rangedCustomerChart,
    technicians: convertedTechnicians,
    customers: convertedCustomers,
    overdueInvoices: convertedInvoices,
    alerts,
    recentJobs: convertedJobs,
    monthlyRevenue,
  };
}

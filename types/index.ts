export type JobStatus = 'completed' | 'in-progress' | 'scheduled' | 'cancelled';

export interface Job {
  id: string;
  customer: string;
  service: string;
  technician: string;
  date: string;
  status: JobStatus;
  value: number;
  isPaid: boolean;
  daysOverdue?: number;
}

export interface Technician {
  id: string;
  name: string;
  hoursWorked: number;
  billableHours: number;
  jobsCompleted: number;
  revenue: number;
  firstTimeFixRate: number;
  callbackRate: number;
}

export interface LeadSource {
  source: string;
  leads: number;
  conversions: number;
  spend: number;
  color: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  jobs: number;
}

export interface ServiceData {
  service: string;
  revenue: number;
  jobs: number;
  color: string;
}

export interface Alert {
  id: string;
  type: 'overdue-invoice' | 'bad-review' | 'callback';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalJobs: number;
  totalSpent: number;
  lastJobDate: string;
  rating?: number;
}

export interface OverdueInvoice {
  id: string;
  customer: string;
  service: string;
  amount: number;
  daysOverdue: number;
  phone: string;
}

export interface MonthlyCustomerData {
  month: string;
  new: number;
  retained: number;
}

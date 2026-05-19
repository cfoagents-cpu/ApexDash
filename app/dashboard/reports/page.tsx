'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Users, Wrench, TrendingUp, Download, FileText, CheckCircle, Save, ClipboardPaste, X } from 'lucide-react';
import { formatCurrency, formatPercent, formatRatio } from '@/lib/formatters';
import { useBusinessData } from '@/hooks/useBusinessData';
import { useAuth } from '@/contexts/AuthContext';
import { getLast12Months, saveUserMetrics, type MonthlyEntry, type BusinessAverages, type StoredService, type StoredLeadSource, type StoredTechnician, type StoredJob, type StoredCustomer, type StoredInvoice, EMPTY_AVERAGES, EMPTY_METRICS } from '@/lib/userMetrics';

// ─── Demo user: download CSV page ──────────────────────────────────────────

const reports = [
  { id: 'revenue',    title: 'Revenue Report',    description: 'Monthly revenue, average job value, profit margin, and outstanding invoices.', icon: DollarSign, color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' },
  { id: 'customers',  title: 'Customer Report',   description: 'Lifetime value, retention rate, acquisition cost, and repeat customer trends.',  icon: Users,      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' },
  { id: 'operations', title: 'Operations Report', description: 'Technician utilization, job completion rate, first-time fix rate, and callbacks.', icon: Wrench,     color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
  { id: 'sales',      title: 'Sales Report',      description: 'Lead conversion rates, cost per lead, and performance by marketing channel.',    icon: TrendingUp,  color: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400' },
];

function DownloadButton({ reportId }: { reportId: string }) {
  const [downloaded, setDownloaded] = useState(false);
  return (
    <button onClick={() => { setDownloaded(true); setTimeout(() => setDownloaded(false), 3000); }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${downloaded ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
      {downloaded ? <><CheckCircle className="w-4 h-4" />Downloaded!</> : <><Download className="w-4 h-4" />Download CSV</>}
    </button>
  );
}

function DemoReports() {
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const { stats, technicians, leadSources, monthlyRevenue } = useBusinessData();
  const s = stats['30d'];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground text-sm mt-0.5">View and download summaries for any part of your business</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          const isActive = activeReport === report.id;
          return (
            <Card key={report.id} className={`cursor-pointer transition-all rounded-xl shadow-sm ${isActive ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-border hover:border-muted-foreground/30'}`}
              onClick={() => setActiveReport(isActive ? null : report.id)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-lg ${report.color}`}><Icon className="w-5 h-5" /></div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{report.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 max-w-xs">{report.description}</p>
                    </div>
                  </div>
                  <FileText className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors ${isActive ? 'text-blue-600' : 'text-muted-foreground/30'}`} />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">Last updated: May 12, 2025</span>
                  <DownloadButton reportId={report.id} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {activeReport === 'revenue' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5"><CardTitle className="text-sm font-semibold text-foreground">Revenue Report — Last 30 Days</CardTitle></CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{ label: 'Revenue MTD', value: formatCurrency(s.totalRevenue) }, { label: 'Avg Job Value', value: formatCurrency(s.avgJobValue) }, { label: 'Profit Margin', value: formatPercent(s.profitMargin) }, { label: 'Outstanding', value: formatCurrency(s.outstandingInvoices) }].map(item => (
                <div key={item.label} className="bg-muted/50 rounded-lg p-3"><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-lg font-bold text-foreground mt-0.5">{item.value}</p></div>
              ))}
            </div>
            <Table><TableHeader><TableRow className="border-border hover:bg-transparent"><TableHead className="text-muted-foreground text-xs uppercase">Month</TableHead><TableHead className="text-muted-foreground text-xs uppercase text-right">Revenue</TableHead><TableHead className="text-muted-foreground text-xs uppercase text-right">Jobs</TableHead><TableHead className="text-muted-foreground text-xs uppercase text-right">Avg/Job</TableHead></TableRow></TableHeader>
              <TableBody>{[...monthlyRevenue].reverse().map(row => (<TableRow key={row.month} className="border-border hover:bg-muted/30"><TableCell className="font-medium text-foreground text-sm">{row.month}</TableCell><TableCell className="text-right text-sm font-semibold text-foreground">{formatCurrency(row.revenue)}</TableCell><TableCell className="text-right text-sm text-muted-foreground">{row.jobs}</TableCell><TableCell className="text-right text-sm text-muted-foreground">{row.jobs > 0 ? formatCurrency(Math.round(row.revenue / row.jobs)) : '—'}</TableCell></TableRow>))}</TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ─── Real user: data entry page ─────────────────────────────────────────────

const AVG_FIELDS: { key: keyof BusinessAverages; label: string; prefix?: string; suffix?: string; group: string }[] = [
  { key: 'avg_job_value',         label: 'Average Job Value',       prefix: '$', group: 'Revenue' },
  { key: 'profit_margin',         label: 'Profit Margin',           suffix: '%', group: 'Revenue' },
  { key: 'outstanding_invoices',  label: 'Outstanding Invoices',    prefix: '$', group: 'Revenue' },
  { key: 'ltv',                   label: 'Customer Lifetime Value', prefix: '$', group: 'Customers' },
  { key: 'crr',                   label: 'Retention Rate',          suffix: '%', group: 'Customers' },
  { key: 'cac',                   label: 'Acquisition Cost (CAC)',  prefix: '$', group: 'Customers' },
  { key: 'repeat_customer_rate',  label: 'Repeat Customer Rate',    suffix: '%', group: 'Customers' },
  { key: 'avg_review_rating',     label: 'Avg Review Rating',       suffix: '/5', group: 'Customers' },
  { key: 'job_completion_rate',   label: 'Job Completion Rate',     suffix: '%', group: 'Operations' },
  { key: 'first_time_fix_rate',   label: 'First-Time Fix Rate',     suffix: '%', group: 'Operations' },
  { key: 'avg_response_time',     label: 'Avg Response Time',       suffix: ' hrs', group: 'Operations' },
  { key: 'technician_utilization',label: 'Technician Utilization',  suffix: '%', group: 'Operations' },
  { key: 'callback_rate',         label: 'Callback Rate',           suffix: '%', group: 'Operations' },
  { key: 'lead_conversion_rate',  label: 'Lead Conversion Rate',    suffix: '%', group: 'Sales' },
  { key: 'estimates_won',         label: 'Estimates Won',           suffix: '%', group: 'Sales' },
  { key: 'cost_per_lead',         label: 'Cost Per Lead',           prefix: '$', group: 'Sales' },
];

const GROUPS = ['Revenue', 'Customers', 'Operations', 'Sales'];

const TABS = [
  { id: 'monthly',  label: 'Monthly Numbers' },
  { id: 'averages', label: 'Business Averages' },
  { id: 'services', label: 'Services' },
  { id: 'marketing',label: 'Marketing' },
  { id: 'team',     label: 'Team' },
  { id: 'tables',   label: 'Jobs & Customers' },
] as const;
type Tab = typeof TABS[number]['id'];

function n(s: string) { const v = Number(s.replace(/[^0-9.]/g, '')); return isNaN(v) ? 0 : v; }

function InlineInput({ value, onChange, placeholder = '—', className = '' }: { value: string | number; onChange: (v: string) => void; placeholder?: string; className?: string }) {
  return (
    <input
      type="text" inputMode="numeric"
      value={value === 0 ? '' : value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`text-sm border border-transparent hover:border-border focus:border-blue-500 rounded-md bg-transparent focus:bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all px-2 py-1 ${className}`}
    />
  );
}

function TextInput({ value, onChange, placeholder = '' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className="w-full text-sm border border-transparent hover:border-border focus:border-blue-500 rounded-md bg-transparent focus:bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all px-2 py-1"
    />
  );
}

function PasteBox({ columns, hint, onImport }: {
  columns: string;
  hint?: string;
  onImport: (rows: string[][]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function parseRows(raw: string): string[][] {
    return raw.trim().split('\n').map(r => {
      if (r.includes('\t')) return r.split('\t');
      if (r.includes(',')) return r.trim().split(/\s*,\s*/);
      return r.trim().split(/\s+/);
    }).filter(r => r.some(c => c.trim()));
  }

  function handleImport() {
    setError('');
    const rows = parseRows(text);
    if (!rows.length) { setError('Nothing to import.'); return; }
    onImport(rows);
    setText('');
    setOpen(false);
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-all flex-shrink-0">
      <ClipboardPaste className="w-3.5 h-3.5" />Paste from spreadsheet
    </button>
  );

  return (
    <div className="p-3 bg-muted/50 rounded-lg border border-border space-y-2">
      <p className="text-xs text-muted-foreground">Copy columns <strong>{columns}</strong> from your spreadsheet{hint ? ` — ${hint}` : ''}, then paste below.</p>
      <textarea autoFocus value={text} onChange={e => setText(e.target.value)} placeholder="Paste here…" rows={4}
        className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono resize-none" />
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex gap-2">
        <button onClick={handleImport} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">Import</button>
        <button onClick={() => { setOpen(false); setText(''); setError(''); }} className="px-3 py-1.5 border border-border text-xs font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors flex items-center gap-1"><X className="w-3 h-3" />Cancel</button>
      </div>
    </div>
  );
}

function AddRowBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="mt-3 flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
      <span className="text-base leading-none">+</span> Add row
    </button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-1 text-muted-foreground/40 hover:text-red-500 transition-colors">
      <X className="w-3.5 h-3.5" />
    </button>
  );
}

function MyDataPage() {
  const { metrics, setMetrics, isRealUser } = useAuth();
  const bizData = useBusinessData();
  const months = getLast12Months();

  const [tab, setTab] = useState<Tab>('monthly');
  const [monthlyData, setMonthlyData] = useState<Record<string, MonthlyEntry>>({});
  const [averages, setAverages] = useState<BusinessAverages>(EMPTY_AVERAGES);
  const [avgRaw, setAvgRaw] = useState<Record<string, string>>({});
  const [services, setServices] = useState<StoredService[]>([{ service: '', revenue: 0, jobs: 0 }]);
  const [leadSources, setLeadSources] = useState<StoredLeadSource[]>([{ source: '', leads: 0, conversions: 0, spend: 0 }]);
  const [technicians, setTechnicians] = useState<StoredTechnician[]>([{ name: '', hoursWorked: 0, billableHours: 0, jobsCompleted: 0, revenue: 0, firstTimeFixRate: 0, callbackRate: 0 }]);
  const [recentJobs, setRecentJobs] = useState<StoredJob[]>([{ customer: '', service: '', technician: '', date: '', status: 'completed', value: 0, isPaid: true }]);
  const [customers, setCustomers] = useState<StoredCustomer[]>([{ name: '', email: '', totalJobs: 0, totalSpent: 0, lastJobDate: '' }]);
  const [invoices, setInvoices] = useState<StoredInvoice[]>([{ customer: '', service: '', amount: 0, daysOverdue: 0 }]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPaste, setShowPaste] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [pasteError, setPasteError] = useState('');

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isRealUser && metrics) {
      const map: Record<string, MonthlyEntry> = {};
      metrics.monthly_data.forEach(e => { map[`${e.month}-${e.year}`] = e; });
      setMonthlyData(map);
      setAverages(metrics.averages);
      const raw: Record<string, string> = {};
      (Object.keys(metrics.averages) as (keyof BusinessAverages)[]).forEach(k => {
        raw[k] = metrics.averages[k] === 0 ? '' : String(metrics.averages[k]);
      });
      setAvgRaw(raw);
      if (metrics.services?.length)              setServices(metrics.services);
      if (metrics.lead_sources?.length)          setLeadSources(metrics.lead_sources);
      if (metrics.technicians_data?.length)      setTechnicians(metrics.technicians_data);
      if (metrics.recent_jobs?.length)           setRecentJobs(metrics.recent_jobs);
      if (metrics.customers_data?.length)        setCustomers(metrics.customers_data);
      if (metrics.overdue_invoices_data?.length) setInvoices(metrics.overdue_invoices_data);
    } else if (!isRealUser) {
      // Pre-populate demo form from the dashboard data so fields match what's shown
      const s = bizData.stats['30d'];
      const newAverages: BusinessAverages = {
        avg_job_value: s.avgJobValue, profit_margin: s.profitMargin,
        outstanding_invoices: s.outstandingInvoices, ltv: s.ltv, crr: s.crr,
        cac: s.cac, repeat_customer_rate: s.repeatCustomerRate,
        avg_review_rating: s.avgReviewRating, job_completion_rate: s.jobCompletionRate,
        first_time_fix_rate: s.firstTimeFixRate, avg_response_time: s.avgResponseTimeHours,
        technician_utilization: s.technicianUtilization, callback_rate: s.callbackRate,
        lead_conversion_rate: s.leadConversionRate, estimates_won: s.estimatesWon,
        cost_per_lead: s.costPerLead,
      };
      setAverages(newAverages);
      const raw: Record<string, string> = {};
      (Object.keys(newAverages) as (keyof BusinessAverages)[]).forEach(k => {
        raw[k] = newAverages[k] === 0 ? '' : String(newAverages[k]);
      });
      setAvgRaw(raw);

      // Monthly numbers — match monthlyRevenue with last12 months by index
      const totalRevYear = bizData.stats['year'].totalRevenue || 1;
      const totalLeadsYear = bizData.stats['year'].totalLeads;
      const yearCust = bizData.customerChart['year'];
      const map: Record<string, MonthlyEntry> = {};
      bizData.monthlyRevenue.forEach((row, i) => {
        if (i >= months.length) return;
        const { month, year } = months[i];
        const key = `${month}-${year}`;
        map[key] = {
          month, year,
          revenue: row.revenue,
          jobs: row.jobs,
          new_customers: yearCust[i]?.new ?? 0,
          leads: Math.round(totalLeadsYear * (row.revenue / totalRevYear)),
        };
      });
      setMonthlyData(map);

      setServices(bizData.serviceData['30d'].map(({ service, revenue, jobs }) => ({ service, revenue, jobs })));
      setLeadSources(bizData.leadSources['30d'].map(({ source, leads, conversions, spend }) => ({ source, leads, conversions, spend })));
      setTechnicians(bizData.technicians.map(({ name, hoursWorked, billableHours, jobsCompleted, revenue, firstTimeFixRate, callbackRate }) => ({ name, hoursWorked, billableHours, jobsCompleted, revenue, firstTimeFixRate, callbackRate })));
      setRecentJobs(bizData.recentJobs.map(({ customer, service, technician, date, status, value, isPaid, daysOverdue }) => ({ customer, service, technician, date, status, value, isPaid, daysOverdue })));
      setCustomers(bizData.customers.map(({ name, email, totalJobs, totalSpent, lastJobDate, rating }) => ({ name, email, totalJobs, totalSpent, lastJobDate: lastJobDate ?? '', rating })));
      setInvoices(bizData.overdueInvoices.map(({ customer, service, amount, daysOverdue }) => ({ customer, service, amount, daysOverdue })));
    }
  }, [isRealUser, metrics]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function setMonthlyField(month: string, year: number, field: keyof MonthlyEntry, raw: string) {
    const key = `${month}-${year}`;
    const val = raw === '' ? 0 : n(raw);
    setMonthlyData(prev => ({
      ...prev,
      [key]: { ...(prev[key] ?? { month, year, revenue: 0, jobs: 0, new_customers: 0, leads: 0 }), [field]: val },
    }));
  }

  function setAvg(field: keyof BusinessAverages, raw: string) {
    if (/^[0-9]*\.?[0-9]*$/.test(raw)) {
      setAvgRaw(prev => ({ ...prev, [field]: raw }));
      setAverages(prev => ({ ...prev, [field]: raw === '' || raw === '.' ? 0 : Number(raw) }));
    }
  }

  function handleImportPaste() {
    setPasteError('');
    const rows = pasteText.trim().split('\n').map(r => {
      if (r.includes('\t')) return r.split('\t');
      if (r.includes(',')) return r.trim().split(/\s*,\s*/);
      return r.trim().split(/\s+/);
    });
    const dataRows = rows.filter(r => r.length >= 1);
    if (dataRows.length === 0) { setPasteError('Nothing to import — make sure you copied cells from your spreadsheet.'); return; }
    const has5 = dataRows[0].length >= 5;
    const offset = has5 ? 1 : 0;
    const imported: Record<string, MonthlyEntry> = { ...monthlyData };
    dataRows.slice(0, months.length).forEach((row, i) => {
      const { month, year } = months[i];
      const key = `${month}-${year}`;
      imported[key] = { month, year, revenue: n(row[offset] ?? ''), jobs: n(row[offset+1] ?? ''), new_customers: n(row[offset+2] ?? ''), leads: n(row[offset+3] ?? '') };
    });
    setMonthlyData(imported);
    setPasteText('');
    setShowPaste(false);
  }

  async function handleSave() {
    if (!isRealUser) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return;
    }
    setSaving(true);
    const monthly_data = Object.values(monthlyData).filter(e => e.revenue > 0 || e.jobs > 0 || e.new_customers > 0 || e.leads > 0);
    const updated = {
      monthly_data, averages,
      services: services.filter(s => s.service),
      lead_sources: leadSources.filter(ls => ls.source),
      technicians_data: technicians.filter(t => t.name),
      recent_jobs: recentJobs.filter(j => j.customer),
      customers_data: customers.filter(c => c.name),
      overdue_invoices_data: invoices.filter(inv => inv.customer),
    };
    await saveUserMetrics(updated);
    setMetrics({ ...EMPTY_METRICS, ...updated });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  // ─── helpers for list state ────────────────────────────────────────────────
  function updRow<T>(list: T[], setList: (l: T[]) => void, i: number, patch: Partial<T>) {
    const next = [...list];
    next[i] = { ...next[i], ...patch };
    setList(next);
  }
  function addRow<T>(list: T[], setList: (l: T[]) => void, empty: T) { setList([...list, empty]); }
  function delRow<T>(list: T[], setList: (l: T[]) => void, i: number) { setList(list.filter((_, idx) => idx !== i)); }

  const th = 'text-left py-2.5 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide';
  const td = 'py-1.5 px-2';

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">My Data</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Enter your business numbers — your dashboard updates automatically</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} disabled:opacity-60`}>
          {saved ? <><CheckCircle className="w-4 h-4" />Saved!</> : saving ? 'Saving…' : <><Save className="w-4 h-4" />Save</>}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 bg-muted p-1 rounded-lg w-fit">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${tab === t.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Monthly Numbers ── */}
      {tab === 'monthly' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Monthly Numbers</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Enter totals for each month. Leave blank if you don&apos;t have the data yet.</p>
              </div>
              <button onClick={() => { setShowPaste(p => !p); setPasteText(''); setPasteError(''); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/50 transition-all flex-shrink-0">
                <ClipboardPaste className="w-3.5 h-3.5" />Paste from spreadsheet
              </button>
            </div>
            {showPaste && (
              <div className="mt-3 p-3 bg-muted/50 rounded-lg border border-border space-y-2">
                <p className="text-xs text-muted-foreground">Copy <strong>4 columns</strong> (Revenue, Jobs, New Customers, Leads) oldest month first, then paste below.</p>
                <textarea autoFocus value={pasteText} onChange={e => setPasteText(e.target.value)} placeholder="Paste your spreadsheet data here…" rows={5}
                  className="w-full px-3 py-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono resize-none" />
                {pasteError && <p className="text-xs text-red-500">{pasteError}</p>}
                <div className="flex gap-2">
                  <button onClick={handleImportPaste} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors">Import</button>
                  <button onClick={() => { setShowPaste(false); setPasteText(''); setPasteError(''); }} className="px-3 py-1.5 border border-border text-xs font-medium text-muted-foreground hover:text-foreground rounded-lg transition-colors flex items-center gap-1"><X className="w-3 h-3" /> Cancel</button>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2.5 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide w-24">Month</th>
                    <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Revenue ($)</th>
                    <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Jobs</th>
                    <th className="text-right py-2.5 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">New Customers</th>
                    <th className="text-right py-2.5 pl-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {months.map(({ month, year }) => {
                    const key = `${month}-${year}`;
                    const entry = monthlyData[key];
                    return (
                      <tr key={key} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="py-2 pr-4 font-medium text-foreground">{month} {year}</td>
                        {(['revenue', 'jobs', 'new_customers', 'leads'] as const).map(field => (
                          <td key={field} className="py-2 px-3 text-right">
                            <input type="text" inputMode="numeric" value={entry?.[field] || ''} onChange={e => setMonthlyField(month, year, field, e.target.value)} placeholder="—"
                              className="w-24 text-right px-2 py-1 text-sm border border-transparent hover:border-border focus:border-blue-500 rounded-md bg-transparent focus:bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all" />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Business Averages ── */}
      {tab === 'averages' && (
        <div className="space-y-4">
          {GROUPS.map(group => (
            <Card key={group} className="shadow-sm rounded-xl">
              <CardHeader className="pb-1 pt-5 px-5"><CardTitle className="text-sm font-semibold text-foreground">{group}</CardTitle></CardHeader>
              <CardContent className="px-5 pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {AVG_FIELDS.filter(f => f.group === group).map(({ key, label, prefix, suffix }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
                      <div className="relative">
                        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{prefix}</span>}
                        <input type="text" inputMode="numeric" value={avgRaw[key] ?? (averages[key] === 0 ? '' : String(averages[key]))} onChange={e => setAvg(key, e.target.value)} placeholder="0"
                          className={`w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow ${prefix ? 'pl-6' : ''} ${suffix ? 'pr-10' : ''}`} />
                        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{suffix}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* ── Services ── */}
      {tab === 'services' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Revenue by Service</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Break down your revenue by the types of jobs you do.</p>
              </div>
              <PasteBox columns="Service Name, Revenue, Jobs" onImport={rows => setServices(rows.map(r => ({ service: r[0]?.trim() ?? '', revenue: n(r[1] ?? ''), jobs: n(r[2] ?? '') })))} />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className={th}>Service Name</th>
                  <th className={`${th} text-right`}>Revenue ($)</th>
                  <th className={`${th} text-right`}>Jobs</th>
                  <th className="w-8" />
                </tr></thead>
                <tbody>
                  {services.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                      <td className={td}><TextInput value={row.service} onChange={v => updRow(services, setServices, i, { service: v })} placeholder="e.g. AC Repair" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.revenue} onChange={v => updRow(services, setServices, i, { revenue: n(v) })} className="text-right w-28" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.jobs} onChange={v => updRow(services, setServices, i, { jobs: n(v) })} className="text-right w-20" /></td>
                      <td className={td}><RemoveBtn onClick={() => delRow(services, setServices, i)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AddRowBtn onClick={() => addRow(services, setServices, { service: '', revenue: 0, jobs: 0 })} />
          </CardContent>
        </Card>
      )}

      {/* ── Marketing ── */}
      {tab === 'marketing' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Lead Sources</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Where your leads come from and how many convert.</p>
              </div>
              <PasteBox columns="Source, Leads, Conversions, Ad Spend" onImport={rows => setLeadSources(rows.map(r => ({ source: r[0]?.trim() ?? '', leads: n(r[1] ?? ''), conversions: n(r[2] ?? ''), spend: n(r[3] ?? '') })))} />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className={th}>Source</th>
                  <th className={`${th} text-right`}>Leads</th>
                  <th className={`${th} text-right`}>Conversions</th>
                  <th className={`${th} text-right`}>Ad Spend ($)</th>
                  <th className="w-8" />
                </tr></thead>
                <tbody>
                  {leadSources.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                      <td className={td}><TextInput value={row.source} onChange={v => updRow(leadSources, setLeadSources, i, { source: v })} placeholder="e.g. Google Ads" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.leads} onChange={v => updRow(leadSources, setLeadSources, i, { leads: n(v) })} className="text-right w-20" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.conversions} onChange={v => updRow(leadSources, setLeadSources, i, { conversions: n(v) })} className="text-right w-20" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.spend} onChange={v => updRow(leadSources, setLeadSources, i, { spend: n(v) })} className="text-right w-28" /></td>
                      <td className={td}><RemoveBtn onClick={() => delRow(leadSources, setLeadSources, i)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AddRowBtn onClick={() => addRow(leadSources, setLeadSources, { source: '', leads: 0, conversions: 0, spend: 0 })} />
          </CardContent>
        </Card>
      )}

      {/* ── Team ── */}
      {tab === 'team' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Technicians</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">One row per technician. Hours worked vs billable hours drives the utilization chart.</p>
              </div>
              <PasteBox columns="Name, Hrs Worked, Billable Hrs, Jobs, Revenue, Fix Rate%, Callback%" onImport={rows => setTechnicians(rows.map(r => ({ name: r[0]?.trim() ?? '', hoursWorked: n(r[1] ?? ''), billableHours: n(r[2] ?? ''), jobsCompleted: n(r[3] ?? ''), revenue: n(r[4] ?? ''), firstTimeFixRate: n(r[5] ?? ''), callbackRate: n(r[6] ?? '') })))} />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className={th}>Name</th>
                  <th className={`${th} text-right`}>Hrs Worked</th>
                  <th className={`${th} text-right`}>Billable Hrs</th>
                  <th className={`${th} text-right`}>Jobs</th>
                  <th className={`${th} text-right`}>Revenue ($)</th>
                  <th className={`${th} text-right`}>Fix Rate %</th>
                  <th className={`${th} text-right`}>Callback %</th>
                  <th className="w-8" />
                </tr></thead>
                <tbody>
                  {technicians.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                      <td className={td}><TextInput value={row.name} onChange={v => updRow(technicians, setTechnicians, i, { name: v })} placeholder="Name" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.hoursWorked} onChange={v => updRow(technicians, setTechnicians, i, { hoursWorked: n(v) })} className="text-right w-20" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.billableHours} onChange={v => updRow(technicians, setTechnicians, i, { billableHours: n(v) })} className="text-right w-20" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.jobsCompleted} onChange={v => updRow(technicians, setTechnicians, i, { jobsCompleted: n(v) })} className="text-right w-20" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.revenue} onChange={v => updRow(technicians, setTechnicians, i, { revenue: n(v) })} className="text-right w-28" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.firstTimeFixRate} onChange={v => updRow(technicians, setTechnicians, i, { firstTimeFixRate: n(v) })} className="text-right w-20" /></td>
                      <td className={`${td} text-right`}><InlineInput value={row.callbackRate} onChange={v => updRow(technicians, setTechnicians, i, { callbackRate: n(v) })} className="text-right w-20" /></td>
                      <td className={td}><RemoveBtn onClick={() => delRow(technicians, setTechnicians, i)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AddRowBtn onClick={() => addRow(technicians, setTechnicians, { name: '', hoursWorked: 0, billableHours: 0, jobsCompleted: 0, revenue: 0, firstTimeFixRate: 0, callbackRate: 0 })} />
          </CardContent>
        </Card>
      )}

      {/* ── Jobs & Customers ── */}
      {tab === 'tables' && (
        <div className="space-y-4">
          {/* Recent Jobs */}
          <Card className="shadow-sm rounded-xl">
            <CardHeader className="pb-1 pt-5 px-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">Recent Jobs</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Shows on the Overview page.</p>
                </div>
                <PasteBox columns="Customer, Service, Technician, Date, Status, Value, Paid(1/0)" hint="status: completed/in-progress/scheduled/cancelled" onImport={rows => setRecentJobs(rows.map(r => ({ customer: r[0]?.trim() ?? '', service: r[1]?.trim() ?? '', technician: r[2]?.trim() ?? '', date: r[3]?.trim() ?? '', status: (['completed','in-progress','scheduled','cancelled'].includes(r[4]?.trim()) ? r[4].trim() : 'completed') as StoredJob['status'], value: n(r[5] ?? ''), isPaid: r[6]?.trim() === '1' || r[6]?.trim()?.toLowerCase() === 'true' })))} />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    <th className={th}>Customer</th>
                    <th className={th}>Service</th>
                    <th className={th}>Technician</th>
                    <th className={th}>Date</th>
                    <th className={th}>Status</th>
                    <th className={`${th} text-right`}>Value ($)</th>
                    <th className={`${th} text-center`}>Paid</th>
                    <th className="w-8" />
                  </tr></thead>
                  <tbody>
                    {recentJobs.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className={td}><TextInput value={row.customer} onChange={v => updRow(recentJobs, setRecentJobs, i, { customer: v })} placeholder="Customer name" /></td>
                        <td className={td}><TextInput value={row.service} onChange={v => updRow(recentJobs, setRecentJobs, i, { service: v })} placeholder="Service type" /></td>
                        <td className={td}><TextInput value={row.technician} onChange={v => updRow(recentJobs, setRecentJobs, i, { technician: v })} placeholder="Tech name" /></td>
                        <td className={td}>
                          <input type="date" value={row.date} onChange={e => updRow(recentJobs, setRecentJobs, i, { date: e.target.value })}
                            className="text-sm border border-transparent hover:border-border focus:border-blue-500 rounded-md bg-transparent focus:bg-background text-foreground focus:outline-none transition-all px-2 py-1" />
                        </td>
                        <td className={td}>
                          <select value={row.status} onChange={e => updRow(recentJobs, setRecentJobs, i, { status: e.target.value as StoredJob['status'] })}
                            className="text-sm border border-transparent hover:border-border focus:border-blue-500 rounded-md bg-background text-foreground focus:outline-none transition-all px-2 py-1">
                            <option value="completed">Completed</option>
                            <option value="in-progress">In Progress</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className={`${td} text-right`}><InlineInput value={row.value} onChange={v => updRow(recentJobs, setRecentJobs, i, { value: n(v) })} className="text-right w-24" /></td>
                        <td className={`${td} text-center`}>
                          <input type="checkbox" checked={row.isPaid} onChange={e => updRow(recentJobs, setRecentJobs, i, { isPaid: e.target.checked })} className="accent-blue-600" />
                        </td>
                        <td className={td}><RemoveBtn onClick={() => delRow(recentJobs, setRecentJobs, i)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddRowBtn onClick={() => addRow(recentJobs, setRecentJobs, { customer: '', service: '', technician: '', date: '', status: 'completed', value: 0, isPaid: true })} />
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card className="shadow-sm rounded-xl">
            <CardHeader className="pb-1 pt-5 px-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">Top Customers</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Shows on the Customers page sorted by total spend.</p>
                </div>
                <PasteBox columns="Name, Email, Total Jobs, Total Spent, Last Job Date, Rating" onImport={rows => setCustomers(rows.map(r => ({ name: r[0]?.trim() ?? '', email: r[1]?.trim() ?? '', totalJobs: n(r[2] ?? ''), totalSpent: n(r[3] ?? ''), lastJobDate: r[4]?.trim() ?? '', rating: n(r[5] ?? '') || undefined })))} />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    <th className={th}>Name</th>
                    <th className={th}>Email</th>
                    <th className={`${th} text-right`}>Total Jobs</th>
                    <th className={`${th} text-right`}>Total Spent ($)</th>
                    <th className={th}>Last Job Date</th>
                    <th className={`${th} text-right`}>Rating</th>
                    <th className="w-8" />
                  </tr></thead>
                  <tbody>
                    {customers.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className={td}><TextInput value={row.name} onChange={v => updRow(customers, setCustomers, i, { name: v })} placeholder="Customer name" /></td>
                        <td className={td}><TextInput value={row.email} onChange={v => updRow(customers, setCustomers, i, { email: v })} placeholder="email@example.com" /></td>
                        <td className={`${td} text-right`}><InlineInput value={row.totalJobs} onChange={v => updRow(customers, setCustomers, i, { totalJobs: n(v) })} className="text-right w-20" /></td>
                        <td className={`${td} text-right`}><InlineInput value={row.totalSpent} onChange={v => updRow(customers, setCustomers, i, { totalSpent: n(v) })} className="text-right w-28" /></td>
                        <td className={td}>
                          <input type="date" value={row.lastJobDate} onChange={e => updRow(customers, setCustomers, i, { lastJobDate: e.target.value })}
                            className="text-sm border border-transparent hover:border-border focus:border-blue-500 rounded-md bg-transparent focus:bg-background text-foreground focus:outline-none transition-all px-2 py-1" />
                        </td>
                        <td className={`${td} text-right`}><InlineInput value={row.rating ?? 0} onChange={v => updRow(customers, setCustomers, i, { rating: n(v) || undefined })} className="text-right w-16" /></td>
                        <td className={td}><RemoveBtn onClick={() => delRow(customers, setCustomers, i)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddRowBtn onClick={() => addRow(customers, setCustomers, { name: '', email: '', totalJobs: 0, totalSpent: 0, lastJobDate: '' })} />
            </CardContent>
          </Card>

          {/* Outstanding Invoices */}
          <Card className="shadow-sm rounded-xl">
            <CardHeader className="pb-1 pt-5 px-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">Outstanding Invoices</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">Unpaid invoices. These also generate alerts automatically.</p>
                </div>
                <PasteBox columns="Customer, Service, Amount, Days Overdue" onImport={rows => setInvoices(rows.map(r => ({ customer: r[0]?.trim() ?? '', service: r[1]?.trim() ?? '', amount: n(r[2] ?? ''), daysOverdue: n(r[3] ?? '') })))} />
              </div>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    <th className={th}>Customer</th>
                    <th className={th}>Service</th>
                    <th className={`${th} text-right`}>Amount ($)</th>
                    <th className={`${th} text-right`}>Days Overdue</th>
                    <th className="w-8" />
                  </tr></thead>
                  <tbody>
                    {invoices.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                        <td className={td}><TextInput value={row.customer} onChange={v => updRow(invoices, setInvoices, i, { customer: v })} placeholder="Customer name" /></td>
                        <td className={td}><TextInput value={row.service} onChange={v => updRow(invoices, setInvoices, i, { service: v })} placeholder="Service type" /></td>
                        <td className={`${td} text-right`}><InlineInput value={row.amount} onChange={v => updRow(invoices, setInvoices, i, { amount: n(v) })} className="text-right w-28" /></td>
                        <td className={`${td} text-right`}><InlineInput value={row.daysOverdue} onChange={v => updRow(invoices, setInvoices, i, { daysOverdue: n(v) })} className="text-right w-20" /></td>
                        <td className={td}><RemoveBtn onClick={() => delRow(invoices, setInvoices, i)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <AddRowBtn onClick={() => addRow(invoices, setInvoices, { customer: '', service: '', amount: 0, daysOverdue: 0 })} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Page entry point ───────────────────────────────────────────────────────

export default function ReportsPage() {
  return <MyDataPage />;
}

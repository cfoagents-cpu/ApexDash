'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DollarSign,
  Users,
  Wrench,
  TrendingUp,
  Download,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { formatCurrency, formatPercent, formatRatio } from '@/lib/formatters';
import { useBusinessData } from '@/hooks/useBusinessData';

const reports = [
  {
    id: 'revenue',
    title: 'Revenue Report',
    description: 'Monthly revenue, average job value, profit margin, and outstanding invoices.',
    icon: DollarSign,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  },
  {
    id: 'customers',
    title: 'Customer Report',
    description: 'Lifetime value, retention rate, acquisition cost, and repeat customer trends.',
    icon: Users,
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400',
  },
  {
    id: 'operations',
    title: 'Operations Report',
    description: 'Technician utilization, job completion rate, first-time fix rate, and callbacks.',
    icon: Wrench,
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  },
  {
    id: 'sales',
    title: 'Sales Report',
    description: 'Lead conversion rates, cost per lead, and performance by marketing channel.',
    icon: TrendingUp,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400',
  },
];

function DownloadButton({ reportId }: { reportId: string }) {
  const [downloaded, setDownloaded] = useState(false);

  function handleDownload() {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  }

  return (
    <button
      onClick={handleDownload}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        downloaded
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {downloaded ? (
        <>
          <CheckCircle className="w-4 h-4" />
          Downloaded!
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download CSV
        </>
      )}
    </button>
  );
}

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const { stats, technicians, leadSources, monthlyRevenue } = useBusinessData();
  const s = stats['30d'];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Reports</h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          View and download summaries for any part of your business
        </p>
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          const isActive = activeReport === report.id;
          return (
            <Card
              key={report.id}
              className={`cursor-pointer transition-all rounded-xl shadow-sm ${
                isActive
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-border hover:border-muted-foreground/30'
              }`}
              onClick={() => setActiveReport(isActive ? null : report.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-lg ${report.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {report.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 max-w-xs">
                        {report.description}
                      </p>
                    </div>
                  </div>
                  <FileText
                    className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-muted-foreground/30'
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Last updated: May 12, 2025
                  </span>
                  <DownloadButton reportId={report.id} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue report preview */}
      {activeReport === 'revenue' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold text-foreground">
              Revenue Report — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Revenue MTD',   value: formatCurrency(s.totalRevenue) },
                { label: 'Avg Job Value', value: formatCurrency(s.avgJobValue) },
                { label: 'Profit Margin', value: formatPercent(s.profitMargin) },
                { label: 'Outstanding',   value: formatCurrency(s.outstandingInvoices) },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-bold text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase">Month</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Revenue</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Jobs</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Avg/Job</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...monthlyRevenue].reverse().map((row) => (
                  <TableRow key={row.month} className="border-border hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground text-sm">{row.month}</TableCell>
                    <TableCell className="text-right text-sm font-semibold text-foreground">{formatCurrency(row.revenue)}</TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">{row.jobs}</TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground">{formatCurrency(Math.round(row.revenue / row.jobs))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Customer report preview */}
      {activeReport === 'customers' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold text-foreground">
              Customer Report — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Customer LTV',  value: formatCurrency(s.ltv) },
                { label: 'Retention Rate', value: formatPercent(s.crr) },
                { label: 'Acq. Cost (CAC)', value: formatCurrency(s.cac) },
                { label: 'LTV : CAC',      value: formatRatio(s.ltvCacRatio) },
                { label: 'Repeat Rate',    value: formatPercent(s.repeatCustomerRate) },
                { label: 'Avg Rating',     value: `${s.avgReviewRating} ★` },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-bold text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Operations report preview */}
      {activeReport === 'operations' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold text-foreground">
              Operations Report — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Completion Rate', value: formatPercent(s.jobCompletionRate) },
                { label: '1st Fix Rate',    value: formatPercent(s.firstTimeFixRate) },
                { label: 'Utilization',     value: formatPercent(s.technicianUtilization) },
                { label: 'Callback Rate',   value: formatPercent(s.callbackRate) },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-bold text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase">Technician</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Jobs</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Utilization</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">1st Fix</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {technicians.map((tech) => {
                  const util = Math.round((tech.billableHours / tech.hoursWorked) * 100);
                  return (
                    <TableRow key={tech.id} className="border-border hover:bg-muted/30">
                      <TableCell className="font-medium text-foreground text-sm">{tech.name}</TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">{tech.jobsCompleted}</TableCell>
                      <TableCell className="text-center text-sm font-semibold">
                        <span className={util >= 75 ? 'text-emerald-600' : util >= 60 ? 'text-amber-500' : 'text-red-500'}>
                          {util}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-sm font-semibold">
                        <span className={tech.firstTimeFixRate >= 90 ? 'text-emerald-600' : 'text-amber-500'}>
                          {tech.firstTimeFixRate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold text-foreground">{formatCurrency(tech.revenue)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Sales report preview */}
      {activeReport === 'sales' && (
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold text-foreground">
              Sales Report — Last 30 Days
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Conversion Rate', value: formatPercent(s.leadConversionRate) },
                { label: 'Estimates Won',   value: formatPercent(s.estimatesWon) },
                { label: 'Cost per Lead',   value: formatCurrency(s.costPerLead) },
                { label: 'Total Leads',     value: String(s.totalLeads) },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-lg font-bold text-foreground mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase">Channel</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Leads</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Won</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Close %</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Cost/Lead</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadSources['30d'].map((source) => {
                  const closeRate = Math.round((source.conversions / source.leads) * 100);
                  const cpl = source.spend > 0 ? Math.round(source.spend / source.leads) : 0;
                  return (
                    <TableRow key={source.source} className="border-border hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: source.color }} />
                          <span className="font-medium text-foreground text-sm">{source.source}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">{source.leads}</TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">{source.conversions}</TableCell>
                      <TableCell className="text-center text-sm font-semibold">
                        <span className={closeRate >= 50 ? 'text-emerald-600' : closeRate >= 30 ? 'text-amber-500' : 'text-red-500'}>
                          {closeRate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold text-foreground">
                        {cpl > 0 ? formatCurrency(cpl) : <span className="text-emerald-600">$0</span>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

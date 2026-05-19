'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/KpiCard';
import { JobsTable } from '@/components/JobsTable';
import { AlertsPanel } from '@/components/AlertsPanel';
import { RevenueLineChart } from '@/components/charts/RevenueLineChart';
import { ServicesBarChart } from '@/components/charts/ServicesBarChart';
import { LeadSourcePieChart } from '@/components/charts/LeadSourcePieChart';
import { DollarSign, Activity, TrendingUp, Users } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';
import { periodLabel } from '@/lib/rangedData';
import { formatCurrency, formatPercent, formatRatio } from '@/lib/formatters';
import { useBusinessData } from '@/hooks/useBusinessData';
import { SetupProgressCard } from '@/components/SetupProgressCard';

export default function OverviewPage() {
  const { range } = useDateRange();
  const { stats, changes, revenueChartData, recentJobs, alerts } = useBusinessData();
  const s = stats[range];
  const c = changes[range];
  const period = periodLabel[range];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Overview</h2>
        <p className="text-muted-foreground text-sm mt-0.5">{period}</p>
      </div>

      <SetupProgressCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Revenue" value={formatCurrency(s.totalRevenue)} change={c.totalRevenue} icon={<DollarSign className="w-4 h-4" />} formula="Sum of all completed job payments for this period" whyItMatters="Your top-line revenue shows if the business is growing. Compare period-over-period to spot trends early." />
        <KpiCard title="Active Jobs" value={String(s.activeJobs)} change={c.activeJobs} icon={<Activity className="w-4 h-4" />} formula="Jobs with status 'In Progress' or 'Scheduled' right now" whyItMatters="Active jobs = money in motion. Low numbers may mean you need more leads; very high may mean you need more staff." />
        <KpiCard title="LTV : CAC Ratio" value={formatRatio(s.ltvCacRatio)} change={c.ltvCacRatio} icon={<TrendingUp className="w-4 h-4" />} formula="Customer Lifetime Value ÷ Customer Acquisition Cost" whyItMatters="Aim for 3:1 or better. Below 3 means you're spending too much to win customers." />
        <KpiCard title="Retention Rate" value={formatPercent(s.crr)} change={c.crr} icon={<Users className="w-4 h-4" />} formula="(End Customers − New Customers) ÷ Start Customers × 100" whyItMatters="Keeping a customer costs far less than finding a new one. Above 70% is healthy." />
      </div>

      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-1 pt-5 px-5">
          <CardTitle className="text-sm font-semibold">Revenue — {period}</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <RevenueLineChart data={revenueChartData[range]} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Revenue by Service</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5"><ServicesBarChart /></CardContent>
        </Card>
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Leads by Source</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5"><LeadSourcePieChart /></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Recent Jobs</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5"><JobsTable jobs={recentJobs} /></CardContent>
        </Card>
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Alerts</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5"><AlertsPanel alerts={alerts} /></CardContent>
        </Card>
      </div>
    </div>
  );
}

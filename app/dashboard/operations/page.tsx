'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TechnicianBarChart } from '@/components/charts/TechnicianBarChart';
import { formatPercent, formatCurrency } from '@/lib/formatters';
import { CheckCircle, Zap, Clock, Activity, PhoneCall } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';
import { periodLabel } from '@/lib/rangedData';
import { useBusinessData } from '@/hooks/useBusinessData';

export default function OperationsPage() {
  const { range } = useDateRange();
  const { stats: allStats, changes: allChanges, technicians } = useBusinessData();
  const stats = allStats[range];
  const c = allChanges[range];
  const period = periodLabel[range];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Operations</h2>
        <p className="text-muted-foreground text-sm mt-0.5">{period}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard title="Job Completion Rate" value={formatPercent(stats.jobCompletionRate)} change={c.jobCompletionRate} icon={<CheckCircle className="w-4 h-4" />} formula="Jobs Completed ÷ Jobs Scheduled × 100" whyItMatters="Low completion rates lose revenue and damage trust. Target 95%+." />
        <KpiCard title="First-Time Fix Rate" value={formatPercent(stats.firstTimeFixRate)} change={c.firstTimeFixRate} icon={<Zap className="w-4 h-4" />} formula="Jobs Fixed on First Visit ÷ Total Jobs × 100" whyItMatters="Every return visit eats into profit and frustrates customers. Above 85% is good." />
        <KpiCard title="Avg Response Time" value={`${stats.avgResponseTimeHours}h`} change={c.avgResponseTimeHours} invertColors icon={<Clock className="w-4 h-4" />} formula="Time from Lead Inquiry to First Contact (hours)" whyItMatters="Businesses that respond within 5 minutes win 21× more leads. Under 2h is great." />
        <KpiCard title="Tech Utilization" value={formatPercent(stats.technicianUtilization)} change={c.technicianUtilization} icon={<Activity className="w-4 h-4" />} formula="Billable Hours ÷ Total Hours Worked × 100" whyItMatters="Aim for 70–80%. Below 60% = too much downtime; above 85% = burnout risk." />
        <KpiCard title="Callback Rate" value={formatPercent(stats.callbackRate)} change={c.callbackRate} invertColors icon={<PhoneCall className="w-4 h-4" />} formula="Return-Visit Jobs ÷ Total Jobs × 100" whyItMatters="Callbacks cost you money and hurt reviews. Keep it under 10%." />
        <Card className="bg-blue-600 border-0 shadow-sm rounded-xl">
          <CardContent className="p-5 flex flex-col items-center justify-center h-full">
            <p className="text-5xl font-bold text-white">{stats.activeJobs}</p>
            <p className="text-blue-200 text-sm mt-2 text-center font-medium">Active Jobs Today</p>
            <p className="text-blue-100 text-xs mt-1">All on schedule</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-1 pt-5 px-5">
          <CardTitle className="text-sm font-semibold">Technician Utilization — {period}</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex gap-4 mb-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />On target (≥75%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />Needs improvement (60–74%)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Below target (&lt;60%)</span>
          </div>
          <TechnicianBarChart />
        </CardContent>
      </Card>

      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-1 pt-5 px-5">
          <CardTitle className="text-sm font-semibold">Technician Performance</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs uppercase">Technician</TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase text-center">Jobs</TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase text-center">Utilization</TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase text-center hidden md:table-cell">1st Fix Rate</TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase text-center hidden md:table-cell">Callback Rate</TableHead>
                <TableHead className="text-muted-foreground text-xs uppercase text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {technicians.map((tech) => {
                const util = Math.round((tech.billableHours / tech.hoursWorked) * 100);
                return (
                  <TableRow key={tech.id} className="border-border hover:bg-muted/30">
                    <TableCell className="font-medium text-foreground text-sm">{tech.name}</TableCell>
                    <TableCell className="text-center text-muted-foreground text-sm">{tech.jobsCompleted}</TableCell>
                    <TableCell className="text-center text-sm"><span className={`font-semibold ${util >= 75 ? 'text-emerald-600' : util >= 60 ? 'text-amber-500' : 'text-red-600'}`}>{util}%</span></TableCell>
                    <TableCell className="text-center text-sm hidden md:table-cell"><span className={`font-semibold ${tech.firstTimeFixRate >= 90 ? 'text-emerald-600' : tech.firstTimeFixRate >= 80 ? 'text-amber-500' : 'text-red-600'}`}>{tech.firstTimeFixRate}%</span></TableCell>
                    <TableCell className="text-center text-sm hidden md:table-cell"><span className={`font-semibold ${tech.callbackRate <= 7 ? 'text-emerald-600' : tech.callbackRate <= 12 ? 'text-amber-500' : 'text-red-600'}`}>{tech.callbackRate}%</span></TableCell>
                    <TableCell className="text-right font-semibold text-sm text-foreground">{formatCurrency(tech.revenue)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

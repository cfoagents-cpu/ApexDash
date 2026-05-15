'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RevenueLineChart } from '@/components/charts/RevenueLineChart';
import { ServicesBarChart } from '@/components/charts/ServicesBarChart';
import { DollarSign, TrendingUp, Percent, Users } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { useDateRange } from '@/contexts/DateRangeContext';
import { periodLabel } from '@/lib/rangedData';
import { useBusinessData } from '@/hooks/useBusinessData';

export default function RevenuePage() {
  const { range } = useDateRange();
  const { stats: allStats, changes: allChanges, revenueChartData, overdueInvoices } = useBusinessData();
  const stats = allStats[range];
  const c = allChanges[range];
  const period = periodLabel[range];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Revenue</h2>
        <p className="text-muted-foreground text-sm mt-0.5">{period}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Revenue" value={formatCurrency(stats.totalRevenue)} change={c.totalRevenue} icon={<DollarSign className="w-4 h-4" />} formula="Sum of all invoices collected this period" whyItMatters="Tracks whether revenue is growing period over period." />
        <KpiCard title="Average Job Value" value={formatCurrency(stats.avgJobValue)} change={c.avgJobValue} icon={<TrendingUp className="w-4 h-4" />} formula="Total Revenue ÷ Number of Jobs Completed" whyItMatters="Higher average job value means more revenue without more jobs. Raise it by upselling maintenance plans." />
        <KpiCard title="Profit Margin" value={formatPercent(stats.profitMargin)} change={c.profitMargin} icon={<Percent className="w-4 h-4" />} formula="(Revenue − All Costs) ÷ Revenue × 100" whyItMatters="Industry average is 20–35%. Monitor labor and material costs to protect this number." />
        <KpiCard title="Revenue per Tech" value={formatCurrency(stats.revenuePerTechnician)} change={c.revenuePerTechnician} icon={<Users className="w-4 h-4" />} formula="Total Revenue ÷ Number of Active Technicians" whyItMatters="Shows team productivity. If this drops, check utilization rates and callback rates per technician." />
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
          <CardContent className="px-5 pb-5">
            <ServicesBarChart />
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Outstanding Invoices</CardTitle>
              <span className="text-sm font-bold text-red-600">{formatCurrency(stats.outstandingInvoices)}</span>
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase">Invoice</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase">Customer</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase hidden md:table-cell">Service</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Amount</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Overdue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overdueInvoices.map((inv) => (
                  <TableRow key={inv.id} className="border-border hover:bg-muted/30">
                    <TableCell className="font-mono text-xs text-muted-foreground">{inv.id}</TableCell>
                    <TableCell className="font-medium text-foreground text-sm">{inv.customer}</TableCell>
                    <TableCell className="text-muted-foreground text-sm hidden md:table-cell">{inv.service}</TableCell>
                    <TableCell className="text-right font-semibold text-sm text-foreground">{formatCurrency(inv.amount)}</TableCell>
                    <TableCell className="text-right text-sm">
                      <span className={`font-semibold ${inv.daysOverdue > 14 ? 'text-red-600' : inv.daysOverdue > 7 ? 'text-amber-500' : 'text-muted-foreground'}`}>
                        {inv.daysOverdue}d
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

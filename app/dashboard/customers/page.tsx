'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CustomerStackedChart } from '@/components/charts/CustomerStackedChart';
import { formatCurrency, formatPercent, formatRatio } from '@/lib/formatters';
import { Heart, Users, Target, Star, TrendingUp, RefreshCw } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';
import { periodLabel } from '@/lib/rangedData';
import { useBusinessData } from '@/hooks/useBusinessData';

export default function CustomersPage() {
  const { range } = useDateRange();
  const { stats: allStats, changes: allChanges, customers } = useBusinessData();
  const stats = allStats[range];
  const c = allChanges[range];
  const sorted = [...customers].sort((a, b) => b.totalSpent - a.totalSpent);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Customers</h2>
        <p className="text-muted-foreground text-sm mt-0.5">{periodLabel[range]}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard title="Customer LTV" value={formatCurrency(stats.ltv)} change={c.ltv} icon={<Heart className="w-4 h-4" />} formula="Avg Revenue per Customer ÷ (1 − Retention Rate)" whyItMatters="LTV tells you the total value of a customer over their lifetime. Higher LTV means you can spend more to acquire them and still profit." />
        <KpiCard title="Retention Rate (CRR)" value={formatPercent(stats.crr)} change={c.crr} icon={<Users className="w-4 h-4" />} formula="(End Customers − New Customers) ÷ Start Customers × 100" whyItMatters="Industry benchmark is 60–75%. Keep it up with follow-up calls and annual service reminders." />
        <KpiCard title="Acq. Cost (CAC)" value={formatCurrency(stats.cac)} change={c.cac} invertColors icon={<Target className="w-4 h-4" />} formula="Total Marketing Spend ÷ New Customers Acquired" whyItMatters="Lower is better. Your LTV should be at least 3× your CAC." />
        <KpiCard title="LTV : CAC Ratio" value={formatRatio(stats.ltvCacRatio)} change={c.ltvCacRatio} icon={<TrendingUp className="w-4 h-4" />} formula="Customer Lifetime Value ÷ Customer Acquisition Cost" whyItMatters="Aim for 3:1 minimum. Every $1 spent on marketing returns multiple dollars in customer value over time." />
        <KpiCard title="Repeat Customer Rate" value={formatPercent(stats.repeatCustomerRate)} change={c.repeatCustomerRate} icon={<RefreshCw className="w-4 h-4" />} formula="Customers who booked 2+ times ÷ Total Customers × 100" whyItMatters="Repeat customers cost nothing to acquire and spend more per visit. Push above 65% with service reminders." />
        <KpiCard title="Avg Review Rating" value={`${stats.avgReviewRating} ★`} change={c.avgReviewRating} icon={<Star className="w-4 h-4" />} formula="Sum of all star ratings ÷ Total number of reviews" whyItMatters="Below 4.5 stars hurts conversion from Google searches. Respond to every review — especially the bad ones." />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">New vs Retained Customers — Last 12 Months</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <CustomerStackedChart />
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Top Customers by Lifetime Spend</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase">Customer</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Jobs</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Total Spent</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((c) => (
                  <TableRow key={c.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <p className="font-medium text-foreground text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">{c.totalJobs}</TableCell>
                    <TableCell className="text-right font-semibold text-sm text-foreground">{formatCurrency(c.totalSpent)}</TableCell>
                    <TableCell className="text-center text-sm">
                      {c.rating ? <span className="text-amber-500 font-medium">{c.rating} ★</span> : <span className="text-muted-foreground">—</span>}
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

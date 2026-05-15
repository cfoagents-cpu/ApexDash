'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KpiCard } from '@/components/KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LeadSourcePieChart } from '@/components/charts/LeadSourcePieChart';
import { formatPercent, formatCurrency } from '@/lib/formatters';
import { Target, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useDateRange } from '@/contexts/DateRangeContext';
import { periodLabel } from '@/lib/rangedData';
import { useBusinessData } from '@/hooks/useBusinessData';

export default function SalesPage() {
  const { range } = useDateRange();
  const { stats: allStats, changes: allChanges, leadSources: allLeadSources } = useBusinessData();
  const stats = allStats[range];
  const c = allChanges[range];
  const leadSources = allLeadSources[range];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground">Sales</h2>
        <p className="text-muted-foreground text-sm mt-0.5">{periodLabel[range]}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Lead Conversion Rate" value={formatPercent(stats.leadConversionRate)} change={c.leadConversionRate} icon={<Target className="w-4 h-4" />} formula="New Customers ÷ Total Leads × 100" whyItMatters="Industry average is 20–30%. Converting above 30% means your follow-up and pricing are dialed in." />
        <KpiCard title="Estimates Won" value={formatPercent(stats.estimatesWon)} change={c.estimatesWon} icon={<TrendingUp className="w-4 h-4" />} formula="Accepted Estimates ÷ Total Estimates Sent × 100" whyItMatters="Close rate below 50% often means pricing is off or follow-up is too slow." />
        <KpiCard title="Cost per Lead" value={formatCurrency(stats.costPerLead)} change={c.costPerLead} invertColors icon={<DollarSign className="w-4 h-4" />} formula="Total Marketing Spend ÷ Total Leads Generated" whyItMatters="Lower is better, but don't cut marketing that brings quality leads." />
        <KpiCard title="Total Leads" value={String(stats.totalLeads)} change={c.totalLeads} icon={<Users className="w-4 h-4" />} formula="All inbound inquiries (calls, web forms, texts) this period" whyItMatters="Leads today = revenue next week. Watch this number closely." />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Leads by Source</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <LeadSourcePieChart />
          </CardContent>
        </Card>

        <Card className="shadow-sm rounded-xl">
          <CardHeader className="pb-1 pt-5 px-5">
            <CardTitle className="text-sm font-semibold">Performance by Channel</CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground text-xs uppercase">Source</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Leads</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Won</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center">Close %</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-center hidden md:table-cell">Spend</TableHead>
                  <TableHead className="text-muted-foreground text-xs uppercase text-right">Cost/Lead</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leadSources.map((source) => {
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
                      <TableCell className="text-center text-sm"><span className={`font-semibold ${closeRate >= 50 ? 'text-emerald-600' : closeRate >= 30 ? 'text-amber-500' : 'text-red-600'}`}>{closeRate}%</span></TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground hidden md:table-cell">
                        {source.spend > 0 ? formatCurrency(source.spend) : <span className="text-emerald-600 font-semibold">Free</span>}
                      </TableCell>
                      <TableCell className="text-right text-sm font-semibold">
                        {cpl > 0 ? formatCurrency(cpl) : <span className="text-emerald-600">$0</span>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

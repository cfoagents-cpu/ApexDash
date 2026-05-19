import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { MetricTooltip } from '@/components/MetricTooltip';

interface KpiCardProps {
  title: string;
  value: string;
  change: number | null;
  changeLabel?: string;
  icon?: React.ReactNode;
  formula?: string;
  whyItMatters?: string;
  invertColors?: boolean;
}

export function KpiCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  formula,
  whyItMatters,
  invertColors = false,
}: KpiCardProps) {
  const isGood = change !== null && (invertColors ? change < 0 : change > 0);
  const isBad = change !== null && (invertColors ? change > 0 : change < 0);

  return (
    <Card className="shadow-sm border border-border rounded-xl">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-muted-foreground">{title}</span>
            {formula && whyItMatters && (
              <MetricTooltip formula={formula} whyItMatters={whyItMatters} />
            )}
          </div>
          {icon && (
            <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded-lg text-blue-600">
              {icon}
            </div>
          )}
        </div>

        <p className="text-3xl font-bold text-foreground mb-2 tracking-tight">
          {value}
        </p>

        {change === null ? (
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">No comparison data yet</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            {change === 0 ? (
              <Minus className="w-3.5 h-3.5 text-muted-foreground" />
            ) : isGood ? (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-500" />
            )}
            <span className={`text-sm font-semibold ${
              change === 0 ? 'text-muted-foreground' : isGood ? 'text-emerald-600' : isBad ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              {change > 0 ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-muted-foreground">{changeLabel}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

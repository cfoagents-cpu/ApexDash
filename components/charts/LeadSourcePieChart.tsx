'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';
import { useDateRange } from '@/contexts/DateRangeContext';
import { useBusinessData } from '@/hooks/useBusinessData';

// Brightened versions of each lead source color, tested against #181B22
const DARK_COLOR_MAP: Record<string, string> = {
  '#2563eb': '#60A5FA',
  '#16a34a': '#34D399',
  '#d97706': '#FBBF24',
  '#dc2626': '#F87171',
  '#7c3aed': '#A78BFA',
  '#059669': '#2DD4BF',
};

export function LeadSourcePieChart() {
  const { resolvedTheme } = useTheme();
  const { range } = useDateRange();
  const { leadSources } = useBusinessData();
  const dark = resolvedTheme === 'dark';
  const data = leadSources[range];

  const tipBg  = dark ? '#22262F' : '#ffffff';
  const tipBdr = dark ? '#3C4049' : '#E5E7EB';
  const tipTxt = dark ? '#E8EAED' : '#111827';
  const legend = dark ? '#9AA0A6' : '#9CA3AF';

  if (data.length === 0) {
    return (
      <div className="h-[220px] flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">No lead source data yet</p>
        <p className="text-xs text-muted-foreground/70">Add your marketing sources in My Data to see this chart</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="42%"
          innerRadius={52}
          outerRadius={80}
          paddingAngle={3}
          dataKey="leads"
          nameKey="source"
        >
          {data.map((entry) => (
            <Cell
              key={entry.source}
              fill={dark ? (DARK_COLOR_MAP[entry.color] ?? entry.color) : entry.color}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [String(value) + ' leads', String(name)]}
          contentStyle={{ borderRadius: '8px', border: `1px solid ${tipBdr}`, backgroundColor: tipBg, color: tipTxt, fontSize: '13px' }}
        />
        <Legend
          iconType="circle"
          iconSize={7}
          wrapperStyle={{ fontSize: '11px', color: legend, paddingTop: '6px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

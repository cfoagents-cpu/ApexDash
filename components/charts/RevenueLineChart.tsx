'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';

interface DataPoint {
  label: string;
  revenue: number;
}

export function RevenueLineChart({ data }: { data: DataPoint[] }) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === 'dark';

  if (data.every(d => d.revenue === 0)) {
    return (
      <div className="h-[260px] flex flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">No revenue data yet</p>
        <p className="text-xs text-muted-foreground/70">Add your monthly numbers in My Data to see this chart</p>
      </div>
    );
  }

  const grid   = dark ? '#2A2E37' : '#F3F4F6';
  const tick   = dark ? '#9AA0A6' : '#9CA3AF';
  const tipBg  = dark ? '#22262F' : '#ffffff';
  const tipBdr = dark ? '#3C4049' : '#E5E7EB';
  const tipTxt = dark ? '#E8EAED' : '#111827';
  const dotStr = dark ? '#181B22' : '#ffffff';

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis dataKey="label" tick={{ fontSize: 12, fill: tick }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 12, fill: tick }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={45}
        />
        <Tooltip
          formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
          contentStyle={{ borderRadius: '8px', border: `1px solid ${tipBdr}`, backgroundColor: tipBg, color: tipTxt, fontSize: '13px' }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#3B82F6"
          strokeWidth={2.5}
          dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: dotStr }}
          activeDot={{ r: 6, fill: '#3B82F6' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

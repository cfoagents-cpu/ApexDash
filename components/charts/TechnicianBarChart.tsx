'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';
import { useDateRange } from '@/contexts/DateRangeContext';
import { useBusinessData } from '@/hooks/useBusinessData';

export function TechnicianBarChart() {
  const { resolvedTheme } = useTheme();
  const { range } = useDateRange();
  const { techUtilization } = useBusinessData();
  const dark = resolvedTheme === 'dark';
  const data = techUtilization[range];

  const grid   = dark ? '#2A2E37' : '#F3F4F6';
  const tick   = dark ? '#9AA0A6' : '#9CA3AF';
  const tipBg  = dark ? '#22262F' : '#ffffff';
  const tipBdr = dark ? '#3C4049' : '#E5E7EB';
  const tipTxt = dark ? '#E8EAED' : '#111827';

  function barColor(util: number) {
    if (dark) return util >= 75 ? '#60A5FA' : util >= 60 ? '#FBBF24' : '#F87171';
    return util >= 75 ? '#2563eb' : util >= 60 ? '#f59e0b' : '#ef4444';
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: tick }} axisLine={false} tickLine={false} />
        <YAxis
          tick={{ fontSize: 12, fill: tick }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `${v}%`}
          domain={[0, 100]}
          width={36}
        />
        <Tooltip
          formatter={(value) => [`${Number(value)}%`, 'Utilization']}
          contentStyle={{ borderRadius: '8px', border: `1px solid ${tipBdr}`, backgroundColor: tipBg, color: tipTxt, fontSize: '13px' }}
        />
        <Bar dataKey="utilization" radius={[4, 4, 0, 0]}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={barColor(entry.utilization)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';
import { useDateRange } from '@/contexts/DateRangeContext';
import { useBusinessData } from '@/hooks/useBusinessData';

export function CustomerStackedChart() {
  const { resolvedTheme } = useTheme();
  const { range } = useDateRange();
  const { customerChart } = useBusinessData();
  const dark = resolvedTheme === 'dark';
  const data = customerChart[range];

  const grid   = dark ? '#2A2E37' : '#F3F4F6';
  const tick   = dark ? '#9AA0A6' : '#9CA3AF';
  const tipBg  = dark ? '#22262F' : '#ffffff';
  const tipBdr = dark ? '#3C4049' : '#E5E7EB';
  const tipTxt = dark ? '#E8EAED' : '#111827';
  const legend = dark ? '#9AA0A6' : '#9CA3AF';

  const retainedColor = dark ? '#60A5FA' : '#2563eb';
  const newColor      = dark ? '#34D399' : '#93c5fd';

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: tick }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: tick }} axisLine={false} tickLine={false} width={36} />
        <Tooltip
          contentStyle={{ borderRadius: '8px', border: `1px solid ${tipBdr}`, backgroundColor: tipBg, color: tipTxt, fontSize: '13px' }}
        />
        <Legend
          iconType="circle"
          iconSize={7}
          wrapperStyle={{ fontSize: '12px', color: legend, paddingTop: '4px' }}
        />
        <Bar dataKey="retained" name="Retained" fill={retainedColor} stackId="a" radius={[0, 0, 0, 0]} />
        <Bar dataKey="new" name="New" fill={newColor} stackId="a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

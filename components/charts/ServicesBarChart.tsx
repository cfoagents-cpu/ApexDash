'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';
import { useDateRange } from '@/contexts/DateRangeContext';
import { useBusinessData } from '@/hooks/useBusinessData';

// Brightened, distinct colors for dark mode (tested against #181B22 card bg)
const DARK_COLORS = ['#60A5FA', '#34D399', '#A78BFA', '#FBBF24', '#F87171', '#67E8F9'];

export function ServicesBarChart() {
  const { resolvedTheme } = useTheme();
  const { range } = useDateRange();
  const { serviceData } = useBusinessData();
  const dark = resolvedTheme === 'dark';
  const data = serviceData[range];

  const grid   = dark ? '#2A2E37' : '#F3F4F6';
  const tick   = dark ? '#9AA0A6' : '#9CA3AF';
  const tipBg  = dark ? '#22262F' : '#ffffff';
  const tipBdr = dark ? '#3C4049' : '#E5E7EB';
  const tipTxt = dark ? '#E8EAED' : '#111827';

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 10, bottom: 30, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
        <XAxis
          dataKey="service"
          tick={{ fontSize: 11, fill: tick }}
          axisLine={false}
          tickLine={false}
          angle={-20}
          textAnchor="end"
          interval={0}
          height={50}
        />
        <YAxis
          tick={{ fontSize: 11, fill: tick }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
          width={40}
        />
        <Tooltip
          formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
          contentStyle={{ borderRadius: '8px', border: `1px solid ${tipBdr}`, backgroundColor: tipBg, color: tipTxt, fontSize: '13px' }}
        />
        <Bar dataKey="revenue" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={entry.service} fill={dark ? DARK_COLORS[i % DARK_COLORS.length] : entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

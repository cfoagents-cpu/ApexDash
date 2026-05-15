'use client';

import { createContext, useContext, useState } from 'react';

export type DateRange = 'today' | '7d' | '30d' | 'quarter' | 'year';

export const DATE_RANGE_LABELS: Record<DateRange, string> = {
  today: 'Today',
  '7d': 'Last 7 Days',
  '30d': 'Last 30 Days',
  quarter: 'This Quarter',
  year: 'This Year',
};

interface DateRangeContextType {
  range: DateRange;
  setRange: (range: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContextType>({
  range: '30d',
  setRange: () => {},
});

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange>('30d');
  return (
    <DateRangeContext.Provider value={{ range, setRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  return useContext(DateRangeContext);
}

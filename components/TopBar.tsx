'use client';

import { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDateRange, type DateRange } from '@/contexts/DateRangeContext';
import { NotificationPanel } from '@/components/NotificationPanel';
import { notifications } from '@/lib/notifications';
import { useAuth } from '@/contexts/AuthContext';

export function TopBar() {
  const { range, setRange } = useDateRange();
  const { business } = useAuth();
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const unreadCount = notifications.filter(
    n => (n.tier === 1 || n.tier === 2) && !readIds.has(n.id)
  ).length;

  function markRead(id: string) {
    setReadIds(prev => new Set([...prev, id]));
  }

  function markAllRead() {
    setReadIds(new Set(notifications.map(n => n.id)));
  }

  return (
    <header className="h-14 bg-card border-b border-border flex items-center px-6 gap-4 flex-shrink-0 relative z-50">
      <div className="flex-1">
        <h1 className="text-foreground font-semibold text-sm">
          {business?.name ?? 'Dashboard'}
        </h1>
      </div>

      <Select
        value={range}
        onValueChange={(val) => setRange(val as DateRange)}
      >
        <SelectTrigger className="w-38 h-8 text-sm cursor-pointer">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="7d">Last 7 Days</SelectItem>
          <SelectItem value="30d">Last 30 Days</SelectItem>
          <SelectItem value="quarter">This Quarter</SelectItem>
          <SelectItem value="year">This Year</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search jobs, customers..."
          className="pl-8 pr-4 py-1.5 text-sm border border-border rounded-lg w-52 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
        />
      </div>

      {/* Bell + notification panel wrapper */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setNotifOpen(o => !o)}
          className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
              {unreadCount}
            </span>
          )}
        </button>

        <NotificationPanel
          isOpen={notifOpen}
          onClose={() => setNotifOpen(false)}
          readIds={readIds}
          onMarkRead={markRead}
          onMarkAllRead={markAllRead}
        />
      </div>
    </header>
  );
}

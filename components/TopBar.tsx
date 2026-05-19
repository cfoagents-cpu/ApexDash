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
import { notifications as demoNotifications, type AppNotification } from '@/lib/notifications';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessData } from '@/hooks/useBusinessData';

export function TopBar() {
  const { range, setRange } = useDateRange();
  const { business, isRealUser } = useAuth();
  const { alerts } = useBusinessData();
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const notifications: AppNotification[] = isRealUser
    ? alerts.map(a => ({
        id: a.id,
        tier: (a.severity === 'high' ? 1 : a.severity === 'medium' ? 2 : 3) as 1 | 2 | 3,
        title: a.title,
        description: a.description,
        what: a.description,
        why: a.type === 'overdue-invoice'
          ? 'Collection rates drop sharply after 30 days. Act now to avoid write-offs.'
          : 'High callback rates hurt profitability and customer satisfaction.',
        action: a.type === 'overdue-invoice'
          ? 'Call the customer directly and offer a payment plan if needed.'
          : 'Review the jobs with this technician and identify patterns.',
        route: a.type === 'overdue-invoice' ? '/dashboard/revenue' : '/dashboard/operations',
        time: 'Recent',
      }))
    : demoNotifications;

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
          notifications={notifications}
        />
      </div>
    </header>
  );
}

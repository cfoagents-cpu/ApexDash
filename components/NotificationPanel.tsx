'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowRight } from 'lucide-react';
import { type AppNotification, type NotificationTier } from '@/lib/notifications';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  readIds: Set<string>;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  notifications: AppNotification[];
}

const TIER_META: Record<
  NotificationTier,
  { label: string; leftBorder: string; sectionBg: string; sectionText: string; dot: string }
> = {
  1: {
    label: 'Urgent — Act Today',
    leftBorder: 'border-l-red-500',
    sectionBg: 'bg-red-50 dark:bg-red-950/30',
    sectionText: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
  2: {
    label: 'This Week',
    leftBorder: 'border-l-amber-500',
    sectionBg: 'bg-amber-50 dark:bg-amber-950/30',
    sectionText: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  3: {
    label: 'Monthly Review',
    leftBorder: 'border-l-gray-400',
    sectionBg: 'bg-gray-50 dark:bg-gray-800/30',
    sectionText: 'text-gray-600 dark:text-gray-400',
    dot: 'bg-gray-400',
  },
  4: {
    label: 'Wins',
    leftBorder: 'border-l-emerald-500',
    sectionBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    sectionText: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
};

const ROUTE_LABELS: Record<string, string> = {
  '/dashboard/revenue': 'Revenue',
  '/dashboard/operations': 'Operations',
  '/dashboard/sales': 'Sales',
  '/dashboard/customers': 'Customers',
  '/dashboard': 'Overview',
};

export function NotificationPanel({ isOpen, onClose, readIds, onMarkRead, onMarkAllRead, notifications }: Props) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function handleItemClick(n: AppNotification) {
    onMarkRead(n.id);
    setExpandedId(prev => (prev === n.id ? null : n.id));
  }

  function navigate(route: string) {
    onClose();
    router.push(route);
  }

  if (!isOpen) return null;

  const tiers: NotificationTier[] = [1, 2, 3, 4];

  return (
    <>
      {/* Backdrop — closes panel when clicking outside */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="absolute right-0 top-full mt-2 w-[420px] max-h-[calc(100vh-5rem)] bg-card border border-border rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
          <span className="font-semibold text-sm text-foreground">Notifications</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onMarkAllRead}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Notification list */}
        <div className="overflow-y-auto flex-1">
          {tiers.map(tier => {
            const items = notifications.filter(n => n.tier === tier);
            if (items.length === 0) return null;
            const meta = TIER_META[tier];

            return (
              <div key={tier}>
                {/* Section header */}
                <div className={`flex items-center gap-2 px-4 py-2 sticky top-0 z-10 ${meta.sectionBg}`}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`} />
                  <span className={`text-xs font-semibold uppercase tracking-wide ${meta.sectionText}`}>
                    {meta.label}
                  </span>
                </div>

                {/* Items */}
                <div className="px-3 pt-1 pb-2 space-y-1">
                  {items.map(n => {
                    const isRead = readIds.has(n.id);
                    const isExpanded = expandedId === n.id;

                    return (
                      <div
                        key={n.id}
                        className={`rounded-r-lg border-l-[3px] ${meta.leftBorder} transition-opacity ${isRead ? 'opacity-55' : ''}`}
                      >
                        {/* Summary row */}
                        <button
                          onClick={() => handleItemClick(n)}
                          className="w-full text-left px-3 py-2.5 hover:bg-muted/50 rounded-r-lg transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                {!isRead && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                )}
                                <p className="text-sm font-semibold text-foreground leading-snug truncate">
                                  {n.title}
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground leading-snug line-clamp-1">
                                {n.description}
                              </p>
                            </div>
                            <span className="text-[11px] text-muted-foreground whitespace-nowrap flex-shrink-0 mt-0.5">
                              {n.time}
                            </span>
                          </div>
                        </button>

                        {/* Expanded detail */}
                        {isExpanded && (
                          <div className="px-3 pb-3">
                            <div className="bg-muted/40 rounded-lg p-3 space-y-2.5 text-xs">
                              <div>
                                <p className="font-semibold text-foreground mb-0.5">What changed</p>
                                <p className="text-muted-foreground leading-relaxed">{n.what}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-foreground mb-0.5">Why it matters</p>
                                <p className="text-muted-foreground leading-relaxed">{n.why}</p>
                              </div>
                              <div>
                                <p className="font-semibold text-foreground mb-0.5">What to do</p>
                                <p className="text-muted-foreground leading-relaxed">{n.action}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => navigate(n.route)}
                              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              Go to {ROUTE_LABELS[n.route] ?? 'Dashboard'}
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-border flex-shrink-0">
          <p className="text-xs text-center text-muted-foreground">
            Manage alert preferences in{' '}
            <button
              onClick={() => navigate('/dashboard/settings')}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Settings
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

import { AlertTriangle, Star, PhoneCall } from 'lucide-react';
import type { Alert } from '@/types';

const typeConfig: Record<Alert['type'], { icon: React.ElementType; iconColor: string; bgColor: string }> = {
  'overdue-invoice': { icon: AlertTriangle, iconColor: 'text-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-950' },
  'bad-review':      { icon: Star,          iconColor: 'text-red-500',   bgColor: 'bg-red-50 dark:bg-red-950'     },
  callback:          { icon: PhoneCall,     iconColor: 'text-orange-500',bgColor: 'bg-orange-50 dark:bg-orange-950'},
};

const severityBadge: Record<Alert['severity'], string> = {
  high:   'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400',
  low:    'bg-muted text-muted-foreground',
};

export function AlertsPanel({ alerts }: { alerts: Alert[] }) {
  return (
    <div className="space-y-2.5">
      {alerts.map((alert) => {
        const { icon: Icon, iconColor, bgColor } = typeConfig[alert.type];
        return (
          <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/30">
            <div className={`p-1.5 rounded-lg ${bgColor} flex-shrink-0 mt-0.5`}>
              <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <p className="text-sm font-medium text-foreground leading-snug">{alert.title}</p>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${severityBadge[alert.severity]}`}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">{alert.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

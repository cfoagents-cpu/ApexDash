'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Circle, ArrowRight, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const STEPS = [
  { key: 'monthly',   label: 'Monthly numbers',     desc: 'Revenue, jobs, leads per month' },
  { key: 'averages',  label: 'Business averages',    desc: 'Job value, margins, ratings' },
  { key: 'services',  label: 'Services breakdown',   desc: 'Revenue split by service type' },
  { key: 'marketing', label: 'Marketing sources',    desc: 'Where your leads come from' },
  { key: 'team',      label: 'Team & technicians',   desc: 'Utilization and performance' },
] as const;

function useSetupProgress() {
  const { metrics } = useAuth();
  return {
    monthly:   (metrics?.monthly_data.length ?? 0) > 0,
    averages:  (metrics?.averages.avg_job_value ?? 0) > 0,
    services:  (metrics?.services.length ?? 0) > 0,
    marketing: (metrics?.lead_sources.length ?? 0) > 0,
    team:      (metrics?.technicians_data.length ?? 0) > 0,
  };
}

export function SetupProgressCard() {
  const { isRealUser, metrics, isLoading } = useAuth();
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);
  const progress = useSetupProgress();

  if (!isRealUser || isLoading || dismissed) return null;

  const completed = Object.values(progress).filter(Boolean).length;
  const total = STEPS.length;
  const allDone = completed === total;

  if (allDone) return null;

  const pct = Math.round((completed / total) * 100);

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Complete your setup</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {completed === 0
              ? 'Add your business data to activate your dashboard.'
              : `${completed} of ${total} sections done — keep going.`}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex-shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
        {STEPS.map(({ key, label, desc }) => {
          const done = progress[key];
          return (
            <div
              key={key}
              className={`flex items-start gap-2 p-2.5 rounded-lg border text-left ${
                done
                  ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-950/30'
                  : 'border-border bg-muted/30'
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {done
                  ? <Check className="w-3.5 h-3.5 text-emerald-600" />
                  : <Circle className="w-3.5 h-3.5 text-muted-foreground" />
                }
              </div>
              <div>
                <p className={`text-xs font-semibold leading-tight ${done ? 'text-emerald-700 dark:text-emerald-400' : 'text-foreground'}`}>
                  {label}
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => router.push('/dashboard/reports')}
        className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
      >
        {completed === 0 ? 'Add your data' : 'Continue setup'}
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

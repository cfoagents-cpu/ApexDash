'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, BarChart2, Bell, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function WelcomeModal() {
  const { user, isRealUser, metrics, isLoading } = useAuth();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const isNewUser = isRealUser && !isLoading && (metrics === null || metrics.monthly_data.length === 0);

  useEffect(() => {
    if (!user || !isNewUser) return;
    const key = `fm-welcomed-${user.id}`;
    if (!localStorage.getItem(key)) {
      setVisible(true);
    }
  }, [user, isNewUser]);

  function dismiss() {
    if (user) localStorage.setItem(`fm-welcomed-${user.id}`, '1');
    setVisible(false);
  }

  function goSetup() {
    dismiss();
    router.push('/dashboard/reports');
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={dismiss} />

      {/* Card */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col gap-6">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div>
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950 rounded-xl flex items-center justify-center mb-4">
            <BarChart2 className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Welcome to FieldMetrics</h2>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Your dashboard is ready. Add your business numbers and every KPI, chart, and alert will populate automatically.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {[
            { icon: <CheckCircle2 className="w-4 h-4 text-blue-600" />, text: 'Enter your monthly revenue, jobs, and leads' },
            { icon: <BarChart2 className="w-4 h-4 text-blue-600" />, text: 'Your KPIs and charts fill in automatically' },
            { icon: <Bell className="w-4 h-4 text-blue-600" />, text: 'Get alerts when something needs your attention' },
          ].map(({ icon, text }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 bg-blue-50 dark:bg-blue-950 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                {icon}
              </div>
              <p className="text-sm text-foreground leading-snug pt-1">{text}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={goSetup}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Set Up My Dashboard
          </button>
          <button
            onClick={dismiss}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            I&apos;ll do this later
          </button>
        </div>
      </div>
    </div>
  );
}

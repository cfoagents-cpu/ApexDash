'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { WelcomeModal } from '@/components/WelcomeModal';
import { DateRangeProvider } from '@/contexts/DateRangeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, business, isRealUser, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    const isOwner = user.email === 'jaxson@getfieldmetrics.com';
    if (isRealUser && user.businessId === '' && !isOwner) {
      router.replace('/onboarding');
    } else if (isRealUser && !business && !isOwner) {
      router.replace('/waiting');
    }
  }, [user, business, isRealUser, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-background">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <svg className="w-4 h-4 text-white fill-white" viewBox="0 0 24 24"><path d="M13 2L4.09 12.26a1 1 0 0 0 .76 1.64L11 14l-2 8 8.91-10.26a1 1 0 0 0-.76-1.64L11 10l2-8z" /></svg>
          </div>
          <span className="text-base font-semibold text-foreground tracking-tight">FieldMetrics</span>
        </div>
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DateRangeProvider>
      <WelcomeModal />
      <div className="flex h-screen bg-background overflow-hidden">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {user.role === 'viewer' && (
            <div className="flex items-center justify-center gap-2 py-1.5 bg-amber-500/10 border-b border-amber-500/20 flex-shrink-0">
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                View-only mode — contact your admin to make changes
              </span>
            </div>
          )}
          <TopBar onMenuClick={() => setSidebarOpen(o => !o)} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </DateRangeProvider>
  );
}

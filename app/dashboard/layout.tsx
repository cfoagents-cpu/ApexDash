'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { DateRangeProvider } from '@/contexts/DateRangeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, business, isRealUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (isRealUser && user.businessId === '') {
      // Signed up but hasn't filled in business info
      router.replace('/onboarding');
    } else if (isRealUser && !business) {
      // Filled in info but not yet approved
      router.replace('/waiting');
    }
  }, [user, business, isRealUser, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DateRangeProvider>
      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {user.role === 'viewer' && (
            <div className="flex items-center justify-center gap-2 py-1.5 bg-amber-500/10 border-b border-amber-500/20 flex-shrink-0">
              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                View-only mode — contact your admin to make changes
              </span>
            </div>
          )}
          {isRealUser && (
            <div className="flex items-center justify-center gap-2 py-1.5 bg-blue-500/10 border-b border-blue-500/20 flex-shrink-0">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                You&apos;re viewing sample data — real data entry coming soon
              </span>
            </div>
          )}
          <TopBar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </DateRangeProvider>
  );
}

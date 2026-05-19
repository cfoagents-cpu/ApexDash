'use client';

import { Clock, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function WaitingPage() {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex items-center gap-2.5 mb-10 justify-center">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-foreground font-bold text-xl tracking-tight">FieldMetrics</span>
        </div>

        <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">You&apos;re on the list</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          We&apos;ve received your application and will review it shortly. You&apos;ll get an email at the address you signed up with once you&apos;re approved — usually within 24 hours.
        </p>

        <p className="text-xs text-muted-foreground mt-8">
          Questions? Reach us at{' '}
          <a href="mailto:cfo.agents@gmail.com" className="text-foreground hover:underline">
            cfo.agents@gmail.com
          </a>
        </p>

        <button
          onClick={() => logout()}
          className="mt-6 text-xs text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

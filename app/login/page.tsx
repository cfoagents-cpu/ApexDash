'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Zap, TrendingUp, Bell, BarChart2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

const DEMO_ACCOUNTS = [
  { label: 'Sunrise HVAC', sublabel: 'HVAC · Austin, TX', email: 'owner@sunrisehvac.com', password: 'apex2024', badge: 'HVAC', badgeClass: 'bg-blue-600 text-white' },
  { label: 'Blue Ridge Plumbing', sublabel: 'Plumbing · Denver, CO', email: 'owner@blueridge.com', password: 'ridge2024', badge: 'Plumbing', badgeClass: 'bg-cyan-600 text-white' },
  { label: 'Bright Wire Electric', sublabel: 'Electrical · Phoenix, AZ', email: 'owner@brightwireelectric.com', password: 'bright2024', badge: 'Electric', badgeClass: 'bg-amber-500 text-white' },
  { label: 'Peak Roofing Co.', sublabel: 'Roofing · Dallas, TX', email: 'owner@peakroofing.com', password: 'peak2024', badge: 'Roofing', badgeClass: 'bg-orange-700 text-white' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { ok, error: err } = await login(email.trim(), password);
    setLoading(false);
    if (ok) {
      router.push('/dashboard');
    } else {
      setError(err ?? 'Incorrect email or password. Try a demo account below.');
    }
  }

  async function loginAsDemo(acc: typeof DEMO_ACCOUNTS[0]) {
    await login(acc.email, acc.password);
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel — brand ───────────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #0F1115 0%, #181B22 60%, #1a1f2e 100%)' }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">FieldMetrics</span>
        </div>

        {/* Headline */}
        <div className="relative space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Turn your business<br />
              numbers into<br />
              <span className="text-blue-400">decisions that matter.</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Every KPI a home service business needs, live in one place. Know what&apos;s working, catch problems early, and grow with confidence.
            </p>
          </div>

          {/* Feature pills */}
          <div className="space-y-3">
            {[
              { icon: BarChart2, text: 'Revenue, customers, ops, and sales — all connected' },
              { icon: Bell,      text: 'Alerts fire before small problems become expensive ones' },
              { icon: TrendingUp, text: 'Built for HVAC, plumbing, electric, and every trade' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(37,99,235,0.15)' }}>
                  <Icon className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-slate-300 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative">
          <p className="text-slate-500 text-sm">
            Built for home service businesses · Austin, TX
          </p>
        </div>
      </div>

      {/* ── Right panel — form ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-background">
        {/* Mobile logo */}
        <div className="flex items-center gap-2.5 mb-10 lg:hidden">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="text-foreground font-bold text-lg">FieldMetrics</span>
        </div>

        <div className="w-full max-w-sm mx-auto">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground text-sm mt-1">Sign in to your dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@yourbusiness.com"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm shadow-blue-600/20"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-medium">Try a demo account</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => loginAsDemo(acc)}
                  className="text-left p-3 rounded-lg border border-border hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <p className="text-xs font-semibold text-foreground leading-tight">{acc.label}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 leading-none ${acc.badgeClass}`}>
                      {acc.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">{acc.sublabel}</p>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
              Get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

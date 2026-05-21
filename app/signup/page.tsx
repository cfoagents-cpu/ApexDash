'use client';

import { useState } from 'react';
import { Eye, EyeOff, Zap, ShieldCheck, BarChart2, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [billing, setBilling] = useState<'founding_monthly' | 'founding_annual'>('founding_monthly');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    if (!data.session) {
      setLoading(false);
      setError('Please check your email and confirm your address before continuing.');
      return;
    }

    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, userId: data.session.user.id, plan: billing }),
    });
    const { url } = await res.json();
    setLoading(false);
    window.location.href = url;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10 justify-center">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-foreground font-bold text-xl tracking-tight">FieldMetrics</span>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Founding Member Pricing — Limited Spots
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Start knowing your numbers</h1>
          <p className="text-muted-foreground text-sm mt-2">Join contractors already making smarter business decisions.</p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setBilling('founding_monthly')}
            className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 ${billing === 'founding_monthly' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md shadow-blue-500/10' : 'border-border bg-card hover:border-blue-300'}`}
          >
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Monthly</p>
            <p className="text-2xl font-bold text-foreground">$97</p>
            <p className="text-xs text-muted-foreground mt-0.5">per month</p>
            <p className="text-xs text-muted-foreground mt-2">Cancel anytime</p>
          </button>

          <button
            type="button"
            onClick={() => setBilling('founding_annual')}
            className={`p-4 rounded-2xl border-2 text-left transition-all duration-200 relative ${billing === 'founding_annual' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md shadow-blue-500/10' : 'border-border bg-card hover:border-blue-300'}`}
          >
            <span className="absolute -top-2.5 right-3 bg-green-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">2 MONTHS FREE</span>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Annual</p>
            <p className="text-2xl font-bold text-foreground">$970</p>
            <p className="text-xs text-muted-foreground mt-0.5">per year</p>
            <p className="text-xs text-green-500 font-semibold mt-2">Save $194/yr</p>
          </button>
        </div>

        {/* Form card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
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
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
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
                  placeholder="Min. 8 characters"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
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

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
                Confirm password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Re-enter password"
                required
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? 'Setting up your account…' : `Start for ${billing === 'founding_monthly' ? '$97/mo' : '$970/yr'} →`}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-500 hover:text-blue-600 font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { icon: ShieldCheck, label: 'Secure checkout' },
            { icon: BarChart2, label: 'Instant access' },
            { icon: Users, label: 'Cancel anytime' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 text-center">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

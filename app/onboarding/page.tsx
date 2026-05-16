'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const INDUSTRIES = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Landscaping & Lawn Care',
  'Pest Control',
  'Painting',
  'General Contractor',
  'Cleaning Services',
  'Other',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', industry: '', phone: '', city: '', state: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Business name is required.');
      return;
    }

    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setLoading(false);
      setError('Your session expired. Please sign in again.');
      router.push('/login');
      return;
    }

    const { error: insertError } = await supabase.from('businesses').insert({
      user_id: session.user.id,
      name: form.name.trim(),
      industry: form.industry,
      phone: form.phone,
      email: session.user.email,
      address: '',
      city: form.city,
      state: form.state,
      zip: '',
      approved: false,
    });

    setLoading(false);

    if (insertError) {
      setError(`Error: ${insertError.message}`);
      return;
    }

    // Notify admin
    await fetch('/api/notify-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessName: form.name.trim(),
        industry: form.industry,
        city: form.city,
        state: form.state,
        email: session.user.email,
      }),
    });

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">You&apos;re on the list</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Thanks for signing up — we&apos;ll review your application and send you an email when your account is approved. Usually within 24 hours.
          </p>
          <p className="text-xs text-muted-foreground mt-6">
            Questions? Email us at <span className="text-foreground">cfo.agents@gmail.com</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <Zap className="w-5 h-5 text-white" fill="white" />
          </div>
          <span className="text-foreground font-bold text-xl tracking-tight">Apex Dashboard</span>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Tell us about your business</h1>
          <p className="text-muted-foreground text-sm mt-1">Takes 30 seconds — we&apos;ll review and get you in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
              Business name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Smith HVAC & Plumbing"
              required
              className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
              Industry
            </label>
            <select
              value={form.industry}
              onChange={e => set('industry', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            >
              <option value="">Select your industry</option>
              {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">
              Phone number
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              placeholder="(555) 000-0000"
              className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">City</label>
              <input
                type="text"
                value={form.city}
                onChange={e => set('city', e.target.value)}
                placeholder="Austin"
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wide">State</label>
              <input
                type="text"
                value={form.state}
                onChange={e => set('state', e.target.value)}
                placeholder="TX"
                maxLength={2}
                className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm shadow-blue-600/20"
          >
            {loading ? 'Submitting…' : 'Request access →'}
          </button>
        </form>
      </div>
    </div>
  );
}

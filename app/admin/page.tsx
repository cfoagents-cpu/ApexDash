'use client';

import { useState } from 'react';
import { Zap, CheckCircle, Clock, Users, RefreshCw } from 'lucide-react';

interface Applicant {
  user_id: string;
  name: string;
  industry: string;
  city: string;
  state: string;
  email: string;
  approved: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/admin/signups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPassword: password }),
    });
    if (res.status === 401) {
      setAuthError('Wrong password.');
      return;
    }
    const json = await res.json();
    setApplicants(json.data ?? []);
    setAuthed(true);
  }

  async function loadApplicants() {
    setLoading(true);
    const res = await fetch('/api/admin/signups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPassword: password }),
    });
    const json = await res.json();
    setApplicants(json.data ?? []);
    setLoading(false);
  }

  async function approve(userId: string) {
    setApproving(userId);
    await fetch('/api/approve-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminPassword: password, userId }),
    });
    setApproving(null);
    loadApplicants();
  }

  const pending = applicants.filter(a => !a.approved);
  const approved = applicants.filter(a => a.approved);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-xs">
          <div className="flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-foreground font-bold text-xl">Admin Panel</span>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full px-3.5 py-2.5 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {authError && <p className="text-sm text-red-500">{authError}</p>}
            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Apex Dashboard</p>
            </div>
          </div>
          <button
            onClick={loadApplicants}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-muted transition-colors text-foreground"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total signups', value: applicants.length, icon: Users },
            { label: 'Pending approval', value: pending.length, icon: Clock },
            { label: 'Approved', value: approved.length, icon: CheckCircle },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="border border-border rounded-xl p-4 bg-card">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Pending */}
        {pending.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Pending approval ({pending.length})
            </h2>
            <div className="space-y-3">
              {pending.map(a => (
                <div key={a.user_id} className="border border-border rounded-xl p-4 bg-card flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm">{a.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {[a.industry, a.city && a.state ? `${a.city}, ${a.state}` : ''].filter(Boolean).join(' · ')}
                    </p>
                    <p className="text-xs text-muted-foreground">{a.email}</p>
                  </div>
                  <button
                    onClick={() => approve(a.user_id)}
                    disabled={approving === a.user_id}
                    className="flex-shrink-0 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    {approving === a.user_id ? 'Approving…' : 'Approve'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved */}
        {approved.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Approved ({approved.length})
            </h2>
            <div className="space-y-2">
              {approved.map(a => (
                <div key={a.user_id} className="border border-border rounded-xl px-4 py-3 bg-card flex items-center justify-between gap-4 opacity-70">
                  <div>
                    <p className="font-medium text-foreground text-sm">{a.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {[a.industry, a.city && a.state ? `${a.city}, ${a.state}` : ''].filter(Boolean).join(' · ')} · {a.email}
                    </p>
                  </div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Approved</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && applicants.length === 0 && (
          <div className="text-center py-16 text-muted-foreground text-sm">
            No signups yet. Share your link to get started.
          </div>
        )}
      </div>
    </div>
  );
}

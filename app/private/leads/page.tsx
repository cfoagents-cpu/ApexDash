'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users, Mail, CheckCircle, Zap, RefreshCw, Copy, Check,
  LogOut, Search, ExternalLink, Link, ChevronDown, ChevronUp,
  Download, X, Star, Settings, Phone,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Lead {
  id: string;
  score: number;
  tier: 'A' | 'B' | 'C';
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  email_status: 'verified' | 'unverified' | 'none';
  phone: string;
  company: string;
  domain: string;
  employee_count: number | null;
  website: string;
  google_rating: number | null;
  review_count: number | null;
  city: string;
  state: string;
  linkedin_url: string;
  source: 'apollo' | 'google_places';
  status: 'new' | 'contacted' | 'replied' | 'won' | 'rejected';
  created_at: string;
}

interface Run {
  id: string;
  ran_at: string;
  sources: string[];
  found: number;
  kept: number;
  added: number;
  drop_breakdown: Record<string, number>;
  tier_breakdown: Record<string, number>;
}

interface Settings {
  target_states: string[];
  vertical_keywords: string[];
  size_min: number;
  size_max: number;
  sweet_spot_min: number;
  sweet_spot_max: number;
  allowed_titles: string[];
  batch_size: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const TIER_COLOR: Record<string, string> = {
  A: 'bg-green-500/15 text-green-400 border border-green-500/30',
  B: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
  C: 'bg-muted text-muted-foreground border border-border',
};

const STATUS_LABEL: Record<string, { label: string; color: string }> = {
  new:       { label: 'New',       color: 'text-blue-400' },
  contacted: { label: 'Contacted', color: 'text-yellow-400' },
  replied:   { label: 'Replied',   color: 'text-purple-400' },
  won:       { label: 'Won',       color: 'text-green-400' },
  rejected:  { label: 'Rejected',  color: 'text-red-400' },
};

const EMAIL_BADGE: Record<string, string> = {
  verified:   'bg-green-500/15 text-green-400 border border-green-500/30',
  unverified: 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/30',
  none:       'bg-muted text-muted-foreground border border-border',
};

function csvRow(vals: string[]) {
  return vals.map(v => v.includes(',') || v.includes('"') ? `"${v.replace(/"/g, '""')}"` : v).join(',');
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function PrivateLeadsPage() {
  const router = useRouter();
  const token = useRef('');

  const [leads, setLeads]           = useState<Lead[]>([]);
  const [runs, setRuns]             = useState<Run[]>([]);
  const [settings, setSettings]     = useState<Settings | null>(null);
  const [loading, setLoading]       = useState(true);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast]           = useState<{ msg: string; ok: boolean } | null>(null);

  // Filters
  const [search, setSearch]         = useState('');
  const [tierF, setTierF]           = useState('all');
  const [stateF, setStateF]         = useState('all');
  const [emailF, setEmailF]         = useState('all');
  const [statusF, setStatusF]       = useState('new');
  const [sourceF, setSourceF]       = useState('all');
  const [showRejected, setShowRejected] = useState(false);

  // UI state
  const [selected, setSelected]     = useState<Set<string>>(new Set());
  const [copied, setCopied]         = useState<string | null>(null);
  const [runsOpen, setRunsOpen]     = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [editSettings, setEditSettings] = useState<Settings | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 5000);
  }

  const fetchAll = useCallback(async (rejected = showRejected) => {
    const res = await fetch(`/api/private/leads${rejected ? '?rejected=1' : ''}`, {
      headers: { Authorization: `Bearer ${token.current}` },
    });
    if (res.status === 401) { router.push('/private/login'); return; }
    if (res.ok) {
      const d = await res.json();
      setLeads(d.leads ?? []);
      setRuns(d.runs ?? []);
      if (d.settings) setSettings(d.settings);
    }
    setLoading(false);
  }, [router, showRejected]);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? (localStorage.getItem('fm_private_token') ?? '') : '';
    if (!t) { router.push('/private/login'); return; }
    token.current = t;
    fetchAll();
  }, [fetchAll, router]);

  // ── Generate ──────────────────────────────────────────────────────────────
  async function generate() {
    setGenerating(true);
    try {
      const res = await fetch('/api/private/leads/generate', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.current}` },
      });
      const d = await res.json();
      await fetchAll();

      if (d.exhausted) {
        showToast('All metros searched — cycling back to start. Consider widening ICP in Settings.', false);
      } else if (d.added === 0) {
        showToast(`Found ${d.found} businesses in ${d.metro} — all duplicates or filtered out.`, false);
      } else {
        const tierStr = `${d.tiers.A} A, ${d.tiers.B} B, ${d.tiers.C} C`;
        showToast(`Added ${d.added} new leads (${tierStr}) from ${d.metro}`);
      }
    } catch {
      showToast('Generation failed — check console.', false);
    }
    setGenerating(false);
  }

  // ── Row actions ───────────────────────────────────────────────────────────
  async function updateStatus(id: string, status: Lead['status']) {
    await fetch(`/api/private/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.current}` },
      body: JSON.stringify({ status }),
    });
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  }

  function copyEmail(email: string) {
    navigator.clipboard.writeText(email);
    setCopied(email);
    setTimeout(() => setCopied(null), 2000);
  }

  // ── Bulk export ───────────────────────────────────────────────────────────
  function exportCSV() {
    const rows = filtered.filter(l => selected.has(l.id));
    const header = csvRow(['first_name', 'last_name', 'email', 'company', 'title', 'phone', 'city', 'state']);
    const lines = rows.map(l =>
      csvRow([l.first_name, l.last_name, l.email, l.company, l.title, l.phone, l.city, l.state])
    );
    const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click(); URL.revokeObjectURL(url);
  }

  async function bulkMarkContacted() {
    await Promise.all([...selected].map(id => updateStatus(id, 'contacted')));
    setSelected(new Set());
    showToast(`Marked ${selected.size} leads as contacted`);
  }

  // ── Settings save ─────────────────────────────────────────────────────────
  async function saveSettings() {
    if (!editSettings) return;
    setSavingSettings(true);
    const res = await fetch('/api/private/leads/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.current}` },
      body: JSON.stringify(editSettings),
    });
    if (res.ok) { setSettings(editSettings); showToast('Settings saved'); }
    else showToast('Failed to save settings', false);
    setSavingSettings(false);
  }

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filtered = leads.filter(l => {
    if (!showRejected && l.status === 'rejected') return false;
    if (tierF   !== 'all' && l.tier         !== tierF)   return false;
    if (stateF  !== 'all' && l.state        !== stateF)  return false;
    if (emailF  !== 'all' && l.email_status !== emailF)  return false;
    if (statusF !== 'all' && l.status       !== statusF) return false;
    if (sourceF !== 'all' && l.source       !== sourceF) return false;
    if (search) {
      const s = search.toLowerCase();
      return [l.company, l.email, l.first_name, l.last_name, l.city].some(v => v.toLowerCase().includes(s));
    }
    return true;
  });

  const allSelected = filtered.length > 0 && filtered.every(l => selected.has(l.id));
  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map(l => l.id)));
  }

  // ── Summary stats ─────────────────────────────────────────────────────────
  const visible = leads.filter(l => l.status !== 'rejected');
  const tiers = { A: 0, B: 0, C: 0 };
  for (const l of visible) tiers[l.tier as 'A' | 'B' | 'C']++;
  const verifiedCount = visible.filter(l => l.email_status === 'verified').length;
  const lastRun = runs[0];
  const newSince = lastRun ? leads.filter(l => new Date(l.created_at) > new Date(lastRun.ran_at) && l.status === 'new').length : 0;

  const hasSelection = selected.size > 0;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-muted-foreground text-sm">Loading…</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-lg text-foreground tracking-tight">FieldMetrics</span>
            <span className="text-muted-foreground/50 text-lg">·</span>
            <span className="text-muted-foreground text-sm">Private</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setEditSettings(settings ? { ...settings } : null); setSettingsOpen(o => !o); }}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-xl transition-colors"
            >
              <Settings className="w-3.5 h-3.5" /> Settings
            </button>
            <button
              onClick={generate}
              disabled={generating}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/25"
            >
              <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
              {generating ? 'Pulling leads…' : 'Get More Leads'}
            </button>
            <button
              onClick={() => { localStorage.removeItem('fm_private_token'); router.push('/private/login'); }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {[
            { label: 'Outreach', href: '/private/outreach' },
            { label: 'Leads', href: '/private/leads' },
          ].map(tab => (
            <button
              key={tab.href}
              onClick={() => router.push(tab.href)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab.href === '/private/leads'
                  ? 'text-blue-500 border-blue-500'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-5 gap-3">
          {[
            { icon: Users,        color: 'bg-blue-600',   label: 'Total Leads',    value: visible.length,    sub: 'non-rejected' },
            { icon: Star,         color: 'bg-green-600',  label: 'Tier A',         value: tiers.A,           sub: 'score ≥ 80' },
            { icon: Star,         color: 'bg-yellow-500', label: 'Tier B',         value: tiers.B,           sub: 'score 60–79' },
            { icon: Mail,         color: 'bg-purple-600', label: 'Verified Email', value: verifiedCount,     sub: 'Apollo confirmed' },
            { icon: CheckCircle,  color: 'bg-sky-600',    label: 'New This Run',   value: newSince,          sub: lastRun ? formatDate(lastRun.ran_at) : 'no runs yet' },
          ].map(({ icon: Icon, color, label, value, sub }) => (
            <div key={label} className="bg-card border border-border rounded-2xl p-4">
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center mb-2.5`}>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
              <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{sub}</p>
            </div>
          ))}
        </div>

        {/* Settings panel */}
        {settingsOpen && editSettings && (
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground text-sm">ICP Settings</h2>
              <button onClick={() => setSettingsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <SettingField
                label="Target States (comma-separated)"
                value={editSettings.target_states.join(',')}
                onChange={v => setEditSettings(s => s && ({ ...s, target_states: v.split(',').map(x => x.trim()).filter(Boolean) }))}
              />
              <SettingField
                label="Vertical Keywords (comma-separated)"
                value={editSettings.vertical_keywords.join(',')}
                onChange={v => setEditSettings(s => s && ({ ...s, vertical_keywords: v.split(',').map(x => x.trim()).filter(Boolean) }))}
              />
              <SettingField
                label="Allowed Titles (comma-separated)"
                value={editSettings.allowed_titles.join(',')}
                onChange={v => setEditSettings(s => s && ({ ...s, allowed_titles: v.split(',').map(x => x.trim()).filter(Boolean) }))}
              />
              <SettingField
                label="Batch Size (per button press)"
                value={String(editSettings.batch_size)}
                onChange={v => setEditSettings(s => s && ({ ...s, batch_size: parseInt(v) || 25 }))}
                type="number"
              />
              <div className="grid grid-cols-2 gap-2">
                <SettingField label="Size Min" value={String(editSettings.size_min)} onChange={v => setEditSettings(s => s && ({ ...s, size_min: parseInt(v) || 1 }))} type="number" />
                <SettingField label="Size Max" value={String(editSettings.size_max)} onChange={v => setEditSettings(s => s && ({ ...s, size_max: parseInt(v) || 50 }))} type="number" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <SettingField label="Sweet Spot Min" value={String(editSettings.sweet_spot_min)} onChange={v => setEditSettings(s => s && ({ ...s, sweet_spot_min: parseInt(v) || 3 }))} type="number" />
                <SettingField label="Sweet Spot Max" value={String(editSettings.sweet_spot_max)} onChange={v => setEditSettings(s => s && ({ ...s, sweet_spot_max: parseInt(v) || 25 }))} type="number" />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={saveSettings}
                disabled={savingSettings}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                {savingSettings ? 'Saving…' : 'Save Settings'}
              </button>
            </div>
          </div>
        )}

        {/* Filters + bulk actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search company, email, name…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <FilterSelect value={tierF}   onChange={setTierF}   opts={[['all','All Tiers'],['A','A'],['B','B'],['C','C']]} />
          <FilterSelect value={stateF}  onChange={setStateF}  opts={[['all','All States'],['CA','CA'],['HI','HI']]} />
          <FilterSelect value={emailF}  onChange={setEmailF}  opts={[['all','All Email'],['verified','Verified'],['unverified','Unverified'],['none','No Email']]} />
          <FilterSelect value={statusF} onChange={setStatusF} opts={[['all','All Status'],['new','New'],['contacted','Contacted'],['replied','Replied'],['won','Won'],['rejected','Rejected']]} />
          <FilterSelect value={sourceF} onChange={setSourceF} opts={[['all','All Sources'],['google_places','Google Places'],['apollo','Apollo']]} />

          <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer ml-1">
            <input type="checkbox" checked={showRejected} onChange={e => { setShowRejected(e.target.checked); fetchAll(e.target.checked); }} className="rounded" />
            Show rejected
          </label>

          <span className="text-xs text-muted-foreground ml-auto">{filtered.length} results</span>

          {hasSelection && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{selected.size} selected</span>
              <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
                <Download className="w-3 h-3" /> Export CSV
              </button>
              <button onClick={bulkMarkContacted} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/25 transition-colors">
                Mark Contacted
              </button>
              <button onClick={() => setSelected(new Set())} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground text-sm">
              {leads.length === 0
                ? 'No leads yet — click "Get More Leads" to pull your first batch.'
                : 'No leads match your filters.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-3 py-3 w-8">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded" />
                    </th>
                    {['Score', 'Name', 'Title', 'Company', 'Email', 'Phone', 'Location', 'Rating', 'Source', 'Status', ''].map(h => (
                      <th key={h} className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(lead => (
                    <tr
                      key={lead.id}
                      className={`border-b border-border/50 hover:bg-muted/20 transition-colors ${lead.status === 'rejected' ? 'opacity-40' : ''}`}
                    >
                      <td className="px-3 py-2.5 w-8">
                        <input
                          type="checkbox"
                          checked={selected.has(lead.id)}
                          onChange={e => {
                            const next = new Set(selected);
                            e.target.checked ? next.add(lead.id) : next.delete(lead.id);
                            setSelected(next);
                          }}
                          className="rounded"
                        />
                      </td>

                      {/* Score */}
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-bold ${TIER_COLOR[lead.tier]}`}>
                          {lead.tier}{lead.score}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className="text-foreground font-medium">
                          {[lead.first_name, lead.last_name].filter(Boolean).join(' ') || '—'}
                        </span>
                      </td>

                      {/* Title */}
                      <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap max-w-[130px] truncate">{lead.title || '—'}</td>

                      {/* Company */}
                      <td className="px-3 py-2.5 max-w-[180px]">
                        <div className="flex items-center gap-1">
                          <span className="text-foreground font-medium truncate">{lead.company}</span>
                          {lead.website && (
                            <a href={lead.website} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted-foreground hover:text-blue-500">
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        {lead.employee_count && (
                          <span className="text-xs text-muted-foreground">{lead.employee_count} emp</span>
                        )}
                      </td>

                      {/* Email */}
                      <td className="px-3 py-2.5 max-w-[220px]">
                        {lead.email ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-foreground truncate text-xs">{lead.email}</span>
                            <button onClick={() => copyEmail(lead.email)} className="shrink-0 text-muted-foreground hover:text-blue-500">
                              {copied === lead.email ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted-foreground/40 text-xs">—</span>
                        )}
                        {lead.email_status !== 'none' && (
                          <span className={`inline-block mt-0.5 px-1.5 py-0 text-[10px] font-medium rounded ${EMAIL_BADGE[lead.email_status]}`}>
                            {lead.email_status}
                          </span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap text-xs">
                        {lead.phone ? (
                          <div className="flex items-center gap-1">
                            <Phone className="w-2.5 h-2.5" />
                            {lead.phone}
                          </div>
                        ) : '—'}
                      </td>

                      {/* Location */}
                      <td className="px-3 py-2.5 text-muted-foreground whitespace-nowrap text-xs">
                        {lead.city && lead.state ? `${lead.city}, ${lead.state}` : lead.city || lead.state || '—'}
                      </td>

                      {/* Rating */}
                      <td className="px-3 py-2.5 whitespace-nowrap text-xs">
                        {lead.google_rating ? (
                          <span className="text-foreground">
                            ★ {lead.google_rating}
                            <span className="text-muted-foreground ml-1">({lead.review_count?.toLocaleString()})</span>
                          </span>
                        ) : '—'}
                      </td>

                      {/* Source */}
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                          lead.source === 'apollo' ? 'bg-purple-500/15 text-purple-400' : 'bg-sky-500/15 text-sky-400'
                        }`}>
                          {lead.source === 'apollo' ? 'Apollo' : 'Google'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={e => updateStatus(lead.id, e.target.value as Lead['status'])}
                          className={`text-xs bg-transparent border-none outline-none cursor-pointer font-medium ${STATUS_LABEL[lead.status]?.color}`}
                        >
                          {Object.entries(STATUS_LABEL).map(([val, { label }]) => (
                            <option key={val} value={val} className="bg-card text-foreground">{label}</option>
                          ))}
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {lead.linkedin_url && (
                            <a href={lead.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-500">
                              <Link className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {lead.status !== 'rejected' && (
                            <button
                              onClick={() => updateStatus(lead.id, 'rejected')}
                              className="text-muted-foreground hover:text-red-500"
                              title="Reject"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Runs log */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => setRunsOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-foreground hover:bg-muted/20 transition-colors"
          >
            <span>Run History ({runs.length})</span>
            {runsOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {runsOpen && (
            <div className="border-t border-border divide-y divide-border/50">
              {runs.length === 0 ? (
                <p className="px-5 py-4 text-sm text-muted-foreground">No runs yet.</p>
              ) : (
                runs.map(run => (
                  <div key={run.id} className="px-5 py-3 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-foreground">{formatDate(run.ran_at)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{run.sources?.join(' + ') || '—'}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap justify-end">
                      <span>Found <b className="text-foreground">{run.found}</b></span>
                      <span>Kept <b className="text-foreground">{run.kept}</b></span>
                      <span>Added <b className="text-green-400">{run.added}</b></span>
                      {Object.entries(run.tier_breakdown ?? {}).map(([t, c]) =>
                        c ? <span key={t}><b className={t === 'A' ? 'text-green-400' : t === 'B' ? 'text-yellow-400' : 'text-foreground'}>{c}</b> {t}</span> : null
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-semibold z-50 max-w-sm ${
          toast.ok ? 'bg-blue-600 text-white shadow-blue-600/30' : 'bg-card border border-border text-foreground'
        }`}>
          {toast.ok ? <CheckCircle className="w-4 h-4 shrink-0" /> : <X className="w-4 h-4 shrink-0 text-yellow-400" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function FilterSelect({ value, onChange, opts }: {
  value: string;
  onChange: (v: string) => void;
  opts: [string, string][];
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-2.5 py-2 text-xs border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}

function SettingField({ label, value, onChange, type = 'text' }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

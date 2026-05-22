'use client';

import { useState, useEffect } from 'react';
import { Mail, MessageSquare, Phone, Link2, Plus, Trash2 } from 'lucide-react';

type Channel = 'email' | 'sms' | 'calls' | 'linkedin';

interface Entry {
  id: string;
  date: string;
  sent: number;
  replied: number;
  converted: number;
}

type OutreachData = Record<Channel, Entry[]>;

const CHANNELS: { key: Channel; label: string; icon: typeof Mail; color: string }[] = [
  { key: 'email',    label: 'Email',       icon: Mail,          color: 'blue'   },
  { key: 'sms',      label: 'SMS',         icon: MessageSquare, color: 'green'  },
  { key: 'calls',    label: 'Cold Calls',  icon: Phone,         color: 'purple' },
  { key: 'linkedin', label: 'LinkedIn',    icon: Link2,         color: 'sky'    },
];

const STORAGE_KEY = 'fm_outreach_data';

const empty: OutreachData = { email: [], sms: [], calls: [], linkedin: [] };

function pct(a: number, b: number) {
  if (!b) return '0%';
  return `${Math.round((a / b) * 100)}%`;
}

function totals(entries: Entry[]) {
  return entries.reduce(
    (acc, e) => ({ sent: acc.sent + e.sent, replied: acc.replied + e.replied, converted: acc.converted + e.converted }),
    { sent: 0, replied: 0, converted: 0 }
  );
}

export default function OutreachPage() {
  const [data, setData] = useState<OutreachData>(empty);
  const [activeChannel, setActiveChannel] = useState<Channel>('email');
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], sent: '', replied: '', converted: '' });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setData(JSON.parse(saved));
  }, []);

  function save(next: OutreachData) {
    setData(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function addEntry() {
    if (!form.sent) return;
    const entry: Entry = {
      id: crypto.randomUUID(),
      date: form.date,
      sent: Number(form.sent),
      replied: Number(form.replied || 0),
      converted: Number(form.converted || 0),
    };
    save({ ...data, [activeChannel]: [entry, ...data[activeChannel]] });
    setForm({ date: new Date().toISOString().split('T')[0], sent: '', replied: '', converted: '' });
  }

  function deleteEntry(channel: Channel, id: string) {
    save({ ...data, [channel]: data[channel].filter(e => e.id !== id) });
  }

  const allTotals = CHANNELS.map(c => ({ ...c, ...totals(data[c.key]) }));
  const grandTotal = allTotals.reduce(
    (acc, c) => ({ sent: acc.sent + c.sent, replied: acc.replied + c.replied, converted: acc.converted + c.converted }),
    { sent: 0, replied: 0, converted: 0 }
  );

  const active = CHANNELS.find(c => c.key === activeChannel)!;
  const activeEntries = data[activeChannel];
  const activeTotal = totals(activeEntries);

  const colorMap: Record<string, string> = {
    blue:   'bg-blue-600',
    green:  'bg-green-600',
    purple: 'bg-purple-600',
    sky:    'bg-sky-600',
  };
  const lightMap: Record<string, string> = {
    blue:   'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
    green:  'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
    sky:    'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800',
  };
  const textMap: Record<string, string> = {
    blue:   'text-blue-600',
    green:  'text-green-600',
    purple: 'text-purple-600',
    sky:    'text-sky-600',
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Outreach Tracker</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your outreach across every channel</p>
      </div>

      {/* Overall summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {allTotals.map(({ key, label, icon: Icon, color, sent, replied, converted }) => (
          <button
            key={key}
            onClick={() => setActiveChannel(key)}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${activeChannel === key ? `${lightMap[color]} border-2` : 'bg-card border-border hover:border-muted-foreground/30'}`}
          >
            <div className={`w-8 h-8 ${colorMap[color]} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{sent.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {pct(replied, sent)} replied · <span className="text-green-500 font-semibold">{converted} clients</span>
            </p>
          </button>
        ))}
      </div>

      {/* Grand total bar */}
      <div className="bg-card border border-border rounded-2xl p-5 flex flex-wrap gap-6">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Outreach</p>
          <p className="text-3xl font-bold text-foreground">{grandTotal.sent.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Replies</p>
          <p className="text-3xl font-bold text-foreground">{grandTotal.replied.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{pct(grandTotal.replied, grandTotal.sent)} reply rate</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Total Clients</p>
          <p className="text-3xl font-bold text-green-500">{grandTotal.converted.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">{pct(grandTotal.converted, grandTotal.sent)} conversion rate</p>
        </div>
      </div>

      {/* Channel detail */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Channel tabs */}
        <div className="flex border-b border-border">
          {CHANNELS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveChannel(key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${activeChannel === key ? `border-blue-500 ${textMap[CHANNELS.find(c=>c.key===key)!.color]}` : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="p-5 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Sent', value: activeTotal.sent.toLocaleString() },
              { label: 'Replied', value: `${activeTotal.replied.toLocaleString()} (${pct(activeTotal.replied, activeTotal.sent)})` },
              { label: 'Converted', value: `${activeTotal.converted} (${pct(activeTotal.converted, activeTotal.sent)})` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/40 rounded-xl p-4">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
                <p className="text-xl font-bold text-foreground mt-1">{value}</p>
              </div>
            ))}
          </div>

          {/* Log entry form */}
          <div className="border border-border rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">Log {active.label} Outreach</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1">Sent</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.sent}
                  onChange={e => setForm(f => ({ ...f, sent: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1">Replied</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.replied}
                  onChange={e => setForm(f => ({ ...f, replied: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1">Converted</label>
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.converted}
                  onChange={e => setForm(f => ({ ...f, converted: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={addEntry}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Entry
            </button>
          </div>

          {/* Entry log */}
          {activeEntries.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">History</p>
              <div className="space-y-2">
                {activeEntries.map(entry => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                    <div className="flex items-center gap-6">
                      <p className="text-sm text-muted-foreground w-24">{entry.date}</p>
                      <p className="text-sm font-medium text-foreground">{entry.sent.toLocaleString()} sent</p>
                      <p className="text-sm text-muted-foreground">{entry.replied} replied <span className="text-xs">({pct(entry.replied, entry.sent)})</span></p>
                      <p className="text-sm text-green-500 font-semibold">{entry.converted} converted</p>
                    </div>
                    <button
                      onClick={() => deleteEntry(activeChannel, entry.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">No entries yet — log your first outreach above.</p>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Building2, Bell, Users, CreditCard, Sun, Moon, Palette, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { users } from '@/lib/auth';

function SaveButton({ onSave }: { onSave: () => void }) {
  const [saved, setSaved] = useState(false);
  function handleSave() {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }
  return (
    <button
      onClick={handleSave}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
    >
      {saved ? <><CheckCircle className="w-4 h-4" />Saved!</> : 'Save Changes'}
    </button>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { business, user } = useAuth();
  const teamMembers = users.filter(u => u.businessId === (business?.id ?? ''));

  const [company, setCompany] = useState({
    name: business?.name ?? '',
    phone: business?.phone ?? '',
    email: business?.email ?? '',
    address: business?.address ?? '',
    city: business?.city ?? '',
    state: business?.state ?? '',
    zip: business?.zip ?? '',
  });

  const [notifications, setNotifications] = useState({
    overdueInvoices: true,
    badReviews: true,
    highCallbackRate: true,
    weeklyReport: true,
    monthlyReport: true,
    lowUtilization: false,
  });

  function toggle(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const inputClass = 'w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';

  return (
    <div className="space-y-5 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your company profile, notifications, and team</p>
      </div>

      {/* ── Appearance ─────────────────────────────────────────────────────── */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-1 pt-5 px-5">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold">Appearance</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <p className="text-xs text-muted-foreground mb-4">
            Choose how the dashboard looks. <span className="font-medium">Auto</span> follows your device setting.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {/* Light */}
            <button
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${theme === 'light' ? 'border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-border hover:border-muted-foreground/30'}`}
            >
              <div className="w-full h-14 bg-white rounded-lg border border-gray-200 p-1.5 flex-shrink-0">
                <div className="h-1.5 w-8 bg-gray-800 rounded mb-1" />
                <div className="h-1 w-5 bg-gray-300 rounded mb-1.5" />
                <div className="flex gap-0.5">
                  <div className="flex-1 h-4 bg-blue-600 rounded-sm" />
                  <div className="flex-1 h-4 bg-gray-100 rounded-sm" />
                  <div className="flex-1 h-4 bg-gray-100 rounded-sm" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <Sun className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                <span className="text-xs font-medium text-foreground">Light</span>
                {theme === 'light' && <CheckCircle className="w-3.5 h-3.5 text-blue-600 ml-auto flex-shrink-0" />}
              </div>
            </button>

            {/* Dark */}
            <button
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${theme === 'dark' ? 'border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-border hover:border-muted-foreground/30'}`}
            >
              <div className="w-full h-14 rounded-lg border p-1.5 flex-shrink-0" style={{ backgroundColor: '#181B22', borderColor: '#2A2E37' }}>
                <div className="h-1.5 w-8 rounded mb-1" style={{ backgroundColor: '#E8EAED' }} />
                <div className="h-1 w-5 rounded mb-1.5" style={{ backgroundColor: '#5F6368' }} />
                <div className="flex gap-0.5">
                  <div className="flex-1 h-4 rounded-sm" style={{ backgroundColor: '#3B82F6' }} />
                  <div className="flex-1 h-4 rounded-sm" style={{ backgroundColor: '#22262F' }} />
                  <div className="flex-1 h-4 rounded-sm" style={{ backgroundColor: '#22262F' }} />
                </div>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <Moon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="text-xs font-medium text-foreground">Dark</span>
                {theme === 'dark' && <CheckCircle className="w-3.5 h-3.5 text-blue-600 ml-auto flex-shrink-0" />}
              </div>
            </button>

            {/* Auto */}
            <button
              onClick={() => setTheme('auto')}
              className={`flex flex-col items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${theme === 'auto' ? 'border-blue-600 bg-blue-50 dark:bg-blue-950' : 'border-border hover:border-muted-foreground/30'}`}
            >
              <div className="w-full h-14 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                <div className="flex h-full">
                  <div className="flex-1 bg-white p-1.5 flex flex-col gap-1">
                    <div className="h-1.5 w-5 bg-gray-800 rounded" />
                    <div className="h-1 w-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-blue-600 rounded-sm" />
                  </div>
                  <div className="w-px" style={{ backgroundColor: '#2A2E37' }} />
                  <div className="flex-1 p-1.5 flex flex-col gap-1" style={{ backgroundColor: '#181B22' }}>
                    <div className="h-1.5 w-5 rounded" style={{ backgroundColor: '#E8EAED' }} />
                    <div className="h-1 w-3 rounded" style={{ backgroundColor: '#5F6368' }} />
                    <div className="h-3 rounded-sm" style={{ backgroundColor: '#3B82F6' }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 w-full">
                <Monitor className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-xs font-medium text-foreground">Auto</span>
                {theme === 'auto' && <CheckCircle className="w-3.5 h-3.5 text-blue-600 ml-auto flex-shrink-0" />}
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* ── Company Profile ─────────────────────────────────────────────────── */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-1 pt-5 px-5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold">Company Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Company Name</label>
              <input type="text" value={company.name} onChange={(e) => setCompany({ ...company, name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Phone Number</label>
              <input type="text" value={company.phone} onChange={(e) => setCompany({ ...company, phone: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Email Address</label>
              <input type="email" value={company.email} onChange={(e) => setCompany({ ...company, email: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Street Address</label>
              <input type="text" value={company.address} onChange={(e) => setCompany({ ...company, address: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">City</label>
              <input type="text" value={company.city} onChange={(e) => setCompany({ ...company, city: e.target.value })} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">State</label>
                <input type="text" value={company.state} onChange={(e) => setCompany({ ...company, state: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">ZIP Code</label>
                <input type="text" value={company.zip} onChange={(e) => setCompany({ ...company, zip: e.target.value })} className={inputClass} />
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <SaveButton onSave={() => {}} />
          </div>
        </CardContent>
      </Card>

      {/* ── Notifications ───────────────────────────────────────────────────── */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-1 pt-5 px-5">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold">Alert Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <p className="text-xs text-muted-foreground mb-4">Choose which alerts appear on your dashboard and in your email.</p>
          <div className="space-y-3">
            {[
              { key: 'overdueInvoices', label: 'Overdue invoices', description: 'Alert when an invoice is more than 1 day past due' },
              { key: 'badReviews', label: 'New bad reviews', description: 'Alert when a review under 3 stars is posted' },
              { key: 'highCallbackRate', label: 'High callback rate', description: 'Alert when a technician exceeds 10% callback rate' },
              { key: 'weeklyReport', label: 'Weekly email summary', description: 'Receive a snapshot of key metrics every Monday' },
              { key: 'monthlyReport', label: 'Monthly email report', description: 'Full report emailed on the 1st of each month' },
              { key: 'lowUtilization', label: 'Low technician utilization', description: 'Alert when any technician drops below 60% utilization' },
            ].map(({ key, label, description }) => (
              <div key={key} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
                <button
                  onClick={() => toggle(key as keyof typeof notifications)}
                  className={`relative w-10 h-5.5 rounded-full transition-colors flex-shrink-0 ml-4 ${notifications[key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-muted'}`}
                  aria-label={`Toggle ${label}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full shadow-sm transition-transform ${notifications[key as keyof typeof notifications] ? 'translate-x-4.5' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <SaveButton onSave={() => {}} />
          </div>
        </CardContent>
      </Card>

      {/* ── Team Members ────────────────────────────────────────────────────── */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-1 pt-5 px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <CardTitle className="text-sm font-semibold">Team Members</CardTitle>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">+ Invite member</button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 dark:text-blue-400 text-xs font-bold">
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {member.name}{member.id === user?.id && <span className="text-xs text-muted-foreground ml-1">(you)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{member.jobTitle}</p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${member.role === 'admin' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' : 'bg-muted text-muted-foreground'}`}>
                  {member.role === 'admin' ? 'Admin' : 'Viewer'}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ── Billing ─────────────────────────────────────────────────────────── */}
      <Card className="shadow-sm rounded-xl">
        <CardHeader className="pb-1 pt-5 px-5">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold">Billing</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <div className="flex items-center justify-between py-3 bg-blue-50 dark:bg-blue-950 rounded-lg px-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Pro Plan — $97/month</p>
              <p className="text-xs text-muted-foreground mt-0.5">Next billing date: June 12, 2025</p>
            </div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-1 rounded-full">Active</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="text-sm text-muted-foreground hover:text-foreground font-medium transition-colors">Update payment method</button>
            <span className="text-border">|</span>
            <button className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">Cancel plan</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

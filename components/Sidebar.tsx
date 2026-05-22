'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, DollarSign, Users, Wrench,
  TrendingUp, FileText, Settings, Zap, LogOut, Lock, Radio,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { href: '/dashboard',            icon: LayoutDashboard, label: 'Overview',   exact: true },
  { href: '/dashboard/revenue',    icon: DollarSign,      label: 'Revenue'             },
  { href: '/dashboard/customers',  icon: Users,           label: 'Customers'           },
  { href: '/dashboard/operations', icon: Wrench,          label: 'Operations'          },
  { href: '/dashboard/sales',      icon: TrendingUp,      label: 'Sales'               },
  { href: '/dashboard/reports',    icon: FileText,        label: 'Reports'             },
  { href: '/dashboard/outreach',   icon: Radio,           label: 'Outreach'            },
  { href: '/dashboard/settings',   icon: Settings,        label: 'Settings'            },
];

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, business, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push('/login');
  }

  const initials = user?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '?';

  return (
    <aside className={cn(
      'w-60 bg-slate-900 flex flex-col h-screen flex-shrink-0 transition-transform duration-300',
      'fixed lg:relative z-30 lg:z-auto lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    )}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-600/30">
            <Zap className="w-4.5 h-4.5 text-white" fill="white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight truncate">
              {business?.name ?? 'Dashboard'}
            </p>
            <p className="text-slate-400 text-xs truncate">{business?.industry ?? ''}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          const isSettingsViewerLocked = href === '/dashboard/settings' && user?.role === 'viewer';

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              )}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {isSettingsViewerLocked && <Lock className="w-3 h-3 text-slate-500 flex-shrink-0" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-slate-700/60 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-medium truncate">{user?.name}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-slate-400 text-xs truncate">{user?.jobTitle}</p>
              {user?.role === 'admin' && (
                <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-1 py-0.5 rounded leading-none flex-shrink-0">ADMIN</span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-150"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

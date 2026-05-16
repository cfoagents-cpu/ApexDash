'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type User, type Business, findUser, getBusiness } from '@/lib/auth';
import { supabase, type BusinessProfile } from '@/lib/supabase';

interface AuthContextType {
  user: User | null;
  business: Business | null;
  isRealUser: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
  refreshBusiness: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  business: null,
  isRealUser: false,
  login: async () => ({ ok: false }),
  logout: async () => {},
  isLoading: true,
  refreshBusiness: async () => {},
});

function profileToBusiness(profile: BusinessProfile): Business {
  return {
    id: profile.user_id,
    name: profile.name,
    industry: profile.industry,
    location: profile.city && profile.state ? `${profile.city}, ${profile.state}` : '',
    phone: profile.phone,
    email: profile.email,
    address: profile.address,
    city: profile.city,
    state: profile.state,
    zip: profile.zip,
  };
}

function profileToUser(profile: BusinessProfile, email: string): User {
  return {
    id: profile.user_id,
    name: profile.name,
    email,
    password: '',
    role: 'admin',
    businessId: profile.user_id,
    jobTitle: 'Owner',
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isRealUser, setIsRealUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function loadSupabaseSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return false;

    const { data: profile } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (profile) {
      setUser(profileToUser(profile, session.user.email ?? ''));
      // Only set business (unlocks dashboard) if approved
      setBusiness(profile.approved ? profileToBusiness(profile) : null);
      setIsRealUser(true);
      return true;
    }

    // Signed up but hasn't completed onboarding yet
    setUser({ id: session.user.id, name: '', email: session.user.email ?? '', password: '', role: 'admin', businessId: '', jobTitle: 'Owner' });
    setBusiness(null);
    setIsRealUser(true);
    return true;
  }

  useEffect(() => {
    async function init() {
      // Check demo session first
      try {
        const saved = localStorage.getItem('apex-session');
        if (saved) {
          const parsed = JSON.parse(saved) as User;
          setUser(parsed);
          setBusiness(getBusiness(parsed.businessId) ?? null);
          setIsRealUser(false);
          setIsLoading(false);
          return;
        }
      } catch {
        localStorage.removeItem('apex-session');
      }

      // Check Supabase session
      await loadSupabaseSession();
      setIsLoading(false);
    }

    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setBusiness(null);
        setIsRealUser(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    // Try demo accounts first
    const demoUser = findUser(email, password);
    if (demoUser) {
      const biz = getBusiness(demoUser.businessId) ?? null;
      setUser(demoUser);
      setBusiness(biz);
      setIsRealUser(false);
      localStorage.setItem('apex-session', JSON.stringify(demoUser));
      return { ok: true };
    }

    // Try Supabase auth
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: 'Incorrect email or password.' };

    await loadSupabaseSession();
    return { ok: true };
  }

  async function logout() {
    localStorage.removeItem('apex-session');
    await supabase.auth.signOut();
    setUser(null);
    setBusiness(null);
    setIsRealUser(false);
  }

  async function refreshBusiness() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data: profile } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', session.user.id)
      .single();
    if (profile) {
      setUser(profileToUser(profile, session.user.email ?? ''));
      setBusiness(profileToBusiness(profile));
    }
  }

  return (
    <AuthContext.Provider value={{ user, business, isRealUser, login, logout, isLoading, refreshBusiness }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

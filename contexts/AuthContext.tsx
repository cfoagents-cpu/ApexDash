'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { type User, type Business, findUser, getBusiness } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  business: Business | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  business: null,
  login: () => false,
  logout: () => {},
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('apex-session');
      if (saved) {
        const parsed = JSON.parse(saved) as User;
        setUser(parsed);
        setBusiness(getBusiness(parsed.businessId) ?? null);
      }
    } catch {
      localStorage.removeItem('apex-session');
    }
    setIsLoading(false);
  }, []);

  function login(email: string, password: string): boolean {
    const found = findUser(email, password);
    if (!found) return false;
    const biz = getBusiness(found.businessId) ?? null;
    setUser(found);
    setBusiness(biz);
    localStorage.setItem('apex-session', JSON.stringify(found));
    return true;
  }

  function logout() {
    setUser(null);
    setBusiness(null);
    localStorage.removeItem('apex-session');
  }

  return (
    <AuthContext.Provider value={{ user, business, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './supabase';

export type UserRole = 'admin' | 'donor' | 'volunteer' | null;

interface User {
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void; // for backwards compatibility
  logout: () => Promise<void>;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Helper to map email/metadata to user object
  const mapFirebaseUser = (sbUser: any): User => {
    const metaRole = sbUser.user_metadata?.role || sbUser.app_metadata?.role;
    const role: UserRole = metaRole === 'admin' || metaRole === 'volunteer'
      ? metaRole
      : sbUser.email?.toLowerCase().startsWith('admin')
        ? 'admin'
        : 'donor';
    return {
      email: sbUser.email || '',
      role,
      firstName: sbUser.user_metadata?.first_name || '',
      lastName: sbUser.user_metadata?.last_name || '',
      avatarUrl: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.avatar || undefined,
    };
  };

  // Refresh the current user object from Supabase (useful after updates)
  const refreshUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      const sbUser = data?.user;
      if (sbUser) {
        setUser(mapFirebaseUser(sbUser));
      } else {
        setUser(null);
      }
    } catch (e) {
      // noop
    }
  };

  useEffect(() => {
    // 1. Get active session on mount
    supabase.auth.getSession().then((res: any) => {
      const session = res?.data?.session;
      if (session?.user) {
        setUser(mapFirebaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // 2. Listen to auth state changes
    const onState = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        setUser(mapFirebaseUser(session.user));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    const subscription = (onState as any)?.data?.subscription;

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  // Backwards compatible login function
  const login = (email: string, role: UserRole) => {
    setUser({ email, role });
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // noop
    }

    setUser(null);
    try { await router.replace('/'); } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

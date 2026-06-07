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
    const role: UserRole = sbUser.email?.toLowerCase().startsWith('admin') ? 'admin' : 'donor';
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
      // debug: helps when metadata doesn't appear to update in the UI
      // console.debug('refreshUser -> sbUser', sbUser);
      if (sbUser) {
        const mapped = mapFirebaseUser(sbUser);
        setUser(mapped);
        localStorage.setItem('pw_user', JSON.stringify(mapped));
      } else {
        setUser(null);
        localStorage.removeItem('pw_user');
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
        // Fallback to local storage if no Supabase session yet
        const storedUser = localStorage.getItem('pw_user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            localStorage.removeItem('pw_user');
          }
        }
      }
      setIsLoading(false);
    });

    // 2. Listen to auth state changes
    const onState = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        const newUser = mapFirebaseUser(session.user);
        setUser(newUser);
        localStorage.setItem('pw_user', JSON.stringify(newUser));
      } else {
        setUser(null);
        localStorage.removeItem('pw_user');
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
    const newUser = { email, role };
    setUser(newUser);
    localStorage.setItem('pw_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    console.debug('Starting logout');
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Supabase signOut error', error);
    } catch (e) {
      console.error('Exception during signOut', e);
    }

    // Clear client state and storage
    setUser(null);
    try { localStorage.removeItem('pw_user'); } catch {}
    try { await router.replace('/'); } catch {}

    console.debug('Logout complete');
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

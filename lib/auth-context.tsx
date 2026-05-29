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
}

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void; // for backwards compatibility
  logout: () => Promise<void>;
  isLoading: boolean;
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
    };
  };

  useEffect(() => {
    // 1. Get active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
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
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
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

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Backwards compatible login function
  const login = (email: string, role: UserRole) => {
    const newUser = { email, role };
    setUser(newUser);
    localStorage.setItem('pw_user', JSON.stringify(newUser));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('pw_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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

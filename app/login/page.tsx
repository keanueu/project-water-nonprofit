'use client';

import { FormEvent, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '@/lib/supabase';
import TextWithNumbers from '../../components/TextWithNumbers';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = useMemo(() => searchParams?.get('next'), [searchParams]);
  const signupUrl = useMemo(() => 
    nextUrl ? `/signup?next=${encodeURIComponent(nextUrl)}` : '/signup',
    [nextUrl]
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !password) return setError('Please fill in all fields.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError('Please enter a valid email address.');
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    setIsLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
          const role = email.toLowerCase().startsWith('admin') ? 'admin' : 'donor';
          const next = nextUrl;
          if (role === 'admin') {
            router.push('/admin');
          } else {
            router.push(next || '/');
          }
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#091c37]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left - Brand panel */}
        <aside className="relative hidden overflow-hidden bg-[#091c37] text-white lg:block">
          <Image
            src="/water.webp"
            alt="Clean water in a rural community"
            fill
            loading="lazy"
            className="object-cover opacity-60"
            sizes="(max-width: 1024px) 0vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#091c37]/90 via-[#0c4a6e]/70 to-[#0369a1]/60" />
          <div className="relative flex h-full flex-col justify-between p-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white">
              <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
              Back to site
            </Link>

            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7dd3fc]">
                Project Water
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                Public. Proven. Reliable.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85">
                Sign in to track your giving, follow the communities you support, and watch the
                impact of clean water unfold in real time.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-white/90">
                {[
                  'Transparent project updates from the field',
                  'Manage recurring donations & receipts',
                  'Follow specific communities you sponsor',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7dd3fc]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} Project Water · 501(c)(3) nonprofit
            </p>
          </div>
        </aside>

        {/* Right - Form */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/logo-2016.png"
                  alt="Project Water"
                  width={200}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
              <Link
                href={signupUrl}
                onClick={() => setIsNavigating(true)}
                className="text-sm font-semibold text-[#0369a1] hover:text-[#0c4a6e] transition-opacity"
                style={{ opacity: isNavigating ? 0.6 : 1 }}
              >
                {isNavigating ? 'Loading...' : 'Create account'}
              </Link>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#0369a1]">
                Welcome back
              </p>
              <h1 className="font-serif text-4xl font-bold leading-tight text-[#091c37] sm:text-5xl">
                Sign in to your account
              </h1>
              <p className="mt-3 text-slate-600">
                Enter your credentials to continue supporting clean water access.
              </p>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-900">
                  Email address
                </label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-[#091c37] transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-900">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#0369a1] hover:text-[#0c4a6e]"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm text-[#091c37] transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} className="h-4 w-4" /> : <FontAwesomeIcon icon={faEye} className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#0369a1] focus:ring-[#0369a1]"
                />
                <TextWithNumbers className="text-sm font-medium text-slate-600">Remember me for 30 days</TextWithNumbers>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0369a1] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0c4a6e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              New to Project Water?{' '}
              <Link 
                href={signupUrl} 
                onClick={() => setIsNavigating(true)}
                className="font-semibold text-[#0369a1] hover:text-[#0c4a6e] transition-opacity"
                style={{ opacity: isNavigating ? 0.6 : 1 }}
              >
                {isNavigating ? 'Loading...' : 'Create an account'}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

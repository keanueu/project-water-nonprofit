'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash, faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const pwStrength = (() => {
    const p = form.password;
    if (!p) return { label: '', pct: 0, color: 'bg-slate-200' };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const map = [
      { label: 'Too weak', pct: 25, color: 'bg-red-400' },
      { label: 'Weak', pct: 45, color: 'bg-orange-400' },
      { label: 'Good', pct: 70, color: 'bg-yellow-400' },
      { label: 'Strong', pct: 90, color: 'bg-emerald-500' },
      { label: 'Excellent', pct: 100, color: 'bg-emerald-600' },
    ];
    return map[score];
  })();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const { firstName, lastName, email, password, confirm } = form;

    if (!firstName || !lastName || !email || !password)
      return setError('Please fill in all fields.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError('Please enter a valid email address.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');
    if (!agree) return setError('You must accept the terms to continue.');

    setIsLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred during sign up.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#091c37]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Form side */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:order-1">
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
              <Link href="/login" className="text-sm font-semibold text-[#0369a1] hover:text-[#0c4a6e]">
                Sign in
              </Link>
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#0369a1]">
              Join the mission
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight text-[#091c37] sm:text-5xl">
              Create your account
            </h1>
            <p className="mt-3 text-slate-600">
              Start supporting reliable water access and track your impact from day one.
            </p>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">First name</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={form.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                      placeholder="Alex"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-3 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-900">Last name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update('lastName', e.target.value)}
                    placeholder="Rivers"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Email address</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Password</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <FontAwesomeIcon icon={faEyeSlash} className="h-5 w-5" /> : <FontAwesomeIcon icon={faEye} className="h-5 w-5" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full transition-all duration-300 ${pwStrength.color}`}
                        style={{ width: `${pwStrength.pct}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Password strength: {pwStrength.label}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Confirm password</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={(e) => update('confirm', e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0369a1] focus:ring-[#0369a1]"
                />
                <span className="text-sm text-slate-600">
                  I agree to Project Water&apos;s{' '}
                  <Link href="/transparency" className="font-semibold text-[#0369a1] hover:text-[#0c4a6e]">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/transparency" className="font-semibold text-[#0369a1] hover:text-[#0c4a6e]">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0369a1] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0c4a6e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-[#0369a1] hover:text-[#0c4a6e]">
                Sign in
              </Link>
            </p>
          </div>
        </section>

        {/* Brand side */}
        <aside className="relative hidden overflow-hidden bg-[#091c37] text-white lg:order-2 lg:block">
          <Image
            src="/home4.jpg"
            alt="Community benefiting from clean water"
            fill
            priority
            className="object-cover opacity-60"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#091c37]/90 via-[#0c4a6e]/70 to-[#0d9488]/50" />
          <div className="relative flex h-full flex-col justify-between p-12">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white">
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
              Back to site
            </Link>
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7dd3fc]">
                Every drop counts
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                Clean water is a movement you can see.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85">
                Create an account to start your giving journey with transparent, long-term water
                access programs across sub-Saharan Africa.
              </p>
            </div>
            <p className="text-xs text-white/60">© {new Date().getFullYear()} Project Water</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

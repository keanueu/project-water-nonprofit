'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEnvelope, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email) return setError('Please enter your email address.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError('Please enter a valid email address.');

    setIsLoading(true);
    try {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${appUrl}/reset-password`,
      });

      if (resetError) {
        setError('Unable to send reset email. Please try again.');
      } else {
        setIsSubmitted(true);
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
            src="/how1.jpg"
            alt="Helping communities"
            fill
            priority
            className="object-cover opacity-60"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#091c37]/90 via-[#0c4a6e]/70 to-[#0369a1]/60" />
          <div className="relative flex h-full flex-col justify-between p-12">
            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white">
              <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
              Back to login
            </Link>

            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#7dd3fc]">
                Secure Access
              </p>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">
                Protecting your impact.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/85">
                We take your security seriously. Request a password reset to regain access to your
                account and continue your mission of providing clean water.
              </p>
            </div>

            <p className="text-xs text-white/60">
              © {new Date().getFullYear()} Project Water · 501(c)(3) nonprofit
            </p>
          </div>
        </aside>

        {/* Right - Form */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/logo-2016.png"
                  alt="Project Water"
                  width={200}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </Link>
            </div>

            {isSubmitted ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-6">
                  <FontAwesomeIcon icon={faCircleCheck} className="h-10 w-10" />
                </div>
                <h1 className="font-serif text-4xl font-bold leading-tight text-[#091c37] sm:text-5xl">
                  Check your inbox
                </h1>
                <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                  We've sent a password reset link to <span className="font-semibold text-[#091c37]">{email}</span>. 
                  Please check your email and follow the instructions to reset your password.
                </p>
                <div className="mt-10 space-y-4">
                  <Link
                    href="/login"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0369a1] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0c4a6e]"
                  >
                    Return to sign in
                  </Link>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full text-center text-sm font-semibold text-[#0369a1] hover:text-[#0c4a6e]"
                  >
                    Didn't receive the email? Try again
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#0369a1]">
                  Reset password
                </p>
                <h1 className="font-serif text-4xl font-bold leading-tight text-[#091c37] sm:text-5xl">
                  Forgot your password?
                </h1>
                <p className="mt-3 text-slate-600">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>

                {error && (
                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-900">
                      Email address
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0369a1] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0c4a6e] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Sending link...
                      </>
                    ) : (
                      <>
                        Send reset link
                        <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <Link
                      href="/login"
                      className="text-sm font-semibold text-[#0369a1] hover:text-[#0c4a6e] inline-flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" />
                      Back to sign in
                    </Link>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

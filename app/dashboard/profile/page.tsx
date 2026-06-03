'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faArrowLeft,
  faSpinner,
  faCircleCheck,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const { user, isLoading: authLoading, refreshUser } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Pre-fill form from current user
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (!avatarFile) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(String(reader.result));
    reader.readAsDataURL(avatarFile);
  }, [avatarFile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveError('');
    setSaved(false);
    setSaving(true);

    try {
      // If there's an avatar selected, upload it first to storage
      let avatarUrl: string | undefined;
      if (avatarFile) {
        const { data: sbUserData } = await supabase.auth.getUser();
        const sbUser = sbUserData?.user;
        const userId = sbUser?.id || 'anon';
        const filePath = `${userId}/avatar-${Date.now()}`;

        const { error: uploadErr } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadErr) throw uploadErr;

        const { data: urlData } = await supabase.storage.from('avatars').getPublicUrl(filePath) as any;
        avatarUrl = urlData?.publicUrl || '';
      }

      const updatePayload: any = { data: { first_name: firstName.trim(), last_name: lastName.trim() } };
      if (email && email !== user?.email) updatePayload.email = email.trim();
      if (password) updatePayload.password = password;
      if (avatarUrl) updatePayload.data.avatar_url = avatarUrl;

      const { error } = await supabase.auth.updateUser(updatePayload);

      if (error) {
        setSaveError(error.message);
      } else {
        await refreshUser(); // Pull updated metadata back into auth context
        setSaved(true);
        setPassword('');
        setTimeout(() => setSaved(false), 4000);
      }
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-white">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sky-600 h-8 w-8" />
      </div>
    );
  }

  if (!user) return null;

  const displayName = [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email.split('@')[0];

  return (
    <main className="min-h-screen bg-slate-50/50 text-[#091c37] py-12 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl space-y-8">

        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0369a1] transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>

        {/* Hero Banner */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-[#0c4a6e] p-8 text-white shadow-md">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-500/20">
              <FontAwesomeIcon icon={faUser} className="h-7 w-7 text-sky-300" />
            </div>
            <div>
              <span className="inline-flex rounded-full bg-sky-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
                Profile Settings
              </span>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {displayName}
              </h1>
              <p className="mt-1 text-sm text-slate-400">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Edit Form Card */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-8 py-5">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faPen} className="h-4 w-4 text-slate-400" />
              <h2 className="text-lg font-bold text-[#091c37]">Edit your details</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Update your name as it appears on your donor profile and donation records.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Success Banner */}
            {saved && (
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3">
                <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <p className="text-sm font-semibold text-emerald-700">Profile updated successfully!</p>
              </div>
            )}

            {/* Error Banner */}
            {saveError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-3">
                <p className="text-sm font-semibold text-red-700">{saveError}</p>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {/* First Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  First name
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="profile-first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Last name
                </label>
                <input
                  id="profile-last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Rivers"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                />
              </div>
            </div>

            {/* Email (editable) */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Email address
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
                />
              </div>
            </div>

            {/* Password (optional) */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 px-4 text-sm transition focus:border-[#0369a1] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20"
              />
            </div>

            {/* Avatar upload */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">Profile image</label>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-slate-100">
                  {avatarPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarPreview} alt="avatar preview" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">—</div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files ? e.target.files[0] : null)}
                />
              </div>
            </div>

            {/* Email — read-only */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Email address
                <span className="ml-2 text-xs font-normal text-slate-400">(cannot be changed here)</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-100 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-400"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-slate-500 hover:text-[#091c37] transition-colors"
              >
                Cancel
              </Link>
              <button
                id="profile-save-btn"
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0369a1] px-7 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0c4a6e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  'Save changes'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info note */}
        <p className="text-center text-xs text-slate-400">
          Your name is stored securely in your Supabase Auth profile. To change your email address, please contact support.
        </p>
      </div>
    </main>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCreditCard,
  faBell,
  faShield,
  faSave,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

interface OrganizationSettings {
  name: string;
  ein: string;
  email: string;
  phone: string;
  address: string;
}

interface NotificationSettings {
  newDonations: boolean;
  failedPayments: boolean;
  campaignMilestones: boolean;
  weeklyReports: boolean;
}

interface Settings {
  organization: OrganizationSettings;
  notifications: NotificationSettings;
}

const DEFAULT_SETTINGS: Settings = {
  organization: {
    name: 'Project Water',
    ein: '26-1455510',
    email: 'contact@projectwater.org',
    phone: '+1 (603) 555-0123',
    address: '17 Depot Street, 2nd Floor\nConcord, NH 03301\nUnited States',
  },
  notifications: {
    newDonations: true,
    failedPayments: true,
    campaignMilestones: true,
    weeklyReports: true,
  },
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings');
        if (!res.ok) throw new Error('Failed to load settings');
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      } catch {
        // Use defaults on error
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateOrg = (field: keyof OrganizationSettings, value: string) => {
    setSettings(prev => ({
      ...prev,
      organization: { ...prev.organization, [field]: value },
    }));
  };

  const updateNotification = (field: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-[#0369a1] h-7 w-7" />
          <p className="text-sm font-medium text-slate-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#0369a1] mb-2">Administration</p>
        <h1 className="font-serif text-3xl font-bold text-[#091c37]">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your organization settings and preferences.</p>
      </div>

      {message && (
        <div className={`rounded-2xl border p-4 ${
          message.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium text-sm">{message.text}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="grid gap-6">

        {/* Organization Info */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full">
              <FontAwesomeIcon icon={faBuilding} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-0.5">Organization</p>
              <h2 className="font-serif text-lg font-bold text-[#091c37]">Information</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={settings.organization.name}
                  onChange={(e) => updateOrg('name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0369a1] text-sm text-[#091c37]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  EIN / Tax ID
                </label>
                <input
                  type="text"
                  value={settings.organization.ein}
                  onChange={(e) => updateOrg('ein', e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0369a1] text-sm text-[#091c37]"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-slate-400" />
                Contact Email
              </label>
              <input
                type="email"
                value={settings.organization.email}
                onChange={(e) => updateOrg('email', e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0369a1] text-sm text-[#091c37]"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5 text-slate-400" />
                Phone Number
              </label>
              <input
                type="tel"
                value={settings.organization.phone}
                onChange={(e) => updateOrg('phone', e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0369a1] text-sm text-[#091c37]"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3.5 h-3.5 text-slate-400" />
                Address
              </label>
              <textarea
                rows={3}
                value={settings.organization.address}
                onChange={(e) => updateOrg('address', e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0369a1] text-sm text-[#091c37]"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full">
              <FontAwesomeIcon icon={faCreditCard} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-0.5">Payment</p>
              <h2 className="font-serif text-lg font-bold text-[#091c37]">Gateway</h2>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Stripe Publishable Key
              </label>
              <input
                type="text"
                placeholder="pk_live_..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0369a1] font-mono text-sm text-[#091c37]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Stripe Secret Key
              </label>
              <input
                type="password"
                placeholder="sk_live_..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#0369a1] font-mono text-sm text-[#091c37]"
              />
              <p className="text-xs text-slate-400 mt-2">Keep this secure. Never share your secret key. Stripe keys are managed via environment variables.</p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full">
              <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-0.5">Notification</p>
              <h2 className="font-serif text-lg font-bold text-[#091c37]">Preferences</h2>
            </div>
          </div>

          <div className="space-y-1">
            {([
              { key: 'newDonations' as const, label: 'New Donations', description: 'Get notified when donations are received' },
              { key: 'failedPayments' as const, label: 'Failed Payments', description: 'Alert when payment processing fails' },
              { key: 'campaignMilestones' as const, label: 'Campaign Milestones', description: 'Notify when campaigns reach goals' },
              { key: 'weeklyReports' as const, label: 'Weekly Reports', description: 'Receive weekly summary emails' },
            ]).map((item) => (
              <label key={item.key} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key]}
                  onChange={(e) => updateNotification(item.key, e.target.checked)}
                  className="mt-0.5 h-4.5 w-4.5 rounded border-slate-300 text-[#0369a1]"
                />
                <div>
                  <p className="font-semibold text-sm text-[#091c37]">{item.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full">
              <FontAwesomeIcon icon={faShield} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-0.5">Account</p>
              <h2 className="font-serif text-lg font-bold text-[#091c37]">Security</h2>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="font-semibold text-sm text-[#091c37]">Two-Factor Authentication</p>
                <p className="text-xs text-slate-400 mt-0.5">Add an extra layer of security</p>
              </div>
              <button type="button" className="px-4 py-2 bg-[#0369a1] text-white rounded-full text-xs font-semibold hover:bg-[#0c4a6e] transition-colors">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div>
                <p className="font-semibold text-sm text-[#091c37]">API Keys</p>
                <p className="text-xs text-slate-400 mt-0.5">Manage API access keys</p>
              </div>
              <button type="button" className="px-4 py-2 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-white transition-colors">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0369a1] text-white rounded-full text-sm font-semibold hover:bg-[#0c4a6e] disabled:opacity-50 transition-colors"
          >
            {saving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin h-3.5 w-3.5" />
                Saving...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

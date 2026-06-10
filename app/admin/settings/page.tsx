'use client';

import React, { useState } from 'react';
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

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    setTimeout(() => {
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your organization settings and preferences</p>
      </div>

      {message && (
        <div className={`rounded-xl border p-4 ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-700' 
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          <p className="font-medium">{message.text}</p>
        </div>
      )}

      <div className="grid gap-6">
        
        {/* Organization Info */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <FontAwesomeIcon icon={faBuilding} className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Organization Information</h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  defaultValue="Project Water"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  EIN / Tax ID
                </label>
                <input
                  type="text"
                  defaultValue="26-1455510"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="contact@projectwater.org"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 (603) 555-0123"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Address
              </label>
              <textarea
                rows={3}
                defaultValue="17 Depot Street, 2nd Floor&#10;Concord, NH 03301&#10;United States"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <FontAwesomeIcon icon={faCreditCard} className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Payment Gateway</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stripe Publishable Key
              </label>
              <input
                type="text"
                placeholder="pk_live_..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stripe Secret Key
              </label>
              <input
                type="password"
                placeholder="sk_live_..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">Keep this secure. Never share your secret key.</p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <FontAwesomeIcon icon={faBell} className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
          </div>

          <div className="space-y-4">
            {[
              { label: 'New Donations', description: 'Get notified when donations are received' },
              { label: 'Failed Payments', description: 'Alert when payment processing fails' },
              { label: 'Campaign Milestones', description: 'Notify when campaigns reach goals' },
              { label: 'Weekly Reports', description: 'Receive weekly summary emails' },
            ].map((item) => (
              <label key={item.label} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <div>
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <FontAwesomeIcon icon={faShield} className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900">Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                Enable
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900">API Keys</p>
                <p className="text-sm text-gray-500">Manage API access keys</p>
              </div>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold hover:bg-white">
                Manage
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

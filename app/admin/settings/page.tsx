import React from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Palette, 
  CreditCard,
  Mail,
  ShieldCheck
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your organization's configuration and your personal preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <aside className="md:col-span-1">
          <nav className="space-y-1">
            {[
              { label: 'General', icon: Globe, active: true },
              { label: 'Profile', icon: User, active: false },
              { label: 'Notifications', icon: Bell, active: false },
              { label: 'Security', icon: Lock, active: false },
              { label: 'Appearance', icon: Palette, active: false },
              { label: 'Billing', icon: CreditCard, active: false },
            ].map((item, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Organization Profile */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Organization Profile</h2>
              <p className="text-sm text-gray-500">This information will be displayed publicly on your donation pages.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Organization Name</label>
                  <input 
                    type="text" 
                    defaultValue="Global Charity Foundation" 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Support Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                      type="email" 
                      defaultValue="support@globalcharity.org" 
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Website URL</label>
                  <input 
                    type="url" 
                    defaultValue="https://globalcharity.org" 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Organization Bio</label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue="A non-profit organization dedicated to improving lives through global health and education initiatives."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                Save Changes
              </button>
            </div>
          </section>

          {/* Security Features */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Security & Privacy</h2>
              <p className="text-sm text-gray-500">Manage your organization's security settings.</p>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Two-factor Authentication</h3>
                    <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50">
                  Enable
                </button>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Password Policy</h3>
                    <p className="text-xs text-gray-500">Require complex passwords for all staff accounts.</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

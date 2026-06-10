'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarCheck,
  faCreditCard,
  faPause,
  faPlay,
  faEdit,
  faTrash,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import TextWithNumbers from '../../../components/TextWithNumbers';

interface RecurringDonation {
  id: string;
  amount: number;
  frequency: 'monthly' | 'yearly';
  campaignName: string;
  nextBillingDate: Date;
  status: 'active' | 'paused';
  paymentMethod: string;
}

export default function RecurringDonationsPage() {
  const [subscriptions] = useState<RecurringDonation[]>([
    {
      id: '1',
      amount: 50,
      frequency: 'monthly',
      campaignName: 'General Fund',
      nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      status: 'active',
      paymentMethod: 'Visa ****4242',
    },
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const totalMonthly = subscriptions
    .filter(s => s.frequency === 'monthly' && s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);

  const totalYearly = subscriptions
    .filter(s => s.frequency === 'yearly' && s.status === 'active')
    .reduce((sum, s) => sum + s.amount, 0);

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 px-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#091c37]">Recurring Donations</h1>
            <p className="text-slate-600 mt-2">Manage your monthly and yearly contributions</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/take-action/donate"
              className="px-4 py-2 bg-[#0369a1] rounded-xl text-sm font-semibold text-white hover:bg-[#0c4a6e] flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
              New Recurring Gift
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <FontAwesomeIcon icon={faCalendarCheck} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Subscriptions</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 numbers">{subscriptions.filter(s => s.status === 'active').length}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FontAwesomeIcon icon={faCreditCard} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Total</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 numbers">{formatCurrency(totalMonthly)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <FontAwesomeIcon icon={faCalendarCheck} className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Annual Impact</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 numbers">{formatCurrency((totalMonthly * 12) + totalYearly)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-[#091c37]">Your Recurring Gifts</h2>
          </div>

          {subscriptions.length === 0 ? (
            <div className="p-12 text-center">
              <FontAwesomeIcon icon={faCalendarCheck} className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium mb-2">No recurring donations yet</p>
              <p className="text-sm text-slate-400 mb-6">Set up a monthly or yearly gift to create lasting impact</p>
              <Link
                href="/take-action/donate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0369a1] text-white rounded-xl font-semibold hover:bg-[#0c4a6e]"
              >
                <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                Start Recurring Donation
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="p-6 hover:bg-slate-50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[#091c37]">{sub.campaignName}</h3>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sub.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">Amount</p>
                          <p className="font-semibold text-[#091c37] numbers">
                            {formatCurrency(sub.amount)}/{sub.frequency === 'monthly' ? 'month' : 'year'}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Payment Method</p>
                          <p className="font-semibold text-[#091c37]">{sub.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Next Billing Date</p>
                          <p className="font-semibold text-[#091c37]">
                            <TextWithNumbers>{sub.nextBillingDate.toLocaleDateString()}</TextWithNumbers>
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">Frequency</p>
                          <p className="font-semibold text-[#091c37] capitalize">{sub.frequency}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {sub.status === 'active' ? (
                        <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition" title="Pause">
                          <FontAwesomeIcon icon={faPause} className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition" title="Resume">
                          <FontAwesomeIcon icon={faPlay} className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition" title="Edit">
                        <FontAwesomeIcon icon={faEdit} className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition" title="Cancel">
                        <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="font-bold text-blue-900 mb-2">Managing Your Recurring Donations</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• You can pause, resume, or cancel your recurring donations at any time</li>
            <li>• Changes take effect from the next billing cycle</li>
            <li>• Update your payment method to avoid missed payments</li>
            <li>• You'll receive email notifications before each billing date</li>
          </ul>
        </div>

      </div>
    </main>
  );
}

'use client';

import { faDownload, faArrowUpRightFromSquare, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import TextWithNumbers from '../../../components/TextWithNumbers';
import { filterDonations, donationsToCsv, formatCurrency } from '@/lib/admin-data';
import type { Donation } from '@/lib/admin-data';

export default function DonationsPage() {
  const [allDonations, setAllDonations] = useState<Donation[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rangeFilter, setRangeFilter] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch('/api/admin/donations');
        if (!res.ok) throw new Error('Failed to load donations');
        const data = await res.json();
        setAllDonations(data.donations || []);
      } catch (err) {
        console.error('Failed to load donations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (rangeFilter !== 'all') params.set('range', rangeFilter);
    params.set('page', String(page));
    params.set('pageSize', String(pageSize));

    const result = filterDonations(allDonations, params);
    setDonations(result.donations);
    setTotal(result.total);
  }, [allDonations, search, statusFilter, rangeFilter, page, pageSize]);

  const handleExport = () => {
    const csv = donationsToCsv(allDonations);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalPages = Math.ceil(total / pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-[#0369a1] h-7 w-7" />
          <p className="text-sm font-medium text-slate-400">Loading donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#0369a1] mb-2">Administration</p>
          <h1 className="font-serif text-3xl font-bold text-[#091c37]">Donations</h1>
          <p className="text-slate-500 mt-1">Manage and track all incoming contributions.</p>
        </div>
        <button
          onClick={handleExport}
          disabled={allDonations.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0369a1] text-white rounded-full text-sm font-semibold hover:bg-[#0c4a6e] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search by donor, email, or ID..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:border-[#0369a1] transition-all text-[#091c37] placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 focus:outline-none focus:border-[#0369a1] transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="succeeded">Succeeded</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={rangeFilter}
            onChange={(e) => {
              setRangeFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 focus:outline-none focus:border-[#0369a1] transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="30d">Last 30 Days</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Transaction ID</th>
                <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Donor</th>
                <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Amount</th>
                <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Campaign</th>
                <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Method</th>
                <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Date</th>
                <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Status</th>
                <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-slate-400">
                    {search || statusFilter !== 'all' || rangeFilter !== 'all'
                      ? 'No donations match your filters'
                      : 'No donations yet'
                    }
                  </td>
                </tr>
              ) : (
                donations.map((txn) => (
                  <tr key={txn.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-3.5 font-mono text-xs text-slate-400">{txn.id}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#091c37]">{txn.donorName}</span>
                        <span className="text-xs text-slate-400">{txn.donorEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-[#091c37]"><span className="numbers">{formatCurrency(txn.amount)}</span></td>
                    <td className="px-6 py-3.5 text-slate-500 max-w-[200px] truncate">{txn.campaignName}</td>
                    <td className="px-6 py-3.5 text-slate-500">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCreditCard} className="w-3.5 h-3.5 text-slate-400" />
                        {txn.method}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-slate-500">
                      <TextWithNumbers>{new Date(txn.createdAt).toLocaleDateString()}</TextWithNumbers>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        txn.status === 'succeeded' ? 'bg-emerald-50 text-emerald-700' :
                        txn.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <button
                        onClick={() => setSelectedDonation(txn)}
                        className="text-slate-400 hover:text-[#0369a1] transition-colors p-1.5 rounded-full hover:bg-[#0369a1]/10"
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing <span className="numbers font-medium text-[#091c37]">{donations.length ? ((page - 1) * pageSize) + 1 : 0}–{Math.min(page * pageSize, total)}</span> of <span className="numbers font-medium text-[#091c37]">{total}</span> donations
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3.5 py-1.5 border border-slate-200 rounded-full bg-white text-sm text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Previous
            </button>
            <span className="px-2 text-sm text-slate-500">
              <span className="numbers font-medium text-[#091c37]">{page}</span> / <span className="numbers">{totalPages || 1}</span>
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3.5 py-1.5 border border-slate-200 rounded-full bg-white text-sm text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDonation(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#0369a1] mb-1">Donation Details</p>
                <h2 className="font-serif text-xl font-bold text-[#091c37]">Transaction Record</h2>
              </div>
              <button onClick={() => setSelectedDonation(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              </button>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Transaction ID</p>
                <p className="font-mono text-xs text-[#091c37]">{selectedDonation.id}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Status</p>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedDonation.status === 'succeeded' ? 'bg-emerald-50 text-emerald-700' :
                  selectedDonation.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                  'bg-red-50 text-red-700'
                }`}>
                  {selectedDonation.status}
                </span>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Donor Name</p>
                <p className="text-sm text-[#091c37] font-medium">{selectedDonation.donorName}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Email</p>
                <p className="text-sm text-[#091c37]">{selectedDonation.donorEmail}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Amount</p>
                <p className="text-xl font-bold text-[#091c37] font-serif numbers">{formatCurrency(selectedDonation.amount)}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Payment Method</p>
                <p className="text-sm text-[#091c37]">{selectedDonation.method}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Campaign</p>
                <p className="text-sm text-[#091c37]">{selectedDonation.campaignName}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Date</p>
                <p className="text-sm text-[#091c37]">
                  <TextWithNumbers>{new Date(selectedDonation.createdAt).toLocaleString()}</TextWithNumbers>
                </p>
              </div>
              {selectedDonation.stripeSessionId && (
                <div className="col-span-2">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Stripe Session ID</p>
                  <p className="font-mono text-xs text-slate-500 break-all">{selectedDonation.stripeSessionId}</p>
                </div>
              )}
              {selectedDonation.message && (
                <div className="col-span-2">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Message</p>
                  <p className="text-sm text-[#091c37] italic">&ldquo;{selectedDonation.message}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedDonation(null)}
                className="px-5 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

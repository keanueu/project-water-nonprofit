'use client';

import { faDownload, faArrowUpRightFromSquare, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter, faCreditCard } from '@fortawesome/free-solid-svg-icons';
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
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-indigo-600 h-8 w-8" />
          <p className="text-sm font-semibold text-gray-500">Loading donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
          <p className="text-gray-500">Manage and track all incoming contributions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            disabled={allDonations.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"  />
          <input 
            type="text" 
            placeholder="Search by donor, email, or ID..." 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
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
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            <option value="all">All Time</option>
            <option value="30d">Last 30 Days</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                <th className="px-6 py-4 font-semibold">Donor</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Campaign</th>
                <th className="px-6 py-4 font-semibold">Method</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    {search || statusFilter !== 'all' || rangeFilter !== 'all' 
                      ? 'No donations match your filters'
                      : 'No donations yet'
                    }
                  </td>
                </tr>
              ) : (
                donations.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{txn.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{txn.donorName}</span>
                        <span className="text-xs text-gray-500">{txn.donorEmail}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900"><span className="numbers">{formatCurrency(txn.amount)}</span></td>
                    <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">{txn.campaignName}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCreditCard} className="w-4 h-4" />
                        {txn.method}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <TextWithNumbers>{new Date(txn.createdAt).toLocaleDateString()}</TextWithNumbers>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        txn.status === 'succeeded' ? 'bg-green-100 text-green-700' : 
                        txn.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedDonation(txn)}
                        className="text-gray-400 hover:text-indigo-600 transition-colors p-1"
                      >
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="numbers">{donations.length ? ((page - 1) * pageSize) + 1 : 0}-{Math.min(page * pageSize, total)}</span> of <span className="numbers">{total}</span> donations
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border border-gray-200 rounded bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-600">
              Page <span className="numbers">{page}</span> of <span className="numbers">{totalPages || 1}</span>
            </span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1 border border-gray-200 rounded bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Donation Details Modal */}
      {selectedDonation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDonation(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-gray-900">Donation Details</h2>
              <button onClick={() => setSelectedDonation(null)} className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Transaction ID</p>
                <p className="font-mono text-sm text-gray-900">{selectedDonation.id}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Status</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedDonation.status === 'succeeded' ? 'bg-green-100 text-green-700' : 
                  selectedDonation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedDonation.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Donor Name</p>
                <p className="text-sm text-gray-900">{selectedDonation.donorName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                <p className="text-sm text-gray-900">{selectedDonation.donorEmail}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Amount</p>
                <p className="text-lg font-bold text-gray-900 numbers">{formatCurrency(selectedDonation.amount)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Payment Method</p>
                <p className="text-sm text-gray-900">{selectedDonation.method}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Campaign</p>
                <p className="text-sm text-gray-900">{selectedDonation.campaignName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Date</p>
                <p className="text-sm text-gray-900">
                  <TextWithNumbers>{new Date(selectedDonation.createdAt).toLocaleString()}</TextWithNumbers>
                </p>
              </div>
              {selectedDonation.stripeSessionId && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Stripe Session ID</p>
                  <p className="font-mono text-xs text-gray-600 break-all">{selectedDonation.stripeSessionId}</p>
                </div>
              )}
              {selectedDonation.message && (
                <div className="col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Message</p>
                  <p className="text-sm text-gray-900 italic">&ldquo;{selectedDonation.message}&rdquo;</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedDonation(null)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
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

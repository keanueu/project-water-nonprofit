import { faDownload, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFilter, faCreditCard, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import TextWithNumbers from '../../../components/TextWithNumbers';


export default function DonationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
          <p className="text-gray-500">Manage and track all incoming contributions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
            Add Donation
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
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faFilter} className="w-[18px] h-[18px]" />
            Filter
          </button>
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
            <option>All Time</option>
            <option className="numbers">Last 30 Days</option>
            <option className="numbers">Last 6 Months</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Transaction ID</th>
              <th className="px-6 py-4 font-semibold">Donor</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Method</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {[
              { id: 'TXN-9402', donor: 'Robert Fox', email: 'robert@example.com', amount: '$120.00', method: 'Visa •••• 4242', date: 'Apr 22, 2026', status: 'Succeeded' },
              { id: 'TXN-9401', donor: 'Jane Cooper', email: 'jane@example.com', amount: '$25.00', method: 'PayPal', date: 'Apr 21, 2026', status: 'Succeeded' },
              { id: 'TXN-9400', donor: 'Wade Warren', email: 'wade@example.com', amount: '$500.00', method: 'Mastercard •••• 5555', date: 'Apr 20, 2026', status: 'Pending' },
              { id: 'TXN-9399', donor: 'Cody Fisher', email: 'cody@example.com', amount: '$10.00', method: 'Apple Pay', date: 'Apr 20, 2026', status: 'Succeeded' },
              { id: 'TXN-9398', donor: 'Esther Howard', email: 'esther@example.com', amount: '$1,200.00', method: 'Bank Transfer', date: 'Apr 19, 2026', status: 'Failed' },
              { id: 'TXN-9397', donor: 'Jenny Wilson', email: 'jenny@example.com', amount: '$45.00', method: 'Visa •••• 1234', date: 'Apr 18, 2026', status: 'Succeeded' },
            ].map((txn, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4 font-mono text-xs text-gray-500">{txn.id}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{txn.donor}</span>
                    <span className="text-xs text-gray-500">{txn.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900"><span className="numbers">{txn.amount}</span></td>
                <td className="px-6 py-4 text-gray-500">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCreditCard} className="w-5 h-5" />
                    {txn.method}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500"><TextWithNumbers>{txn.date}</TextWithNumbers></td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    txn.status === 'Succeeded' ? 'bg-green-100 text-green-700' : 
                    txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {txn.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors p-1">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing <span className="numbers">1-6</span> of <span className="numbers">24</span> donations</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded bg-white text-sm disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded bg-white text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

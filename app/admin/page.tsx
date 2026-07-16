'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TextWithNumbers from '../../components/TextWithNumbers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faDollarSign,
  faBullseye,
  faArrowTrendUp,
  faArrowUpRightFromSquare,
  faArrowTrendDown,
  faSpinner,
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle,
  faHandshakeAngle,
  faBullhorn,
  faArrowRight,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { buildDashboard, formatCurrency } from '@/lib/admin-data';
import type { Donation, DashboardMetric, OperationsAlert } from '@/lib/admin-data';

export default function AdminOverview() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([]);
  const [recentDonations, setRecentDonations] = useState<Donation[]>([]);
  const [alerts, setAlerts] = useState<OperationsAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [donationsRes, campaignsRes] = await Promise.all([
          fetch('/api/admin/donations'),
          fetch('/api/admin/campaigns'),
        ]);

        if (!donationsRes.ok || !campaignsRes.ok) {
          throw new Error('Failed to load dashboard data');
        }

        const { donations } = await donationsRes.json();
        const { campaigns } = await campaignsRes.json();
        const dashboard = buildDashboard(donations, campaigns);

        setMetrics(dashboard.metrics);
        setRecentDonations(dashboard.recentDonations);
        setAlerts(dashboard.alerts);
      } catch (err: any) {
        setError(err?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-[#0369a1] h-7 w-7" />
          <p className="text-sm font-medium text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-700 font-medium text-sm">{error}</p>
      </div>
    );
  }

  const getAlertIcon = (severity: OperationsAlert['severity']) => {
    switch (severity) {
      case 'critical': return faExclamationTriangle;
      case 'warning': return faExclamationTriangle;
      case 'success': return faCheckCircle;
      default: return faInfoCircle;
    }
  };

  const getAlertColors = (severity: OperationsAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 border-l-red-500 text-red-700';
      case 'warning': return 'bg-amber-50 border-amber-200 border-l-amber-500 text-amber-700';
      case 'success': return 'bg-emerald-50 border-emerald-200 border-l-emerald-500 text-emerald-700';
      default: return 'bg-sky-50 border-sky-200 border-l-sky-500 text-sky-700';
    }
  };

  const statIcons = [faDollarSign, faBullseye, faUsers, faArrowTrendUp];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#0369a1] mb-2">Administration</p>
        <h1 className="font-serif text-3xl font-bold text-[#091c37]">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#0369a1]/[0.03] rounded-full translate-x-6 -translate-y-6" />
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full group-hover:bg-[#0369a1] group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={statIcons[i]} className="h-5 w-5" />
              </div>
              <span className={`text-xs font-semibold flex items-center ${stat.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                <span className="numbers">{stat.change}</span>
                {stat.positive ? (
                  <FontAwesomeIcon icon={faArrowTrendUp} className="ml-1 h-3 w-3" />
                ) : (
                  <FontAwesomeIcon icon={faArrowTrendDown} className="ml-1 h-3 w-3" />
                )}
              </span>
            </div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#091c37]"><span className="numbers">{stat.value}</span></p>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Operations Alerts</h2>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className={`rounded-2xl border border-l-4 p-4 ${getAlertColors(alert.severity)}`}>
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon icon={getAlertIcon(alert.severity)} className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm">{alert.title}</h3>
                    <p className="text-xs mt-0.5 opacity-80">{alert.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Recent</p>
              <h2 className="font-serif text-lg font-bold text-[#091c37]">Donations</h2>
            </div>
            <Link href="/admin/donations" className="text-[#0369a1] text-sm font-semibold hover:text-[#0c4a6e] transition-colors flex items-center gap-1.5">
              View all
              <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Donor</th>
                  <th className="px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Campaign</th>
                  <th className="px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Amount</th>
                  <th className="px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Status</th>
                  <th className="px-6 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentDonations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">
                      No donations yet
                    </td>
                  </tr>
                ) : (
                  recentDonations.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[#0369a1]/10 mr-3 flex items-center justify-center text-[0.65rem] font-bold text-[#0369a1]">
                            {row.donorName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-[#091c37]">{row.donorName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-500 max-w-[200px] truncate">{row.campaignName}</td>
                      <td className="px-6 py-3.5 text-sm font-semibold text-[#091c37]"><span className="numbers">{formatCurrency(row.amount)}</span></td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          row.status === 'succeeded' ? 'bg-emerald-50 text-emerald-700' :
                          row.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-slate-500">
                        <TextWithNumbers>{new Date(row.createdAt).toLocaleDateString()}</TextWithNumbers>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Actions</p>
          <h2 className="font-serif text-lg font-bold text-[#091c37] mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/donations" className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-slate-50 hover:bg-[#0369a1]/5 border border-transparent hover:border-[#0369a1]/10 transition-all cursor-pointer group">
              <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full group-hover:bg-[#0369a1] group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faHandshakeAngle} className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-[#091c37] text-center">Donations</span>
            </Link>
            <Link href="/admin/campaigns" className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-slate-50 hover:bg-[#0369a1]/5 border border-transparent hover:border-[#0369a1]/10 transition-all cursor-pointer group">
              <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full group-hover:bg-[#0369a1] group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faBullhorn} className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-[#091c37] text-center">Campaigns</span>
            </Link>
            <Link href="/admin/users" className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-slate-50 hover:bg-[#0369a1]/5 border border-transparent hover:border-[#0369a1]/10 transition-all cursor-pointer group">
              <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full group-hover:bg-[#0369a1] group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-[#091c37] text-center">Users</span>
            </Link>
            <Link href="/admin/settings" className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-slate-50 hover:bg-[#0369a1]/5 border border-transparent hover:border-[#0369a1]/10 transition-all cursor-pointer group">
              <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full group-hover:bg-[#0369a1] group-hover:text-white transition-colors">
                <FontAwesomeIcon icon={faGear} className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold text-[#091c37] text-center">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

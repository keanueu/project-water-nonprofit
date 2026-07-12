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
  faCalendar, 
  faArrowUpRightFromSquare, 
  faArrowTrendDown,
  faSpinner,
  faExclamationTriangle,
  faInfoCircle,
  faCheckCircle
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
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-indigo-600 h-8 w-8" />
          <p className="text-sm font-semibold text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-700 font-medium">{error}</p>
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

  const getAlertColor = (severity: OperationsAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-700';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'success': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((stat, i) => {
          const icons = [faDollarSign, faBullseye, faUsers, faArrowTrendUp];
          return (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <FontAwesomeIcon icon={icons[i]} className="h-6 w-6" />
                </div>
                <span className={`text-sm font-medium flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="numbers">{stat.change}</span>
                  {stat.positive ? <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 h-4 w-4" /> : <FontAwesomeIcon icon={faArrowTrendDown} className="ml-1 h-4 w-4" />}
                </span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900"><span className="numbers">{stat.value}</span></p>
            </div>
          );
        })}
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Operations Alerts</h2>
          {alerts.map((alert) => (
            <div key={alert.id} className={`rounded-xl border p-4 ${getAlertColor(alert.severity)}`}>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={getAlertIcon(alert.severity)} className="h-5 w-5 mt-0.5" />
                <div>
                  <h3 className="font-semibold">{alert.title}</h3>
                  <p className="text-sm mt-1">{alert.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-900">Recent Donations</h2>
            <Link href="/admin/donations" className="text-indigo-600 text-sm font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="px-3 sm:px-6 py-3 font-semibold">Donor</th>
                    <th className="px-3 sm:px-6 py-3 font-semibold">Campaign</th>
                    <th className="px-3 sm:px-6 py-3 font-semibold">Amount</th>
                    <th className="px-3 sm:px-6 py-3 font-semibold">Status</th>
                    <th className="px-3 sm:px-6 py-3 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {recentDonations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No donations yet
                    </td>
                  </tr>
                ) : (
                  recentDonations.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-xs font-bold text-gray-600">
                            {row.donorName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{row.donorName}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-500 max-w-[240px] truncate">{row.campaignName}</td>
                      <td className="px-3 sm:px-6 py-4 text-sm font-semibold text-gray-900"><span className="numbers">{formatCurrency(row.amount)}</span></td>
                      <td className="px-3 sm:px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          row.status === 'succeeded' ? 'bg-green-100 text-green-700' : 
                          row.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-500">
                        <TextWithNumbers>{new Date(row.createdAt).toLocaleDateString()}</TextWithNumbers>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upcoming Events Placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Quick Actions</h2>
            <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <Link
              href="/admin/donations"
              className="block w-full py-3 px-4 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors text-center"
            >
              Manage Donations
            </Link>
            <Link
              href="/admin/campaigns"
              className="block w-full py-3 px-4 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors text-center"
            >
              Manage Campaigns
            </Link>
            <Link
              href="/admin/users"
              className="block w-full py-3 px-4 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors text-center"
            >
              Manage Users
            </Link>
            <Link
              href="/admin/settings"
              className="block w-full py-3 px-4 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors text-center"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

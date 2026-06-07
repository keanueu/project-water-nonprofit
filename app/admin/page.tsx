import React from 'react';
import TextWithNumbers from '../../components/TextWithNumbers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faDollarSign, faBullseye, faArrowTrendUp, faCalendar, faArrowUpRightFromSquare, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

export default function AdminOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Donations', value: '$124,592', icon: faDollarSign, change: '+12.5%', positive: true },
          { label: 'Active Campaigns', value: '12', icon: faBullseye, change: '+2', positive: true },
          { label: 'Total Volunteers', value: '843', icon: faUsers, change: '-4', positive: false },
          { label: 'Avg. Donation', value: '$148', icon: faArrowTrendUp, change: '+5.2%', positive: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <FontAwesomeIcon icon={stat.icon} className="h-6 w-6" />
              </div>
              <span className={`text-sm font-medium flex items-center ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                <span className="numbers">{stat.change}</span>
                {stat.positive ? <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ml-1 h-4 w-4" /> : <FontAwesomeIcon icon={faArrowTrendDown} className="ml-1 h-4 w-4" />}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900"><span className="numbers">{stat.value}</span></p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-gray-900">Recent Donations</h2>
            <button className="text-indigo-600 text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="p-0">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-6 py-3 font-semibold">Donor</th>
                  <th className="px-6 py-3 font-semibold">Campaign</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { donor: 'Alex Johnson', campaign: 'Clean Water Initiative', amount: '$250.00', status: 'Completed', date: '2 hours ago' },
                  { donor: 'Maria Garcia', campaign: 'Education for All', amount: '$50.00', status: 'Completed', date: '5 hours ago' },
                  { donor: 'James Wilson', campaign: 'Emergency Relief', amount: '$1,000.00', status: 'Pending', date: 'Yesterday' },
                  { donor: 'Sarah Chen', campaign: 'Clean Water Initiative', amount: '$75.00', status: 'Completed', date: 'Yesterday' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-xs font-bold text-gray-600">
                          {row.donor.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{row.donor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{row.campaign}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900"><span className="numbers">{row.amount}</span></td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        row.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500"><TextWithNumbers>{row.date}</TextWithNumbers></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar/Upcoming */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-900">Upcoming Events</h2>
            <FontAwesomeIcon icon={faCalendar} className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-6">
            {[
              { title: 'Annual Fundraiser', date: 'May 15, 2026', time: '6:00 PM', type: 'Event' },
              { title: 'Volunteer Orientation', date: 'May 18, 2026', time: '10:00 AM', type: 'Meeting' },
              { title: 'Board Meeting', date: 'May 22, 2026', time: '2:00 PM', type: 'Meeting' },
            ].map((event, i) => (
              <div key={i} className="flex space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex flex-col items-center justify-center">
                  <span className="text-xs font-bold uppercase">{event.date.split(' ')[0]}</span>
                  <span className="text-sm font-bold"><TextWithNumbers>{event.date.split(' ')[1].replace(',', '')}</TextWithNumbers></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{event.title}</h4>
                  <p className="text-xs text-gray-500"><TextWithNumbers>{event.time}</TextWithNumbers> • {event.type}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors">
            View Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

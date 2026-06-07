import { faUserPlus, faCircleCheck, faEllipsis, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faEnvelope, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import TextWithNumbers from '../../../components/TextWithNumbers';


export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500">Manage administrators, staff, and volunteer accounts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
          <FontAwesomeIcon icon={faUserPlus} className="w-5 h-5" />
          Invite User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"  />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white">
              <option>All Roles</option>
              <option>Admin</option>
              <option>Editor</option>
              <option>Volunteer</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Last Active</th>
              <th className="px-6 py-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {[
              { name: 'Jane Doe', email: 'jane@charityos.org', role: 'Admin', status: 'Active', lastActive: 'Online now', initials: 'JD' },
              { name: 'Michael Smith', email: 'michael@charityos.org', role: 'Editor', status: 'Active', lastActive: '2 hours ago', initials: 'MS' },
              { name: 'Sarah Wilson', email: 'sarah.w@example.com', role: 'Volunteer', status: 'Pending', lastActive: 'Never', initials: 'SW' },
              { name: 'David Chen', email: 'd.chen@charityos.org', role: 'Admin', status: 'Active', lastActive: 'Yesterday', initials: 'DC' },
              { name: 'Emma Brown', email: 'emma.b@example.com', role: 'Volunteer', status: 'Inactive', lastActive: '5 days ago', initials: 'EB' },
            ].map((user, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3 border border-indigo-200">
                      {user.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{user.name}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-gray-700">
                    <FontAwesomeIcon icon={faShield}  className="text-gray-400" />
                    {user.role}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status === 'Active' ? <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5" /> : <FontAwesomeIcon icon={faClock} className="w-3 h-3" />}
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  <TextWithNumbers>{user.lastActive}</TextWithNumbers>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FontAwesomeIcon icon={faEllipsis} className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

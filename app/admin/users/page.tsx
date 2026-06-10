'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserPlus,
  faCircleCheck,
  faEllipsis,
  faClock,
  faMagnifyingGlass,
  faShield,
  faSpinner,
  faXmark,
  faDownload,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { supabase } from '@/lib/supabase';
import TextWithNumbers from '../../../components/TextWithNumbers';

interface User {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  lastSignIn: string;
  status: 'active' | 'suspended';
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = users;

    if (search) {
      const query = search.toLowerCase();
      result = result.filter(u => 
        u.email.toLowerCase().includes(query) ||
        u.firstName?.toLowerCase().includes(query) ||
        u.lastName?.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== 'all') {
      result = result.filter(u => u.role === roleFilter);
    }

    setFilteredUsers(result);
  }, [users, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      const { data: authData } = await supabase.auth.admin.listUsers();
      
      const usersList: User[] = (authData?.users || []).map((u: any) => ({
        id: u.id,
        email: u.email || '',
        role: u.email?.toLowerCase().startsWith('admin') ? 'admin' : 'donor',
        firstName: u.user_metadata?.first_name || '',
        lastName: u.user_metadata?.last_name || '',
        createdAt: u.created_at || '',
        lastSignIn: u.last_sign_in_at || '',
        status: u.banned_until ? 'suspended' : 'active',
      }));

      setUsers(usersList);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const csv = [
      ['ID', 'Email', 'Name', 'Role', 'Status', 'Created', 'Last Sign In'],
      ...filteredUsers.map(u => [
        u.id,
        u.email,
        `${u.firstName} ${u.lastName}`.trim(),
        u.role,
        u.status,
        new Date(u.createdAt).toLocaleDateString(),
        u.lastSignIn ? new Date(u.lastSignIn).toLocaleDateString() : 'Never',
      ]),
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-indigo-600 h-8 w-8" />
          <p className="text-sm font-semibold text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500">Manage administrators, staff, and volunteer accounts.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            disabled={filteredUsers.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
          >
            <FontAwesomeIcon icon={faDownload} className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 numbers">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <FontAwesomeIcon icon={faCircleCheck} className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900 numbers">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <FontAwesomeIcon icon={faShield} className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Admins</p>
              <p className="text-2xl font-bold text-gray-900 numbers">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"  />
            <input 
              type="text" 
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none bg-white"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Joined</th>
              <th className="px-6 py-4 font-semibold">Last Active</th>
              <th className="px-6 py-4 font-semibold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  {search || roleFilter !== 'all' ? 'No users match your filters' : 'No users found'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-3 border border-indigo-200 text-sm">
                        {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                        {(user.lastName?.[0] || user.email[1]).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {user.firstName || user.lastName ? `${user.firstName} ${user.lastName}`.trim() : 'Unnamed'}
                        </span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-gray-700 capitalize">
                      <FontAwesomeIcon icon={faShield} className="text-gray-400" />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {user.status === 'active' ? <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" /> : <FontAwesomeIcon icon={faClock} className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <TextWithNumbers>{new Date(user.createdAt).toLocaleDateString()}</TextWithNumbers>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <TextWithNumbers>
                      {user.lastSignIn ? new Date(user.lastSignIn).toLocaleDateString() : 'Never'}
                    </TextWithNumbers>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FontAwesomeIcon icon={faEllipsis} className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">User ID</p>
                <p className="font-mono text-xs text-gray-900 break-all">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Status</p>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  selectedUser.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {selectedUser.status}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">First Name</p>
                <p className="text-sm text-gray-900">{selectedUser.firstName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Last Name</p>
                <p className="text-sm text-gray-900">{selectedUser.lastName || 'Not provided'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                <p className="text-sm text-gray-900">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Role</p>
                <p className="text-sm text-gray-900 capitalize">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Joined</p>
                <p className="text-sm text-gray-900">
                  <TextWithNumbers>{new Date(selectedUser.createdAt).toLocaleDateString()}</TextWithNumbers>
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 flex justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
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

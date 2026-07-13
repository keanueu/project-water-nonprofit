'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to load users');
      const data = await res.json();

      const usersList: User[] = (data.users || []).map((u: any) => ({
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
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-[#0369a1] h-7 w-7" />
          <p className="text-sm font-medium text-slate-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#0369a1] mb-2">User Management</p>
          <h1 className="font-serif text-3xl font-bold text-[#091c37]">Users</h1>
          <p className="text-slate-500 mt-1">Manage administrators, staff, and volunteer accounts.</p>
        </div>
        <button
          onClick={handleExport}
          disabled={filteredUsers.length === 0}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0369a1] text-white rounded-full text-sm font-semibold hover:bg-[#0c4a6e] transition-colors shadow-sm disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#0369a1]/[0.03] rounded-full translate-x-6 -translate-y-6" />
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full group-hover:bg-[#0369a1] group-hover:text-white transition-colors">
              <FontAwesomeIcon icon={faUsers} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Total Users</p>
              <p className="text-2xl font-bold text-[#091c37] numbers">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-full translate-x-6 -translate-y-6" />
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-full group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <FontAwesomeIcon icon={faCircleCheck} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Active</p>
              <p className="text-2xl font-bold text-[#091c37] numbers">
                {users.filter(u => u.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#0369a1]/[0.03] rounded-full translate-x-6 -translate-y-6" />
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#0369a1]/10 text-[#0369a1] rounded-full group-hover:bg-[#0369a1] group-hover:text-white transition-colors">
              <FontAwesomeIcon icon={faShield} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Admins</p>
              <p className="text-2xl font-bold text-[#091c37] numbers">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20 focus:border-[#0369a1] text-[#091c37] placeholder:text-slate-400"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20 focus:border-[#0369a1] appearance-none cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">User</th>
              <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Role</th>
              <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Status</th>
              <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Joined</th>
              <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Last Active</th>
              <th className="px-6 py-3.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                  {search || roleFilter !== 'all' ? 'No users match your filters' : 'No users found'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center">
                      <div className="w-9 h-9 rounded-full bg-[#0369a1]/10 flex items-center justify-center text-[#0369a1] font-bold mr-3 text-xs border border-[#0369a1]/20">
                        {(user.firstName?.[0] || user.email[0]).toUpperCase()}
                        {(user.lastName?.[0] || user.email[1]).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-[#091c37]">
                          {user.firstName || user.lastName ? `${user.firstName} ${user.lastName}`.trim() : 'Unnamed'}
                        </span>
                        <span className="text-xs text-slate-400">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-1.5 text-slate-600 capitalize">
                      <FontAwesomeIcon icon={faShield} className="text-slate-400 w-3.5 h-3.5" />
                      <span className="text-sm">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {user.status === 'active' ? <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" /> : <FontAwesomeIcon icon={faClock} className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">
                    <TextWithNumbers>{new Date(user.createdAt).toLocaleDateString()}</TextWithNumbers>
                  </td>
                  <td className="px-6 py-3.5 text-slate-500">
                    <TextWithNumbers>
                      {user.lastSignIn ? new Date(user.lastSignIn).toLocaleDateString() : 'Never'}
                    </TextWithNumbers>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-slate-400 hover:text-[#0369a1] transition-colors p-1.5 rounded-full hover:bg-[#0369a1]/10"
                    >
                      <FontAwesomeIcon icon={faEllipsis} className="w-4 h-4" />
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedUser(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#0369a1] mb-1">User Profile</p>
                <h2 className="font-serif text-xl font-bold text-[#091c37]">Account Details</h2>
              </div>
              <button onClick={() => setSelectedUser(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              </button>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">User ID</p>
                <p className="font-mono text-xs text-[#091c37] break-all">{selectedUser.id}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Status</p>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                  selectedUser.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {selectedUser.status}
                </span>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">First Name</p>
                <p className="text-sm text-[#091c37]">{selectedUser.firstName || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Last Name</p>
                <p className="text-sm text-[#091c37]">{selectedUser.lastName || 'Not provided'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Email</p>
                <p className="text-sm text-[#091c37]">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Role</p>
                <p className="text-sm text-[#091c37] capitalize">{selectedUser.role}</p>
              </div>
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400 mb-1">Joined</p>
                <p className="text-sm text-[#091c37]">
                  <TextWithNumbers>{new Date(selectedUser.createdAt).toLocaleDateString()}</TextWithNumbers>
                </p>
              </div>
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
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

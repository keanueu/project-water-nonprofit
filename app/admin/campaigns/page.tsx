'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSpinner, faEllipsisVertical, faUsers, faCalendar, faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '@/lib/admin-data';
import type { Campaign } from '@/lib/admin-data';
import dynamic from 'next/dynamic';

const CampaignModal = dynamic(() => import('../../../components/admin/CampaignModal'), { ssr: false });

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/admin/campaigns');
      if (!res.ok) throw new Error('Failed to load campaigns');
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await supabase.from('campaigns').delete().eq('id', id);
      setCampaigns(campaigns.filter(c => c.id !== id));
      setMenuOpen(null);
    } catch (err) {
      console.error('Failed to delete campaign:', err);
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowModal(true);
    setMenuOpen(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-[#0369a1] h-7 w-7" />
          <p className="text-sm font-medium text-slate-400">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#0369a1] mb-2">Administration</p>
          <h1 className="font-serif text-3xl font-bold text-[#091c37]">Campaigns</h1>
          <p className="text-slate-500 mt-1">Create and manage your fundraising campaigns.</p>
        </div>
        <button
          onClick={() => { setEditingCampaign(null); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0369a1] text-white rounded-full text-sm font-semibold hover:bg-[#0c4a6e] transition-colors shadow-sm"
        >
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((campaign) => {
          const progress = campaign.goal > 0 ? Math.min((campaign.raised / campaign.goal) * 100, 100) : 0;
          const daysLeft = campaign.ends_at
            ? Math.max(0, Math.ceil((new Date(campaign.ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
            : null;

          return (
            <div key={campaign.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group relative">
              {/* Status badge + menu */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[0.65rem] font-semibold uppercase tracking-wider ${
                  campaign.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                  campaign.status === 'completed' ? 'bg-slate-100 text-slate-500' :
                  'bg-sky-50 text-sky-700'
                }`}>
                  {campaign.status}
                </span>
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(menuOpen === campaign.id ? null : campaign.id); }}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} className="w-4 h-4" />
                  </button>
                  {menuOpen === campaign.id && (
                    <div className="absolute right-0 mt-1 w-44 bg-white rounded-2xl border border-slate-200 z-20 overflow-hidden">
                      <button
                        onClick={() => handleEdit(campaign)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors text-left"
                      >
                        <FontAwesomeIcon icon={faPencil} className="w-3.5 h-3.5 text-slate-400" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(campaign.id)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex-1">
                <h3 className="font-serif text-lg font-bold text-[#091c37] group-hover:text-[#0369a1] transition-colors pr-24">{campaign.title}</h3>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2">{campaign.description}</p>

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="flex items-end justify-between mb-1.5">
                    <span className="text-sm font-bold text-[#091c37]"><span className="numbers">{formatCurrency(campaign.raised)}</span></span>
                    <span className="text-xs text-slate-400">of <span className="numbers">{formatCurrency(campaign.goal)}</span></span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#0369a1] to-[#0ea5e9] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card footer */}
              <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faUsers} className="w-3 h-3" />
                  <span><span className="numbers font-medium text-slate-500">{campaign.donors}</span> donors</span>
                </div>
                {daysLeft !== null && (
                  <div className="flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                    <span><span className="numbers font-medium text-slate-500">{daysLeft}</span> days left</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Create New Card */}
        <button
          onClick={() => { setEditingCampaign(null); setShowModal(true); }}
          className="rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 min-h-[260px] text-slate-400 hover:border-[#0369a1]/30 hover:text-[#0369a1] hover:bg-[#0369a1]/[0.02] transition-all cursor-pointer group"
        >
          <div className="p-3 rounded-full bg-slate-100 group-hover:bg-[#0369a1]/10 mb-3 transition-colors">
            <FontAwesomeIcon icon={faPlus} className="h-5 w-5" />
          </div>
          <span className="text-sm font-semibold">Create New Campaign</span>
        </button>
      </div>

      {/* Campaign Modal */}
      {showModal && (
        <CampaignModal
          campaign={editingCampaign}
          onClose={() => { setShowModal(false); setEditingCampaign(null); }}
          onSave={fetchCampaigns}
        />
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { supabase } from '@/lib/supabase';
import type { Campaign } from '@/lib/admin-data';

interface CampaignModalProps {
  campaign?: Campaign | null;
  onClose: () => void;
  onSave: () => void;
}

export default function CampaignModal({ campaign, onClose, onSave }: CampaignModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState<{
    title: string;
    description: string;
    goal: number;
    ends_at: string;
    status: 'active' | 'completed' | 'draft';
  }>({
    title: '',
    description: '',
    goal: 10000,
    ends_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'active',
  });

  useEffect(() => {
    if (campaign) {
      setForm({
        ...campaign,
        ends_at: campaign.ends_at ? new Date(campaign.ends_at).toISOString().split('T')[0] : form.ends_at,
      });
    }
  }, [campaign]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (campaign?.id) {
        const { error: updateError } = await supabase
          .from('campaigns')
          .update(form)
          .eq('id', campaign.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('campaigns')
          .insert([{ ...form, raised: 0, donors: 0 }]);

        if (insertError) throw insertError;
      }

      onSave();
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Failed to save campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#0369a1] mb-1">Campaign Details</p>
            <h2 className="font-serif text-xl font-bold text-[#091c37]">
              {campaign ? 'Edit Campaign' : 'Create New Campaign'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px bg-slate-100" />

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Campaign Title
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20 focus:border-[#0369a1] text-sm text-[#091c37]"
              placeholder="Clean Water Initiative"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20 focus:border-[#0369a1] text-sm text-[#091c37]"
              placeholder="Describe the campaign goals and impact..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Funding Goal ($)
              </label>
              <input
                type="number"
                required
                min="100"
                value={form.goal}
                onChange={(e) => setForm({ ...form, goal: Number(e.target.value) })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20 focus:border-[#0369a1] text-sm text-[#091c37] numbers"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                required
                value={form.ends_at}
                onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20 focus:border-[#0369a1] text-sm text-[#091c37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'completed' | 'draft' })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0369a1]/20 focus:border-[#0369a1] text-sm text-[#091c37] appearance-none cursor-pointer"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="h-px bg-slate-100" />

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-[#0369a1] text-white rounded-full text-sm font-semibold hover:bg-[#0c4a6e] disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin h-3.5 w-3.5" />
                  Saving...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSave} className="h-3.5 w-3.5" />
                  {campaign ? 'Update' : 'Create'} Campaign
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

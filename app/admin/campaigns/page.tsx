'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import TextWithNumbers from '../../../components/TextWithNumbers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEllipsisVertical, 
  faUsers, 
  faCalendarDays, 
  faChevronRight,
  faSpinner,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { readDonations, readCampaigns, formatCurrency } from '@/lib/admin-data';
import type { Campaign } from '@/lib/admin-data';

const CampaignModal = dynamic(() => import('../../../components/admin/CampaignModal'), { ssr: false });

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const donations = await readDonations();
      const data = await readCampaigns(donations);
      setCampaigns(data);
    } catch (err) {
      console.error('Failed to load campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCampaign(null);
    setShowModal(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowModal(true);
    setMenuOpen(null);
  };

  const handleSave = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-indigo-600 h-8 w-8" />
          <p className="text-sm font-semibold text-gray-500">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500">Manage your fundraising initiatives and track their progress.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <FontAwesomeIcon icon={faPlus} className="w-[18px] h-[18px]" />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:border-indigo-300 transition-all group">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-700' : 
                  campaign.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {campaign.status}
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setMenuOpen(menuOpen === campaign.id ? null : campaign.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FontAwesomeIcon icon={faEllipsisVertical} className="w-[18px] h-[18px]" />
                  </button>
                  {menuOpen === campaign.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                      <button
                        onClick={() => handleEdit(campaign)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                        Edit Campaign
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        Delete Campaign
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{campaign.title}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2"><TextWithNumbers>{campaign.description}</TextWithNumbers></p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 font-medium">Progress</span>
                  <span className="text-gray-900 font-bold"><span className="numbers">{Math.round(campaign.progress)}</span>%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${Math.min(campaign.progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Raised</p>
                    <p className="text-lg font-bold text-gray-900"><span className="numbers">{formatCurrency(campaign.raised)}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Goal</p>
                    <p className="text-sm font-semibold text-gray-700"><span className="numbers">{formatCurrency(campaign.goal)}</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-xs">
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faUsers} className="w-3.5 h-3.5" />
                  <span><span className="numbers">{campaign.donors}</span> donors</span>
                </div>
                <div className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faCalendarDays} className="w-3.5 h-3.5" />
                  <span><span className="numbers">{campaign.daysLeft}</span> days left</span>
                </div>
              </div>
              <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
            </div>
          </div>
        ))}
        
        {/* Add New Placeholder */}
        <button 
          onClick={handleCreate}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all min-h-[300px]"
        >
          <div className="p-3 bg-gray-50 rounded-full mb-4">
            <FontAwesomeIcon icon={faPlus} className="w-6 h-6" />
          </div>
          <span className="font-medium">Create New Campaign</span>
        </button>
      </div>

      {showModal && (
        <CampaignModal
          campaign={editingCampaign}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

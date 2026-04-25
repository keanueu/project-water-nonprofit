import React from 'react';
import { 
  Plus, 
  MoreVertical, 
  Target, 
  Users, 
  Calendar,
  ChevronRight
} from 'lucide-react';

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-500">Manage your fundraising initiatives and track their progress.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: 'Clean Water Initiative', 
            description: 'Building sustainable water wells in remote villages to provide clean drinking water.',
            raised: '$45,000', 
            goal: '$60,000', 
            donors: 342, 
            daysLeft: 12,
            progress: 75,
            status: 'Active'
          },
          { 
            title: 'Education for All', 
            description: 'Providing school supplies, books, and uniforms to underprivileged children.',
            raised: '$12,400', 
            goal: '$25,000', 
            donors: 156, 
            daysLeft: 24,
            progress: 49.6,
            status: 'Active'
          },
          { 
            title: 'Emergency Food Relief', 
            description: 'Delivering urgent food assistance to families affected by the recent natural disaster.',
            raised: '$85,000', 
            goal: '$100,000', 
            donors: 892, 
            daysLeft: 5,
            progress: 85,
            status: 'Active'
          },
          { 
            title: 'Community Garden Project', 
            description: 'Establishing urban gardens to improve local food security and community engagement.',
            raised: '$5,000', 
            goal: '$5,000', 
            donors: 84, 
            daysLeft: 0,
            progress: 100,
            status: 'Completed'
          },
          { 
            title: 'Reforestation 2026', 
            description: 'Planting 10,000 trees to restore local biodiversity and combat climate change.',
            raised: '$8,200', 
            goal: '$30,000', 
            donors: 92, 
            daysLeft: 45,
            progress: 27.3,
            status: 'Active'
          },
        ].map((campaign, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col hover:border-indigo-300 transition-all group">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  campaign.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {campaign.status}
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{campaign.title}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-2">{campaign.description}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500 font-medium">Progress</span>
                  <span className="text-gray-900 font-bold">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${campaign.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Raised</p>
                    <p className="text-lg font-bold text-gray-900">{campaign.raised}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Goal</p>
                    <p className="text-sm font-semibold text-gray-700">{campaign.goal}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-xs">
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{campaign.donors} donors</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{campaign.daysLeft} days left</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
        
        {/* Add New Placeholder */}
        <button className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all min-h-[300px]">
          <div className="p-3 bg-gray-50 rounded-full mb-4">
            <Plus size={24} />
          </div>
          <span className="font-medium">Create New Campaign</span>
        </button>
      </div>
    </div>
  );
}

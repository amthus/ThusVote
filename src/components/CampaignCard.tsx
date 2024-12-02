import React from 'react';
import { Calendar, Users, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import type { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
  onVote?: () => void;
}

function CampaignCard({ campaign, onVote }: CampaignCardProps) {
  const isActive = new Date() >= campaign.startDate && new Date() <= campaign.endDate;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{campaign.title}</h3>
          {campaign.isPaid && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <DollarSign className="h-4 w-4 mr-1" />
              Paid
            </span>
          )}
        </div>
        <p className="mt-2 text-gray-600">{campaign.description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            {format(campaign.startDate, 'MMM d, yyyy')} - {format(campaign.endDate, 'MMM d, yyyy')}
          </span>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>{campaign.choices.length} options</span>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        {isActive ? (
          <button
            onClick={onVote}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Vote Now
          </button>
        ) : (
          <span className="block text-center text-sm text-gray-500">
            {new Date() < campaign.startDate ? 'Not started yet' : 'Voting ended'}
          </span>
        )}
      </div>
    </div>
  );
}

export default CampaignCard;
'use client';

import React from 'react';
import { Copy, Gift, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/lib/auth';

export default function ReferralPage() {
  const { user } = useAuth();

  const referralLink = user?.username ?
  `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/auth/signup?ref=${user.username}` :
  'Loading...';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied!');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6 sm:p-8">
      <div className="w-full max-w-2xl p-6 sm:p-8 lg:p-12 text-center  ">
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
          Invite & Earn Credits  
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">
          Share your unique link and unlock rewards for you and your friends.
        </p>

        {/* Link and Copy Button */}
        <div className="relative mb-8 group">
          <div className="relative flex items-center justify-between bg-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200">
            <span className="font-mono text-sm sm:text-base text-gray-600 truncate pr-4">
              {referralLink}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md">
              
              <Copy size={16} />
              <span className="hidden sm:inline-block">Copy Link</span>
            </button>
          </div>
        </div>

        {/* Reward Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="p-6 bg-white border border-green-200 rounded-xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:border-green-400">
            <Gift className="text-green-500 mb-3" size={48} />
            <h3 className="text-2xl font-bold text-green-600">+50 Credits</h3>
            <p className="text-gray-500 text-sm mt-1">
              For every friend who signs up with your link.
            </p>
          </div>
          <div className="p-6 bg-white border border-blue-200 rounded-xl shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:border-blue-400">
            <Users className="text-blue-500 mb-3" size={48} />
            <h3 className="text-2xl font-bold text-blue-600">+20 Credits</h3>
            <p className="text-gray-500 text-sm mt-1">
              Your friend gets an instant bonus to get started.
            </p>
          </div>
        </div>
      </div>
    </div>);

}
'use client'

import React from 'react'

export default function PlanCard({
  title,
  price,
  type,
  features = [],
  credits,
  isActive = false,
  loading = false,
  onPurchase,
}) {
  return (
    <div
      className={`card p-6 rounded-2xl shadow-md flex flex-col justify-between transition hover:shadow-lg ${
        isActive ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-2xl font-bold text-primary-600 mb-2">
          {price === 0 ? 'Free' : `₹${price}`}
        </p>
        {isActive && type === 'Plan' && (
          <span className="text-green-600 font-medium">Active</span>
        )}
        {type === 'Credit' && credits !== undefined && (
          <p className="text-gray-600 mt-1">{credits} credits available</p>
        )}
      </div>

      {type === 'Plan' && features.length > 0 && (
        <ul className="space-y-2 mb-6 text-left">
          {features.map((feature, idx) => (
            <li key={idx} className="text-gray-700 text-sm flex items-center gap-2">
              <span className="text-primary-500">✔</span> {feature}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onPurchase}
        disabled={loading || (isActive && type === 'Plan')}
        className={`w-full py-2 rounded-md font-medium ${
          loading
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : type === 'Plan'
            ? 'bg-primary-600 text-white hover:bg-primary-700'
            : 'border border-primary-600 text-primary-600 hover:bg-primary-50'
        }`}
      >
        {loading
          ? 'Processing...'
          : isActive && type === 'Plan'
          ? 'Active'
          : type === 'Plan'
          ? `Buy ${title}`
          : `Buy ${price} Credits`}
      </button>
    </div>
  )
}

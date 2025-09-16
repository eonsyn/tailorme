'use client'

import React from 'react'
import { Check, Loader2 } from 'lucide-react'

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
  const isCreditCard = type === 'Credit'
  const isPlanActive = isActive && type === 'Plan'

  return (
    <div
      className={`card p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
        isActive ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2 text-foreground">{title}</h2>
        <p className="text-4xl font-extrabold text-primary mb-2">
          {price === 0 ? 'Free' : `₹${price}`}
        </p>
        {isPlanActive && (
          <span className="text-success-600 font-medium">Active</span>
        )}
        {isCreditCard && credits !== undefined && (
          <p className="text-muted-foreground mt-1 text-sm">{credits} credits available</p>
        )}
      </div>

      {type === 'Plan' && features.length > 0 && (
        <ul className="space-y-2 mb-6 text-left">
          {features.map((feature, idx) => (
            <li key={idx} className="text-foreground text-sm flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onPurchase}
        disabled={loading || isPlanActive}
        className={`btn w-full ${
          loading
            ? 'btn-secondary cursor-not-allowed animate-pulse'
            : isPlanActive
            ? 'btn-secondary cursor-not-allowed'
            : isCreditCard
            ? 'btn-outline'
            : 'btn-primary'
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Processing...
          </span>
        ) : isPlanActive ? (
          'Active'
        ) : isCreditCard ? (
          `Buy ₹${price}`
        ) : (
          `Buy ${title}`
        )}
      </button>
    </div>
  )
}
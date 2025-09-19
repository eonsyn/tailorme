'use client'

import React from 'react'
import { Check, Loader2, Star } from 'lucide-react'

export default function PlanCard({
  title,
  price,
  credits,
  loading = false,
  onPurchase,
  highlight = false, // Standard Pack highlight
  originalPrice,     // show old price for strike-through
}) {
  // Calculate value: ₹1 = how many credits
  const valuePerRupee = (credits / price).toFixed(1)

  return (
    <div
      className={`relative card p-6 flex flex-col justify-between rounded-2xl border transition-all duration-300 ${
        highlight
          ? 'border-primary ring-2 ring-primary/60 scale-105 z-10 shadow-2xl'
          : 'border-border hover:shadow-lg'
      }`}
    >
      {/* Popular Badge */}
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-secondary  px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
          <Star className="w-3 h-3" /> Most Popular
        </div>
      )}

      {/* Title + Pricing */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2 text-foreground">{title}</h2>

        <div className="flex items-center justify-center gap-2 mb-2">
          {originalPrice && (
            <span className="text-muted-foreground line-through text-lg">
              ₹{originalPrice}
            </span>
          )}
          <p className="text-4xl font-extrabold text-primary">₹{price}</p>
        </div>

        <p className="text-muted-foreground text-sm">
          {credits} Credits{' '}
          <span className="font-medium">({valuePerRupee} credits / ₹1)</span>
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={onPurchase}
        disabled={loading}
        className={`btn w-full rounded-lg text-lg font-semibold transition-all ${
          loading
            ? 'btn-secondary cursor-not-allowed animate-pulse'
            : highlight
            ? 'btn-primary shadow-lg hover:shadow-xl'
            : 'btn-outline hover:shadow-md'
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Processing...
          </span>
        ) : (
          `Buy Now`
        )}
      </button>
    </div>
  )
}

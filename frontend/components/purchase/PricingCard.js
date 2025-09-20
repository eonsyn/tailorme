'use client';

import React from 'react';
import Link from 'next/link';

export default function PricingCard({
  title,
  price,
  originalPrice,
  credits,
  href,
  buttonText,
  highlight = false,
  type = 'Credit', // 'Credit' or 'Plan'
}) {
  return (
    <div className={`card p-6 relative border rounded-xl shadow-sm transition-all ${highlight ? 'ring-2 ring-primary-500 shadow-xl' : ''}`}>
      
      {highlight && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-secondary  px-4 py-2 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-2xl font-bold text-primary-600 mb-1">₹{price}</p>
        {originalPrice && <p className="text-gray-500 line-through mb-2">₹{originalPrice}</p>}
        <p className="text-gray-700">{credits} {type === 'Credit' ? 'Credits' : ''}</p>
      </div>

      <Link
        href={href}
        className={`btn w-full ${highlight ? 'btn-primary' : 'btn-outline'}`}
      >
        {buttonText}
      </Link>
    </div>
  );
}

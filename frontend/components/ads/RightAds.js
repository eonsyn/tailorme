'use client';

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react'; // Lucide Telegram-like icon

const RightAds = () => {
  return (
    <div className="sticky top-18 z-40 w-full p-4 rounded-xl bg-[var(--card-background)] border border-[var(--border)] shadow-md">
       
      <p className="text-sm text-[var(--muted-foreground)] mb-3">
        Join our <span className="font-medium">Telegram Channel</span> to get the latest internship updates, resources, and more opportunities!
      </p>
      <button className='btn btn-secondary'>
<a
        href="https://t.me/+0dSdS2IFa7kzZGE1"  
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center font-medium   transition-colors"
      >
        <Send className="w-4 h-4" />
        Join on Telegram
      </a>
      </button>
      
    </div>
  );
};

export default RightAds;

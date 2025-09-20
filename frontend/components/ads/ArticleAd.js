'use client';

import { useEffect, useRef, useState } from 'react';

export default function ArticleAd() {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const node = adRef.current;

    const tryPushAd = () => {
      const width = node?.offsetWidth || 0;
      if (width === 0) {
        setTimeout(tryPushAd, 300);
        return;
      }
      try {
        if (node && !node.getAttribute('data-ad-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          node.setAttribute('data-ad-status', 'filled'); // ✅ mark initialized
          setAdLoaded(true);
        }
      } catch (e) {
        console.error('Adsbygoogle error:', e);
        setAdLoaded(false);
      }
    };

    tryPushAd();
  }, []);

  return (
    <div
      className="w-full my-6 py-4 px-2 border border-gray-900 rounded-xl shadow-md text-center"
    >
      <p className="text-xs text-gray-400 italic mb-2">Sponsored content</p>

      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-format="fluid"
        data-ad-layout-key="-gw-3+1f-3d+2z" // ✅ your layout key
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="3305560812"
      />

      {!adLoaded && (
        <p className="text-gray-300 text-sm italic mt-2">
          Ad loading... (may be blocked)
        </p>
      )}
    </div>
  );
}

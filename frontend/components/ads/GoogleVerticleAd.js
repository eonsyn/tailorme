'use client'; // Required for AdSense with App Router

import { useEffect, useRef, useState } from "react";

const GoogleVerticleAd = ({ slot, style = {}, className = "" }) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const tryRenderAd = () => {
      const width = adRef.current?.offsetWidth || 0;

      if (width === 0) {
        // Wait until the container has a non-zero width
        setTimeout(tryRenderAd, 300);
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      } catch (e) {
        console.error("AdSense error:", e);
        setAdLoaded(false);
      }
    };

    if (typeof window !== "undefined") {
      tryRenderAd();
    }
  }, []);

  return (
   <div className="sticky top-4 z-40 w-full p-3 rounded-xl bg-[var(--card-background)] border border-[var(--border)] shadow-md">
  <p className="text-xs text-[var(--text-secondary)] italic mb-2 text-center">
    Sponsored Ad
  </p>

  <ins
    ref={adRef}
    className={`adsbygoogle ${className}`}
    style={{ display: "block", width: "100%", ...style }}
    data-ad-client="ca-pub-2404358914933411"
    data-ad-slot={slot}
    data-ad-format="auto"
    data-full-width-responsive="true"
  ></ins>

  {!adLoaded && (
    <p className="text-center text-[var(--text-secondary)] text-xs mt-2 italic">
      Ad loading or blocked
    </p>
  )}
</div>

  );
};

export default GoogleVerticleAd;

'use client';
import { useEffect } from 'react';

export default function GoogleBlogAds() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-2404358914933411"
         data-ad-slot="2624924600"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  );
}

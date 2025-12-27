"use client";

import { useEffect } from "react";

function DisplayAds() {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("Adsense error", err);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2404358914933411"
        data-ad-slot="5218448258"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default DisplayAds;

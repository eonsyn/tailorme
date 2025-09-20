'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner160x600() {
  const adRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      atOptions = {
        'key' : '49ed2437b6a82986e1dd12d693d2e386',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//compassionunsuccessful.com/49ed2437b6a82986e1dd12d693d2e386/invoke.js';

    if (adRef.current) {
      adRef.current.appendChild(script);
      adRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div
      className="w-[160px] h-[600px] mx-auto my-10"
      ref={adRef}
    ></div>
  );
}

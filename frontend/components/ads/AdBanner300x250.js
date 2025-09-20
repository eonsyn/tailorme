'use client';

import { useEffect, useRef } from 'react';

export default function AdBanner300x250() {
  const adRef = useRef(null);

  useEffect(() => {
    const setupScript = document.createElement('script');
    setupScript.type = 'text/javascript';
    setupScript.innerHTML = `
      atOptions = {
        'key' : 'fdfe69f66b82982d78b66d176f70d5d6',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;

    const loadScript = document.createElement('script');
    loadScript.type = 'text/javascript';
    loadScript.src = '//compassionunsuccessful.com/fdfe69f66b82982d78b66d176f70d5d6/invoke.js';

    if (adRef.current) {
      adRef.current.innerHTML = ''; // clear previous if reloaded
      adRef.current.appendChild(setupScript);
      adRef.current.appendChild(loadScript);
    }
  }, []);

  return (
    <div
      className="w-[300px] h-[250px] mx-auto my-10"
      ref={adRef}
    ></div>
  );
}

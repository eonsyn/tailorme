"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Fullscreen } from "lucide-react";
function ImageComponent({ imageUrl, alt }) {
  const [isOpen, setIsOpen] = useState(false);
  const [animateZoom, setAnimateZoom] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Add zoom-in effect after modal opens
      const timer = setTimeout(() => {
        setAnimateZoom(true);
      }, 10); // slight delay to trigger transition
      return () => clearTimeout(timer);
    } else {
      setAnimateZoom(false);
    }
  }, [isOpen]);

  return (
    <>

      {/* Thumbnail */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-zoom-in transition-transform duration-300 ease-in-out  inline-block h-full w-full relative"
      >
        {imageUrl.startsWith("https://res.cloudinary") ? (
           <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-contain rounded-md"
          
      />

        ) : (
          <img
            src={imageUrl}
            alt={alt}
            className="h-full w-full object-contain rounded-md shadow"
          />
        )}


      </div>

      {/* Fullscreen Modal with zoom-in animation */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={alt}
            className={clsx(
              "transition-transform duration-500 ease-in-out max-w-full max-h-full",
              animateZoom ? "scale-100" : "scale-75"
            )}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 bg-white text-black px-3 py-1 rounded shadow hover:bg-gray-100 transition"
          >
            Close ✕
          </button>
        </div>
      )}
    </>
  );
}

export default ImageComponent;

"use client";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

function ImageComponent({ imageUrl, alt }) { // Removed width, height from props
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Determine if we should use the Next.js Image component
  const useNextImage = imageUrl.startsWith("https://res.cloudinary");

  return (
    <>
      {/* --- Thumbnail Embed (The main image on the page) --- */}
      <figure
        onClick={() => setIsOpen(true)}
        className="my-3 relative w-full aspect-video md:aspect-w-16 md:aspect-h-9 bg-gray-100 dark:bg-gray-800 flex items-center justify-center border rounded-md overflow-hidden cursor-zoom-in group transition-opacity duration-300"
        // Using aspect-video or md:aspect-w-16 md:aspect-h-9 to define a flexible height based on width
      >
        {useNextImage ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill // Use fill to make the image take up the parent's space
            className="object-cover rounded-none transition-transform duration-300 ease-in-out group-hover:scale-105"
            // Adding a slight scale on hover for a subtle effect
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw" // Optimize image loading
          />
        ) : (
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover rounded-none transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        )}
        
        {/* Zoom Indicator Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
            <ZoomIn className="w-8 h-8 text-white/90 drop-shadow-lg" />
        </div>
      </figure>

      {/* --- Fullscreen Modal (Click-to-Zoom) --- */}
      {isOpen && (
        <div 
          className={clsx(
            "fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300",
            isMounted ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
          onClick={() => setIsOpen(false)}
        >
          {/* Image Container */}
          <div className="p-4 max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <img
              src={imageUrl}
              alt={alt}
              className="w-auto h-auto max-w-full max-h-full object-contain cursor-default"
              style={{ transition: 'opacity 0.5s ease-out' }}
            />
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 rounded-full backdrop-blur-sm bg-white/20"
            title="Close image viewer"
          >
            <X className="w-6 h-6 text-red-700 bg-red-200 rounded-full p-1" />
          </button>
          
          {/* Alt Text Caption */}
          {alt && (
            <div className="absolute bottom-4 left-4 max-w-xs text-sm text-white p-2 rounded bg-black/50 backdrop-blur-sm">
                {alt}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ImageComponent;
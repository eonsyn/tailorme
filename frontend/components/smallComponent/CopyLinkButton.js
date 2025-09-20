"use client";
import { useState, useRef, useEffect } from "react";
import { IoShareSocial } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-hot-toast";

const CopyLinkButton = ({ url }) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link s copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy the link.");
    }
  };

  const toggleOptions = () => setShowOptions(!showOptions);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div ref={dropdownRef} className="relative flex items-center space-x-2">
      {/* Main Share Icon */}
      <button
        onClick={toggleOptions}
        className="text-xl cursor-pointer text-gray-600 hover:text-black transition-all"
        title="Share"
      >
        <IoShareSocial />
      </button>

      {/* Share Options */}
      {showOptions && (
        <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded p-2 flex flex-col space-y-3 z-50">
  <a
    href={`https://wa.me/?text=${encodeURIComponent(url)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-500 text-xl hover:scale-110 transition"
    title="Share on WhatsApp"
  >
    <FaWhatsapp />
  </a>

  <a
    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 text-xl hover:scale-110 transition"
    title="Share on Facebook"
  >
    <FaFacebook />
  </a>

  <a
    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sky-500 text-xl hover:scale-110 transition"
    title="Share on Twitter"
  >
    <FaTwitter />
  </a>

  <button
    onClick={handleCopy}
    className="text-gray-600 text-xl hover:scale-110 transition"
    title="Copy link"
  >
    <MdContentCopy />
  </button>
</div>

      )}
    </div>
  );
};

export default CopyLinkButton;

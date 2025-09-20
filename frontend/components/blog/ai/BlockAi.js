'use client';
import { FaRobot } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import AiPopUp from './AiPopUp';

function BlockAi({ article }) {
  const [isBotOpen, setIsBotOpen] = useState(false);

  const toggleBot = () => setIsBotOpen(prev => !prev);

  // Lock scroll when popup is open
  useEffect(() => {
    if (isBotOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isBotOpen]);

  return (
    <div className="w-full relative text-xl z-10">
      {/* Blurred overlay */}
      {isBotOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"></div>
      )}

      {/* AI Popup */}
      {isBotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <AiPopUp isBotOpen={isBotOpen} article={article} onClose={toggleBot} />
        </div>
      )}

      {/* Bot Toggle Button */}
      <div
        onClick={toggleBot}
        className="fixed btn btn-primary bottom-4 right-4 z-50 text-sm px-4 py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-lg"
      >
        <FaRobot className="text-lg" />
        <span className="font-semibold">Ask to Arya</span>
      </div>
    </div>
  );
}

export default BlockAi;

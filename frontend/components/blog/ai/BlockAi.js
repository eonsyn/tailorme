'use client';

import React, { useState, useEffect } from 'react';
import { FaRobot } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import AiPopUp from './AiPopUp';

export default function BlockAi({ article }) {
  const [isBotOpen, setIsBotOpen] = useState(false);

  const toggleBot = () => setIsBotOpen(prev => !prev);

  // Lock scroll when popup is active
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isBotOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isBotOpen]);

  return (
    <div className="relative z-10 text-xl">
      {/* Overlay */}
      <AnimatePresence>
        {isBotOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-all"
          />
        )}
      </AnimatePresence>

      {/* AI Popup */}
      <AnimatePresence>
        {isBotOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <AiPopUp
              isBotOpen={isBotOpen}
              article={article}
              onClose={toggleBot}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Button */}
      <motion.button
        onClick={toggleBot}
        whileTap={{ scale: 0.9 }}
        className={`
          fixed bottom-6 right-6 z-50 flex items-center gap-2
          px-5 py-3 rounded-full shadow-lg border
          btn-primary text-sm font-semibold
          hover:shadow-xl hover:scale-105
          transition-all duration-300 ease-in-out
        `}
      >
        <FaRobot className="text-base" />
        <span>Ask to Arya</span>
      </motion.button>
    </div>
  );
}

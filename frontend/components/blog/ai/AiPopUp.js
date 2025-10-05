'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdClose } from 'react-icons/io';
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ReactMarkdown from 'react-markdown';

export default function AiPopUp({ isBotOpen, onClose, article }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Handle open/close visibility
  useEffect(() => {
    if (isBotOpen) {
      setShouldRender(true);
      setTimeout(() => {
        setVisible(true);
        inputRef.current?.focus();
      }, 20);
    } else {
      setVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isBotOpen]);

  // Auto-focus input after response
  useEffect(() => {
    if (!loading) inputRef.current?.focus();
  }, [loading]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (question = input) => {
    if (!question.trim()) return;
    const userMessage = { role: 'user', text: question };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message: question, article }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let aiText = '';
    setMessages(prev => [...prev, { role: 'ai', text: '' }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      aiText += chunk;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'ai', text: aiText };
        return updated;
      });
    }

    setLoading(false);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed bottom-20 right-4
        w-[calc(100%-30px)] md:w-[420px]
        backdrop-blur-md border border-[var(--color-border)]
        bg-[var(--color-card)]/80 text-[var(--color-card-foreground)]
        rounded-2xl shadow-2xl flex flex-col
        overflow-hidden max-h-[70vh] md:max-h-[450px]
        transition-all duration-300 ease-in-out transform
        ${visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}
    >
      {/* Header */}
      <div className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-5 py-4 flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">Arya</p>
          <p className="text-xs opacity-90">Hi! I’m Arya, your AI assistant 🤖</p>
        </div>
        <IoMdClose
          className="cursor-pointer p-1 rounded-full bg-red-600 text-[var(--color-primary)] text-2xl hover:scale-110 hover:opacity-80 transition"
          onClick={onClose}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth bg-[var(--color-card)]/50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-xl px-4 py-2 text-sm md:text-base whitespace-pre-wrap leading-snug transition-all duration-300 ${
              msg.role === 'user'
                ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] ml-auto'
                : 'bg-[var(--color-muted)] text-[var(--color-muted-foreground)] mr-auto font-medium'
            }`}
          >
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-700 transition"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        ))}
        {loading && (
          <p className="text-sm text-[var(--color-muted-foreground)] animate-pulse">
            Thinking...
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 0 && !loading && (
        <div className="bg-[var(--color-muted)]/60 px-4 py-3 space-y-2 border-t border-[var(--color-border)]">
          <p className="text-sm font-medium text-[var(--color-muted-foreground)]">
            Try asking one of these:
          </p>
          {[
            'Summarize this article in simple words',
            'Tell me in short bullet points',
          ].map((question, i) => (
            <div
              key={i}
              onClick={() => sendMessage(question)}
              className="cursor-pointer flex items-center justify-between bg-[var(--color-accent)] hover:bg-[var(--color-accent-foreground)] hover:text-[var(--color-accent)] px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              {question}
              <MdOutlineArrowForwardIos className="text-xs opacity-70" />
            </div>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-card)]/60 px-4 py-3 flex items-center gap-3">
        <input
          ref={inputRef}
          disabled={loading}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 text-sm md:text-base rounded-lg border border-[var(--color-input)] bg-[var(--color-input)] px-4 py-2 placeholder:text-[var(--color-muted-foreground)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] disabled:opacity-60"
          placeholder="Ask something about this article..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="text-[var(--color-primary)] font-bold text-lg hover:scale-110 transition-all disabled:opacity-40"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            '➤'
          )}
        </button>
      </div>

      {/* Footer Disclaimer */}
      <p className="text-xs text-center text-[var(--color-muted-foreground)] bg-[var(--color-card)]/60 py-2">
        ⚠️ AI responses may contain inaccuracies.
      </p>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdClose } from 'react-icons/io';
import ReactMarkdown from 'react-markdown';
import { MdOutlineArrowForwardIos } from "react-icons/md";

function AiPopUp({ isBotOpen, onClose, article }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Control show/hide animation
    useEffect(() => {
        if (isBotOpen) {
            setShouldRender(true);
            setTimeout(() => {
                setVisible(true);
                inputRef.current?.focus(); // Autofocus on open
            }, 20);
        } else {
            setVisible(false);
            setTimeout(() => setShouldRender(false), 300); // Unmount after animation
        }
    }, [isBotOpen]);

    // Auto focus again after loading ends
    useEffect(() => {
        if (!loading) {
            inputRef.current?.focus();
        }
    }, [loading]);

    // Auto scroll to bottom when messages change
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
  className={`fixed bottom-20 right-4 w-[calc(100%-30px)] md:w-[400px] bg-white shadow-xl rounded-2xl border border-gray-200 flex flex-col max-h-[70vh] md:max-h-[450px] overflow-hidden transition-all duration-300 ease-in-out transform ${
    visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
  }`}
>
  {/* Header */}
  <div className="bg-[#C8281D] text-white px-5 py-4 flex justify-between items-center">
    <div>
      <p className="font-semibold text-lg">Arya</p>
      <p className="text-xs opacity-90">Hi! I’m Arya, AktuBrand AI expert</p>
    </div>
    <IoMdClose
      className="cursor-pointer p-1 rounded-full bg-white text-[#C8281D] text-2xl hover:scale-110 hover:text-red-800 transition"
      onClick={onClose}
    />
  </div>

  {/* Message Area */}
  <div className="flex-1 bg-red-50 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
    {messages.map((msg, i) => (
      <div
        key={i}
        className={`max-w-[85%] rounded-xl px-4 py-2 text-base md:text-xl  whitespace-pre-wrap transition-all ease-in-out duration-300 ${
          msg.role === 'user'
            ? 'bg-red-100 text-right ml-auto'
            : 'bg-red-200 font-mono tracking-tighter text-left mr-auto'
        }`}
      >
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800 transition"
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
      <p className="text-gray-500 text-xs animate-pulse">Thinking...</p>
    )}
    <div ref={messagesEndRef} />
  </div>

  {/* Recommended Questions */}
  {messages.length === 0 && !loading && (
    <div className="bg-red-50 px-4 py-3 space-y-2">
      <p className="text-lg font-medium text-gray-700">Try asking one of these:</p>
      {[
        'Summarise this article in simple words',
        'Tell me in points',
      ].map((question, i) => (
        <div
          key={i}
          onClick={() => sendMessage(question)}
          className="cursor-pointer flex items-center justify-between bg-red-100 hover:bg-red-200 px-4 py-2 rounded-lg text-sm text-gray-800 transition"
        >
          {question}
          <MdOutlineArrowForwardIos className="text-xs text-gray-500" />
        </div>
      ))}
    </div>
  )}

  {/* Input Area */}
  <div className="border-t border-[#C8281D] bg-red-50 px-4 py-3 flex items-center gap-3">
    <input
      ref={inputRef}
      disabled={loading}
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="flex-1 text-sm md:text-base border border-[#C8281D] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8281D]/50 bg-white disabled:bg-gray-100"
      placeholder="Tell us how we can help..."
      onKeyDown={(e) => {
        if (e.key === 'Enter') sendMessage();
      }}
    />
    <button
      type="submit"
      onClick={() => sendMessage()}

      disabled={loading}
      className="text-[#C8281D] font-bold text-xl disabled:opacity-40 hover:scale-105 transition"
    >
      {loading ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        '➤'
      )}
    </button>
  </div>

  {/* Disclaimer */}
  <p className="text-sm bg-red-50 text-center text-gray-400 pb-3 px-4">
    AI may produce inaccurate information
  </p>
</div>

    );
}

export default AiPopUp;

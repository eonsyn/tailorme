// app/send-notification/page.js (or app/page.js)
'use client';

import React, { useState } from 'react';

// Make sure your .env.local file has:
// HOST_URL=http://localhost:3000 (or your deployed URL like https://your-app.com)

function Page() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [link, setLink] = useState(process.env.HOST_URL); // Default to HOST_URL from env
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage(''); // Clear previous messages
    setIsSuccess(false);
    setIsLoading(true);

    if (!title || !body || !link) {
      setResponseMessage('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      // Use process.env.HOST_URL for the base URL, or fall back to localhost
      const apiEndpoint = `/api/admin/notification`;

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, link, imageUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setResponseMessage(data.message || 'Notifications sent successfully!');
        // Optionally clear form fields after successful send
        setTitle('');
        setBody('');
        setLink(process.env.HOST_URL || 'https://aktubrand.vercel.app/');
      } else {
        setIsSuccess(false);
        setResponseMessage(data.error || 'Failed to send notifications. Please check server logs.');
        console.error('API Error:', data);
      }
    } catch (error) {
      setIsSuccess(false);
      setResponseMessage('An unexpected error occurred. Check console for details.');
      console.error('Fetch Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Send Notification
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Send a push notification to all registered users.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Notification Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="e.g., New Article Published!"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
              Notification Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows="3"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out resize-y"
              placeholder="e.g., Check out our latest insights on web development."
            ></textarea>
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
              Link to Open on Click
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
              placeholder="e.g., https://aktubrand.vercel.app/"
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } transition duration-200 ease-in-out`}
          >
            {isLoading ? 'Sending...' : 'Send Notifications'}
          </button>
        </form>

        {responseMessage && (
          <div
            className={`mt-6 p-4 rounded-md ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              } border ${isSuccess ? 'border-green-300' : 'border-red-300'}`}
            role="alert"
          >
            <p className="font-medium">{responseMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-hot-toast';

function AllPost() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles
  const fetchArticles = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/save-article', {
      method: 'GET',
      cache: 'no-store'
    });
    const data = await res.json();
    setArticles(data.articles || []);
    setLoading(false);
  };

  // On component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Delete handler
  const deleteArticle = async (_id) => {
    const confirmed = window.confirm("Are you sure you want to delete this article?");
    if (!confirmed) return;
  
    const res = await fetch('/api/blog/save-article', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    });
  
    const result = await res.json();
    if (result.success) {
      toast.success('Article deleted');
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== _id)
      );
    } else {
      toast.error(`Delete failed: ${result.message}`);
    }
  };
  
  return (
    <div className="min-h-screen px-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : articles.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article._id} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              {article.thumbnailUrl && (
                <img
                  src={article.thumbnailUrl}
                  alt={article.title}
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                <p className="text-gray-600 text-sm mt-1 mb-2 line-clamp-2">
                  {article.tags?.slice(0, 3).join(', ')}
                </p>
                <span className="text-xs text-gray-400">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
                <div className='flex items-center w-full justify-between mt-2'>
                  <Link href={`/admin/edit-article/${article.slug}`}>
                    <span className="text-blue-600 hover:underline"><FaRegEdit /></span>
                  </Link>
                  <span
  className={`text-xs text-white rounded-md px-2 py-1 ${
    article.isPublished ? 'bg-green-500' : 'bg-slate-400'
  }`}
>
  {article.isPublished ? 'Published' : 'Unpublished'}
</span>

                  <span onClick={() => deleteArticle(article._id)} className="text-red-600 cursor-pointer">
                    <MdDelete />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No blog posts found.</p>
      )}
    </div>
  );
}

export default AllPost;

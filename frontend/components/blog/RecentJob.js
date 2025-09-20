"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Newspaper, Calendar } from "lucide-react";

function RecentJob() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blog/blog-suggestion/recent");
        const data = await res.json();
        if (res.ok) {
          setBlogs(data.suggestions || []);
        }
      } catch (error) {
        console.error("Error fetching recent blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-sm">Loading recent blogs...</p>;
  }

  if (!blogs.length) {
    return <p className="text-gray-500 text-sm">No recent blogs available.</p>;
  }

  return (
    <div className="space-y-4 sticky top-18">
      <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
        <Newspaper className="w-5 h-5 text-foreground" />
        Recent Blogs
      </h2>

      <ul className="space-y-3">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="p-3 border border-[var(--border)] rounded-lg shadow-sm hover:shadow-md transition"
          >
            <Link
              href={`/blog/${blog.slug}`}
              className=" hover:underline font-medium text-lg"
            >
              {blog.title}
            
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Calendar className="w-4 h-4" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentJob;

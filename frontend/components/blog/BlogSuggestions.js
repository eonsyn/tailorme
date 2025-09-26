// components/blog/BlogSuggestions.jsx
'use client';
import { useEffect, useState } from 'react';
import ArticleCard from '@/components/cards/ArticleCard';

export default function BlogSuggestions({ tags, slug }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!tags || tags.length === 0) return;

      try {
        const res = await fetch(`/api/blog/blog-suggestion`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tags }),
        });

        const data = await res.json();
         console.log("blog suggestion:",data)
        if (res.ok) {
          const filtered = data.suggestions?.filter(item => item.slug !== slug) || [];
          setSuggestions(filtered);
        }
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      }
    };

    fetchSuggestions();
   
  }, [tags, slug]);

  if (!suggestions.length) return null;

  return (
  <section className="mt-10 w-full text-[var(--text-primary)]">
  <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--text-primary)] drop-shadow">
    You may also like:
  </h2>

  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {suggestions.map((article, index) => (
      <ArticleCard key={index} article={article} />
    ))}
  </div>
</section>

  );
}

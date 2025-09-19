'use client';
import Link from 'next/link';


export default function PostCard({ post }) {
    return (
        <article className="post-card">
            <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
            {post.excerpt && <p>{post.excerpt}</p>}
            <small>{new Date(post.publishedAt || post.createdAt).toLocaleString()}</small>
        </article>
    );
}
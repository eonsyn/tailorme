import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import { makeSlug } from '@/utils/slugify';


export async function GET(req) {
await dbConnect();
const posts = await Post.find({}).sort({ createdAt: -1 }).limit(50).lean();
return new Response(JSON.stringify(posts), { status: 200 });
}


export async function POST(req) {
const body = await req.json();
await dbConnect();


if (!body.title || !body.content) return new Response('Missing fields', { status: 400 });


const slug = body.slug || makeSlug(body.title);
const existing = await Post.findOne({ slug });
let finalSlug = slug;
if (existing) finalSlug = `${slug}-${Date.now().toString().slice(-4)}`;


const post = await Post.create({
title: body.title,
slug: finalSlug,
excerpt: body.excerpt || body.content.slice(0,160),
content: body.content,
coverImage: body.coverImage,
tags: body.tags || [],
published: !!body.published,
publishedAt: body.published ? new Date() : null
});


return new Response(JSON.stringify(post), { status: 201 });
}
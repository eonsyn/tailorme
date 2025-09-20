// app/api/blog/blog-suggestion/recent/route.js
import connectDB from '@/utils/db';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();

    // Fetch the 10 most recent published articles
    const suggestions = await Article.find({ isPublished: true })
      .sort({ createdAt: -1 }) // newest first
      .limit(10)
      .select('title slug author tags thumbnailUrl createdAt');

    return NextResponse.json({ suggestions }, { status: 200 });
  } catch (error) {
    console.error('Recent Blog Suggestion Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

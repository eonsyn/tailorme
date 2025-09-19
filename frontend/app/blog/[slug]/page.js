import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';


export default async function Page({ params }) {
const { slug } = params;
await dbConnect();
const post = await Post.findOne({ slug }).lean();
if (!post) return <div>Post not found</div>;


return (
<article>
<h1>{post.title}</h1>
<p><em>{post.excerpt}</em></p>
<div dangerouslySetInnerHTML={{ __html: post.content }} />
</article>
);
}
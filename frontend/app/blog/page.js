import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import PostCard from '@/components/blog/PostCard';


export default async function Home() {
await dbConnect();
const posts = await Post.find({ published: true }).sort({ publishedAt: -1 }).lean();


return (
<div>
<h2>Latest Posts</h2>
{posts.length === 0 && <p>No posts yet — write one!</p>}
{posts.map(p => (
<PostCard key={p._id} post={p} />
))}
</div>
);
}
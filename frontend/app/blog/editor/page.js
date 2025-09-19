import dynamic from 'next/dynamic';


const EditorWrapper = dynamic(() => import('@/components/blog/EditorWrapperClient'), { ssr: false });


export default function EditorPage() {
return (
<div>
<h2>Write a Post</h2>
<EditorWrapper />
</div>
);
}
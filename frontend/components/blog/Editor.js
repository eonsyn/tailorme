'use client';
import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';


export default function Editor({ content, onUpdate }) {
const editor = useEditor({
extensions: [StarterKit, Image],
content: content || '<p></p>',
onUpdate: ({ editor }) => {
if (onUpdate) onUpdate(editor.getHTML());
}
});


useEffect(() => {
return () => editor?.destroy();
}, [editor]);


return (
<div className="editor-wrapper">
<EditorContent editor={editor} />
</div>
);
}
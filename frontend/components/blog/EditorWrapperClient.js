'use client';
import { useState } from 'react';
import Editor from './Editor';


export default function EditorWrapperClient() {
const [title, setTitle] = useState('');
const [html, setHtml] = useState('<p></p>');
const [saving, setSaving] = useState(false);


async function handleSave(publish = false) {
setSaving(true);
const res = await fetch('/api/posts', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ title, content: html, published: publish })
});
setSaving(false);
if (res.ok) alert('Saved!');
else alert('Error');
}


return (
<div>
<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" style={{width:'100%',padding:12,fontSize:20,marginBottom:12}} />
<Editor content={html} onUpdate={setHtml} />
<div style={{marginTop:12}}>
<button onClick={() => handleSave(false)} disabled={saving}>Save Draft</button>
<button onClick={() => handleSave(true)} disabled={saving} style={{marginLeft:8}}>Publish</button>
</div>
</div>
);
}
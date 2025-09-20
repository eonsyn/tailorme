'use client';
import { useEffect, useRef, useState } from 'react';
import BlockEditor from './BlockEditor';

const emptyBlock = { type: 'paragraph', value: '', level: 1, items: [] };

const BlogEditor = ({ initialData = {}, onUpdate }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [blocks, setBlocks] = useState(initialData.content?.length ? initialData.content : [{ ...emptyBlock }]);
  const [editIndex, setEditIndex] = useState(null);
  const [autoFocusField, setAutoFocusField] = useState(null);

  useEffect(() => {
    onUpdate && onUpdate({ title, content: blocks });
  }, [title, blocks, onUpdate]);

  const updateBlock = (index, updatedBlock) => {
    const updated = [...blocks];
    updated[index] = updatedBlock;
    setBlocks(updated);
  };

  const addBlock = (index, newBlock = { ...emptyBlock }) => {
    const updated = [...blocks];
    updated.splice(index + 1, 0, newBlock);
    setBlocks(updated);
    setEditIndex(index + 1);
  };

  const deleteBlock = (index) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="max-w-3xl min-h-screen mx-auto px-4 py-6">
      <input
        className="text-4xl font-bold w-full mb-6 outline-none"
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {blocks.map((block, index) => (
        <BlockEditor
          key={index}
          block={block}
          index={index}
          isEditing={editIndex === index}
          autoFocus={autoFocusField === index}
          onEdit={() => setEditIndex(index)}
          onUpdate={(updatedBlock) => updateBlock(index, updatedBlock)}
          onAddBlock={() => addBlock(index)}
          onDelete={() => deleteBlock(index)}
          setAutoFocusField={setAutoFocusField}
        />
      ))}
    </div>
  );
};

export default BlogEditor;

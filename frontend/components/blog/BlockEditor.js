'use client';

import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

const EMPTY_BLOCK = {
  type: 'paragraph',
  value: '',
  level: 1,
  items: [],
};

export default function BlockEditor({
  block,
  index,
  blocks,
  setBlocks,
  isEditing,
  setEditIndex,
  autoFocusField,
  setAutoFocusField,
  isopitonOpen,
  setisopitonOpen,
  altInputRef,
}) {
  const [isUpload, setIsUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  const shouldAutoFocus = autoFocusField === index;

  /* ---------------------------------- utils ---------------------------------- */

  const handleChange = (idx, value) => {
    const updated = [...blocks];
    updated[idx].value = value;

    if (updated[idx].type === 'list') {
      updated[idx].items = value.split('\n');
    }

    setBlocks(updated);
  };

  const handleDelete = (idx) => {
    if (blocks.length === 1) return;
    setBlocks(blocks.filter((_, i) => i !== idx));
  };

  const handleEnter = (idx, e) => {
    if (e.key !== 'Enter' || e.shiftKey) return;
    e.preventDefault();

    const updated = [...blocks];
    updated.splice(idx + 1, 0, { ...EMPTY_BLOCK });
    setBlocks(updated);
    setEditIndex(idx + 1);
    setAutoFocusField(idx + 1);
  };

  const handleTypeChange = (idx, type) => {
    const updated = [...blocks];
    updated[idx] = {
      ...updated[idx],
      type,
      value: '',
      items: [],
      level: type === 'heading' ? 1 : undefined,
    };

    if (type === 'table') {
      updated[idx].value = 'Name,Age\nAlice,24\nBob,30';
      updated[idx].rows = [
        ['Name', 'Age'],
        ['Alice', '24'],
        ['Bob', '30'],
      ];
    }

    setBlocks(updated);
    setEditIndex(null);
    setTimeout(() => setEditIndex(idx), 0);
  };

  /* ---------------------------- MARKDOWN PARSER ---------------------------- */

  const markdownToBlocks = (text) => {
    const lines = text.split('\n');
    const result = [];

    for (const line of lines) {
      if (line.startsWith('# ')) {
        result.push({ type: 'heading', value: line.slice(2), level: 1 });
      } else if (line.startsWith('## ')) {
        result.push({ type: 'heading', value: line.slice(3), level: 2 });
      } else if (line.startsWith('- ')) {
        result.push({
          type: 'list',
          value: line.replace(/^- /, ''),
          items: [line.replace(/^- /, '')],
        });
      } else if (line.trim() === '') {
        continue;
      } else {
        result.push({ type: 'paragraph', value: line });
      }
    }

    return result.length ? result : [{ ...EMPTY_BLOCK, value: text }];
  };

  /* ------------------------------- PASTE FIX ------------------------------- */

  const handlePaste = async (e, idx) => {
    const items = e.clipboardData?.items;

    // IMAGE PASTE
    if (items) {
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();
          const data = await uploadImage(file);

          const updated = [...blocks];
          updated.splice(idx + 1, 0, {
            type: 'image',
            value: data.secure_url,
            alt: '',
          });

          setBlocks(updated);
          setEditIndex(idx + 1);
          return;
        }
      }
    }

    // TEXT / MARKDOWN PASTE
    const text = e.clipboardData.getData('text/plain');
    if (!text.trim()) return;

    e.preventDefault();
    const parsed = markdownToBlocks(text);

    const updated = [...blocks];
    updated.splice(idx, 1, ...parsed);
    setBlocks(updated);
    setEditIndex(idx + parsed.length - 1);
  };

  /* ------------------------------ CLOUDINARY ------------------------------ */

  const uploadImage = async (file) => {
    const res = await fetch('/api/cloudanary/cloudinary-signature');
    const { timestamp, signature, apiKey, cloudName, folder } = await res.json();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    if (folder) formData.append('folder', folder);

    const upload = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      { method: 'POST', body: formData }
    );

    return upload.json();
  };

  /* ---------------------------------- UI ---------------------------------- */

  return (
    <div className="transition-all duration-100">
      {/* Toolbar */}
      <div className="flex items-center mb-1">
        <div
          className="h-10 w-10 flex items-center justify-center border rounded-full cursor-pointer"
          onClick={() => setisopitonOpen(!isopitonOpen)}
        >
          <IoMdAdd />
        </div>

        {!isopitonOpen && (
          <>
            <span className="ml-2 px-2 py-1 rounded bg-gray-200 capitalize">
              {block.type}
            </span>
            <MdDelete
              onClick={() => handleDelete(index)}
              className="ml-4 text-2xl cursor-pointer"
            />
          </>
        )}
      </div>

      {/* TEXT BLOCKS */}
      {['paragraph', 'heading', 'list', 'code', 'insert'].includes(
        block.type
      ) && (
        <textarea
          className="w-full p-2 border my-2"
          value={block.value}
          placeholder={`Enter ${block.type}`}
          onPaste={(e) => handlePaste(e, index)}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleEnter(index, e)}
          onFocus={() => setAutoFocusField(index)}
          autoFocus={shouldAutoFocus}
        />
      )}

      {/* IMAGE BLOCK */}
      {block.type === 'image' && block.value && (
        <img src={block.value} alt={block.alt} className="max-w-xs rounded" />
      )}
    </div>
  );
}

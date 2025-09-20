'use client';
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
const emptyBlock = [{ type: 'paragraph', value: '', level: 1, items: [] }];

export default function BlockEditor({
    block, index, isEditing, autoFocusField,
    setEditIndex,
    blocks, setBlocks, setisopitonOpen,
    isopitonOpen, setAutoFocusField, altInputRef
}) {


    const [isUpload, setIsUpload] = useState(false);
    const [loading, setloading] = useState(false)
    const handleChange = (index, value) => {
        const updated = [...blocks];
        updated[index].value = value;
        if (updated[index].type === 'list') {
            updated[index].items = value.split('\n');
        }
        setBlocks(updated);
    };

    const shouldAutoFocus = autoFocusField === index;
    const handleDelete = (index) => {
        // Only delete if more than one block exists
        if (blocks.length > 1) {
            const updatedBlocks = blocks.filter((_, i) => i !== index);
            setBlocks(updatedBlocks);

        }
    };
    const handleTypeChange = (index, newType) => {
        const updated = [...blocks];
        updated[index].type = newType;
        if (newType === 'heading') updated[index].level = 1;
        if (newType === 'list') updated[index].items = updated[index].value.split('\n');
        if (newType === 'table') {
            updated[index].value = 'Name,Age\nAlice,24\nBob,30';
            updated[index].rows = [['Name', 'Age'], ['Alice', '24'], ['Bob', '30']];
        }
        setBlocks(updated);
        setEditIndex(null); // force re-render
        setTimeout(() => setEditIndex(index), 0);
    };

    const handleEnter = (index, e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const newBlocks = [...blocks];
            newBlocks.splice(index + 1, 0, { ...emptyBlock[0] });
            setBlocks(newBlocks);
            setEditIndex(index + 1);
        }
    };

    const handlePaste = async (e, index) => {
        e.preventDefault();

        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.indexOf("image") === 0) {
                const file = item.getAsFile();
                const data = await uploadImage(file);
                const imageUrl = data.secure_url;

                const newBlocks = [...blocks];
                newBlocks.splice(index + 1, 0, {
                    type: "image",
                    value: imageUrl,
                    alt: "",
                    items: [],
                });
                setBlocks(newBlocks);
                return;
            }
        }

        // Existing logic for pasting text (markdown, code, etc.)
        const text = e.clipboardData.getData("text/plain");
        const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
        const newBlocks = [];
        let listBuffer = [], codeBuffer = [];
        let inCodeBlock = false;

        lines.forEach(line => {
            if (line.startsWith("```")) {
                if (inCodeBlock) {
                    newBlocks.push({ type: "code", value: codeBuffer.join("\n"), items: [] });
                    codeBuffer = [];
                    inCodeBlock = false;
                } else {
                    inCodeBlock = true;
                }
                return;
            }

            if (inCodeBlock) {
                codeBuffer.push(line);
            } else if (/^#{1,6}\s/.test(line)) {
                const level = line.match(/^#+/)[0].length;
                newBlocks.push({ type: "heading", level, value: line.replace(/^#{1,6}\s/, ""), items: [] });
            } else if (/^[-*+]\s+/.test(line)) {
                listBuffer.push(line.replace(/^[-*+]\s+/, ""));
            } else {
                if (listBuffer.length > 0) {
                    newBlocks.push({ type: "list", value: listBuffer.join("\n"), items: [...listBuffer] });
                    listBuffer = [];
                }
                newBlocks.push({ type: "paragraph", value: line, items: [] });
            }
        });

        if (listBuffer.length > 0) newBlocks.push({ type: "list", value: listBuffer.join("\n"), items: [...listBuffer] });
        if (codeBuffer.length > 0) newBlocks.push({ type: "code", value: codeBuffer.join("\n"), items: [] });

        const updated = [...blocks];
        updated.splice(index, 1, ...newBlocks);
        setBlocks(updated);
    };

    const handleAltChange = (index, altText) => {
        const updated = [...blocks];
        updated[index].alt = altText;
        setBlocks(updated);
    };
    const uploadImage = async (file) => {
        const res = await fetch("/api/cloudanary/cloudinary-signature");
        const { timestamp, signature, apiKey, cloudName, folder } = await res.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        if (folder) formData.append("folder", folder);

        const cloudinaryUpload = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await cloudinaryUpload.json();
        return data;
    };
    function extractPublicId(url) {
        const parts = url.split('/');
        const fileName = parts[parts.length - 1];
        return fileName.split('.')[0]; // removes extension like .jpg
    }


    return (
        <div className='transition-all ease-in-out h-fit duration-100' >
            <div className="mb-1    items-center h-full flex">
                {/* Plus Button */}
                <div
                    className="h-10 w-10 rounded-full text-center font-bold text-4xl flex items-center justify-center cursor-pointer border border-highlight text-highlight"
                    onClick={() => setisopitonOpen(!isopitonOpen)}
                >
                    <span
                        className={`transition-transform duration-300 ease-in-out ${isopitonOpen ? '  rotate-45' : 'rotate-0'}`}
                    >
                        <IoMdAdd />
                    </span>
                </div>

                {/* Custom Options Menu */}
                {isopitonOpen && (
                    <div className="block text-black ml-1.5 transition-all ease-in-out duration-100   rounded  p-2 space-y-2">
                        {['paragraph', 'blockquote', 'heading', 'code', 'list', 'image', 'insert', 'table'].map((type, i) => (
                            <span
                                key={type}
                                onClick={() => {
                                    handleTypeChange(index, type);
                                    setAutoFocusField(index);
                                    setisopitonOpen(false);
                                }}
                                className={block.type === type ? ("cursor-pointer   duration-100 ease-in-out transition-all shadow  btn-primary   mx-1 px-2 py-1 rounded capitalize animate-fade-in") : ("cursor-pointer btn btn-secondary duration-100 ease-in-out transition-all shadow    bg-gray-100 mx-1 px-2 py-1 rounded capitalize   animate-fade-in")}
                                style={{
                                    animationDelay: `${i * 0.05}s`,
                                    animationFillMode: 'forwards',
                                }}
                            >
                                {type}
                            </span>
                        ))}
                    </div>
                )}
                {!isopitonOpen && (
                    <div className='h-full flex  items-center'>
                        <span

                            className="cursor-pointer    duration-100 ease-in-out transition-all  mx-1 px-2 py-1 rounded capitalize btn-primary btn    animate-fade-in"

                        >
                            {block.type}
                        </span>
                        {block.type === 'heading' && (
                            <div className="flex  gap-2 items-center ">
                                <select
                                    value={block.level || 1}
                                    onChange={(e) => {
                                        const updated = [...blocks];
                                        updated[index].level = parseInt(e.target.value);
                                        setBlocks(updated);
                                    }}
                                    className="border p-1 rounded"
                                >
                                    {[1, 2, 3, 4, 5, 6].map((lvl) => (
                                        <option key={lvl} value={lvl}>
                                            H{lvl}
                                        </option>
                                    ))}
                                </select>


                            </div>
                        )}
                        <span
                            onClick={() => handleDelete(index)}
                            className="cursor-pointer hover:scale-105 transition-all ease-in-out duration-150 ml-10 text-3xl"><MdDelete /></span>
                    </div>
                )}
            </div>

            {['paragraph', 'blockquote', 'heading', 'list', 'code', 'insert'].includes(block.type) && (
                <textarea
                    className="w-full p-2 border min:h-[30vh]   my-2"
                    placeholder={`Enter ${block.type} content`}
                    value={block.value}
                    {...(block.type === 'insert' && {
                        onPaste: (e) => handlePaste(e, index),
                    })}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => {
                        if (block.value.trim() !== '') {
                            handleEnter(index, e);
                            setAutoFocusField(index + 1);
                        }
                    }}
                    onFocus={() => setAutoFocusField(index)}
                    autoFocus={shouldAutoFocus}
                />

            )}


            {block.type === 'image' && (
                <>

                    <input
                        type="text"
                        placeholder="Paste image URL, paste image, or drop image"
                        className="border p-2 w-full my-2"
                        value={block.value}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onPaste={async (e) => {
                            const items = e.clipboardData?.items;
                            if (!items) {
                                setIsUpload(false);
                                return
                            };

                            for (const item of items) {
                                if (item.type.startsWith("image/")) {
                                    const file = item.getAsFile();
                                    if (file) {
                                        setIsUpload(true);
                                        setloading(true);
                                        const data = await uploadImage(file);
                                        const updated = [...blocks];
                                        updated[index].value = data.secure_url;
                                        setBlocks(updated);
                                        setloading(false);
                                    }
                                }
                            }
                        }}
                        onDrop={async (e) => {
                            e.preventDefault();
                            const file = e.dataTransfer?.files[0];
                            if (file && file.type.startsWith("image/")) {
                                setIsUpload(true);
                                setloading(true);
                                const data = await uploadImage(file);
                                const updated = [...blocks];
                                updated[index].value = data.secure_url;
                                setBlocks(updated);
                                setloading(false);
                            }
                        }}

                        onDragOver={(e) => e.preventDefault()}
                        autoFocus={shouldAutoFocus}
                    />

                    {loading && <p className="text-blue-500">Uploading image...</p>}

                    {isUpload && !loading && (
                        <button
                            onClick={async () => {
                                if (!block.value) return;

                                const publicId = extractPublicId(block.value);
                                await fetch('/api/cloudanary/delete-image', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ public_id: publicId }),
                                });

                                const updated = [...blocks];
                                updated[index].value = '';
                                setBlocks(updated);
                                setIsUpload(false);
                            }}
                            className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded"
                        >
                            Delete
                        </button>
                    )}


                    <input
                        type="text"
                        ref={altInputRef}
                        placeholder="Image alt text"
                        className="border p-2 w-full my-2"
                        value={block.alt || ''}
                        onKeyDown={(e) => handleEnter(index, e)}
                        onChange={(e) =>
                            handleAltChange(index, e.target.value)
                        }
                    />

                    {block.value && (
                        <>
                            <img
                                src={block.value}
                                alt={block.alt || 'Image'}
                                className="rounded max-w-xs mt-2"
                            />
                            {block.alt && (
                                <span className="text-sm text-gray-500 italic">{block.alt}</span>
                            )}
                        </>
                    )}
                </>
            )}
            {block.type === 'table' && (
                <textarea
                    className="w-full min:h-[30vh] p-2 border my-2 font-mono"
                    placeholder="Enter table as CSV (comma-separated, new lines for rows)"
                    value={block.value}
                    onChange={(e) => {
                        const updated = [...blocks];
                        updated[index].value = e.target.value;
                        updated[index].rows = e.target.value
                            .split('\n')
                            .map(row => row.split(',').map(cell => cell.trim()));
                        setBlocks(updated);
                    }}
                    onKeyDown={(e) => handleEnter(index, e)}
                    autoFocus={shouldAutoFocus}
                />
            )}

        </div>
    );
}

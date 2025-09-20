'use client';
import Link from "next/link";
export default function BlockRenderer({ block, index, setEditIndex, loading, }) {


function parseMarkdownTable(text) {
    const lines = text.trim().split('\n').filter(Boolean);
    
    if (lines.length < 2 || !lines[0].includes('|')) return null;

    const rows = lines.map(line => {
        return line
            .split('|')
            .slice(1, -1) // remove empty splits from edges
            .map(cell => cell.trim());
    });

    return rows.length > 0 ? rows : null;
}

    function renderTextWithLinks(text) {
        if (!text || typeof text !== 'string') return null;

        // Regex to match [label](url), **bold**, and *italic*
        const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }

            if (match[1]) {
                // Link match
                parts.push(
                    <Link
                        key={match[3] + match.index}
                        href={match[3]}
                        className="text-blue-500 font-bold mx-1 hover:text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {match[2]}
                    </Link>
                );
            } else if (match[4]) {
                // Bold match (**text**)
                parts.push(<strong key={'b' + match.index}>{match[5]}</strong>);
            } else if (match[6]) {
                // Italic match (*text*)
                parts.push(<em key={'i' + match.index}>{match[7]}</em>);
            }

            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }

        return parts;
    }

    switch (block.type) {
        case 'heading': {
            const HeadingTag = `h${block.level || 1}`;
            const levelClasses = {
                1: 'text-4xl',
                2: 'text-3xl',
                3: 'text-2xl',
            };
            const headingClass = levelClasses[block.level] || 'text-xl';

            return (
                <HeadingTag
                    className={`my-2 font-bold cursor-pointer ${headingClass}`}
                    onClick={() => setEditIndex(index)}
                >
                    {renderTextWithLinks(block.value) || `Heading (H${block.level || 1})`}
                </HeadingTag>
            );
        }

        case 'code':
            return (
                <pre
                    className="bg-gray-100 p-2 rounded my-2 font-mono cursor-pointer whitespace-pre-wrap"
                    onClick={() => setEditIndex(index)}
                >
                    <code>{block.value || '// code here'}</code>
                </pre>
            );
        case 'image':
            return (
                <div className="my-4 cursor-pointer" onClick={() => setEditIndex(index)}>
                    {block.value ? (
                        <><img
                            src={block.value}
                            alt={block.alt || "image"}
                            className="rounded max-w-full mx-auto"
                        />
                            {block.alt && (
                                <span className="text-sm text-gray-500 italic">{block.alt}</span>
                            )}
                        </>

                    ) : (
                        <p className="text-red-500">No image URL provided</p>
                    )}
                </div>
            );
        case 'list':
            return (
                <ul
                    className="list-disc list-inside my-2 cursor-pointer"
                    onClick={() => setEditIndex(index)}
                >
                    {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            );
        case 'blockquote':
            return (
                <blockquote
                    className="border-l-4 border-gray-400 pl-4 italic text-gray-700 my-2 cursor-pointer"
                    onClick={() => setEditIndex(index)}
                >
                    {block.value || 'Blockquote'}
                </blockquote>
            );
       case 'table': {
    const maybeTable = parseMarkdownTable(block.value);
    if (maybeTable) {
        return (
            <div onClick={() => setEditIndex(index)} className="my-4 overflow-auto border rounded shadow-md">
                <table className="min-w-full text-sm text-left border-collapse">
                    <tbody>
                        {maybeTable.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={
                                    rowIndex === 0
                                        ? 'bg-red-200 text-black text-center font-semibold'
                                        : rowIndex % 2 === 0
                                        ? 'bg-gray-100'
                                        : 'bg-white'
                                }
                            >
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="border px-4 py-3">
                                        {renderTextWithLinks(cell)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <p className="text-lg my-2 cursor-pointer" onClick={() => setEditIndex(index)}>
            {renderTextWithLinks(block.value) || 'Write a paragraph...'}
        </p>
    );
}

        default:
            return (
                <p
                    className="text-lg my-2 cursor-pointer"
                    onClick={() => setEditIndex(index)}
                >
                    {renderTextWithLinks(block.value) || 'Write a paragraph...'}
                </p>
            );
    }
}

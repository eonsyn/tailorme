"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import CopyLinkButton from "../smallComponent/CopyLinkButton";
import ImageComponent from "@/components/blog/ImageComponent";
import ArticleAd from "@/components/ads/ArticleAd";
import DisplayAds from "../ads/DisplayAds";
function UserBlogRender({ article }) {
  function renderTextWithLinks(text) {
    if (!text || typeof text !== "string") return null;

    const regex =
      /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      // Markdown links
      if (match[1]) {
        const url = match[3].trim();
        const label = match[2];
        const isExternal =
          url.startsWith("http://") || url.startsWith("https://");

        if (isExternal) {
          parts.push(
            <a
              key={url + match.index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 font-bold mx-1 hover:text-red-600 underline"
            >
              {label}
            </a>
          );
        } else {
          parts.push(
            <Link
              key={url + match.index}
              href={url}
              className="text-red-500 font-bold mx-1 hover:text-red-600 underline"
            >
              {label}
            </Link>
          );
        }
      } else if (match[4]) {
        parts.push(<strong key={"b" + match.index}>{match[5]}</strong>);
      } else if (match[6]) {
        parts.push(<em key={"i" + match.index}>{match[7]}</em>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }

  function parseMarkdownTable(text) {
    const lines = text.trim().split("\n").filter(Boolean);
    if (lines.length < 2 || !lines[0].includes("|")) return null;

    return lines.map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim())
    );
  }

  useEffect(() => {
    console.log(article);
  }, [article]);

  const blocks = [];
  let headingCount = 0;
  let paragraphCount = 0;

  article.content.forEach((block, index) => {
    switch (block.type) {
      case "heading": {
        headingCount++;
        const HeadingTag = `h${block.level || 1}`;
        if (headingCount % 3 === 0) {
          blocks.push(
           
              <div
                key={`Display-ad-${headingCount}`}
                className="my-8 flex justify-center"
              >
                <DisplayAds />
              </div>
            
          );
        }
        blocks.push(
          <HeadingTag
            key={`heading-${index}`}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-6 mb-2"
          >
            {renderTextWithLinks(block.value)}
          </HeadingTag>
        );



        break;
      }

      case "paragraph": {
        paragraphCount++;
        if (paragraphCount % 3 === 0) {
          blocks.push(

            <div
              key={`article-ad-${paragraphCount}`}
              className="my-8 flex justify-center"
            >
              <ArticleAd /></div>
          )
        }
        blocks.push(
          <p
            key={`para-${index}`}
            className="text-base md:text-lg lg:text-xl leading-relaxed mb-4"
          >
            {renderTextWithLinks(block.value)}
          </p>
        );
        break;
      }
      case "code":
        blocks.push(
          <pre
            key={`code-${index}`}
            className="bg-gray-500 p-4 rounded text-sm md:text-base text-white font-mono overflow-x-auto mb-4"
          >
            <code>{block.value}</code>
          </pre>
        );
        break;

      case "image":
        blocks.push(
          <div
            key={`img-${index}`}
            className="flex items-center flex-col py-4"
          >
            <ImageComponent imageUrl={block.value} alt={block.alt} />
            {block.alt && (
              <span className="italic text-sm mt-2">{block.alt}</span>
            )}
          </div>
        );
        break;

      case "list":
        blocks.push(
          <ul
            key={`list-${index}`}
            className="list-disc list-inside text-base md:text-lg lg:text-xl mb-4 space-y-1"
          >
            {(block.items?.length
              ? block.items
              : block.value?.split("\n") || []
            ).map((item, i) => (
              <li key={i}>{renderTextWithLinks(item)}</li>
            ))}
          </ul>
        );
        break;

      case "blockquote":
        blocks.push(
          <blockquote
            key={`quote-${index}`}
            className="relative bg-[var(--card-background)] text-[var(--text-primary)] text-lg md:text-xl leading-relaxed italic px-6 py-4 my-6 rounded-md border-l-4 border-[var(--border)] shadow-sm"
          >
            {block.value?.split("\n").map((line, i) => (
              <p key={i} className="mb-2">
                {renderTextWithLinks(line)}
              </p>
            ))}
          </blockquote>
        );
        break;

      case "table": {
        const table = parseMarkdownTable(block.value);

        if (!table) break;

        blocks.push(
          <div
            key={`table-${index}`}
            className="my-4 overflow-auto border rounded shadow-md"
          >
            <table className="min-w-full text-sm text-left border-collapse">
              <tbody>
                {table.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      rowIndex === 0
                        ? "bg-red-400 text-center font-semibold"
                        : ""
                    }
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border px-4 py-3"
                      >
                        {renderTextWithLinks(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        break;
      }

      default:
        break;
    }
  });

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        {article.title}
      </h1>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 mb-2 block">
          {new Date(article.createdAt).toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </span>

        <CopyLinkButton
          url={`https://gptresume.vercel.app/blog/${article.slug}`}
        />
      </div>

      <hr className="my-4" />

      {blocks}
    </>
  );
}

export default UserBlogRender;

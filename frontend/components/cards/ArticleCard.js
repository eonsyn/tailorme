import Link from "next/link";
import Image from "next/image";
import { MdArrowForwardIos } from "react-icons/md";

function trimText(text = "", maxLength = 35) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export default function ArticleCard({ article }) {
  const isCloudinary = article?.thumbnailUrl?.startsWith("https://res.cloudinary.com");
  const fallbackImage =
    "https://res.cloudinary.com/dgp04dpun/image/upload/v1746926867/aktu%20brand/g0n6c31i0nzmizdelz7f.jpg";

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="bg-[var(--card-background)] group w-full shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:border-[var(--accent)] border border-[var(--border)] transition-shadow duration-300 cursor-pointer max-h-[370px] flex flex-col"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {isCloudinary ? (
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <img
            src={article?.thumbnailUrl || fallbackImage}
            alt={article.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <h2 className="text-xl h-14 font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-all ease-in-out duration-300">
          {trimText(article.title)}
        </h2>

        <div className="mt-3 mb-2">
          {/* Optional tags or description */}
        </div>

        <div className="lowerdiv flex items-center justify-between mt-auto">
          <div className="left text-[var(--text-secondary)] text-xs">
            <div>
              Author: <strong className="text-[var(--text-primary)]">{article.author}</strong>
            </div>
            <div>{new Date(article.createdAt).toLocaleDateString()}</div>
          </div>

          <div className="right">
            <span className="text-sm flex items-center bg-[var(--accent)] text-white rounded-2xl px-3 py-1">
              Read
              <MdArrowForwardIos className="ml-1 group-hover:ml-2 transition-all duration-300" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

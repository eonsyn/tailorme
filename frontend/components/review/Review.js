import React from "react";
import { Star, BadgeCheck, Sparkles } from "lucide-react";

// ✅ Updated & polished reviews data
const reviews = [
  {
    id: 1,
    name: "Riya Sharma",
    role: "Final Year Student",
    company: "IIT Delhi (Intern)",
    rating: 5,
    text: "GPT Resume completely transformed my job search experience! I just uploaded my basic info, and within minutes, I got a job-specific resume that stood out in campus placements.",
    avatar:
      "https://res.cloudinary.com/dgp04dpun/image/upload/v1758890454/aktu%20brand/lxejomsrqg5d5xyb8hiz.png",
    date: "2025-08-10",
  },
  {
    id: 2,
    name: "Karan Verma",
    role: "Data Analyst",
    company: "AnalyticsCo",
    rating: 4,
    text: "The AI recommendations from GPT Resume are shockingly accurate. It added role-specific keywords that recruiters immediately noticed. The design and layout were clean and modern too!",
    avatar:
      "https://res.cloudinary.com/dgp04dpun/image/upload/v1758887660/aktu%20brand/pfhvexu9p7vsylq6satr.png",
    date: "2025-06-18",
  },
  {
    id: 3,
    name: "Sneha Gupta",
    role: "Software Intern",
    company: "ProductLabs",
    rating: 5,
    text: "I used GPT Resume to generate different versions of my resume for multiple roles. It’s fast, easy, and feels like having a personal career assistant. Totally worth it!",
    avatar:
      "https://res.cloudinary.com/dgp04dpun/image/upload/v1758889163/aktu%20brand/pof82l7krzfccbnuoefb.png",
    date: "2025-09-03",
  },
  {
    id: 4,
    name: "Amit Joshi",
    role: "UI/UX Designer",
    company: "Freelancer",
    rating: 4,
    text: "GPT Resume saves me so much time. The AI-generated designs look human-made and visually appealing. I’ve already recommended it to my friends and clients.",
    avatar:
      "https://res.cloudinary.com/dgp04dpun/image/upload/v1758887313/aktu%20brand/fjxukysk9gfakzmsks2y.png",
    date: "2025-07-28",
  },
];

export default function Review() {
  return (
    <section className="py-12 relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-500" />
              What Users Say About GPT Resume
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Real testimonials from students and professionals who built their
              dream resumes with GPT Resume.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80&auto=format&fit=crop"
              alt="Trust badge"
              className="w-20 h-12 rounded-md object-cover shadow-sm"
            />
            <div className="text-right text-xs text-gray-500 dark:text-gray-400">
              <div className="font-medium text-gray-800 dark:text-gray-200">
                Trusted by 10,000+ users
              </div>
              <div>Verified reviews · AI-powered results</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="bg-foreground/10 backdrop-blur-md drop-shadow-2xl shadow-md rounded-2xl p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <img
                  src={r.avatar}
                  alt={`${r.name} avatar`}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-foreground"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {r.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {r.role} • {r.company}
                      </div>
                    </div>

                    <div className="text-sm text-yellow-500 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < r.rating
                              ? "fill-yellow-400"
                              : "stroke-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 dark:text-gray-300 ml-2">
                        {r.date}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-700 dark:text-gray-200 text-sm leading-relaxed">
                    {r.text}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                      <BadgeCheck className="w-3 h-3 text-green-500" /> Verified
                      User
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

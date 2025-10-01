"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function TailorMePromotion({ jobTitle, companyName }) {
  return (
    <div className="    text-[var(--color-card-foreground)] p-6 my-8 flex flex-col md:flex-row items-center justify-between gap-4">
      
      {/* Text Section */}
      <div className="flex-1">
        <h3 className="text-xl md:text-2xl font-bold mb-2">
          Want to land a role like {jobTitle || "this"} at {companyName || "a top company"}?
        </h3>
        <p className="text-sm md:text-base text-[var(--color-muted-foreground)] mb-4">
          Use our platform to build a <strong>tailored resume</strong> specifically optimized for this job or internship. Highlight your skills, achievements, and experiences that matter the most.
        </p>
      </div>

      {/* Call-to-action Button */}
      <div>
        <Link
          href={`/protected/resume/builder?job=${encodeURIComponent(jobTitle || "")}`}
          className="btn btn-primary flex items-center gap-2"
        >
          Build Your Tailored Resume
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default TailorMePromotion;

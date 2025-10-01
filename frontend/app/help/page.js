import React from "react";
import Link from "next/link";
import { HelpCircle, FileText, Edit3, ShieldCheck, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";

function HelpPage() {
  return (
    <div>
      {/* Navbar & Background */}
      <Navbar />
      <BackgroundImage />

      <main className="max-w-4xl mx-auto py-12 px-6">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-center">Help & Support</h1>
        <p className="text-lg text-center text-[var(--color-muted-foreground)] mb-12">
          Need guidance? Here’s everything you need to know about using{" "}
          <span className="font-semibold">GPT Resume Builder</span> to land your dream job.
        </p>

        {/* How it Works */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: <FileText className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "1. Paste Job Description",
                text: "Start by pasting the job description from the role you’re applying for.",
              },
              {
                icon: <Edit3 className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "2. Get Tailored Resume",
                text: "Our AI instantly generates a job-specific resume, cover letter, and improvement tips.",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "3. Edit Freely",
                text: "Easily edit and fine-tune your resume and cover letter before downloading.",
              },
              {
                icon: <HelpCircle className="h-8 w-8 mb-3 text-[var(--color-primary)]" />,
                title: "4. Apply With Confidence",
                text: "Submit tailored applications that stand out to recruiters and ATS systems.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 border rounded-xl shadow-sm bg-[var(--color-card)]"
              >
                {step.icon}
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-[var(--color-muted-foreground)]">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
         

        {/* Contact Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Still Need Help?</h2>
          <p className="text-[var(--color-muted-foreground)] mb-4">
            Our support team is here to assist you anytime.
          </p>
          <a
            href="mailto:scientificfactaishwary@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:opacity-90 transition"
          >
            <Mail className="h-5 w-5" />
            Contact Support
          </a>
        </section>
      </main>
    </div>
  );
}

export default HelpPage;

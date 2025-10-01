import React from "react";
import { ChevronDown } from "lucide-react";

// FAQ data in JSON format
const faqData = [
  {
    question: "How does GPT Resume Builder work?",
    answer:
      "Simply paste the job description. Our AI instantly generates a tailored resume, a personalized cover letter, and tips to improve your profile — all based on the job role."
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, everything is processed locally in your browser. We don’t store or share your job descriptions or resumes."
  },
  {
    question: "Can I edit the AI-generated resume?",
    answer:
      "Absolutely. The resume and cover letter are fully editable, so you can customize them before applying."
  },
  {
    question: "Does it only create resumes?",
    answer:
      "No. Along with resumes, our platform also provides cover letters and self-improvement suggestions so you’re a better fit for the job."
  }
];

function Faq() {
  return (
    <section id="faq" className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h2>

      {faqData.map((item, index) => (
        <details
          key={index}
          className="mb-4 border rounded-lg p-4 group open:shadow-md"
        >
          <summary className="cursor-pointer font-medium text-lg flex justify-between items-center">
            {item.question}
            <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-2 text-[var(--color-muted-foreground)]">
            {item.answer}
          </p>
        </details>
      ))}
    </section>
  );
}

export default Faq;

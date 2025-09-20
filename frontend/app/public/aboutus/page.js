// app/about/page.js
import React from "react";
import BackgroundImage from "@/components/BackgroundImage";
export default function AboutPage() {
  return (
    <main className="container relative mx-auto px-6 py-12">
      {/* Header */}
      
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          At <span className="font-semibold">TailorMe</span>, our mission is to
          empower job seekers with AI-powered tools that make the application
          process smoother, smarter, and more effective.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          We believe everyone deserves a fair shot at landing their dream job.
          With our resume tailoring platform, we leverage machine learning and
          automation to help professionals create personalized resumes, cover
          letters, and interview prep strategies that stand out.
        </p>
      </section>

      {/* What We Do */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>AI-powered resume builder with role-specific tailoring.</li>
          <li>Instant cover letter generation for job applications.</li>
          <li>Smart interview preparation guides and practice sets.</li>
          <li>Professionally designed templates for every industry.</li>
        </ul>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8 text-muted-foreground">
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Innovation</h3>
            <p>
              We use the latest AI and ML technologies to deliver cutting-edge
              career tools.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Accessibility</h3>
            <p>
              Everyone, regardless of background, should have access to
              professional-quality application resources.
            </p>
          </div>
          <div className="p-6 border rounded-lg bg-card shadow-sm">
            <h3 className="font-semibold mb-2">Impact</h3>
            <p>
              We’re committed to making a real difference in the job search
              journeys of our users.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="text-center">
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Whether you’re a student, a working professional, or someone looking
          to switch careers, <span className="font-semibold">TailorMe</span> is
          here to help you put your best foot forward.
        </p>
      </section>
    </main>
  );
}

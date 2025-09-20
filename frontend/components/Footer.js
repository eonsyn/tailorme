import React from "react";
import Link from "next/link";
import { Mail, Github, Twitter } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Resume Builder", href: "/protected/resume-builder" },
      { label: "Cover Letters", href: "/protected/cover-letters" },
      { label: "Interview Prep", href: "/protected/interview-prep" },
      { label: "Templates", href: "/protected/templates" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/public/aboutus" },
      { label: "Privacy Policy", href: "/public/privacy-policy" },
      { label: "Terms of Service", href: "/public/terms" },
      { label: "Contact", href: "/public/contactus" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Tutorials", href: "/tutorials" },
      { label: "FAQ", href: "/faq" },
      { label: "Community", href: "/community" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="no-print bg-card rounded-t-2xl border-t text-card-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  T
                </span>
              </div>
              <span className="text-xl font-bold">TailorMe</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              AI-powered resume tailoring platform helping professionals land
              their dream jobs.
            </p>
          </div>

          {/* Dynamic Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 TailorMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

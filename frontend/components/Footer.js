import React from "react";
import Link from "next/link";
import Image from "next/image";
// Assuming 'X' is for Twitter/X.com
import WhiteLogo from "@/public/WhiteLogo.png";
import BlackLogo from '@/public/BlackLogo.png'
// Ideally, social links could also be dynamic or come from a config
 
const footerNavSections = [
  {
    title: "Product",
    links: [
      { label: "Resume Builder", href: "/protected/resume-builder" },
      { label: "Cover Letters", href: "/protected/cover-letters" },
      { label: "Blog", href: "/blog" },
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
      { label: "Help / Tutorial", href: "/help" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="no-print bg-card rounded-t-2xl border-t border-border text-card-foreground pt-12 md:pt-16 pb-2 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Grid */}
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-12">
          {/* Brand Info & Socials */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4 group">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center p-1 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/50">
                <Image src={WhiteLogo} alt="GptResume Logo" width={28} height={28} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                GptResume
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed text-sm mt-4 max-w-xs">
              AI-powered platform tailoring resumes & cover letters to land your dream job with confidence.
            </p>

            {/* Social Icons */}
             
          </div>

          {/* Dynamic Footer Navigation Links */}
          {footerNavSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-foreground mb-5 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 relative before:content-[''] before:absolute before:w-0 before:h-[1px] before:bottom-0 before:left-0 before:bg-primary before:transition-all before:duration-300 hover:before:w-full"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright Section */}
        <div className="border-t border-border pt-8 mt-1 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GptResume. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
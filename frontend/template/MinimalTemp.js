import React from 'react';
import { useAuth } from '@/lib/auth';
import { Linkedin, Code, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";

function MinimalTemp({ data }) {
  const { profile } = useAuth();
  if (!data) return null;

  // Assuming a structure for data that includes all sections needed
  const { name, title, contact, summary, skills, experience, education, projects } = data;

  // Utility function to render social icons (kept from original but adjusted for style)
  const getSocialIcon = (network) => {
    switch (network) {
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4 text-gray-800" />;
      case 'GitHub':
        return <Code className="w-4 h-4 text-gray-800" />;
      case 'Portfolio':
        return <Globe className="w-4 h-4 text-gray-800" />;
      case 'Twitter':
        return <FaXTwitter className="w-4 h-4 text-gray-800" />;
      default:
        return null;
    }
  };

  // Component for the section title bar
  const SectionTitle = ({ children }) => (
    <div className="bg-gray-100 p-2 my-4">
      <h2 className="text-sm font-bold uppercase text-gray-800 tracking-widest">
        {children}
      </h2>
    </div>
  );
  
  // Custom structure for skills to match the image's multi-column list
  const formatSkills = (skillList) => {
    // Basic logic to split skills into two columns for Personal/Professional or just list them.
    if (!skillList || skillList.length === 0) {
      // Placeholder data structure to match the image's skill layout
      const personal = ["Management Skills", "Time Management", "Negotiation", "Critical Thinking", "Communication Skills", "Leadership"];
      const professional = ["Financial Accounting", "Managerial Accounting", "Financial Reporting", "Auditing", "Expense Reporting", "Accounts Payable", "Account Receivable"];
      return { personal, professional };
    }

    // Simple split for real data if needed, assuming first half are 'Personal' and second 'Professional'
    const splitIndex = Math.ceil(skillList.length / 2);
    return {
      personal: skillList.slice(0, splitIndex),
      professional: skillList.slice(splitIndex),
    };
  };

  const { personal, professional } = formatSkills(skills);


  return (
    <div
      id="print-area"
      className="w-[794px] min-h-[1123px] bg-white p-10 font-sans text-gray-800 mx-auto shadow-xl print:shadow-none"
    >
      {/* ========================================
        HEADER SECTION
        ========================================
      */}
      <header className="flex justify-between items-start mb-6">
        {/* Name and Title */}
        <div>
          <h1 className="text-3xl font-extrabold uppercase text-gray-900 tracking-wider leading-none">
            {name || "MARSELINA"}
            <br />
            {/* Assuming a separate surname data field or splitting name for the look */}
            {name ? name.split(' ')[1] || "ZALIYANTI" : "ZALIYANTI"}
          </h1>
          <p className="text-base text-gray-800 mt-1 font-normal">
            {title || "Accountant"}
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-right text-sm space-y-1">
          {contact?.phone && <div className="flex items-center justify-end">
            <Phone className="w-3 h-3 mr-2" />
            <span>{contact.phone}</span>
          </div>}
          {contact?.email && <div className="flex items-center justify-end">
            <Mail className="w-3 h-3 mr-2" />
            <a href={`mailto:${contact.email}`} className='hover:underline'>{contact.email}</a>
          </div>}
          {contact?.location && <div className="flex items-center justify-end">
            <MapPin className="w-3 h-3 mr-2" />
            <span>{contact.location}</span>
          </div>}
          {contact?.website && <div className="flex items-center justify-end">
            <Globe className="w-3 h-3 mr-2" />
            <a href={contact.website} target="_blank" rel="noopener noreferrer" className='hover:underline'>{contact.website}</a>
          </div>}
          
          {/* Social Links (Optional, not in original image, but useful) */}
          {profile?.social?.length > 0 && (
            <div className="flex justify-end gap-2 mt-2">
              {profile.social.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                  {getSocialIcon(link.network)}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ========================================
        WORK EXPERIENCE
        ========================================
      */}
      {experience?.length > 0 && (
        <section>
          <SectionTitle>WORK EXPERIENCE</SectionTitle>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_2.5fr] gap-x-4 text-sm">
                {/* Left Column: Dates and Company */}
                <div className="pr-4 text-gray-600">
                  <p className="font-semibold text-gray-800">{exp.company}</p>
                  <p className="mt-0.5">{exp.startDate} - {exp.endDate || "Present"}</p>
                </div>
                {/* Right Column: Title and Details */}
                <div className="border-l border-gray-300 pl-4">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <p className="text-gray-700 mt-0.5 leading-relaxed">{exp.description}</p>
                  {exp.achievements?.length > 0 && (
                    <ul className="list-disc list-outside text-gray-700 mt-1 ml-4 space-y-0.5">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================
        EDUCATION
        ========================================
      */}
      {education?.length > 0 && (
        <section>
          <SectionTitle>EDUCATION</SectionTitle>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_2.5fr] gap-x-4 text-sm">
                {/* Left Column: Dates and Institution */}
                <div className="pr-4 text-gray-600">
                  <p className="font-semibold text-gray-800">{edu.institution}</p>
                  <p className="mt-0.5">{edu.startYear} - {edu.endYear}</p>
                </div>
                {/* Right Column: Degree and Details */}
                <div className="border-l border-gray-300 pl-4">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-700 mt-0.5 leading-relaxed">{edu.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."}</p>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================
        SKILL
        ========================================
      */}
      <section>
        <SectionTitle>SKILL</SectionTitle>
        <div className="grid grid-cols-[1fr_2.5fr] gap-x-4 text-sm">
          {/* The image doesn't put dates here, so the left column is merged into the right */}
          <div className="hidden"></div> 
          
          {/* Skills Grid */}
          <div className="col-span-2 border-l border-gray-300 pl-4 grid grid-cols-2 gap-x-8">
            {/* Personal Skills Column */}
            <div className="text-sm">
              <h4 className="font-semibold mb-1 text-gray-900">Personal</h4>
              <ul className="list-none space-y-0.5">
                {personal.map((skill, idx) => (
                  <li key={`p-${idx}`} className="text-gray-700">{skill}</li>
                ))}
              </ul>
            </div>
            
            {/* Professional Skills Column */}
            <div className="text-sm">
              <h4 className="font-semibold mb-1 text-gray-900">Professional</h4>
              <ul className="list-none space-y-0.5">
                {professional.map((skill, idx) => (
                  <li key={`r-${idx}`} className="text-gray-700">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
        SUMMARY (If not shown yet, place it last as an overflow)
        ========================================
      */}
      {summary && !experience && !education && (
        <section>
          <SectionTitle>PROFILE SUMMARY</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed px-4">{summary}</p>
        </section>
      )}

      {/* Projects section is omitted to stick strictly to the visual design, but can be added if needed */}
    </div>
  );
}

export default MinimalTemp;
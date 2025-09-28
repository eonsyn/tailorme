import React from 'react';
import { useAuth } from '@/lib/auth';
import { Linkedin, Code, Twitter, Globe, Phone, Mail, MapPin } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6"; // brand new X icon

// Utility function to render social icons (kept from original)
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

// Component for a section title (to ensure consistent styling)
const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-bold uppercase text-gray-800 tracking-wider mb-2 pt-1 border-b border-gray-300">
    {children}
  </h2>
);

function BasicTemp({ data }) {
  const { profile } = useAuth();
  if (!data) return null;

  // Destructuring to match the original data structure
  const { name, title, contact, summary, skills, experience, education, projects, awards, languages, references } = data;

  // Custom component for a single list item (for Skills, Languages, etc.)
  const ListItem = ({ children }) => (
    <li className="flex items-start before:content-['•'] before:mr-2 before:text-black before:font-bold text-gray-700 text-sm mb-1">
      {children}
    </li>
  );

  return (
    <div id='print-area' className="w-[794px] min-h-[1123px] bg-white p-12 font-sans text-gray-800 mx-auto shadow-xl print:shadow-none">
      
      {/* ========================================
        HEADER SECTION - Matching the image's clean, centered format
        ========================================
      */}
      <header className="text-center pb-2">
        <h1 className="text-3xl font-normal uppercase text-gray-900 leading-none">
          {name || "RIAAN CHANDRAN"}
        </h1>
        
        {/* Contact Info (Inline/Spaced out) */}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-700">
          {contact?.email && <span className="flex items-center gap-1">
            {contact.email}
          </span>}
          {contact?.phone && <span className="flex items-center gap-1">
            | {contact.phone} |
          </span>}
          {contact?.location && <span className="flex items-center gap-1">
            {contact.location}
          </span>}
          {/* Assuming a URL field is also available, like in the image's header */}
          {contact?.website && <span className="flex items-center gap-1">
            | {contact.website}
          </span>}
        </div>
        
        <hr className="mt-2 border-t-2 border-black" />
      </header>

      {/* ========================================
        MAIN TWO-COLUMN LAYOUT
        ========================================
      */}
      <div className="grid grid-cols-[1fr_2px_2fr] gap-x-6 mt-4">
        
        {/* ----------------- LEFT COLUMN (Profile, Skills, Language, Awards) ----------------- */}
        <div className="space-y-6">
          
          {/* PROFILE (Summary) */}
          <section>
            <SectionTitle>PROFILE</SectionTitle>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {summary || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
            </p>
          </section>

          {/* SKILLS */}
          <section>
            <SectionTitle>SKILLS</SectionTitle>
            <ul className="list-none p-0 text-sm">
              {skills?.length > 0 ? skills.map((skill, idx) => (
                <ListItem key={idx}>{skill}</ListItem>
              )) : (
                <>
                  <ListItem>Management Skills</ListItem>
                  <ListItem>Digital Marketing</ListItem>
                  <ListItem>Negotiation</ListItem>
                  <ListItem>Critical Thinking</ListItem>
                  <ListItem>Communication Skills</ListItem>
                </>
              )}
            </ul>
          </section>

          {/* LANGUAGE */}
          {languages?.length > 0 && (
            <section>
              <SectionTitle>LANGUAGE</SectionTitle>
              <ul className="list-none p-0 text-sm">
                {languages.map((lang, idx) => (
                  <ListItem key={idx}>{lang}</ListItem>
                ))}
              </ul>
            </section>
          )}

          {/* AWARDS (Used 'awards' data field, if available) */}
          {awards?.length > 0 && (
            <section>
              <SectionTitle>AWARDS</SectionTitle>
              {awards.map((award, idx) => (
                <div key={idx} className="mb-2">
                  <h3 className="text-sm font-semibold text-gray-800">{award.title} ({award.year})</h3>
                  <p className="text-xs text-gray-700">{award.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Social Links (Added here, as they're not explicitly in the image, but are in the original code) */}
          {profile?.social?.length > 0 && (
            <section>
              <SectionTitle>SOCIAL</SectionTitle>
              <div className="flex flex-col gap-1 text-sm">
                {profile.social.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                  >
                    {getSocialIcon(link.network)}
                    <span className="underline">{link.network}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Vertical Separator */}
        <div className="border-r border-gray-300 h-full"></div>

        {/* ----------------- RIGHT COLUMN (Education, Experience, References) ----------------- */}
        <div className="space-y-6">

          {/* EDUCATION */}
          <section>
            <SectionTitle>EDUCATION</SectionTitle>
            {education?.length > 0 ? education.map((edu, idx) => (
              <div key={idx} className="mb-3 flex justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-sm text-gray-700">{edu.institution}</p>
                  <ul className="list-disc list-inside text-gray-700 text-xs mt-1 ml-4">
                    {/* Add bullet points for education details if needed, matching the experience format */}
                    {edu.achievements?.map((ach, i) => (
                       <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm font-normal text-gray-700 whitespace-nowrap">
                  {edu.startYear} - {edu.endYear}
                </p>
              </div>
            )) : (
              // Placeholder structure to match the image's education layout
              <>
                <div className="mb-3 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">Bachelor of Design</h3>
                    <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  <p className="text-sm font-normal text-gray-700 whitespace-nowrap">2006 - 2008</p>
                </div>
                <div className="mb-3 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">Bachelor of Design</h3>
                    <p className="text-sm text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
                  <p className="text-sm font-normal text-gray-700 whitespace-nowrap">2006 - 2008</p>
                </div>
              </>
            )}
            <hr className="mt-4 border-t border-gray-300" />
          </section>

          {/* WORK EXPERIENCE */}
          {experience?.length > 0 && (
            <section>
              <SectionTitle>WORK EXPERIENCE</SectionTitle>
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-4 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.company}</h3>
                    <p className="text-sm font-normal text-gray-700">{exp.title}</p>
                    <ul className="list-disc list-inside text-gray-700 text-sm mt-1 ml-4">
                      {exp.achievements?.map((ach, i) => (
                        <li key={i} className='mb-1'>{ach}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm font-normal text-gray-700 whitespace-nowrap">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* REFERENCES */}
          {references?.length > 0 && (
            <section>
              <SectionTitle>REFERENCES</SectionTitle>
              <div className="grid grid-cols-2 gap-x-4">
                {references.map((ref, idx) => (
                  <div key={idx} className="mb-3 text-sm">
                    <h4 className="font-semibold text-gray-800">{ref.name}</h4>
                    <p className="text-gray-700">{ref.title} / {ref.company}</p>
                    <p className="text-gray-700 flex items-center gap-1 mt-1">
                        <Phone className='w-3 h-3 text-gray-600'/> {ref.phone}
                    </p>
                    <p className="text-gray-700 flex items-center gap-1">
                        <Mail className='w-3 h-3 text-gray-600'/> {ref.email}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS (Keeping this section here as an optional/supplementary section) */}
          {projects?.length > 0 && (
            <section>
              <SectionTitle>PROJECTS</SectionTitle>
              {projects.map((proj, idx) => (
                <div key={idx} className="mb-4">
                  <h3 className="font-semibold text-gray-800">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-gray-800"
                    >
                      {proj.name}
                    </a>
                  </h3>
                  <p className="text-gray-700 text-sm mt-1">{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2 text-xs">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

        </div>
      </div>
    </div>
  );
}

export default BasicTemp;
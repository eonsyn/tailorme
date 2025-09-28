import React from "react";
import { useAuth } from '@/lib/auth';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { Linkedin, Code } from 'lucide-react';

export default function CleanProfessionalTemp({ data }) {
  const { profile } = useAuth(); // Assuming this provides profile data
  if (!data) return null;

  // Function to handle bullet points in descriptions/achievements
  const renderBulletPoints = (items) => {
    if (!items || items.length === 0) return null;

    // Ensure we handle both string descriptions (if they contain newlines) and array achievements
    const listItems = Array.isArray(items) ? items : items.split('\n').filter(line => line.trim() !== '');

    if (listItems.length === 0) return null;

    return (
      <ul className="list-none space-y-1 mt-1 text-sm text-gray-700">
        {listItems.map((item, idx) => (
          <li key={idx} className="flex before:content-['•'] before:mr-2 before:text-blue-500">
            {item.trim()}
          </li>
        ))}
      </ul>
    );
  };
  
  // Custom Icon function (simplified for the clean text-based look)
  const getSocialIcon = (network) => {
    switch (network) {
      case "LinkedIn":
        return <Linkedin className="w-3 h-3 text-gray-600" />;
      case "GitHub":
        return <Code className="w-3 h-3 text-gray-600" />;
      case "Portfolio":
        return <Globe className="w-3 h-3 text-gray-600" />;
      case "Twitter":
        return <FaXTwitter className="w-3 h-3 text-gray-600" />;
      default:
        return null;
    }
  };


  // Helper function for the standard section title block
  const SectionTitle = ({ title }) => (
    <div className="mb-3">
      {/* Blue underline style from the original image */}
      <h2 className="text-sm font-bold text-gray-800 tracking-wider uppercase border-b-2 border-blue-500 pb-1 inline-block">{title}</h2>
    </div>
  );

  return (
    <div id="print-area" className="bg-white max-w-2xl mx-auto p-10 font-['Arial',_sans-serif] text-gray-800 shadow-xl">
      
      {/* HEADER SECTION (Name and Contact Info) */}
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase text-black">{data.name}</h1>
        <p className="text-lg font-semibold text-gray-700 mb-4">{data.title}</p>
        
        {/* Contact Bar (Mimicking the horizontal layout) */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-600 border-t border-b border-gray-200 py-1 items-center">
          {data.contact?.phone && (
            <div className="flex items-center">
              <Phone className="w-3 h-3 mr-1 text-blue-500" />
              <span>{data.contact.phone}</span>
            </div>
          )}
          {data.contact?.location && (
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-blue-500" />
              <span>{data.contact.location}</span>
            </div>
          )}
          {data.contact?.website && (
            <div className="flex items-center">
              <Globe className="w-3 h-3 mr-1 text-blue-500" />
              <a href={`http://${data.contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">{data.contact.website}</a>
            </div>
          )}
          {data.contact?.email && (
            <div className="flex items-center">
              <Mail className="w-3 h-3 mr-1 text-blue-500" />
              <a href={`mailto:${data.contact.email}`} className="hover:text-blue-600">{data.contact.email}</a>
            </div>
          )}
          
          {/* Social Links (using profile.social as per original component) */}
          {profile?.social?.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs hover:text-blue-600 transition"
            >
              {getSocialIcon(link.network)}
              <span className="capitalize">{link.network}</span>
            </a>
          ))}
        </div>
      </header>

      {/* --- */}

      {/* ABOUT ME / SUMMARY */}
      {data.summary && (
        <section className="mb-6">
          <SectionTitle title="ABOUT ME" />
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* --- */}

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="EDUCATION" />
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm">
                <div>
                  <p className="font-bold text-gray-800">{edu.institution}</p>
                  <p className="text-gray-700 italic">{edu.degree}</p>
                </div>
                {/* Using startYear and endYear */}
                <p className="text-xs font-medium text-gray-600 min-w-[75px] text-right">
                  {edu.startYear}–{edu.endYear}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- */}

      {/* SKILLS */}
      {data.skills?.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="SKILL" />
          {/* Two-column, bulleted list layout */}
          <ul className="list-none text-sm text-gray-700 flex gap-x-8 gap-y-1">
            {data.skills.map((skill, idx) => (
              <span key={idx} className="flex items-center before:content-['•'] before:mr-2 before:text-blue-500">
                {skill}
              </span>
            ))}
          </ul>
        </section>
      )}

      {/* --- */}

      {/* WORK EXPERIENCE */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="WORK EXPERIENCE" />
          <div className="space-y-6">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    {/* Using title and company */}
                    <p className="font-bold text-gray-800">{exp.company} - <span className="font-normal italic">{exp.title}</span></p>
                    <p className="text-xs text-gray-500">{exp.location}</p>
                  </div>
                  {/* Using startDate and endDate */}
                  <p className="text-xs font-medium text-gray-600 min-w-[75px] text-right">
                    {exp.startDate}–{exp.endDate || "Present"}
                  </p>
                </div>
                {/* Render description as a bullet list */}
                {renderBulletPoints(exp.description)}
                {/* Render achievements as a bullet list */}
                {renderBulletPoints(exp.achievements)}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* --- */}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <section className="mb-6">
          <SectionTitle title="PROJECTS" />
          <div className="space-y-4">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="relative">
                <p className="font-bold text-gray-800">
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    {proj.name}
                  </a>
                </p>
                {/* Description */}
                <p className="text-sm text-gray-700 mt-0.5">{proj.description}</p>
                
                {/* Technologies */}
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs">
                    <span className="font-medium text-gray-600">Tech:</span>
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="text-gray-500">
                        {tech}{i < proj.technologies.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
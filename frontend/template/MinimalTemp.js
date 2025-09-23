import React from 'react';
import { useAuth } from '@/lib/auth';
import { Linkedin, Code, Globe } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";

function MinimalTemp({ data }) {
  const { profile } = useAuth();
  if (!data) return null;

  const { name, title, contact, summary, skills, experience, education, projects } = data;

  const getSocialIcon = (network) => {
    switch (network) {
      case 'LinkedIn':
        return <Linkedin className="w-5 h-5 text-blue-700" />;
      case 'GitHub':
        return <Code className="w-5 h-5 text-gray-700" />;
      case 'Portfolio':
        return <Globe className="w-5 h-5 text-green-700" />;
      case 'Twitter':
        return <FaXTwitter className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      id="print-area"
      className="w-full bg-white p-10 font-inter text-gray-800 leading-relaxed shadow-sm "
    >
      {/* Header */}
      <header className="text-center border-b border-gray-200 pb-6 mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{name}</h1>
        <p className="text-lg text-gray-600 font-medium mt-1">{title}</p>

        {/* Contact + Social Links in One Line */}
        <div className="flex flex-wrap justify-center items-center gap-6 mt-4 text-sm text-gray-500">
          {contact?.email && <span>{contact.email}</span>}
          {contact?.phone && <span>{contact.phone}</span>}
          {contact?.location && <span>{contact.location}</span>}

          {profile?.social?.length > 0 &&
            profile.social.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm hover:text-yellow-500 transition"
              >
                {getSocialIcon(link.network)}
                <span className="hidden sm:inline">{link.network}</span>
              </a>
            ))
          }
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-10">
          <h2 className="section-title">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-10">
          <h2 className="section-title">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-10">
          <h2 className="section-title">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                <p className="text-sm text-gray-700">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {exp.startDate} – {exp.endDate || "Present"}
                </p>
                {exp.description && <p className="mt-2 text-gray-700">{exp.description}</p>}
                {exp.achievements?.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-10">
          <h2 className="section-title">Education</h2>
          <div className="space-y-5">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {edu.startYear} – {edu.endYear}
                </p>
                {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-10">
          <h2 className="section-title">Projects</h2>
          <div className="space-y-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600"
                  >
                    {proj.name}
                  </a>
                </h3>
                <p className="text-gray-700 mt-1">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {proj.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                      >
                        {tech}
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

export default MinimalTemp;

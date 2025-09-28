import React from 'react';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

function MinimalTemp({ data }) {
  if (!data) return null;

  const { name, title, contact, summary, skills, experience, education, projects } = data;

  const SectionTitle = ({ children }) => (
    <div className="bg-gray-100 p-2 my-4">
      <h2 className="text-sm font-bold uppercase text-gray-800 tracking-widest">
        {children}
      </h2>
    </div>
  );

  return (
    <div
      id="print-area"
      className="w-full min-h-[1123px] bg-white p-10 font-sans text-gray-800  shadow-xl print:shadow-none"
    >
      {/* ================= HEADER ================= */}
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-extrabold uppercase text-gray-900 tracking-wider leading-none">
            {name}
          </h1>
          <p className="text-base text-gray-700 mt-1 font-normal">{title}</p>
        </div>

        {/* Contact Info */}
        <div className="text-right text-sm space-y-1">
          {contact?.phone && (
            <div className="flex items-center justify-end">
              <Phone className="w-3 h-3 mr-2" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact?.email && (
            <div className="flex items-center justify-end">
              <Mail className="w-3 h-3 mr-2" />
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            </div>
          )}
          {contact?.location && (
            <div className="flex items-center justify-end">
              <MapPin className="w-3 h-3 mr-2" />
              <span>{contact.location}</span>
            </div>
          )}
          {contact?.website && (
            <div className="flex items-center justify-end">
              <Globe className="w-3 h-3 mr-2" />
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {contact.website}
              </a>
            </div>
          )}
        </div>
      </header>

      {/* ================= SUMMARY ================= */}
      {summary && (
        <section>
          <SectionTitle>PROFILE SUMMARY</SectionTitle>
          <p className="text-sm text-gray-700 leading-relaxed px-1">{summary}</p>
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {experience?.length > 0 && (
        <section>
          <SectionTitle>WORK EXPERIENCE</SectionTitle>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_2.5fr] gap-x-4 text-sm">
                <div className="pr-4 text-gray-600">
                  <p className="font-semibold text-gray-800">{exp.company}</p>
                  <p className="mt-0.5">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                </div>
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

      {/* ================= EDUCATION ================= */}
      {education?.length > 0 && (
        <section>
          <SectionTitle>EDUCATION</SectionTitle>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_2.5fr] gap-x-4 text-sm">
                <div className="pr-4 text-gray-600">
                  <p className="font-semibold text-gray-800">{edu.institution}</p>
                  <p className="mt-0.5">
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
                <div className="border-l border-gray-300 pl-4">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  {edu.gpa && <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {skills?.length > 0 && (
        <section>
          <SectionTitle>SKILLS</SectionTitle>
          <ul className="grid grid-cols-2 gap-y-1 gap-x-6 text-sm px-1">
            {skills.map((skill, idx) => (
              <li key={idx} className="text-gray-700">
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {projects?.length > 0 && (
        <section>
          <SectionTitle>PROJECTS</SectionTitle>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="text-sm">
                <h3 className="font-semibold text-gray-800">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {proj.name}
                  </a>
                </h3>
                <p className="text-gray-700 mt-0.5">{proj.description}</p>
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
          </div>
        </section>
      )}
    </div>
  );
}

export default MinimalTemp;

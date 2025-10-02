import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const SectionTitle = ({ children }) => (
  <h2 className="text-lg font-bold uppercase text-gray-800 tracking-wider mb-2 pt-1 border-b border-gray-300">
    {children}
  </h2>
);

function BasicTemp({ data }) {
  if (!data) return null;

  const { name, title, contact, summary, skills, experience, education, projects } = data;

  const ListItem = ({ children }) => (
    <li className="flex items-start before:content-['•'] before:mr-2 before:text-black before:font-bold text-gray-700 text-sm mb-1">
      {children}
    </li>
  );

  return (
    <div
      id="print-area"
      className="w-full   bg-white p-12 font-sans text-gray-800 mx-auto shadow-xl print:shadow-none"
    >
      {/* Header */}
      <header className="text-center pb-2">
        <h1 className="text-3xl font-normal uppercase text-gray-900 leading-none">
          {name}
        </h1>
        <p className="text-sm capitalize text-gray-600">{title}</p>

        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-700">
          {contact?.email && (
            <span className="flex items-center gap-1">{contact.email}</span>
          )}
          {contact?.phone && (
            <span className="flex items-center gap-1">| {contact.phone} |</span>
          )}
          {contact?.location && (
            <span className="flex items-center gap-1">{contact.location}</span>
          )}
        </div>

        <hr className="mt-2 border-t-2 border-black" />
      </header>

      {/* Layout */}
      <div className="grid grid-cols-[1fr_2px_2fr] gap-x-6 mt-4">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Profile */}
          {summary && (
            <section>
              <SectionTitle>PROFILE</SectionTitle>
              <p className="text-sm text-gray-700 leading-relaxed text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <SectionTitle>SKILLS</SectionTitle>
              <ul className="list-none p-0 text-sm">
                {skills.map((skill, idx) => (
                  <ListItem key={idx}>{skill}</ListItem>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Vertical Separator */}
        <div className="border-r border-gray-300 h-full"></div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Work Experience */}
          {experience?.length > 0 && (
            <section>
              <SectionTitle>WORK EXPERIENCE</SectionTitle>
              {experience.map((exp, idx) => (
                <div key={idx} className="mb-4 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.company}</h3>
                    <p className="text-sm font-normal text-gray-700">{exp.title}</p>
                    <p className="text-xs text-gray-600">{exp.location}</p>
                    <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                    <ul className="list-disc list-inside text-gray-700 text-sm mt-1 ml-4">
                      {exp.achievements?.map((ach, i) => (
                        <li key={i} className="mb-1">
                          {ach}
                        </li>
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

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <SectionTitle>EDUCATION</SectionTitle>
              {education.map((edu, idx) => (
                <div key={idx} className="mb-3 flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>
                  </div>
                  <p className="text-sm font-normal text-gray-700 whitespace-nowrap">
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
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

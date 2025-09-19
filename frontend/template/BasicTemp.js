import React from 'react'

function BasicTemp({ data }) {
 if (!data) return null;

  const { name, title, contact, summary, skills, experience, education, projects } = data;

  return (
    <div id='print-area' className= " w-full bg-white p-8 font-sans text-gray-800">
      {/* Header */}
      <div className="text-center border-b pb-6 mb-6">
        <h1 className="text-3xl uppercase font-bold text-gray-900">{name}</h1>
        <p className="text-lg text-gray-600">{title}</p>
        <div className="flex justify-center gap-6 mt-3 text-sm text-gray-500">
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
          <span>{contact.location}</span>
        </div>
      </div>

      {/* Summary */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">
          Professional Summary
        </h2>
        <p className="text-gray-700 leading-relaxed">{summary}</p>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">
            Experience
          </h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-bold text-gray-800">{exp.title}</h3>
              <p className="text-gray-600 text-sm">
                {exp.company} | {exp.location}
              </p>
              <p className="text-xs text-gray-500">
                {exp.startDate} - {exp.endDate}
              </p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {exp.achievements?.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">
            Education
          </h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <h3 className="font-bold text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600 text-sm">{edu.institution}</p>
              <p className="text-xs text-gray-500">
                {edu.startYear} - {edu.endYear}
              </p>
              {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">
            Projects
          </h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-bold text-gray-800">
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
              <div className="flex flex-wrap gap-2 mt-2">
                {proj.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-md"
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
  )
}

export default BasicTemp

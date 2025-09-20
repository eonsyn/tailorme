import React from 'react'

function MinimalTemp({ data }) {
  if (!data) return null

  const { name, title, contact, summary, skills, experience, education, projects } = data

  return (
    <div
      id="print-area"
      className="w-full bg-white p-10 font-inter text-gray-800 leading-relaxed"
    >
      {/* Header */}
      <header className="text-center border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {name}
        </h1>
        <p className="text-lg text-gray-600 font-medium mt-1">{title}</p>
        <div className="flex justify-center gap-6 mt-3 text-sm text-gray-500">
          <span>{contact.email}</span>
          <span>{contact.phone}</span>
          <span>{contact.location}</span>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-8">
          <h2 className="section-title">Professional Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-8">
          <h2 className="section-title">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-8">
          <h2 className="section-title">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {exp.startDate} – {exp.endDate}
                </p>
                {exp.description && (
                  <p className="mt-2 text-gray-700">{exp.description}</p>
                )}
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
        <section className="mb-8">
          <h2 className="section-title">Education</h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-gray-900">
                  {edu.degree}
                </h3>
                <p className="text-sm text-gray-600">{edu.institution}</p>
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
        <section>
          <h2 className="section-title">Projects</h2>
          <div className="space-y-6">
            {projects.map((proj, idx) => (
              <div key={idx}>
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
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
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
  )
}

export default MinimalTemp;

// helper tailwind style
// add this to your global CSS if you want to reuse section headers:
// .section-title {
//   @apply text-xl font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1;
// }

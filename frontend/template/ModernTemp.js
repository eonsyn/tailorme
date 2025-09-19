import React from "react";

export default function ModernTemp({ data }) {
  return (
    <div id='print-area' className= " w-full   bg-white   font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <h1 className="text-3xl uppercase font-bold">{data.name}</h1>
        <p className="text-lg opacity-90">{data.title}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Sidebar - Contact + Skills */}
        <aside className="col-span-1 border-r border-gray-200 pr-4 space-y-6">
          {/* Contact */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Contact
            </h2>
            <p className="text-sm text-gray-600">{data.contact.email}</p>
            <p className="text-sm text-gray-600">{data.contact.phone}</p>
            <p className="text-sm text-gray-600">{data.contact.location}</p>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Skills
            </h2>
            <ul className="grid grid-cols-1 gap-1">
              {data.skills?.map((skill, idx) => (
                <li
                  key={idx}
                  className="text-sm bg-gray-100 text-gray-700 rounded px-2 py-1"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        {/* Main Content */}
        <main className="col-span-2 space-y-6">
          {/* Summary */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Profile
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </section>

          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
                Education
              </h2>
              {data.education.map((edu, idx) => (
                <div key={idx} className="mb-3">
                  <p className="font-medium text-gray-900">{edu.degree}</p>
                  <p className="text-sm text-gray-700">
                    {edu.institution} — {edu.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {edu.startYear} - {edu.endYear}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-1 mb-2">
                Projects
              </h2>
              {data.projects.map((project, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-medium text-gray-900">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-blue-600"
                    >
                      {project.name}
                    </a>
                  </p>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Tech: {project.technologies.join(", ")}
                  </p>
                </div>
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

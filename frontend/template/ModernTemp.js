import React from "react";
import { useAuth } from '@/lib/auth';
import { Linkedin, Code, Globe } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";

export default function ModernCardTemp({ data }) {
  const { profile } = useAuth();
  if (!data) return null;

  const getSocialIcon = (network) => {
    switch (network) {
      case "LinkedIn":
        return <Linkedin className="w-5 h-5 text-blue-700" />;
      case "GitHub":
        return <Code className="w-5 h-5 text-gray-800" />;
      case "Portfolio":
        return <Globe className="w-5 h-5 text-green-700" />;
      case "Twitter":
        return <FaXTwitter className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div id="print-area" className="  bg-white shadow-md rounded-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-8 text-center">
        <h1 className="text-4xl font-bold uppercase">{data.name}</h1>
        <p className="text-lg opacity-90 mt-1">{data.title}</p>
       
      </div>

      {/* Contact + Skills */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-gray-200">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact</h2>
          <p className="text-gray-700">{data.contact.email}</p>
          <p className="text-gray-700">{data.contact.phone}</p>
          <p className="text-gray-700">{data.contact.location}</p>
           {profile?.social?.length > 0 && (
          <div className="flex text-black   gap-4 mt-4">
            {profile.social.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-yellow-300 transition"
              >
                {getSocialIcon(link.network)}
                <span className="hidden sm:inline">{link.network}</span>
              </a>
            ))}
          </div>
        )}
        </div>
        {data.skills?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Profile</h2>
          <p className="text-gray-700">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                <p className="font-medium text-gray-900">{exp.role}</p>
                <p className="text-sm text-gray-700">{exp.company} • {exp.location}</p>
                <p className="text-xs text-gray-500">{exp.startYear} – {exp.endYear || "Present"}</p>
                {exp.description && <p className="text-gray-700 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                <p className="font-medium text-gray-900">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600"
                  >
                    {proj.name}
                  </a>
                </p>
                <p className="text-gray-700 mt-1">{proj.description}</p>
                {proj.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {proj.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                <p className="font-medium text-gray-900">{edu.degree}</p>
                <p className="text-sm text-gray-700">{edu.institution} — {edu.location}</p>
                <p className="text-xs text-gray-500">{edu.startYear} – {edu.endYear}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react'

function ResumeEditor({ resume, setResume }) {
  return (
   <div className="space-y-4 w-full">
         {/* Basic Info */}
         <input
           type="text"
           value={resume.name || ''}
           onChange={(e) => setResume({ ...resume, name: e.target.value })}
           className="input w-full"
           placeholder="Full Name"
         />
         <input
           type="text"
           value={resume.title || ''}
           onChange={(e) => setResume({ ...resume, title: e.target.value })}
           className="input w-full"
           placeholder="Job Title"
         />
   
         {/* Contact */}
         <h3 className="font-semibold mt-4">Contact</h3>
         <input
           type="email"
           value={resume.contact?.email || ''}
           onChange={(e) =>
             setResume({ ...resume, contact: { ...resume.contact, email: e.target.value } })
           }
           className="input w-full"
           placeholder="Email"
         />
         <input
           type="text"
           value={resume.contact?.phone || ''}
           onChange={(e) =>
             setResume({ ...resume, contact: { ...resume.contact, phone: e.target.value } })
           }
           className="input w-full"
           placeholder="Phone"
         />
         <input
           type="text"
           value={resume.contact?.location || ''}
           onChange={(e) =>
             setResume({ ...resume, contact: { ...resume.contact, location: e.target.value } })
           }
           className="input w-full"
           placeholder="Location"
         />
   
         {/* Summary */}
         <h3 className="font-semibold mt-4">Profile Summary</h3>
         <textarea
           value={resume.summary || ''}
           onChange={(e) => setResume({ ...resume, summary: e.target.value })}
           className="input w-full resize-none"
           rows={4}
           placeholder="Write a short profile summary..."
         />
   
         {/* Skills */}
         <h3 className="font-semibold mt-4">Skills</h3>
         <textarea
           value={resume.skills?.join(', ') || ''}
           onChange={(e) =>
             setResume({ ...resume, skills: e.target.value.split(',').map((s) => s.trim()) })
           }
           className="input w-full resize-none"
           rows={2}
           placeholder="Enter skills separated by commas"
         />
       </div>
  )
}

export default ResumeEditor 
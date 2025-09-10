import React, { useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '@/lib/api'

function AddSkills({ profile }) {
  const [skills, setSkills] = useState([])
  const [showForm, setShowForm] = useState(false) // toggle input visibility

  // Add Skill
  const handleAddSkill = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      const skill = formData.get('skill')?.trim()

      if (!skill) return toast.error('Skill cannot be empty')

      await api.post('/profile/skills', { skill })

      setSkills((prev) => [...prev, skill])
      e.target.reset()
      setShowForm(false) // hide form again after adding
      toast.success('Skill added!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to add skill')
    }
  }

  // Delete Skill
  const handleDeleteSkill = async (skillName) => {
    try {
      await api.delete(`/profile/skills/${skillName}`)
      setSkills((prev) => prev.filter((s) => s !== skillName))
      toast.success('Skill removed!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete skill')
    }
  }

  // Initialize skills from profile
  useEffect(() => {
    setSkills(profile?.skills || [])
  }, [profile])

  return (
    <div className="card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-outline flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </button>
        ) : (
          <form onSubmit={handleAddSkill} className="flex items-center gap-2">
            <input
              name="skill"
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Enter a skill"
              autoFocus
            />
            <button type="submit" className="btn btn-outline">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn btn-ghost text-gray-600"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      <div className="flex flex-wrap gap-4 transition-all ">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div
              key={index}
              className="flex gap-1 items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-900">{skill}</span>
              <button
                type="button"
                onClick={() => handleDeleteSkill(skill)}
                className="text-error-500 cursor-pointer hover:text-error-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3">No skills added yet</p>
        )}
      </div>
    </div>
  )
}

export default AddSkills

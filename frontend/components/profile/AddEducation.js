import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '@/lib/api'

function AddEducation({ profile }) {
  const [education, setEducation] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    startYear: '',
    endYear: '',
    gpa: '',
    description: '',
  })

  // Load initial data
  useEffect(() => {
    setEducation(profile?.education || [])
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingIndex !== null) {
        // Update flow
        const eduToUpdate = education[editingIndex]
        const res = await api.put(`/profile/education/${eduToUpdate._id}`, formData)
        if(!res.success) throw res
        const updatedEdu = res.profile.education.find(e => e._id === eduToUpdate._id)
        setEducation(prev => prev.map((edu, i) => i === editingIndex ? updatedEdu : edu))
        toast.success("Education updated!")
        setEditingIndex(null)
      } else {
        // Add flow
        const { data } = await api.post("/profile/education", formData)
        const newEdu = data.profile.education[data.profile.education.length - 1]
        setEducation(prev => [...prev, newEdu])
        toast.success("Education added!")
      }

      setFormData({
        degree: '',
        institution: '',
        location: '',
        startYear: '',
        endYear: '',
        gpa: '',
        description: '',
      })
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to save education")
    }
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    setFormData(education[index])
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/profile/education/${id}`)
      setEducation(prev => prev.filter(edu => edu._id !== id))
      toast.success("Education deleted!")
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete education")
    }
  }

  const handleCancel = () => {
    setFormData({
      degree: '',
      institution: '',
      location: '',
      startYear: '',
      endYear: '',
      gpa: '',
      description: '',
    })
    setEditingIndex(null)
    setShowForm(false)
  }

  return (
    <div className="card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
        {!showForm && (
          <button
            className="btn btn-outline flex items-center"
            onClick={() => {
              setShowForm(true)
              setEditingIndex(null)
              setFormData({
                degree: '',
                institution: '',
                location: '',
                startYear: '',
                endYear: '',
                gpa: '',
                description: '',
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} className="input" required />
            <input name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} className="input" required />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="input" />
            <input name="startYear" placeholder="Start Year" value={formData.startYear} onChange={handleChange} className="input" />
            <input name="endYear" placeholder="End Year" value={formData.endYear} onChange={handleChange} className="input" />
            <input name="gpa" placeholder="GPA" value={formData.gpa} onChange={handleChange} className="input" />
          </div>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="input resize-none" rows={3} />
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary flex items-center">
              <Check className="w-4 h-4 mr-2" />
              {editingIndex !== null ? 'Update Education' : 'Add Education'}
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-ghost flex items-center">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {education.length > 0 ? (
          education.map((edu, index) => (
            <div key={edu._id || index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-primary-600 font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleEdit(index)} className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => handleDelete(edu._id)} className="text-error-500 hover:text-error-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No education added yet</p>
        )}
      </div>
    </div>
  )
}

export default AddEducation

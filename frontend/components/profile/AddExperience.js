import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

// Mock API client to resolve compilation error from external import.
// In a real application, this would be a separate file handling API requests.
const api = {
  put: async (url, data) => {
    console.log(`PUT request to ${url} with data:`, data);
    return { experience: { ...data, _id: 'mock-id-updated' } };
  },
  post: async (url, data) => {
    console.log(`POST request to ${url} with data:`, data);
    return { experience: { ...data, _id: 'mock-id-' + Date.now() } };
  },
  delete: async (url) => {
    console.log(`DELETE request to ${url}`);
    return {};
  },
};

function AddExperience({ profile }) {
  const [experience, setExperience] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
  })

  // Load initial experience
  useEffect(() => {
    const initialExperience = profile?.experience?.map(exp => ({
      ...exp,
      current: !exp.endDate,
    })) || []
    setExperience(initialExperience)
  }, [profile])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const apiData = { ...formData }
      if (apiData.current) {
        apiData.endDate = ''
      }
      delete apiData.current

      if (editingIndex !== null) {
        const expToUpdate = experience[editingIndex]
        const { experience: updatedExp } = await api.put(
          `/profile/experience/${expToUpdate._id}`,
          apiData
        )

        setExperience((prev) =>
          prev.map((exp, i) => (i === editingIndex ? { ...updatedExp, current: !updatedExp.endDate } : exp))
        )
        toast.success('Experience updated!')
      } else {
        const { experience: newExp } = await api.post(
          '/profile/experience',
          apiData
        )
        setExperience((prev) => [...prev, { ...newExp, current: !newExp.endDate }])
        toast.success('Experience added!')
      }

      setFormData({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
      })
      setEditingIndex(null)
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error('Failed to save experience')
    }
  }

  const handleEdit = (index) => {
    const expToEdit = experience[index]
    setEditingIndex(index)
    setFormData({ 
      ...expToEdit,
      current: !expToEdit.endDate,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/profile/experience/${id}`)
      setExperience((prev) => prev.filter((exp) => exp._id !== id))
      toast.success('Experience deleted!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete experience')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingIndex(null)
    setFormData({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    })
  }

  return (
    <div className="card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
        {!showForm && (
          <button
            className="btn btn-outline flex items-center"
            onClick={() => {
              setShowForm(true)
              setEditingIndex(null)
              setFormData({
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                description: '',
                current: false,
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="input"
              required
            />
            <div>
             
             <label>
              from
              </label>
            <input
              name="startDate"
              type="month"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleChange}
              className="input"
              required
            /> </div>
            <div>
            <label>
              To
              </label>
            <input
              name="endDate"
              type="month"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleChange}
              className="input"
              disabled={formData.current}
            />
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={formData.current}
              onChange={handleChange}
              className="checkbox"
            />
            <label htmlFor="current" className="ml-2 text-gray-700">
              Currently working here
            </label>
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="input resize-none"
            rows={3}
          />
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary flex items-center">
              <Check className="w-4 h-4 mr-2" />
              {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-ghost flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {experience.length > 0 ? (
          experience.map((exp, index) => (
            <div
              key={exp._id}
              className="border border-gray-200 rounded-lg p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="text-primary-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(exp._id)}
                    className="text-error-500 hover:text-error-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No experience added yet</p>
        )}
      </div>
    </div>
  )
}

export default AddExperience

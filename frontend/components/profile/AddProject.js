import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '@/lib/api'

function AddProject({ profile }) {
  const [projects, setProjects] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: '',
    url: '',
    githubUrl: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    setProjects(profile?.projects || [])
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...formData, technologies: formData.technologies.split(',').map(t => t.trim()) }

      if (editingIndex !== null) {
        const projToUpdate = projects[editingIndex]
        const { project } = await api.put(`/profile/project/${projToUpdate._id}`, payload)
        setProjects(prev => prev.map((p, i) => (i === editingIndex ? project : p)))
        toast.success('Project updated!')
      } else {
        const { project } = await api.post('/profile/project', payload)
        setProjects(prev => [...prev, project])
        toast.success('Project added!')
      }

      setFormData({
        name: '',
        description: '',
        technologies: '',
        url: '',
        githubUrl: '',
        startDate: '',
        endDate: '',
      })
      setEditingIndex(null)
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error('Failed to save project')
    }
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    const proj = projects[index]
    setFormData({
      ...proj,
      technologies: proj.technologies.join(', '),
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/profile/project/${id}`)
      setProjects(prev => prev.filter(p => p._id !== id))
      toast.success('Project deleted!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete project')
    }
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      technologies: '',
      url: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
    })
    setEditingIndex(null)
    setShowForm(false)
  }

  return (
    <div className="card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
        {!showForm && (
          <button
            className="btn btn-outline flex items-center"
            onClick={() => {
              setShowForm(true)
              setEditingIndex(null)
              setFormData({
                name: '',
                description: '',
                technologies: '',
                url: '',
                githubUrl: '',
                startDate: '',
                endDate: '',
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Project Name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="technologies"
              placeholder="Technologies (comma separated)"
              value={formData.technologies}
              onChange={handleChange}
              className="input"
            />
            <input
              name="startDate"
              type="month"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleChange}
              className="input"
            />
            <input
              name="endDate"
              type="month"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleChange}
              className="input"
            />
            <input
              name="url"
              type="url"
              placeholder="Live URL"
              value={formData.url}
              onChange={handleChange}
              className="input"
            />
            <input
              name="githubUrl"
              type="url"
              placeholder="GitHub URL"
              value={formData.githubUrl}
              onChange={handleChange}
              className="input"
            />
          </div>
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            className="input resize-none"
            rows={3}
          />
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary flex items-center">
              <Check className="w-4 h-4 mr-2" />
              {editingIndex !== null ? 'Update Project' : 'Add Project'}
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-ghost flex items-center">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {projects.length > 0 ? (
          projects.map((proj, index) => (
            <div key={proj._id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{proj.name}</h3>
                  <p className="text-primary-600 font-medium">{proj.technologies.join(', ')}</p>
                  <p className="text-sm text-gray-500">
                    {proj.startDate} - {proj.endDate || 'Present'}
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
                    onClick={() => handleDelete(proj._id)}
                    className="text-error-500 hover:text-error-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700">{proj.description}</p>
              {proj.url && <a href={proj.url} target="_blank" className="text-blue-600">Live Demo</a>}
              {proj.githubUrl && <a href={proj.githubUrl} target="_blank" className="text-blue-600 ml-4">GitHub</a>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No projects added yet</p>
        )}
      </div>
    </div>
  )
}

export default AddProject

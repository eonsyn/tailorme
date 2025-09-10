import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '@/lib/api'

function AddCertificate({ profile }) {
  const [certificates, setCertificates] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    date: '',
    expirationDate: '',
    credentialId: '',
    url: '',
  })

  // Initialize from profile
  useEffect(() => {
    setCertificates(profile?.certifications || [])
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingIndex !== null) {
        const certToUpdate = certificates[editingIndex]
        const { certification } = await api.put(
          `/profile/certification/${certToUpdate._id}`,
          formData
        )
        setCertificates((prev) =>
          prev.map((c, i) => (i === editingIndex ?  certification : c))
        )
        toast.success('Certificate updated!')
      } else {
        const { certification } = await api.post('/profile/certification', formData)
        setCertificates((prev) => [...prev,  certification])
        toast.success('Certificate added!')
      }

      setFormData({
        name: '',
        issuer: '',
        date: '',
        expirationDate: '',
        credentialId: '',
        url: '',
      })
      setEditingIndex(null)
      setShowForm(false)
    } catch (err) {
      console.error(err)
      toast.error('Failed to save certificate')
    }
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    setFormData(certificates[index])
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/profile/certification/${id}`)
      setCertificates((prev) => prev.filter((cert) => cert._id !== id))
      toast.success('Certificate deleted!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to delete certificate')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingIndex(null)
    setFormData({
      name: '',
      issuer: '',
      date: '',
      expirationDate: '',
      credentialId: '',
      url: '',
    })
  }

  return (
    <div className="card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Certifications</h2>
        {!showForm && (
          <button
            className="btn btn-outline flex items-center"
            onClick={() => {
              setShowForm(true)
              setEditingIndex(null)
              setFormData({
                name: '',
                issuer: '',
                date: '',
                expirationDate: '',
                credentialId: '',
                url: '',
              })
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Certificate
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Certificate Name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="issuer"
              placeholder="Issuer"
              value={formData.issuer}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="date"
              type="month"
              placeholder="Date Earned"
              value={formData.date}
              onChange={handleChange}
              className="input"
              required
            />
            <input
              name="expirationDate"
              type="month"
              placeholder="Expiration Date"
              value={formData.expirationDate}
              onChange={handleChange}
              className="input"
            />
            <input
              name="credentialId"
              placeholder="Credential ID"
              value={formData.credentialId}
              onChange={handleChange}
              className="input"
            />
            <input
              name="url"
              placeholder="Certificate URL"
              type="url"
              value={formData.url}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary flex items-center">
              <Check className="w-4 h-4 mr-2" />
              {editingIndex !== null ? 'Update Certificate' : 'Add Certificate'}
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
        {certificates.length > 0 ? (
          certificates.map((cert, index) => (
            <div key={cert._id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-primary-600 font-medium">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">
                    {cert.date} {cert.expirationDate ? `- ${cert.expirationDate}` : ''}
                  </p>
                  {cert.credentialId && <p className="text-gray-700">ID: {cert.credentialId}</p>}
                  {cert.url && (
                    <a href={cert.url} target="_blank" className="text-blue-600">
                      View Certificate
                    </a>
                  )}
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
                    onClick={() => handleDelete(cert._id)}
                    className="text-error-500 hover:text-error-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No certificates added yet</p>
        )}
      </div>
    </div>
  )
}

export default AddCertificate

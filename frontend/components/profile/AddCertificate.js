import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Edit, Check, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '@/lib/api'

function AddCertificate({ profile }) {
  const [certificates, setCertificates] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
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
    setIsSaving(true)
    try {
      if (editingIndex !== null) {
        const certToUpdate = certificates[editingIndex]
        const { certification } = await api.put(
          `/profile/certification/${certToUpdate._id}`,
          formData
        )
        setCertificates((prev) =>
          prev.map((c, i) => (i === editingIndex ? certification : c))
        )
        toast.success('Certificate updated!')
      } else {
        const { certification } = await api.post('/profile/certification', formData)
        setCertificates((prev) => [...prev, certification])
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
    } finally {
      setIsSaving(false)
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
        <h2 className="text-xl font-semibold text-foreground">Certifications</h2>
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
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{editingIndex !== null ? 'Update Certificate' : 'Add Certificate'}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {certificates.length > 0 ? (
          certificates.map((cert, index) => (
            <div key={cert._id} className="card p-6 border border-border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-primary font-medium">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground">
                    {cert.date} {cert.expirationDate ? `- ${cert.expirationDate}` : ''}
                  </p>
                  {cert.credentialId && <p className="text-foreground text-sm mt-1">ID: {cert.credentialId}</p>}
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground underline transition-colors mt-1 inline-block">
                      View Certificate
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="btn-icon text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(cert._id)}
                    className="btn-icon text-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center">No certificates added yet.</p>
        )}
      </div>
    </div>
  )
}

export default AddCertificate
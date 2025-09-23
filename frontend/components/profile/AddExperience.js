import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Check, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

function AddExperience({ profile }) {
  const [experience, setExperience] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
  });

  // Load initial experience
  useEffect(() => {
    const initialExperience = profile?.experience?.map(exp => ({
      ...exp,
      current: !exp.endDate,
    })) || [];
    setExperience(initialExperience);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const apiData = { ...formData };
      if (apiData.current) {
        apiData.endDate = '';
      }
      delete apiData.current;

      if (editingIndex !== null) {
        const expToUpdate = experience[editingIndex];
        const { experience: updatedExp } = await api.put(
          `/profile/experience/${expToUpdate._id}`,
          apiData
        );
        setExperience((prev) =>
          prev.map((exp, i) => (i === editingIndex ? { ...updatedExp, current: !updatedExp.endDate } : exp))
        );
        toast.success('Experience updated!');
      } else {
        const { experience: newExp } = await api.post(
          '/profile/experience',
          apiData
        );
        setExperience((prev) => [...prev, { ...newExp, current: !newExp.endDate }]);
        toast.success('Experience added!');
      }

      setFormData({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
      });
      setEditingIndex(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save experience');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (index) => {
    const expToEdit = experience[index];
    setEditingIndex(index);
    setFormData({
      ...expToEdit,
      current: !expToEdit.endDate,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/profile/experience/${id}`);
      setExperience((prev) => prev.filter((exp) => exp._id !== id));
      toast.success('Experience deleted!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete experience');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingIndex(null);
    setFormData({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      current: false,
    });
  };

  return (
    <div className="card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
        {!showForm && (
          <button
            className="btn btn-outline flex items-center"
            onClick={() => {
              setShowForm(true);
              setEditingIndex(null);
              setFormData({
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                description: '',
                current: false,
              });
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
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
            <div className="relative">
              <label htmlFor="startDate" className="input-label absolute -top-2 left-3 bg-card px-1 text-xs text-muted-foreground">Start Date</label>
              <input
                name="startDate"
                type="month"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="endDate" className="input-label absolute -top-2 left-3 bg-card px-1 text-xs text-muted-foreground">End Date</label>
              <input
                name="endDate"
                type="month"
                id="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input"
                disabled={formData.current}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={formData.current}
              onChange={handleChange}
              className="checkbox"
            />
            <label htmlFor="current" className="text-muted-foreground">
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
                  <span>{editingIndex !== null ? 'Update  ' : 'Add  '}</span>
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
        {experience.length > 0 ? (
          experience.map((exp, index) => (
            <div
              key={exp._id}
              className="card p-6 border border-border"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
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
                    onClick={() => handleDelete(exp._id)}
                    className="btn-icon text-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {exp.description && <p className="text-muted-foreground mt-2">{exp.description}</p>}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center">No experience added yet.</p>
        )}
      </div>
    </div>
  );
}

export default AddExperience;
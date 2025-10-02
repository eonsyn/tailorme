import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Check, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

function AddProject({ profile }) {
  const [projects, setProjects] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    technologies: '',
    url: '',
    githubUrl: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    setProjects(profile?.projects || []);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t),
      };

      if (editingIndex !== null) {
        const projToUpdate = projects[editingIndex];
        const { project } = await api.put(`/profile/project/${projToUpdate._id}`, payload);
        setProjects(prev => prev.map((p, i) => (i === editingIndex ? project : p)));
        toast.success('Project updated!');
      } else {
        const { project } = await api.post('/profile/project', payload);
        setProjects(prev => [...prev, project]);
        toast.success('Project added!');
      }

      setFormData({
        name: '',
        description: '',
        technologies: '',
        url: '',
        githubUrl: '',
        startDate: '',
        endDate: '',
      });
      setEditingIndex(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const proj = projects[index];
    setFormData({
      ...proj,
      technologies: proj.technologies.join(', '),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/profile/project/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
      toast.success('Project deleted!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete project');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      technologies: '',
      url: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
    });
    setEditingIndex(null);
    setShowForm(false);
  };

  return (
    <div className="md:card md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Projects <span className="text-sm text-gray-500">(+10 score)</span></h2>
        {!showForm && (
          <button
            className="btn btn-outline flex items-center"
            onClick={() => {
              setShowForm(true);
              setEditingIndex(null);
              setFormData({
                name: '',
                description: '',
                technologies: '',
                url: '',
                githubUrl: '',
                startDate: '',
                endDate: '',
              });
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
            <div className="relative">
              <label htmlFor="startDate" className="input-label absolute -top-2 left-3 bg-card px-1 text-xs text-muted-foreground">Start Date</label>
              <input
                name="startDate"
                type="month"
                id="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input"
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
              />
            </div>
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
                  <span>{editingIndex !== null ? 'Update Project' : 'Add Project'}</span>
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
        {projects.length > 0 ? (
          projects.map((proj) => (
            <div key={proj._id} className="card p-6 border border-border">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{proj.name}</h3>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-sm text-muted-foreground font-medium flex flex-wrap gap-2 mt-1">
                      {proj.technologies.map((tech, i) => (
                        <span key={i} className="bg-muted px-2 py-0.5 rounded-full text-xs font-semibold">
                          {tech}
                        </span>
                      ))}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-2">
                    {proj.startDate} - {proj.endDate || 'Present'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(projects.indexOf(proj))}
                    className="btn-icon text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(proj._id)}
                    className="btn-icon text-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {proj.description && <p className="text-muted-foreground mt-2">{proj.description}</p>}
              <div className="flex gap-4 mt-4">
                {proj.url && (
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground underline transition-colors">
                    Live Demo
                  </a>
                )}
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground underline transition-colors">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center">No projects added yet.</p>
        )}
      </div>
    </div>
  );
}

export default AddProject;
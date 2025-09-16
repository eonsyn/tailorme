import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';

function AddSkills({ profile }) {
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Add Skill
  const handleAddSkill = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const formData = new FormData(e.target);
      const skill = formData.get('skill')?.trim();

      if (!skill) {
        toast.error('Skill cannot be empty');
        setIsSaving(false);
        return;
      }

      await api.post('/profile/skills', { skill });

      setSkills((prev) => [...prev, skill]);
      e.target.reset();
      setShowForm(false);
      toast.success('Skill added!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add skill');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Skill
  const handleDeleteSkill = async (skillName) => {
    try {
      await api.delete(`/profile/skills/${skillName}`);
      setSkills((prev) => prev.filter((s) => s !== skillName));
      toast.success('Skill removed!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete skill');
    }
  };

  // Initialize skills from profile
  useEffect(() => {
    setSkills(profile?.skills || []);
  }, [profile]);

  return (
    <div className="card p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Skills</h2>

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
              className="input w-full md:w-auto"
              placeholder="Enter a skill"
              autoFocus
            />
            <button type="submit" className="btn btn-primary flex items-center justify-center gap-2" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn btn-secondary flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </form>
        )}
      </div>

      <div className="flex flex-wrap gap-4 transition-all">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div
              key={index}
              className="badge badge-lg relative flex items-center"
            >
              <span className="text-sm font-medium">{skill}</span>
              <button
                type="button"
                onClick={() => handleDeleteSkill(skill)}
                className="ml-2 text-destructive hover:text-destructive-foreground transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center w-full">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}

export default AddSkills;
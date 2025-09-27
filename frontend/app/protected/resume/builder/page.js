'use client';

import { useState } from 'react';
import { Wand2, Download, Coins, Edit3, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import BasicTemp from '@/template/BasicTemp';
import ModernTemp from '@/template/ModernTemp';
import ResumeEditor from '@/components/resume/ResumeEditor';
import MinimalTemp from '@/template/MinimalTemp';
import dummydata from '@/template/resume.json';
import CoverLetter from '@/components/resume/CoverLetter'
export default function ResumeBuilderPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [progress, setProgress] = useState(0);
  const [Template, setTemplate] = useState(() => ModernTemp);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [editMode, setEditMode] = useState(false);
  const [genresume, setGenResume] = useState(null);

  const templates = [
    { id: 'modern', name: 'Modern', component: ModernTemp, preview: '/Resume/modern-preview.png' },
    { id: 'classic', name: 'Classic', component: BasicTemp, preview: '/Resume/classic-preview.png' },
    { id: 'minimal', name: 'Minimal', component: MinimalTemp, preview: '/Resume/minimal-preview.png' }
  ];

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description');
      return;
    }

    setGenerating(true);
    setGeneratedResume(null);
    setResumeId(null);
    setGenResume(null);
    setProgress(40);

    try {
      const response = await api.post('/resume/generate', { jobDescription });

      if (!response || !response.resumeData) {
        toast.error('Invalid response from server');
        setGenerating(false);
        return;
      }
      setGeneratedResume(response.resumeData.resume);
      setGenResume(response.resumeData);
      setResumeId(response.resumeId || null);
      toast.success('Resume generated successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to generate resume');
    } finally {
      setGenerating(false);
    }
  };

  const handleSaveResume = async () => {
    if (!generatedResume || !resumeId) return;
    try {
      await api.post(`/resume/update/${resumeId}`, {
        title: `Resume for ${selectedTemplate} template`,
        content: generatedResume,
      });
      toast.success('Resume saved successfully!');
      setEditMode(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save resume');
    }
  };

  const handleExport = () => window.print();

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="no-print">
        <h1 className="text-3xl font-bold text-foreground">Resume Builder</h1>
        <p className="text-muted-foreground mt-2">Create and update your tailored resume</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Job Description */}
        <div className="card p-6 no-print">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <textarea
            value={jobDescription}
            onChange={(e) => {
              const input = e.target.value;
              const nonSpaceLength = input.replace(/\s+/g, '').length;
              if (nonSpaceLength <= 2000) {
                setJobDescription(input);
              } else {
                // trim to 1500 non-space chars
                const allowed = input
                  .split('')
                  .reduce((acc, char) => {
                    if (acc.replace(/\s+/g, '').length < 2000) {
                      return acc + char;
                    }
                    return acc;
                  }, '');
                setJobDescription(allowed);
              }
            }}
            placeholder="Paste the job description here..."
            rows={12}
            className="input resize-none"
          />

          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-muted-foreground">
              {jobDescription.replace(/\s+/g, '').length}/2000
            </span>

          </div>
        </div>

        {/* Template Selection */}
        <div className="card  p-6 no-print">
          <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
          <div className="grid  grid-cols-3 gap-4">
            {templates.map((templ) => {
              const Com = templ.component; // Capitalized so React treats it as a component
              return (
                <button
                  key={templ.id}
                  onClick={() => {
                    setTemplate(() => templ.component);
                    setSelectedTemplate(templ.id);
                  }}
                  className={`p-3 rounded-lg border-2 transition-colors ${selectedTemplate === templ.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-ring'
                    }`}
                >
                  <div className="aspect-[3/4] bg-muted rounded mb-2 border relative overflow-hidden">
                    <Com data={dummydata} />
                  </div>
                  <p className="text-sm font-medium">{templ.name}</p>
                </button>
              );
            })}

          </div>
          <button
            onClick={handleGenerate}
            disabled={generating || !jobDescription.trim()}
            className="btn w-full mt-6 btn-primary"
          >
            {generating ? (
              <span className="flex items-center">
                <LoadingSpinner className="animate-spin mr-2" /> Generating...
              </span>
            ) : (
              <span className="flex items-center">
                <Coins className="w-5 h-5 mr-2" /> 1 credits Generate Resume
              </span>
            )}
          </button>
        </div>

        {/* Preview Section */}
        <div
          className={`card p-6 ${editMode ? 'lg:col-span-1' : 'lg:col-span-2'
            } flex flex-col`}
        >
          <div className="flex justify-between items-center mb-4 no-print">
            <h2 className="text-xl font-semibold">Resume Preview</h2>
            {generatedResume && (
              <div className="flex space-x-2">
                <button
                  onClick={() => (editMode ? handleSaveResume() : setEditMode(true))}
                  className="btn btn-secondary flex items-center"
                >
                  {editMode ? (
                    <>
                      <Save className="w-4 h-4 mr-2" /> Save
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" /> Edit
                    </>
                  )}
                </button>
                <button onClick={handleExport} className="btn btn-primary flex items-center">
                  <Download className="w-4 h-4 mr-2" /> Export
                </button>
              </div>
            )}
          </div>

          <div className="min-h-96 border-2 overflow-hidden rounded-lg flex items-center justify-center  ">
            {generating ? (
              <div className="text-center">
                <LoadingSpinner className="animate-spin w-8 h-8 mx-auto text-primary" />
                <p className="text-muted-foreground mt-4">Tailoring your resume... {progress}%</p>
              </div>
            ) : generatedResume ? (
              Template ? <Template data={generatedResume} /> : <p>No template</p>
            ) : (
              <div className="text-center text-muted-foreground">
                <Wand2 className="w-12 h-12 mx-auto mb-4" />
                <p>Your tailored resume will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Editor Section */}
        {editMode && (
          <div className="no-print card p-6 lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Editor</h2>
            <ResumeEditor resume={generatedResume} setResume={setGeneratedResume} />
          </div>
        )}

      </div>
      <CoverLetter data={genresume?.coverLetter} />
    </div>
  );
}

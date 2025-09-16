'use client';

import { useState } from 'react';
import { Wand2, Download, Eye, Coins } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import BasicTemp from '@/template/BasicTemp';
import ModernTemp from '@/template/ModernTemp';
export default function ResumeBuilderPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [progress, setProgress] = useState(0);
  const [Template, setTemplate] = useState(() => BasicTemp);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  const templates = [
    { id: 'modern', name: 'Modern', component: ModernTemp, preview: '/templates/modern-preview.jpg' },
    { id: 'classic', name: 'Classic', component: BasicTemp, preview: '/templates/classic-preview.jpg' },
    { id: 'minimal', name: 'Minimal', component: ModernTemp, preview: '/templates/minimal-preview.jpg' }];


  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description');
      return;
    }

    setGenerating(true);
    setJobId(null);
    setGeneratedResume(null);
    setProgress(0);

    try {
      const response = await api.post('/resume/generate', { jobDescription });
      setJobId(response.jobId);
      toast.success('Resume generation started!');
      console.log("job is :", response)
      pollJobStatus(response.jobId);
    } catch {
      toast.error('Failed to start resume generation');
      setGenerating(false);
    }
  };

  const pollJobStatus = async (jobId) => {
    console.log("job id is :", jobId)
    const poll = async () => {
      try {
        const response = await api.get(`/resume/job/${jobId}`);
        console.log("poll job status response is :", response.state)
        if (response.state === 'completed') {
          setGeneratedResume(response.result);
          setGenerating(false);
          setProgress(100);
          toast.success('Resume generated successfully!');
        } else if (response.state === 'failed') {
          setGenerating(false);
          toast.error('Resume generation failed');
        } else {
          setProgress(response.progress || 0);
          setTimeout(poll, 2000);
        }
      } catch {
        setGenerating(false);
        toast.error('Failed to check generation status');
      }
    };
    poll();
  };

  const handleSaveResume = async () => {
    if (!generatedResume) return;
    try {
      await api.post('/resume/save', {
        title: `Resume for ${selectedTemplate} template`,
        content: generatedResume
      });
      toast.success('Resume saved successfully!');
    } catch {
      toast.error('Failed to save resume');
    }
  };

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Heading (hidden on print) */}
      <div className="no-print">
        <h1 className="text-3xl font-bold text-foreground">Resume Builder</h1>
        <p className="text-muted-foreground mt-2">
          Create a tailored resume for any job description
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section (hidden on print) */}
        <div className="space-y-6 no-print">
          <div className="card p-8 relative">
            <h2 className="text-xl font-semibold text-foreground mb-4">Job Description</h2>
            <textarea
              value={jobDescription}
              onChange={(e) => {
                const input = e.target.value
                const nonSpaceLength = input.replace(/\s+/g, '').length
                if (nonSpaceLength <= 1500) {
                  setJobDescription(input)
                }
              }}
              placeholder="Paste the job description here..."
              rows={12}
              className="input resize-none text-foreground"
            />
            <span className="absolute bottom-3 right-3 text-sm text-muted-foreground">
              {jobDescription.replace(/\s+/g, '').length}/1500
            </span>
          </div>

          <div className="card p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Choose Template</h2>
            <div className="grid grid-cols-3 gap-4">
              {templates.map((templ) => (
                <button
                  key={templ.id}
                  onClick={() => {
                    setTemplate(templ.component)
                    setSelectedTemplate(templ.id)
                  }}
                  className={`p-4 rounded-lg transition-colors border-2 ${
                    selectedTemplate === templ.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-ring'
                  }`}
                >
                  <div className="aspect-[3/4] bg-muted rounded-md mb-2 border border-border"></div>
                  <p className="text-sm font-medium text-foreground">{templ.name}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || !jobDescription.trim()}
            className="btn btn-primary w-full"
          >
            {generating ? (
              <span className="flex items-center">
                < LoadingSpinner className="animate-spin mr-2" />
                Generating Resume...
              </span>
            ) : (
              <span className="flex items-center">
                <Coins className="w-5 h-5 mr-2" />2 credits to Generate
              </span>
            )}
          </button>

          {/* Progress Bar */}
          {generating && (
            <div className="w-full bg-muted rounded-full h-3 mt-4">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="card p-8">
          <div className="flex justify-between items-center mb-6 no-print">
            <h2 className="text-xl font-semibold text-foreground">Preview</h2>
            {generatedResume && (
              <div className="flex space-x-2">
                <button onClick={handleSaveResume} className="btn btn-secondary flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button onClick={handleExport} className="btn btn-primary flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export / Print
                </button>
              </div>
            )}
          </div>

          <div className="min-h-96 border-2 border-dashed border-border rounded-lg flex items-center justify-center p-4">
            {generating ? (
              <div className="text-center">
                <LoadingSpinner className="animate-spin w-8 h-8 mx-auto text-primary" />
                <p className="text-muted-foreground mt-4">Tailoring your resume... {progress}%</p>
                <p className="text-sm text-muted-foreground mt-2">This usually takes 30-60 seconds</p>
              </div>
            ) : generatedResume ? (
              // If you're using a dynamic component, this part is fine.
              // Just make sure it receives the 'generatedResume' data
              // as a prop.
              <Template data={generatedResume} />
            ) : (
              <div className="text-center text-muted-foreground">
                <Wand2 className="w-12 h-12 mx-auto mb-4 text-muted" />
                <p>Your tailored resume will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );

}
'use client';

import { Wand2, Download, Edit3, Save } from 'lucide-react';
import GlowLoader from '@/components/loading/GlowLoader';

export default function ResumePreview({
  generatedResume,
  generating,
  progress,
  Template,
  editMode,
  loading,
  onEditToggle,
  onSave,
  onExport,
}) {
  return (
    <div className="card p-6 flex flex-col">
      {/* Header with actions */}
      <div className="flex justify-between items-center mb-4 no-print">
        <h2 className="text-xl font-semibold">Preview</h2>

        {generatedResume && (
          <div className="flex space-x-2">
            <button
              onClick={onEditToggle}
              className="btn btn-secondary flex items-center"
            >
              {editMode ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </button>

            <button
              onClick={onExport}
              className="btn btn-primary flex items-center"
            >
              <Download className="w-4 h-4 mr-2" /> Export
            </button>
          </div>
        )}
      </div>

      {/* Preview area */}
      <div className="min-h-96 border-2 overflow-hidden rounded-lg flex items-center justify-center">
        {generating ? (
          <div className="text-center">
            <GlowLoader />
            <p className="text-muted-foreground mt-4">
              Tailoring your resume... {progress}%
            </p>
          </div>
        ) : generatedResume ? (
          Template ? (
            <Template data={generatedResume} />
          ) : (
            <p>No template</p>
          )
        ) : (
          <div className="text-center text-muted-foreground">
            <Wand2 className="w-12 h-12 mx-auto mb-4" />
            <p>Your tailored resume will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

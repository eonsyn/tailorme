import mongoose from 'mongoose';

const SubjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['notes', 'quantum', 'both'],
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    pdfUrl: {
      type: String,
      required: true,
    },
    cardImageUrl: {
      type: String,
      default: '', // optional
    },
    description: {
      type: String,
      default: '',
    },
    subjectCode: {
      type: String,
      default: null,
    },
    
    
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'subjects',
  }
);

// Prevent model overwrite error in development
export default mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);

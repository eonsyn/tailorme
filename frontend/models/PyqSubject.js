// models/PyqSubject.js
import mongoose from 'mongoose';

const pyqSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode:{type:String},
  fullName: { type: String, required: true },
  semester: { type: Number  },
  year:{type:Number,require:true},
  goto: { type: String, required: true },
});

export default mongoose.models.PyqSubject || mongoose.model('PyqSubject', pyqSchema);

import mongoose from 'mongoose';

const contentBlockSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: String, required: true },
  level: Number,
  items: [String],
  alt: String,
},{ _id: false });

const articleSchema = new mongoose.Schema({
  title: String,
  slug:  { type: String, unique: true },
  author: String,
  tags: [String],
  thumbnailUrl: String,
  content: [contentBlockSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isPublished: Boolean,
  expiredAt:{type:Date ,default: null ,index:{expired:0}},

});

export default mongoose.models.Article || mongoose.model('Article', articleSchema);

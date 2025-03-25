import mongoose from 'mongoose';

const News = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  summary: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  }
});

const NewsModel = mongoose.model('News', News);
export default NewsModel;

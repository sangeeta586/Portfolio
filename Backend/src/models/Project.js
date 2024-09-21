import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  technologiesUsed: {
    type: [String],
    required: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: [String], // Updated to an array for multiple images
    trim: true
  },
  startDate: {
    type: Date,
    required: true // Made required
  },
  endDate: {
    type: Date,
    required: true // Made required
  },
  githubLink: {
    type: String,
  },
  liveDemoLink: {
    type: String,
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;

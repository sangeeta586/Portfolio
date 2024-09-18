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
    type: [String],  // Array of strings
    required: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  githubLink: {
    type: String,
    trim: true
  },
  liveDemoLink: {
    type: String,
    trim: true
  }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;

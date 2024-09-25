import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  session: {
    startDate: {
      type: Date,
     
    },
    endDate: {
      type: Date
    }
  },
  achievements: {
    type: [String], // An array of strings to hold multiple achievements
    default: []
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt timestamps
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;

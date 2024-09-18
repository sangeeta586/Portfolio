import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
 
  languageType: {
    type: String,
    required: true
  },
  proficiency: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  }
}, {
  timestamps: true
});

const Language = mongoose.model('Language', languageSchema);

export default Language;

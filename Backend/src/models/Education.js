import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
    trim: true
  },
  specialization: {
    type: String,
    trim: true
  },
  instituteName: {
    type: String,
    required: true,
    trim: true
  },
  percentage: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    trim: true
  },
  session: {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    }
  }
  ,
  image:{
    type:String
  }
  ,
  description: {
    type: String,
    trim: true
  },
  achievements: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

const Education = mongoose.model('Education', educationSchema);

export default Education;

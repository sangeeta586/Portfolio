import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  session: {
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  organization: {
    type: String,
    required: true,
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  image: {
    
      type: String,  
     
  
  },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;

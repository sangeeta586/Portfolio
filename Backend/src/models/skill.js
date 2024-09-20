import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  yearsExperience: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  logo :{
    type:String
  }
  ,
projectUrl:[ {
 name :{
  type: String,
  required: false
 },
 url :{
  type: String,
  required: false
 }
}]
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;

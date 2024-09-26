import mongoose from 'mongoose';
const logoSchema = new mongoose.Schema({
  logo :{
    type:String
  }
  
});

const logo = mongoose.model('logo', logoSchema);

export default logo;

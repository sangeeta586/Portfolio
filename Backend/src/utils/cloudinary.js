import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: 'dpxo55dbc', 
  api_key: '698239919572654', 
  api_secret: 'qF5DmPwkKSsfOGcNMfy53Wv752c' 
}); 
  

  const uploadOnCloudinary = async (localFilePath) => {
    try {
      if (!localFilePath) return null;
      
      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: 'auto',
      });
  
      fs.unlinkSync(localFilePath); // Clean up the local file after upload
      return response;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error.message);
      return null;
    }
  };
  



export default uploadOnCloudinary
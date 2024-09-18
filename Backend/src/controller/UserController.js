import User from "../models/User.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import bcrypt from "bcrypt"
export const createUser = async (req, res) => {
  try {
      //console.log("req.body: ", req.body); // Log request body fields
      
      const { name, email, password, phoneNo, title, address, socialMedia } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
          return res.status(400).json({ message: 'User with this email already exists.' });
      }

      let imageLocalPath = null;
      if (req.files && req.files.image && req.files.image.length > 0) {
          imageLocalPath = req.files.image[0].path;
      }

      

      if (!imageLocalPath) {
          return res.status(400).send("Image file is required");
      }

      const image = await uploadOnCloudinary(imageLocalPath);
      

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
          name,
          email,
          password: hashedPassword,
          image: image.url,
          phoneNo,
          title,
          address,
          socialMedia
      });

      await user.save();

      res.status(201).json({
          message: 'User created successfully!',
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              image: user.image,
              phoneNo: user.phoneNo,
              title: user.title,
              address: user.address,
              socialMedia: user.socialMedia
          }
      });
  } catch (err) {
      res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token or session here (optional)
        // For simplicity, we are just returning a success message
        const token = user.createJWT()
        res.status(200).json({
            message: 'Login successful!',token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                phoneNo: user.phoneNo,
                title: user.title,
                address: user.address,
                socialMedia: user.socialMedia
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params; // Extract the user ID from the route params

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user details
        res.status(200).json({
            message: 'User found',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                phoneNo: user.phoneNo,
                title: user.title,
                address: user.address,
                socialMedia: user.socialMedia
            }
        });
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params; // Extract the user ID from the route params

        // Find and delete the user by ID
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return a success message
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { userId } = req.params; // Extract the user ID from the route params
        const updateData = req.body; // Get the update data from the request body

        // Find and update the user by ID
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the updated user details
        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                phoneNo: user.phoneNo,
                title: user.title,
                address: user.address,
                socialMedia: user.socialMedia
            }
        });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};
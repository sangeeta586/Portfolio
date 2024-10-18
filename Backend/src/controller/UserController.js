import User from "../models/User.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { StatusCodes } from 'http-status-codes';

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Signup Controller
export const signupController = async (req, res) => {
    try {
        const { name, email, password, phoneNo, title, Bio, address, socialMedia } = req.body;

        // Validate if all required fields are provided
        if (!name || !email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Name, Email, and Password are required.' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({ message: 'Email already registered. Please use a different one.' });
        }

        // Create new user instance
        const newUser = new User({
            name,
            email,
            password,
            phoneNo,
            title,
            Bio,
            address,
            socialMedia
        });

        // Save the user in the database
        const savedUser = await newUser.save();

        // Send back the response without the token
        res.status(StatusCodes.CREATED).json({
            message: 'User registered successfully.',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                phoneNo: savedUser.phoneNo,
                title: savedUser.title,
                Bio: savedUser.Bio,
                address: savedUser.address,
                socialMedia: savedUser.socialMedia
            }
        });
    } catch (error) {
        console.error('Error in user registration:', error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error, please try again later.' });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password (user not found)' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password (password mismatch)' });
        }

        // Generate a JWT token or session here
        const token = user.createJWT();
        res.status(200).json({
            message: 'Login successful!',
            token,
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
        console.error('Error during login:', err);
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
        const { userId } = req.params;
        const { name, email, password, phoneNo, title, address, socialMedia,bio } = req.body;
        console.log("Update request body:", req.body);
        console.log("Files received:", req.files);

        // Check if an image is uploaded
        let imageLocalPath = null;
        if (req.files && req.files.image && req.files.image.length > 0) {
            // Ensure the directory exists
            const tempDir = path.join(__dirname, 'public', 'temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }

            // Get the file path from Multer
            imageLocalPath = req.files.image[0].path;
            console.log("Image local path:", imageLocalPath);
        }

        // Fetch user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateData = {};
        // Process and update fields (similar to your existing logic)
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phoneNo) updateData.phoneNo = phoneNo;
        if (title) updateData.title = title;
        if (address) updateData.address = address;
        if (socialMedia) updateData.socialMedia = socialMedia;
        if (bio) updateData.bio = bio;

        // Upload image if provided
        if (imageLocalPath) {
            try {
                const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        
                if (uploadedImage && uploadedImage.url) {
                    updateData.image = uploadedImage.url;
                } else {
                    console.error("Upload failed; received invalid response:", uploadedImage);
                    return res.status(500).json({ message: 'Invalid response from image upload' });
                }
            } catch (error) {
                console.error("Error during upload:", error);
                return res.status(500).json({ message: 'Error during upload', error: error.message });
            }
        }
        
        // Perform the update
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });

        // Send response
        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};




export const getUser = async (req, res) => {
    try {
        const users = await User.findOne({}) // Retrieve all users. Adjust limit/pagination as needed.

        // Return the list of users
        res.status(200).json({
            users
        });
    } catch (err) {
        console.error('Error retrieving users:', err); // Log full error object for more details
        res.status(500).json({ message: 'Error retrieving users', error: err.message });
    }
};


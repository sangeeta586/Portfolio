// controllers/educationController.js

import Education from '../models/Education.js';
import uploadOnCloudinary from "../utils/cloudinary.js"
// Create a new education record
export const createEducation = async (req, res) => {
  try {
    const { degree, specialization, instituteName, percentage, address, session, description, achievements } = req.body;

    // Check for required fields
    if (!degree || !instituteName || !percentage || !session.start || !session.end) {
      return res.status(400).json({ message: 'Degree, Institute Name, Percentage, and Session (start & end) are required.' });
    }

    console.log("req.body", req.body);

    let imageLocalPath = null;
    if (req.files && req.files.image && req.files.image.length > 0) {
      imageLocalPath = req.files.image[0].path;
    }

    if (!imageLocalPath) {
      return res.status(400).send("Image file is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);

    console.log("image   ", imageLocalPath);

    const education = new Education({
      degree,
      specialization,
      instituteName,
      percentage,
      address,
      session,
      description,
      image: image.url,
      achievements: Array.isArray(achievements) ? achievements : [] // Assign directly as an array
    });

    await education.save();

    res.status(201).json({
      message: 'Education record created successfully!',
      education
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error creating education record', error: error.message });
  }
};



export const getAllEducation = async (req, res) => {
  try {
    const educationRecords = await Education.find(); // Fetch all education records
    if (educationRecords.length === 0) {
      return res.status(404).json({ message: 'No education records found' });
    }
    res.status(200).json(educationRecords);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get an education record by ID
export const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.status(200).json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an education record by ID
export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.status(200).json(education);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an education record by ID
export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.status(200).json({ message: 'Education record deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

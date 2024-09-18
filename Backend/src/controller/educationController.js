// controllers/educationController.js

import Education from '../models/Education.js';

// Create a new education record
export const createEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.status(201).json(education);
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

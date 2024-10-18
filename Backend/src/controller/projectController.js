import Project from '../models/Project.js';
import uploadOnCloudinary from "../utils/cloudinary.js"

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, role, technologiesUsed, url, startDate, endDate, githubLink, liveDemoLink } = req.body;
    
    let imageUrls = [];

    // Check if images are provided in the request
    if (req.files && req.files.imageUrl && req.files.imageUrl.length > 0) {
      // Iterate through each image and upload to Cloudinary
      for (const file of req.files.imageUrl) {
        const uploadedImage = await uploadOnCloudinary(file.path);
        imageUrls.push(uploadedImage.url); // Add the URL to the imageUrls array
      }
    } else {
      return res.status(400).send("Image files are required");
    }

    // Create a new project with multiple image URLs
    const project = new Project({
      name,
      description,
      role,
      technologiesUsed,
      url,
      imageUrl: imageUrls, // Store multiple image URLs in an array
      startDate,
      endDate,
      githubLink,
      liveDemoLink
    });

    await project.save();
    res.status(201).json(project);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find(); // Fetch all project records
    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a project by ID
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a project by ID
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

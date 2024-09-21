import Project from '../models/Project.js';
import uploadOnCloudinary from "../utils/cloudinary.js"

import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';


// Create a new project
export const createProject = async (req, res) => {
  try {
    const { name, description, role, technologiesUsed, url, startDate, endDate, githubLink, liveDemoLink } = req.body;
     
    let imageLocalPath = null;
    if (req.files && req.files.imageUrl && req.files.imageUrl.length > 0) {
        imageLocalPath = req.files.imageUrl[0].path;
    }

    

    if (!imageLocalPath) {
        return res.status(400).send("Image file is required");
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    const project = new Project({
      name,
      description,
      role,
      technologiesUsed,
      url,
      imageUrl:image.url, // Handle multiple image URLs
      startDate,
      endDate,
      githubLink,
      liveDemoLink
    });
    await project.save();

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

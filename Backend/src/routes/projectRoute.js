import express from 'express';
import { createProject, getProjectById, updateProject, deleteProject } from '../controller/projectController.js';

const router = express.Router();

// Route to create a new project
router.post('/create', createProject);

// Route to get a project by ID
router.get('/getById/:id', getProjectById);

// Route to update a project by ID
router.put('/update/:id', updateProject);

// Route to delete a project by ID
router.delete('/delete/:id', deleteProject);

export default router;

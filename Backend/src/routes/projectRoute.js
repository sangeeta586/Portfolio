import express from 'express';
import { createProject,getAllProjects, getProjectById, updateProject, deleteProject } from '../controller/projectController.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = express.Router();

// Route to create a new project
router.post('/create', upload.fields([{ name: 'imageUrl', maxCount: 100 }]), createProject);

// Route to get a project by ID
router.get('/getById/:id', getProjectById);
router.get('/getAll/', getAllProjects);

// Route to update a project by ID
router.put('/update/:id',upload.fields([{ name: 'imageUrl', maxCount: 100 }]), updateProject);

// Route to delete a project by ID
router.delete('/delete/:id', deleteProject);

export default router;

import express from 'express';
import { createExperience, getExperienceById, updateExperience, deleteExperience, getExperiences } from '../controller/experienceController.js'; // Adjust path as necessary

const router = express.Router();

// Route to create a new experience
router.post('/create', createExperience);

// Route to get an experience by ID
router.get('/getById/:id', getExperienceById);

// Route to update an experience by ID
router.put('/update/:id', updateExperience);

// Route to delete an experience by ID
router.delete('/delete/:id', deleteExperience);

router.get('/', getExperiences);

export default router;

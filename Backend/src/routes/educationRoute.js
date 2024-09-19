// routes/educationRoutes.js

import express from 'express';
import {
  createEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
  getAllEducation
} from '../controller/educationController.js';
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

// Create a new education record
router.post('/create',authMiddleware, createEducation);

// Get an education record by ID
router.get('/getById/:id',authMiddleware, getEducationById);
router.get('/getAllEdu', getAllEducation);

// Update an education record by ID
router.put('/update/:id', authMiddleware,updateEducation);

// Delete an education record by ID
router.delete('/delete/:id',authMiddleware, deleteEducation);

export default router;

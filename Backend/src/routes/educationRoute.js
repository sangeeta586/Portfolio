// routes/educationRoutes.js

import express from 'express';
import {
  createEducation,
  getEducationById,
  updateEducation,
  deleteEducation,
  getAllEducation
} from '../controller/educationController.js';
//import authMiddleware from "../middleware/authMiddleware.js"
import { upload } from '../middleware/multerMiddleware.js';
const router = express.Router();

// Create a new education record
router.post('/create',upload.fields([{ name: 'image', maxCount: 1 }]), createEducation);

// Get an education record by ID
router.get('/getById/:id', getEducationById);
router.get('/getAllEdu', getAllEducation);

// Update an education record by ID
router.put('/update/:id',upload.fields([{ name: 'image', maxCount: 1 }]),updateEducation);

// Delete an education record by ID
router.delete('/delete/:id', deleteEducation);

export default router;

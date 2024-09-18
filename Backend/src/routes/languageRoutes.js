import express from 'express';
import {
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getLanguageById
} from '../controller/languageController.js';

const router = express.Router();

// Create a new language
router.post('/create', createLanguage);

// Update a language by ID
router.put('/update/:id', updateLanguage);

// Delete a language by ID
router.delete('/delete/:id', deleteLanguage);

// Get a language by ID
router.get('/getById/:id', getLanguageById);

export default router;

import express from 'express';
import { upload } from '../middleware/multerMiddleware.js';
import { createLogo, deleteLogo, getLogos, updateLogo } from '../controller/logoController.js';


const router = express.Router();

// Route to get all projects

router.post('/', upload.fields([{ name: 'logo', maxCount: 1 }]), createLogo);
router.get('/', getLogos);
router.put('/:id',upload.fields([{ name: 'logo', maxCount: 1 }]), updateLogo);
router.get('/:id', deleteLogo);


export default router;
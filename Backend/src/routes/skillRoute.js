import express from 'express';
import { createSkill,getSkillById, updateSkill,deleteSkill,getAllSkills} from '../controller/skillController.js';
import authMiddleware from "../middleware/authMiddleware.js"
import { upload } from '../middleware/multerMiddleware.js';
const router = express.Router();

router.post('/create', upload.fields([{ name: 'logo', maxCount: 1 }]),createSkill) 

// Get a skill by ID
router.get('/getById/:id', getSkillById);
router.get('/getAllSkills', getAllSkills);

// Update a skill by ID
router.put('/update/:id',upload.fields([{ name: 'logo', maxCount: 1 }]), updateSkill);

// Delete a skill by ID
router.delete('/delete/:id',authMiddleware, deleteSkill);

export default router;
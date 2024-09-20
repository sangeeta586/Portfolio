import express from 'express';
import { createSkill,getSkillById, updateSkill,deleteSkill,getAllSkills} from '../controller/skillController.js';
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post('/create', authMiddleware,createSkill);

// Get a skill by ID
router.get('/getById/:id',authMiddleware, getSkillById);
router.get('/getAllSkills', getAllSkills);

// Update a skill by ID
router.put('/update/:id',authMiddleware, updateSkill);

// Delete a skill by ID
router.delete('/delete/:id',authMiddleware, deleteSkill);

export default router;
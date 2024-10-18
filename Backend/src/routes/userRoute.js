import express from 'express';
import { loginUser, getUserById,deleteUserById,updateUserById, getUser, signupController  } from '../controller/UserController.js';
import { upload } from '../middleware/multerMiddleware.js';
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();


router.post(
    '/signup',
   
    signupController
);

router.post('/login', loginUser);
router.get('/getById/:userId',authMiddleware, getUserById);
router.delete('/delete/:userId', deleteUserById);
router.put('/update/:userId', 
    upload.fields([{ name: 'image', maxCount: 10 }]), // Ensure this is correctly placed before updateUserById
    updateUserById
);

// router.put('/update/:userId', updateUserById);
router.delete('/delete/:userId', deleteUserById);
router.get('/getUser',getUser)


export default router;

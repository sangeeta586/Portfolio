import express from 'express';
import { createUser ,loginUser} from '../controller/UserController.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = express.Router();

router.post(
    '/create',
    upload.fields([{ name: 'image', maxCount: 1 }]), // Use maxCount of 1 for a single file
    createUser
);

router.post('/login', loginUser);

export default router;

import express from 'express';
import { createCertificate, deleteCertificate, updateCertificate, getCertificateById, getAllCertificates } from '../controller/certificateController.js'; // Adjust the path as needed
import { upload } from '../middleware/multerMiddleware.js'; // Adjust the path as needed
import authMiddleware from "../middleware/authMiddleware.js"
const router = express.Router();

router.post('/create', upload.fields([{ name: 'image', maxCount: 1 }]),authMiddleware, createCertificate);
router.delete('/delete/:id',authMiddleware, deleteCertificate);
router.put('/update/:id', upload.fields([{ name: 'image', maxCount: 1 }]),authMiddleware, updateCertificate);
router.get('/getById/:id',authMiddleware, getCertificateById);
router.get('/gettAllcertificates',getAllCertificates);



export default router;

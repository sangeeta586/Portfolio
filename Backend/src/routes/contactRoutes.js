import express from "express"
const router = express.Router();

import {createContact,getAllContacts} from "../controller/contactController.js"

// Route to create a contact
router.post('/create', createContact);

// Route to get all contacts
router.get('/', getAllContacts);

 export default router;

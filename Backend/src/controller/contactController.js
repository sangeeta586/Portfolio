import Contact from "../models/Contact.js"

// Create a new contact entry
export const createContact = async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const newContact = await Contact.create({ name, email, subject, message });
        res.status(201).json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating contact', error });
    }
};

// Get all contact entries
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
};

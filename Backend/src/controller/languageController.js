import Language from '../models/Language.js';

// Create a new language
export const createLanguage = async (req, res) => {
  try {
    const language = new Language(req.body);
    await language.save();
    res.status(201).json(language);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a language by ID
export const updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLanguage = await Language.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedLanguage) return res.status(404).json({ message: 'Language not found' });
    res.json(updatedLanguage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a language by ID
export const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLanguage = await Language.findByIdAndDelete(id);
    if (!deletedLanguage) return res.status(404).json({ message: 'Language not found' });
    res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a language by ID
export const getLanguageById = async (req, res) => {
  try {
    const { id } = req.params;
    const language = await Language.findById(id);
    if (!language) return res.status(404).json({ message: 'Language not found' });
    res.json(language);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

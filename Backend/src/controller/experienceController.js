import Experience from '../models/experienceModel.js'; // Adjust path as necessary

// Create a new experience
export const createExperience = async (req, res) => {
  const { jobTitle, company, session, achievements } = req.body;




  const experience = new Experience({
    jobTitle,
    company,
    session,
    achievements,
    
  });

  try {
    const savedExperience = await experience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    console.error('Error saving experience:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get experience by ID
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an experience by ID
export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an experience by ID
export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.status(204).json(); // No content
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all experiences

export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    if (experiences.length === 0) {
      return res.status(404).json({ message: 'No experiences found' });
    }
    res.json(experiences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

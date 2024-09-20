import Skill from "../models/skill.js"

export const createSkill = async (req, res) => {
  try {
    const { name, yearsExperience, description, rating, projectUrl } = req.body;
    
    
    const skillExists = await Skill.findOne({ name });
    if (skillExists) {
      return res.status(400).json({ message: 'Skill already exists.' });
    }

    // Create a new skill instance
    const skill = new Skill({
      name,
      yearsExperience,
      description,
      rating,
      projectUrl // Updated to match schema field name
    });

    // Save the skill to the database
    await skill.save();
    
    res.status(201).json({
      message: 'Skill created successfully!',
      skill
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

  export const getSkillById = async (req, res) => {
    try {
      const skill = await Skill.findById(req.params.id);
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      res.json(skill);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  export const updateSkill = async (req, res) => {
    try {
      const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      res.json(skill);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  export const deleteSkill = async (req, res) => {
    try {
      const skill = await Skill.findByIdAndDelete(req.params.id);
      if (!skill) {
        return res.status(404).json({ message: 'Skill not found' });
      }
      res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
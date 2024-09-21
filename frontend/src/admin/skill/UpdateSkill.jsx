import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";

const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateSkill = ({ showModal, skill }) => {
  const [skillData, setSkillData] = useState({
    name: '',
    yearsExperience: '',
    description: '',
    rating: '',
    projectUrl: [{ name: '', url: '' }] // Initialize with one empty project URL
  });

  useEffect(() => {
    if (skill) {
      // If we are editing an existing skill, populate the form with the skill data
      setSkillData({
        name: skill.name,
        yearsExperience: skill.yearsExperience,
        description: skill.description,
        rating: skill.rating,
        projectUrl: skill.projectUrl.length > 0 ? skill.projectUrl : [{ name: '', url: '' }]
      });
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProjectUrl = [...skillData.projectUrl];
    updatedProjectUrl[index][name] = value;
    setSkillData((prevData) => ({
      ...prevData,
      projectUrl: updatedProjectUrl,
    }));
  };

  const addProjectUrl = () => {
    setSkillData((prevData) => ({
      ...prevData,
      projectUrl: [...prevData.projectUrl, { name: '', url: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = skill 
        ? `${BASE_URL}/api/skills/update/${skill._id}`  // Update existing skill
        : `${BASE_URL}/api/skills/create`;              // Create a new skill
      const method = skill ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });

      if (response.ok) {
        console.log(skill ? 'Skill updated successfully!' : 'Skill added successfully!');
        showModal(false); // Close modal
      } else {
        console.error('Failed to save skill:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4  rounded-lg shadow-lg max-h-screen overflow-y-auto">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
        <div className='flex justify-between content-center items-center'>
          <h2 className="text-2xl font-bold mb-4">{skill ? 'Update Skill' : 'Add Skill'}</h2>
          <IoMdClose onClick={() => showModal(false)} className='text-2xl cursor-pointer' />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Skill Name</label>
          <input
            type="text"
            name="name"
            value={skillData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Years of Experience</label>
          <input
            type="number"
            name="yearsExperience"
            value={skillData.yearsExperience}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={skillData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={skillData.rating}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <h3 className="text-lg font-semibold mb-2">Project URLs</h3>
        {skillData.projectUrl.map((project, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => handleProjectChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
            <input
              type="url"
              name="url"
              placeholder="Project URL"
              value={project.url}
              onChange={(e) => handleProjectChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>
        ))}
        <button type="button" onClick={addProjectUrl} className="bg-blue-500 text-white py-2 px-4 rounded mb-4 mr-4">
          Add Project URL
        </button>

        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded">
          {skill ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>
    </div>
  );
};

export default UpdateSkill;

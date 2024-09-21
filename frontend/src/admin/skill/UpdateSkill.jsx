import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL; // Your API base URL

const UpdateSkill = () => {
  const { id } = useParams(); // Get ID from URL
  const [skillData, setSkillData] = useState({
    name: '',
    yearsExperience: '',
    description: '',
    rating: '',
    projectUrl: [{ name: '', url: '' }] // Initialize with one empty project URL
  });

  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/skills/getById/${id}`); // Fetch skill data by ID
        const data = await response.json();
        setSkillData({
          name: data.name,
          yearsExperience: data.yearsExperience,
          description: data.description,
          rating: data.rating,
          projectUrl: data.projectUrl.length > 0 ? data.projectUrl : [{ name: '', url: '' }] // Use existing project URLs or initialize with one
        });
      } catch (error) {
        console.error('Error fetching skill data:', error);
      }
    };

    fetchSkillData();
  }, [id]);

  console.log("skilldata    ",skillData)

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
      const response = await fetch(`${BASE_URL}/api/skills/update/${id}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(skillData),
      });

      if (response.ok) {
        console.log('Skill updated successfully!');
        // Optionally, navigate back or reset the form
      } else {
        console.error('Failed to update skill:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Update Skill</h2>

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
      <button
        type="button"
        onClick={addProjectUrl}
        className="mb-4 text-pink-500 hover:underline"
      >
        Add another project
      </button>

      <button
        type="submit"
        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
      >
        Submit Skill
      </button>
    </form>
  );
};

export default UpdateSkill;

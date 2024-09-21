import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const CreateSkill = () => {
  const [formData, setFormData] = useState({
    name: '',
    yearsExperience: '',
    description: '',
    rating: '',
    logo: null,
    projectUrl: [
      { name: '',
         url: '' 
        }
    ],
  });
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProjectUrlChange = (index, e) => {
    const { name, value } = e.target;
    const newProjectUrls = [...formData.projectUrl];
    newProjectUrls[index][name] = value;
    setFormData({
      ...formData,
      projectUrl: newProjectUrls,
    });
  };

  const addProjectUrl = () => {
    setFormData({
      ...formData,
      projectUrl: [...formData.projectUrl, { name: '', url: '' }],
    });
  };

  const handleLogoChange = (e) => {
    setFormData({
      ...formData,
      logo: e.target.files[0], // Store the file object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      if (key === 'projectUrl') {
        formData[key].forEach((item, index) => {
          formDataToSubmit.append(`projectUrl[${index}].name`, item.name);
          formDataToSubmit.append(`projectUrl[${index}].url`, item.url);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/api/skills/create`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Skill created successfully:', response.data);
      setFormData({
        name: '',
        yearsExperience: '',
        description: '',
        rating: '',
        logo: null,
        projectUrl: [{ name: '', url: '' }],
      });
      navigate('/skill');
    } catch (error) {
      console.error('Error creating skill:', error);
    }
  };
  

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Skill Form</h2>
      <form onSubmit={handleSubmit} data-aos="fade-up">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Skill Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="yearsExperience">Years of Experience</label>
          <input
            type="number"
            name="yearsExperience"
            id="yearsExperience"
            value={formData.yearsExperience}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="rating">Rating</label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            min="1"
            max="5"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="logo">Logo</label>
          <input
            type="file"
            name="logo"
            id="logo"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Project URLs</label>
          {formData.projectUrl.map((project, index) => (
            <div key={index} className="flex mb-2 space-x-2">
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => handleProjectUrlChange(index, e)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="url"
                name="url"
                placeholder="Project URL"
                value={project.url}
                onChange={(e) => handleProjectUrlChange(index, e)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          ))}
          <button type="button" onClick={addProjectUrl} className="text-pink-500 hover:underline">
            Add another project URL
          </button>
        </div>
        <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded-md hover:bg-pink-600 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateSkill;

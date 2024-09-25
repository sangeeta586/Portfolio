import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdClose } from "react-icons/md";

const BASE_URL = import.meta.env.VITE_API_URL;

const AddExperience = ({ showmodel, selectedExe,fetchExperience }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    session: {
      start: '',
      end: '',
    },
    
    achievements: [''],
  });

  useEffect(() => {
    if (selectedExe) {
      setFormData({
        jobTitle: selectedExe.jobTitle || '',
        company: selectedExe.company || '',
        achievements: selectedExe.achievements || [''],
        session: {
          start: selectedExe.session?.start ? selectedExe.session.start.split('T')[0] : '',
          end: selectedExe.session?.end ? selectedExe.session.end.split('T')[0] : '',
        },
      });
    } else {
      setFormData({
        jobTitle: '',
        company: '',
        achievements: [''],
        session: { start: '', end: '' },
      });
    }
  }, [selectedExe]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('achievements-')) {
      const index = parseInt(name.split('-')[1]);
      const updatedAchievements = [...formData.achievements];
      updatedAchievements[index] = value;
      setFormData((prev) => ({
        ...prev,
        achievements: updatedAchievements,
      }));
      return;
    }

    // Check for nested session updates
    if (name === 'start' || name === 'end') {
      setFormData((prev) => ({
        ...prev,
        session: {
          ...prev.session,
          [name]: value, // Update the start or end date
        },
      }));
      return;
    }

    // Update the state directly for other fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ''], // Add a new empty achievement
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construct the data to send
    const formDataToSend = {
      jobTitle: formData.jobTitle,
      company: formData.company,
      session: {
        startDate: formData.session.start,  // use startDate instead of start
        endDate: formData.session.end,      // use endDate instead of end
      },
      achievements: formData.achievements.filter(achievement => achievement.trim() !== ''),
    };
  
    try {
      if (selectedExe) {
        // Update existing experience
        await axios.put(`${BASE_URL}/api/experiences/update/${selectedExe._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        fetchExperience()
        console.log('Experience updated');

      } else {
        // Create a new experience
        await axios.post(`${BASE_URL}/api/experiences/create`, formDataToSend, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Experience created');
        fetchExperience()
      }
      showmodel(false); // Close the modal after submission
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };
  
  
  

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg bg-white h-auto overflow-y-auto">
      <div className='flex justify-between items-center '>
        <h2 className="text-2xl font-bold mb-4">{selectedExe ? 'Update Experience' : 'Add Experience'}</h2>
        <MdClose onClick={() => showmodel(false)} className='cursor-pointer' />
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Job Title Field */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        {/* Company Field */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        {/* Start Date Field */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="start"
            value={formData.session.start}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        {/* End Date Field */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="end"
            value={formData.session.end}
            onChange={handleChange}
            
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
       
        
        {/* Achievements Field */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Achievements</label>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                name={`achievements-${index}`}
                value={achievement}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
               
              />
              {index === formData.achievements.length - 1 && (
                <button type="button" onClick={handleAddAchievement} className="ml-2 text-blue-500">
                  Add Achievement
                </button>
              )}
            </div>
          ))}
        </div>
        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {selectedExe ? 'Update Experience' : 'Add Experience'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExperience;

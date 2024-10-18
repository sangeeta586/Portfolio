import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddExperience from './AddExperience';
import { motion } from 'framer-motion';

export const ExperienceHomePage = () => {
  const [experience, setExperience] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [selectedExe, setSelectedExe] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await axios.get(`${URI}/api/experiences/`);
      setExperience(response.data);  // Assuming response.data contains the array of experience objects
    } catch (error) {
      console.error('Error fetching experience data:', error);
    }
  };

  // Helper function to format dates as "Month Year"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAddExperience = () => {
    setSelectedExe(null);
    setShowModel(true);
  };

  const handleUpdateExperience = (exe) => {
    setSelectedExe(exe);
    setShowModel(true);
  };

  const handleDeleteExperience = async (id) => {
    try {
      await axios.delete(`${URI}/api/experiences/delete/${id}`); // Adjust the endpoint as necessary
      // Remove the deleted experience from the state
      setExperience((prevExperience) => prevExperience.filter(exp => exp._id !== id));
      console.log('Experience deleted successfully');
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  return (
    <motion.div 
    className="form-container"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative lg:px-20 md:mx-0 ml-20 md:px-0 px-2 py-20">
      <div className='flex justify-between content-center items-center gap-4'>
        <h2 className="mb-8 lg:text-3xl md:text-xl text-sm font-light text-center text-blue-600">
          MY Work Experience
        </h2>
        <button
          onClick={handleAddExperience}
          className="Add-Experience border "
        >
          Add Experience
        </button>
      </div>
      {/* Timeline vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-[70%] w-[1px] bg-gray-400 lg:block md:block hidden"></div>
      <ul className="timeline relative list-none p-0 font-light">
        {experience.map((item, index) => (
          <li key={index} className={`mb-8 w-full flex justify-between items-center ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
            {/* Circle on the line */}
            <div className="w-6 h-6 bg-gray-400 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
            <div className="bg-white shadow-lg border border-gray-200 w-full md:w-1/2 p-6 relative">
              <h4 className="text-blue-600 font-medium">{item.jobTitle} - {item.company}</h4>
              <ul className="mt-4 list-disc pl-5">
                {item.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              <p className="mt-4 text-lg text-right">
                {item.session?.startDate ? formatDate(item.session.startDate) : 'Start Date not available'} -
                {item.session?.endDate ? formatDate(item.session.endDate) : 'End Date not available'}
              </p>

              <div className="flex justify-between">
                <button onClick={() => handleUpdateExperience(item)} className="text-blue-600">Edit</button>
                <button onClick={() => handleDeleteExperience(item._id)} className="text-red-600">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showModel && (
        <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50 z-10">
          <AddExperience showmodel={setShowModel} selectedExe={selectedExe} fetchExperience={fetchExperience} />
        </div>
      )}
    </div>
    </motion.div>
  );
};

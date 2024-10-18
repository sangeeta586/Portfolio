import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext'; // Import your theme context
import { motion } from 'framer-motion';

export const Aboutme = () => {
  const [userProfile, setUserProfile] = useState(null); // Initialize state as null
  const URI = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useTheme(); // Get dark mode state from context

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch data only on component mount

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${URI}/api/users/getUser`);
      // Assuming the first user in the response is the desired user profile
      setUserProfile(response.data.users);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

 
  const resumeLink = userProfile?.socialMedia?.find((social) => social.name === 'resume')?.url;

  return (
    <motion.div 
      className="form-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
    <section id="about" className={`py-12 max-w-7xl mx-auto lg:px-0 md:px-0 px-5 ${isDarkMode ? 'bg-gray-900 text-white' : ''}`}>
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
     
      <div
                  className={`text-lg mb-6  `}
                  dangerouslySetInnerHTML={{ __html: userProfile?.bio }} // Assuming skill.description contains the rich text
                />

      <div className="flex space-x-4">
        {/* Display resume link if it exists */}
        {resumeLink && (
          <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            View Resume
          </a>
        )}
       <a 
          href="#contact" 
          className={`border px-4 py-2 rounded transition duration-300 ease-in-out 
            ${isDarkMode ? 'bg-gray-900 text-white border-gray-700 hover:bg-gray-800' : 'border-gray-800 text-gray-800 hover:bg-gray-100 hover:text-black'}`}
        >
          Contact Me
        </a>
      </div>
    </section>
    </motion.div>
  );
};

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext'; // Import your theme context

export const Footer = () => {
  const [userProfile, setUserProfile] = useState(null);
  const URI = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useTheme(); // Get dark mode state from context

  useEffect(() => {
    fetchUserProfile();
  }, []); 

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${URI}/api/users/getUser`);
      
      setUserProfile(response.data.users);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <footer className={`py-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'}`}>
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">&copy; 2024 {userProfile ? userProfile.name : 'Sangeeta'}</p>
        <p>{userProfile ? userProfile.title : 'All rights reserved.'}</p>

        {/* Navigation Links */}
        <div className="mt-4">
          <a href="#home" className={`mx-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>About Us</a>
          <a href="#about" className={`mx-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Services</a>
          <a href="#workexperience" className={`mx-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Projects</a>
          <a href="#skills" className={`mx-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Skills</a>
          <a href="#education" className={`mx-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Contact</a>
          <a href="#projects" className={`mx-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Education</a>
          <a href="#contact" className={`mx-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>Contact</a>
        </div>

        {/* Social Media Links */}
        <div className="mt-4">
          {userProfile && userProfile.socialMedia && userProfile.socialMedia.map((media) => (
            <a 
              key={media._id.$oid} 
              href={media.url} 
              className={`mx-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className={`fab fa-${media.name}`}></i> {/* Icon based on social media name */}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Footer = () => {
  const [userProfile, setUserProfile] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserProfile();
  }, []); 

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${URI}/api/users/getUser`);
      console.log("Fetched data:", response.data.users); // Log fetched data
      setUserProfile(response.data.users);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <footer className="bg-gray-800 text-white text-center py-6">
      <div className="container mx-auto">
        <p className="text-lg font-semibold">&copy; 2024 {userProfile ? userProfile.name : 'Sangeeta'}</p>
        <p>{userProfile ? userProfile.title : 'All rights reserved.'}</p>

     

        {/* Navigation Links */}
        <div className="mt-4">
          <a href="#home" className="text-gray-400 hover:text-white mx-2">About Us</a>
          <a href="#about" className="text-gray-400 hover:text-white mx-2">Services</a>
          <a href="#workexperience" className="text-gray-400 hover:text-white mx-2">Projects</a>
          <a href="#skills" className="text-gray-400 hover:text-white mx-2">Skills</a>
          <a href="#education" className="text-gray-400 hover:text-white mx-2">Contact</a>
          <a href="#projects" className="text-gray-400 hover:text-white mx-2">Education</a>
          <a href="#contact" className="text-gray-400 hover:text-white mx-2">Contact</a>
        </div>

        {/* Social Media Links */}
        <div className="mt-4">
          {userProfile && userProfile.socialMedia && userProfile.socialMedia.map((media) => (
            <a 
              key={media._id.$oid} 
              href={media.url} 
              className="text-gray-400 hover:text-white mx-2" 
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

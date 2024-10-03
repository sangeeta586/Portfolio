// Navbar.js
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext'; // Import useTheme
import axios from 'axios';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme context
  const URI = import.meta.env.VITE_API_URL;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getLogo = async () => {
    try {
      const resp = await axios.get(`${URI}/api/logo/`);
      setLogo(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  useEffect(() => {
    getLogo();
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md z-50`}>
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <a href="#" className="flex items-center">
          {logo.length > 0 ? (
            logo.map((log) => (
              <img
                key={log.id}
                src={log.logo}
                alt="logo"
                className="h-10 w-32 rounded-full object-cover"
              />
            ))
          ) : (
            <p>Loading logo...</p>
          )}
        </a>
        
       
        <div className={`lg:flex space-x-5 ${isMenuOpen ? 'flex-col lg:hidden' : 'hidden'}`}>
          <a href="#home" className="hover:text-gray-900">Home</a>
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#workexperience" className="hover:text-gray-900">Experience</a>
          <a href="#education" className="hover:text-gray-900">Education</a>
          <a href="#skills" className="hover:text-gray-900">Skills</a>
          <a href="#projects" className="hover:text-gray-900">Projects</a>
          <a href="#contact" className="hover:text-gray-900">Contact</a>
          <a href="/login" className="hover:text-gray-900">Login</a>
        </div>
        
        <button onClick={toggleTheme} className="p-2">
          <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <button className="lg:hidden px-4 py-2" onClick={toggleMenu}>
          <i className={`fa-solid ${isMenuOpen ? 'fa-x' : 'fa-bars'}`}></i>
        </button>
        
        {isMenuOpen && (
          <div className={`fixed top-0 right-0 w-3/4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} h-full shadow-lg lg:hidden z-50`}>
            <div className="flex justify-between items-center p-4">
              <button onClick={toggleMenu}>
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4">
              <a href="#home" className="hover:text-gray-900" onClick={toggleMenu}>Home</a>
              <a href="#about" className="hover:text-gray-900" onClick={toggleMenu}>About</a>
              <a href="#workexperience" className="hover:text-gray-900">Experience</a>
              <a href="#education" className="hover:text-gray-900">Education</a>
              <a href="#skills" className="hover:text-gray-900">Skills</a>
              <a href="#projects" className="hover:text-gray-900">Projects</a>
              <a href="#contact" className="hover:text-gray-900">Contact</a>
              <a href="/login" className="hover:text-gray-900">Login</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

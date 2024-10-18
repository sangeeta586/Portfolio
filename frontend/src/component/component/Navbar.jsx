// Navbar.js
import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext'; // Import useTheme
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme context
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate(); // Hook for programmatic navigation


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

  const handleLogin = async () => {
    const { value: credentials } = await Swal.fire({
      title: 'Verify-admin',
      html:
        '<input id="password" type="password" class="swal2-input" placeholder="Enter screet Key">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Login',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const password = document.getElementById('password').value;
        return {password };
      }
    });

    if (credentials) {
      const { password } = credentials;

      // Static validation
      if (password === '847230') {
        
        navigate('/login-ramnarayanMandal'); 
      } else {
        // Show error using SweetAlert2
        await Swal.fire({
          icon: 'error',
          title: 'Your are not Admin',
          text: 'Invalid your screet key.',
        });
      }
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
                className="h-6 w-full rounded-full object-cover"
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
          <a href="#certificate" className="hover:text-gray-900">Certificate</a>
          <a href="#blog" className="hover:text-gray-900">Blogs</a>

          <a href="#contact" className="hover:text-gray-900">Contact</a>
          <button onClick={handleLogin} className="hover:text-gray-900">Login</button>
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
              <button onClick={handleLogin} className="hover:text-gray-900">Login</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

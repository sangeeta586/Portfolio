import React, { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <a href="#" className="flex items-center">
          <img
            src="https://i.postimg.cc/XJFMdqW2/signature.png"
            alt="signature"
            className="w-24"
          />
        </a>
        <button
          className="lg:hidden px-4 py-2"
          onClick={toggleMenu}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-x' : 'fa-bars'}`}></i>
        </button>
        <div className={`lg:flex space-x-5 ${isMenuOpen ? 'flex-col lg:hidden' : 'hidden'}`}>
          <a href="#home" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
          <a href="#workexperience" className="text-gray-700 hover:text-gray-900">Experience</a>
          <a href="#education" className="text-gray-700 hover:text-gray-900">Education</a>
          <a href="#skills" className="text-gray-700 hover:text-gray-900">Skills</a>
          <a href="#projects" className="text-gray-700 hover:text-gray-900">Projects</a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
          <a href="/login" className="text-gray-700 hover:text-gray-900">Login</a>
        </div>
        {isMenuOpen && (
          <div className="fixed top-0 right-0 w-3/4 bg-white h-full shadow-lg lg:hidden z-50">
            <div className="flex justify-between items-center p-4">
              <button onClick={toggleMenu}>
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 p-4">
              <a href="#home" className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>Home</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>About</a>
              <a href="#workexperience" className="text-gray-700 hover:text-gray-900">Experience</a>
              <a href="#education" className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>Education</a>
              <a href="#skills" className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>Skills</a>
              <a href="#projects" className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>Projects</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>Contact</a>
              <a href="/login" className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>Login</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

import React from 'react'

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md">
    <nav className="flex items-center justify-between p-4 max-w-7xl mx-auto">
      <a href="#" className="flex items-center">
        <img src="https://i.postimg.cc/XJFMdqW2/signature.png" alt="signature" className="w-24" />
      </a>
      <button className="lg:hidden px-4 py-2">
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="hidden lg:flex space-x-4">
        <a href="#home" className="text-gray-700 hover:text-gray-900">Home</a>
        <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
        <a href="#education" className="text-gray-700 hover:text-gray-900">Education</a>
        <a href="#skills" className="text-gray-700 hover:text-gray-900">Skills</a>
        <a href="#projects" className="text-gray-700 hover:text-gray-900">Projects</a>
        <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
      </div>
    </nav>
  </header>
  )
}

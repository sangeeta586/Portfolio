import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-wrapper">
      <div className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
        <ul>
          <div className="profile">
            <img 
              src="https://i.pinimg.com/originals/6d/1f/20/6d1f2038bcf52a4cc496489fcd2139a6.jpg" 
              alt="profile pic"
            />
            <span>Username</span>
          </div>
          <div className="indicator" id="indicator"></div>
          <li><i className="icon"><i className="fa-solid fa-house"></i></i><span>Profile</span></li>
          <li><i className="icon"><i className="fa-solid fa-envelope"></i></i><span>Skills</span></li>
          <li><i className="icon"><i className="fa-solid fa-chart-column"></i></i><span>Projects</span></li>
          <li><i className="icon"><i className="fa-solid fa-gem"></i></i><span>Experience</span></li>
          <li><i className="icon"><i className="fa-solid fa-gem"></i></i><span>Education</span></li>
          <li><i className="icon"><i className="fa-solid fa-gem"></i></i><span>Contact Info</span></li>
          <li><i className="icon"><i className="fa-solid fa-right-from-bracket"></i></i><span>Logout</span></li>
        </ul>
      </div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className={`fa-solid ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
      </button>

      
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { FaHouseUser, FaSignOutAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { GoProjectSymlink } from "react-icons/go";
import { GiSkills } from "react-icons/gi";
import { SiKnowledgebase } from "react-icons/si";
import { MdCastForEducation } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
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
          <li><i className="icon"><FaHouseUser /></i><span>Profile</span></li>
          <li><i className="icon"><GiSkills /></i><span>Skills</span></li>
          <li><i className="icon"><GoProjectSymlink /></i><span>Projects</span></li>
          <li><i className="icon"><SiKnowledgebase /></i><span>Experience</span></li>
          <li><i className="icon"><MdCastForEducation /></i><span>Education</span></li>
          <li><i className="icon"><MdContactPhone /></i><span>Contact Info</span></li>
          <li><i className="icon"><FaSignOutAlt /></i><span>Logout</span></li>
        </ul>
      </div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className="icon">{isOpen ? <FaAngleLeft /> : <FaAngleRight />}</i>
      </button>
    </div>
  );
};

export default Sidebar;

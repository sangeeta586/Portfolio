import React, { useState } from 'react';
import { FaHouseUser, FaSignOutAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { GoProjectSymlink } from "react-icons/go";
import { GiSkills } from "react-icons/gi";
import { SiKnowledgebase } from "react-icons/si";
import { MdCastForEducation } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import './Sidebar.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { label: 'Profile', icon: <FaHouseUser />, route: '/profile' },
    { label: 'Skills', icon: <GiSkills />, route: '/skill' },
    { label: 'Projects', icon: <GoProjectSymlink />, route: '/projects' },
    { label: 'Experience', icon: <SiKnowledgebase />, route: '/experience' },
    { label: 'Education', icon: <MdCastForEducation />, route: '/education' },
    { label: 'Contact Info', icon: <MdContactPhone />, route: '/contact' },
    { label: 'Logout', icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div className="sidebar-wrapper text-base font-semibold font-serif">
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
          {menuItems.map((item, index) => (
            <li key={index} onClick={item.action ? item.action : () => navigate(item.route)}>
              <i className="icon">{item.icon}</i>
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className="icon">{isOpen ? <FaAngleLeft /> : <FaAngleRight />}</i>
      </button>
    </div>
  );
};

export default Sidebar;

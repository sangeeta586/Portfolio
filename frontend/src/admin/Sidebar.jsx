import React, { useState, useEffect } from 'react';
import { FaHouseUser, FaSignOutAlt, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { GoProjectSymlink } from "react-icons/go";
import { GiSkills } from "react-icons/gi";
import { SiKnowledgebase } from "react-icons/si";
import { MdCastForEducation, MdContactPhone } from "react-icons/md";
import axios from 'axios'; // Import axios if not already
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${URI}/api/users/getUser`);
      setUserProfile(response.data.users);
      
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile(); // Fetch user profile on component mount
  }, []);

  const menuItems = [
    { label: 'Profile', icon: <FaHouseUser />, route: '/admin-dashboard' },
    { label: 'Skills', icon: <GiSkills />, route: '/skill' },
    { label: 'Projects', icon: <GoProjectSymlink />, route: '/projects' },
    { label: 'Experience', icon: <SiKnowledgebase />, route: '/experience' },
    { label: 'Education', icon: <MdCastForEducation />, route: '/education' },
    { label: 'Contact Info', icon: <MdContactPhone />, route: '/contact' },
    { label: 'Logout', icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div className="sidebar-wrapper text-base font-semibold font-serif z-10">
      <div className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
        <ul>
          <div className="profile">
            {/* Dynamically display user profile data */}
            <img 
              src={userProfile?.image || "https://i.pinimg.com/originals/6d/1f/20/6d1f2038bcf52a4cc496489fcd2139a6.jpg"} 
              alt="profile pic"
            />
            <span>{userProfile?.name || 'Username'}</span>
  
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

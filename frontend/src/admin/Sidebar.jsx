import React, { useState, useEffect } from 'react';
import { FaHouseUser, FaSignOutAlt, FaAngleLeft, FaAngleRight, FaFolderOpen } from 'react-icons/fa';
import { GoProjectSymlink } from "react-icons/go";
import { GiSkills } from "react-icons/gi";
import { SiKnowledgebase } from "react-icons/si";
import { MdCastForEducation } from "react-icons/md";
import axios from 'axios'; 
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const URI = import.meta.env.VITE_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getLogo = async () => {
    try {
      const resp = await axios.get(`${URI}/api/logo/`);
      setLogo(resp.data.logo);
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  const createLogo = async () => {
    try {
      const formData = new FormData();
      formData.append('logo', logoFile);
      const resp = await axios.post(`${URI}/api/logo/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLogo(resp.data.logo);
    } catch (error) {
      console.error('Error creating logo:', error);
    }
  };

  const updateLogo = async () => {
    try {
      const formData = new FormData();
      formData.append('logo', logoFile);
      const resp = await axios.post(`${URI}/api/logo/${logo.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLogo(resp.data.logo);
    } catch (error) {
      console.error('Error updating logo:', error);
    }
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
    fetchUserProfile();
    getLogo();
  }, []);

  const menuItems = [
    { label: 'Profile', icon: <FaHouseUser />, route: '/admin-dashboard' },
    { label: 'Skills', icon: <GiSkills />, route: '/skill' },
    { label: 'Projects', icon: <GoProjectSymlink />, route: '/projects' },
    { label: 'Experience', icon: <SiKnowledgebase />, route: '/experience' },
    { label: 'Education', icon: <MdCastForEducation />, route: '/education' },
    { label: 'Logout', icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div className="sidebar-wrapper text-base font-semibold font-serif z-10">
      <div className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
        <ul>
          <div className="profile">
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
          <li
            onClick={openModal}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          >
            <i className="icon"><FaFolderOpen /></i>
            <span>Logo</span>
          </li>
        </ul>

        {/* Logo Section */}
        
      </div>

      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className="icon">{isOpen ? <FaAngleLeft /> : <FaAngleRight />}</i>
      </button>

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 ">
      <form onSubmit={(e) => {
          e.preventDefault();
          if (logo) {
            updateLogo(); // Update logo if it already exists
          } else {
            createLogo(); // Create a new logo if none exists
          }
          closeModal(); // Close the modal after submission
        }}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="logoUpload">
            Upload Logo
          </label>
          <input
            type="file"
            id="logoUpload"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0])}
            className="border p-2 w-full"
          />
        </div>
       <div className='flex justify-between content-center items-center gap-5'>
       <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {logo ? "Update Logo" : "Upload Logo"}
        </button>
        <button
        onClick={closeModal}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
      >
        Close Modal
      </button>
       </div>
      </form>

      
    </div>
  </div>
)}

    </div>
  );
};

export default Sidebar;

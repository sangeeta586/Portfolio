import React, { useState, useEffect } from 'react';
import { FaHouseUser, FaSignOutAlt, FaAngleLeft, FaAngleRight, FaFolderOpen } from 'react-icons/fa';
import { GoProjectSymlink } from "react-icons/go";
import { GiSkills } from "react-icons/gi";
import { SiKnowledgebase } from "react-icons/si";
import { MdCastForEducation } from "react-icons/md";
import { PiUsersFourBold } from "react-icons/pi";
import axios from 'axios'; 
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const URI = import.meta.env.VITE_API_URL;
  
  const email = localStorage.getItem("email"); // Corrected the usage of email storage
  const [userProfile, setUserProfile] = useState({ email });

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getLogo = async () => {
    try {
      const resp = await axios.get(`${URI}/api/logo/`);
      setLogo(resp.data);
      console.log(resp.data);
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

  useEffect(() => {
    getLogo();
  }, []);

  const menuItems = [
    { label: 'Profile', icon: <FaHouseUser />, route: '/admin-dashboard' },
    { label: 'Skills', icon: <GiSkills />, route: '/skill' },
    { label: 'Projects', icon: <GoProjectSymlink />, route: '/projects' },
    { label: 'Experience', icon: <SiKnowledgebase />, route: '/experience' },
    { label: 'Education', icon: <MdCastForEducation />, route: '/education' },
    { label: 'Go to Client', icon: <PiUsersFourBold />, route: '/' },
    { label: 'Logout', icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div className="sidebar-wrapper text-base font-semibold font-serif z-10">
      <div className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
        <ul>
        <div className="profile">
  {logo && logo.length > 0 ? (
    logo.map((log) => (
      <img
        key={log.id} // Add a key if it's a list
        src={log.logo}
        alt="logo"
        className="h-10 w-32 rounded-full object-cover"
      />
    ))
  ) : (
    <p>Loading logo...</p>
  )}
  <span>{userProfile?.email || 'Username'}</span>
</div>

          <div className="indicator" id="indicator"></div>
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={item.action ? item.action : () => navigate(item.route)}
              className="menu-item flex items-center cursor-pointer hover:bg-gray-200 rounded-lg p-2"
            >
              <i className="icon">{item.icon}</i>
              <span>{item.label}</span>
            </li>
          ))}
          <li
            onClick={openModal}
            className="menu-item flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
          >
            <i className="icon"><FaFolderOpen /></i>
            <span>Logo</span>
          </li>
        </ul>
      </div>

      <button className="toggle-btn" onClick={toggleSidebar}>
        <i className="icon">{isOpen ? <FaAngleLeft /> : <FaAngleRight />}</i>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (logo) {
                  updateLogo(); // Update logo if it already exists
                } else {
                  createLogo(); // Create a new logo if none exists
                }
                closeModal(); // Close the modal after submission
              }}
            >
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
              <div className="flex justify-between items-center gap-5">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {logo ? "Update Logo" : "Upload Logo"}
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
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

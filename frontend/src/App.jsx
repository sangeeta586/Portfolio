import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Portfolio from './component/Portfolio';
import UserRegistration from './component/UserRegistration';
import Skill from '../src/admin/skill/Skills';
import { AdminDashboard } from './admin/AdminDashboard';
import UpdateSkill from './admin/skill/UpdateSkill';
import CreateSkill from './admin/skill/CreateSkill';
import CreateProfile from './admin/UserProfile/CreateProfile';
import Education from './admin/education/Education';
import CreateEducation from './admin/education/CreateEducation';
import ContactMe from './admin/contact/ContactMe';
import { Project } from './admin/project/Project';
import Sidebar from './admin/Sidebar';

const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

// Component handling dynamic background and sidebar based on route
const MainContent = () => {
  const location = useLocation();
  
  // Condition to determine when to show the sidebar
  const showSideBar = !(location.pathname === '/');

  // Function to set background style based on the route
  const getBackgroundStyle = () => {
    switch (location.pathname) {
      case '/':
        return {
          backgroundImage: 'url("https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg?w=900&t=st=1709066598~exp=1709067198~hmac=c5c0995a7289d90e1e59f33310d419716d3975cedc8f97a8f31c119f7619dcaf")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflowX: 'hidden',
          height: '100vh', // Ensure it covers the full viewport height
          width: '100vw',  // Ensure it covers the full viewport width
        };

        case '/login':
        return {
          backgroundImage: 'url("https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg?w=900&t=st=1709066598~exp=1709067198~hmac=c5c0995a7289d90e1e59f33310d419716d3975cedc8f97a8f31c119f7619dcaf")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflowX: 'hidden',
          height: '100vh', // Ensure it covers the full viewport height
          width: '100vw',  // Ensure it covers the full viewport width
        };
        
        
        case'/projects':
          return { backgroundColor: '#111111' }; 
        

       

         // Light gray background
      default:
        return { backgroundColor: '#ffffff' }; // Default white background
    }
  };

  return (
    <div style={getBackgroundStyle()}>
      {showSideBar && <Sidebar />}
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<UserRegistration />} />
        {/* Admin routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/skill" element={<Skill />} />
        <Route path="/createSkill" element={<CreateSkill />} />
        <Route path="/updateSkill/:id" element={<UpdateSkill />} />
        <Route path="/update-Bio" element={<CreateProfile />} />
        <Route path="/education" element={<Education />} />
        <Route path="/createEducation" element={<CreateEducation />} />
        <Route path="/contactMe" element={<ContactMe />} />
        <Route path="/adminUpdateSkill/:id" element={<UpdateSkill />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
    </div>
  );
};

export default App;

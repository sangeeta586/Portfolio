import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Portfolio from './component/Portfolio';
import UserRegistration from './component/UserRegistration';
import Skill from '../src/admin/skill/Skills';
import { AdminDashboard } from './admin/AdminDashboard';
import UpdateSkill from './admin/skill/UpdateSkill';
import CreateProfile from './admin/UserProfile/CreateProfile';
import Education from './admin/education/Education';
import CreateEducation from './admin/education/CreateEducation';
import { Project } from './admin/project/Project';
import Sidebar from './admin/Sidebar';
import { ProjectDetils } from './admin/project/ProjectDetils';
import ProjectAbout from './component/ProjectDetils';
import { ExperienceHomePage } from './admin/experience/ExperienceHomePage';
import { ThemeProvider } from './ThemeContext';
import Certificate from './admin/Certificate/Certificate';
import Blog from './admin/Blog/Blog';
import { BlogDetails } from './admin/Blog/BlogDetails';
import { BlogDetailsPage } from './component/BlogDetailsPage';
import ShowParticularSkill from './component/skill/ShowParticularSkill';
import { GetParticlurSkill } from './admin/skill/GetParticlurSkill';

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
  const showSideBar = !(
    location.pathname === '/' ||
    location.pathname === '/about-project' ||
    location.pathname === '/login-ramnarayanMandal' ||
    location.pathname === "/blogDetails" ||
    location.pathname === "/View-skill"

  );

  const token = localStorage.getItem('token');

  // Function to set background style based on the route
  const getBackgroundStyle = () => {
    switch (location.pathname) {
      case '/':
      case '/login-ramnarayanMandal':
      case '/skill':
      case '/admin-dashboard':
      case '/contactMe':
      case '/certificate':
      case '/education':
      case '/blog':
      case '/blogDetails':
      case 'blog-details':
      case '/View-skill':
      case '/admin-View-skill':
          

        return {
          backgroundImage: 'url("https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg?w=900&t=st=1709066598~exp=1709067198~hmac=c5c0995a7289d90e1e59f33310d419716d3975cedc8f97a8f31c119f7619dcaf")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflowX: 'hidden',
          height: '100vh',
          width: '100vw',
        };
      case '/projects':
        return {
          backgroundColor: '#111111',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          overflowX: 'hidden',
          height: '100vh',
          width: '100vw',
        };
      default:
        return { backgroundColor: '#ffffff' }; // Default white background
    }
  };

  return (
    <div style={getBackgroundStyle()}>
      {showSideBar && <Sidebar />}
      <Routes>
        <Route path="/" element={<PortfolioWithThemeProvider />} />
        <Route path="/login-sangeeta" element={<UserRegistration />} />
        <Route path="/about-project" element={<PortfolioWithThemeProviderAndProjectDetails />} />
        <Route path="/blogDetails" element={<PortfolioWithThemeProviderAndBlogDetails />} />
        <Route path="/View-skill" element={<PortfolioWithThemeProviderAndviewSkill />} />
        {/* Admin routes */}
        {
          token && (
            <>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/skill" element={<Skill />} />
              <Route path="/adminUpdateSkill/:id" element={<UpdateSkill />} />
              <Route path="/projects" element={<Project />} />
              <Route path="/update-Bio" element={<CreateProfile />} />
              <Route path="/education" element={<Education />} />
              <Route path="/createEducation" element={<CreateEducation />} />
              <Route path="/Project-Details" element={<ProjectDetils />} />
              <Route path="/experience" element={<ExperienceHomePage />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog-details" element={<BlogDetails />} />
              <Route path="/admin-View-skill" element={<GetParticlurSkill />} />
            </>
          )
        }

      </Routes>
    </div>
  );
};

// Component for Portfolio that uses ThemeProvider
const PortfolioWithThemeProvider = () => {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
};


const PortfolioWithThemeProviderAndProjectDetails = () => {
  return (
    <ThemeProvider>
      <ProjectAbout />
    </ThemeProvider>
  );
};


const PortfolioWithThemeProviderAndBlogDetails = () => {
  return (
    <ThemeProvider>
      <BlogDetailsPage />
    </ThemeProvider>
  );
};


const PortfolioWithThemeProviderAndviewSkill = () => {
  return (
    <ThemeProvider>
      <ShowParticularSkill />
    </ThemeProvider>
  );
};


export default App;

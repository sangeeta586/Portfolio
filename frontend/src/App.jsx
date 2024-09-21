import React from 'react';
import './App.css';
import Portfolio from './component/Portfolio';
import UserRegistration from './component/UserRegistration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Skill from '../src/admin/skill/Skills';

import { AdminDashboard } from './admin/AdminDashboard';
import UpdateSkill from './admin/skill/UpdateSkill';
import CreateSkill from './admin/skill/createSkill';
import CreateProfile from './admin/UserProfile/CreateProfile';
import Education from './admin/education/Education';
import CreateEducation from './admin/education/CreateEducation';
import ContactMe from './admin/contact/ContactMe';
import { Project } from './admin/project/Project';


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<UserRegistration />} />
        {/* <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skill />} />
        <Route path="/projects" element={<Project />} /> */}

         */}
     
        <Route path="/admin-dashboard" element={<AdminDashboard />} />


        {/* Routes forn admin user */}
        <Route path="/skill" element={<Skill />} />
        <Route path="/createSkill" element={<CreateSkill />} />
        <Route path="/updateSkill/:id" element={<UpdateSkill />} />

        <Route path='/update-Bio' element={<CreateProfile />} />

        <Route path="/education" element={<Education />} />
        <Route path="/createEducation" element={<CreateEducation />} />

        <Route path="/contactMe" element={<ContactMe />} />
        <Route path="/adminUpdateSkill/:id" element={<UpdateSkill/>} />
        <Route path='/update-Bio' element={<CreateProfile/>} />
        <Route path="/projects" element={<Project />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

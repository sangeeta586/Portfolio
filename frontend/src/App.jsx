import React from 'react';
import './App.css'; 
import Portfolio from './component/Portfolio';
import UserRegistration from './component/UserRegistration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Education } from './component/Eduction';
import  Skill  from './component/Skill';
import { Project } from './component/Project';
import Sidebar from './admin/Sidebar';

const App = () => {
  return (
<>
<Sidebar/>
</>

    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Portfolio />} />
    //     <Route path="/login" element={<UserRegistration />} />
    //     <Route path="/education" element={<Education />} />
    //     <Route path="/skills" element={<Skill />} />
    //     <Route path="/projects" element={<Project />} />
    //   </Routes>
    // </Router>
  );
};

export default App;

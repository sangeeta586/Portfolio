import React from 'react';
import './App.css'; 
import Portfolio from './component/Portfolio';
import UserRegistration from './component/UserRegistration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AdminDashboard } from './admin/AdminDashboard';
import CreateProfile from './admin/UserProfile/CreateProfile';


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<UserRegistration />} />
     
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path='/update-Bio' element={<CreateProfile/>} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

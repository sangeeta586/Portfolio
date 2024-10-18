import React from 'react';
import { Navbar } from './Navbar';

import { Education } from './Eduction'; // Fixed the import typo from 'Eduction' to 'Education'
import Skill from './skill/Skill';
import { Project } from './Project';
import { Footer } from './Footer';
import { Profile } from './Profile';
import ContactUs from './ContactUs';
import WorkExperience from './WorkExperience';
import { useTheme } from '../ThemeContext';
import {Aboutme} from './Aboutme';
import { CertificateComponent } from './CertificateComponent';
import { BlogComponent } from './BlogComponent';


function Portfolio() {
    const { isDarkMode } = useTheme();
    
    // Define dark and light mode styles
    const containerClasses = isDarkMode 
        ? "font-sans text-gray-300 bg-gray-900"  // Dark mode styles
        : "font-sans text-gray-800";              // Light mode styles without background

    // Define light mode background style
    const lightModeBackground = {
        backgroundImage: 'url("https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg?w=900&t=st=1709066598~exp=1709067198~hmac=c5c0995a7289d90e1e59f33310d419716d3975cedc8f97a8f31c119f7619dcaf")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflowX: 'hidden',
        height: '100vh',
        width: '100vw',
    };

    return (
        <div className={containerClasses} style={!isDarkMode ? lightModeBackground : {}}>
            <Navbar />

            <main className="pt-[100px]">
                <Profile />
                <Aboutme />
                <WorkExperience />
                <Education />
                <Skill />
                <Project />
                <CertificateComponent/>
                <BlogComponent/>
           

            </main>
            
            <ContactUs />
            
            <Footer />
        </div>
    );
}

export default Portfolio;

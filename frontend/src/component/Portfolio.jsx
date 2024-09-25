import React from 'react';
import { Navbar } from './Navbar';

import { Aboutme } from './Aboutme';
import { Education } from './Eduction';
import  Skill  from './Skill';
import { Project } from './Project';
import { Footer } from './Footer';
import { Profile } from './Profile';
import  ContactUs  from './ContactUs';
import WorkExperience from './WorkExperience';


function Portfolio() {
    return (
        <div className="font-sans text-gray-900">

            <Navbar />

            <main className="pt-[100px] ">
                <Profile />
                <Aboutme />
                <WorkExperience/>
                <Education />
                <Skill />
                <Project />
            
            </main>
            <ContactUs/>
            <Footer />
        </div>
    );
}

export default Portfolio;

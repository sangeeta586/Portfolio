import React from 'react';
import { Navbar } from './Navbar';

import { Aboutme } from './Aboutme';
import { Eduction } from './Eduction';
import { Skill } from './Skill';
import { Project } from './Project';
import { Footer } from './Footer';
import { Profile } from './Profile';


function Portfolio() {
    return (
        <div className="font-sans text-gray-900">

            <Navbar />

            <main className="pt-20">
                 <Profile/>
                <Aboutme />
                <Eduction />
                <Skill />
                <Project />

            </main>

            <Footer />
        </div>
    );
}

export default Portfolio;

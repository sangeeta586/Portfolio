import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/skills/getAllSkills`);
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section
      className={`skills ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} lg:px-60 px-10 py-10`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 border-b-2">
          <h2 className="text-3xl font-bold">My Skills</h2>
          <span className="block w-20 h-1 bg-blue-800 mx-auto mt-2"></span>
          <div className="text-lg font-semibold mb-4 text-red-600">My creative skills & experiences.</div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="column left lg:w-1/2 pr-4">
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Since beginning my journey as a freelance developer nearly 1 month ago, I’ve done remote work for agencies, consulted for startups, and collaborated with talented people to create web products for both business and consumer use.
              <br /><br />
              I create successful responsive websites that are fast, easy to use, and built with best practices. The main area of my expertise is front-end development, HTML, CSS, JS, building small and medium web apps, custom plugins, features, animations, and coding interactive layouts.
              <br /><br />
              I also have full-stack developer experience with popular open-source CMS like (WordPress, bubble.io, and others).
              <br />
              Visit my <a href="https://www.facebook.com/heemal.himalpun" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Facebook</a> for more details or <a href="#contact" className="text-blue-500 underline">contact</a> me.
            </p>
            <a href="#contact" className="text-blue-500 underline">Learn more</a>
          </div>
          <div className="column right lg:w-1/2">
            {skills.map((skill) => (
              <div className="bars mb-4" key={skill._id}>
                <div className="info flex justify-between mb-2">
                  <span className={isDarkMode ? '' : 'text-black'}>{skill.name}</span>
                  <span>{skill.rating * 20}%</span>
                </div>
                <div
                  className={`line h-2 ${isDarkMode ? 'bg-blue-600' : 'bg-red-600'}`}
                  style={{ width: `${skill.rating * 20}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;

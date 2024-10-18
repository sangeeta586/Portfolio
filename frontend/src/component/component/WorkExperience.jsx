import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCalendar, faFlag } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

const WorkExperience = () => {
  const [experience, setExperience] = useState([]);
  const URI = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useTheme();

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await axios.get(`${URI}/api/experiences/`);
      setExperience(response.data); // Assuming response.data contains the array of experience objects
    } catch (error) {
      console.error('Error fetching experience data:', error);
    }
  };

  return (
    <div 
      id="workexperience" 
      className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
    >
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            My Work Experience
          </h2>
          <span className={`block w-20 h-1 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-800'} mx-auto mt-2`}></span>
        </div>
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className={`absolute left-8 md:left-24 h-full ${isDarkMode ? 'border-gray-600' : 'border-blue-800'} border-l-4`}></div>

          {experience.map((exp, index) => (
            <div
              key={index}
              className="relative flex items-start mb-10 pl-16 md:pl-32"
            >
              {/* Timeline Icon */}
              <div className={`absolute left-4 md:left-20 w-12 h-12 ${isDarkMode ? 'bg-blue-700' : 'bg-blue-800'} rounded-full flex justify-center items-center`}>
                <FontAwesomeIcon icon={faBriefcase} className="text-white text-2xl" />
              </div>

              {/* Experience Content */}
              <div className={`p-6 rounded-lg shadow-lg relative w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
                <h3 className="text-2xl font-bold mb-3">{exp.jobTitle}</h3>
                <div className="text-gray-600 text-sm mb-2 flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  {new Date(exp.session.startDate).toLocaleDateString()} - {new Date(exp.session.endDate).toLocaleDateString()}
                </div>
                {exp.company && (
                  <h4 className="text-lg mb-4">
                    <FontAwesomeIcon icon={faFlag} className="mr-2" />
                    {exp.company}
                  </h4>
                )}
                <ul className="list-disc pl-5">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-base">{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;

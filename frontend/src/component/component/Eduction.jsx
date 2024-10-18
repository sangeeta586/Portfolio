import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { motion } from 'framer-motion';

export const Education = () => {
  const [educationRecords, setEducationRecords] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchEducationRecords = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/educations/getAllEdu`); // Adjust the API endpoint as needed
        setEducationRecords(response.data);
      } catch (error) {
        console.error('Error fetching education records:', error);
      }
    };

    fetchEducationRecords();
  }, []);

  return (
    <motion.div 
    className="form-container"
    initial={{ opacity: 0, scale: 0.9, y: -50 }} // Start off-screen from the top
    animate={{ opacity: 1, scale: 1, y: 0 }} // Slide into position
    exit={{ opacity: 0, scale: 0.9, y: -50 }} // Optional: exit animation
    transition={{ duration: 0.5 }}
    >
    <section 
      id="education" 
      className={`py-12 w-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <div className="text-center mb-10">
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
          Education
        </h2>
        <span className={`block w-20 h-1 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-800'} mx-auto mt-2`}></span>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex flex-nowrap gap-8 animate-slide w-full justify-center">
          {educationRecords.length === 0 ? (
            <p className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-lg w-full`}>
              No education records found
            </p>
          ) : (
            educationRecords.map((education) => (
              <div 
                key={education._id} 
                className={`p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl flex-shrink-0 w-80 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
              >
                <div className="flex items-center mb-4">
                  <i className="fa-solid fa-graduation-cap text-4xl text-blue-600"></i>
                  <div className="ml-4">
                    <h3 className="text-2xl font-semibold">{education.degree}</h3>
                    <p className="text-sm">
                      ({new Date(education.session.start).getFullYear()}-{new Date(education.session.end).getFullYear()})
                    </p>
                  </div>
                </div>
                <p className="font-medium">{education.instituteName}</p>
                <p>
                  Percentage: <span className="font-semibold">{education.percentage}%</span>
                </p>
                <div
                   className=""
                  dangerouslySetInnerHTML={{ __html: education?.description }} // Assuming skill.description contains the rich text
                />
              </div>
            ))
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          50% { transform: translateX(-10%); }
          100% { transform: translateX(0); }
        }

        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>

    </section>
    </motion.div>
  );
};

import React, { useEffect, useState } from 'react';
import Sidebar from "../Sidebar";
import UpdateSkill from './UpdateSkill';

const BASE_URL = import.meta.env.VITE_API_URL;

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

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

  const handleUpdateSkill = (skill) => {
    setSelectedSkill(skill);
    setShowModal(true);
  };

  const handleAddSkill = () => {
    setSelectedSkill(null);
    setShowModal(true);
  };

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {Array(filledStars).fill('★').map((star, index) => (
          <span key={index} className="text-yellow-400 text-lg">{star}</span>
        ))}
        {Array(emptyStars).fill('☆').map((star, index) => (
          <span key={index} className="text-yellow-400 text-lg">{star}</span>
        ))}
      </>
    );
  };

  return (
    <div className='flex justify-center items-center flex-col lg:px-0 md:mx-0 ml-20  md:px-0 px-5 pt-96'>
      <div className="flex justify-between items-center w-full px-4">
        <h1 className='text-4xl font-bold font-serif text-[#2C3E50]'>My Skills</h1>
        <button
          onClick={handleAddSkill}
          className="bg-pink-500 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:shadow-lg hover:scale-105">
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div
              key={skill._id}
              className="flex flex-col bg-[#2C3E50] h-auto lg:w-96 w-auto p-4 rounded-xl shadow-md shadow-white"
            >
              {/* Image with hover effect */}
              <div className="flex justify-center items-center content-center">
                <img
                  src={skill.logo || "https://via.placeholder.com/150"}
                  alt={skill.name}
                  className='lg:w-40 md:w-32 w-20 rounded-full object-cover border-4 border-red-600 hover:border-white'
                />
              </div>

              <h3 className="my-4 text-2xl font-semibold text-white text-center">{skill.name}</h3>
              <p className="text-xl text-gray-50 mt-2 text-center"><strong>Experience:</strong> {skill.yearsExperience} years</p>
              <p className="text-base text-gray-50 mt-2 text-center">{skill.description}</p>

              {/* Star Rating */}
              <div className="text-center mt-2">
                 {renderStars(skill.rating)}
              </div>
              
              {/* Projects List */}
              <div className="mt-2  flex justify-start gap-5 flex-wrap">
                {skill.projectUrl && skill.projectUrl.length > 0 ? (
                  skill.projectUrl.map((urlObj, index) => (
                  
                      <a
                        href={urlObj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {urlObj.name}
                      </a>
                   
                  ))
                ) : (
                  <li className="text-gray-500 text-center">No projects available</li>
                )}
              </div>

              {/* Update button with hover effect */}
              <div className="flex justify-center items-center content-center">
                <button
                  onClick={() => handleUpdateSkill(skill)}
                  className="p-3 px-10 my-4 border-white text-white border-2 rounded-xl hover:bg-[#FFFFFF] hover:text-black font-semibold"
                >
                  Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No skills available.</p>
        )}
      </div>

      {showModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-50'>
          <UpdateSkill showModal={setShowModal} skill={selectedSkill} />
        </div>
      )}
    </div>
  );
};

export default Skills;

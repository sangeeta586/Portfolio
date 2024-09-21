import React, { useEffect, useState } from 'react';
import './skill.css'; // Updated CSS file path
import Sidebar from "../Sidebar";
import UpdateSkill from './UpdateSkill';

const BASE_URL = import.meta.env.VITE_API_URL; // Replace with your actual base URL

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null); // To hold the selected skill for updating

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

  // Function to handle opening the modal for editing a skill
  const handleUpdateSkill = (skill) => {
    setSelectedSkill(skill); // Pass the selected skill to the modal
    setShowModal(true); // Open the modal
  };

  // Function to handle opening the modal for adding a new skill
  const handleAddSkill = () => {
    setSelectedSkill(null); // Set to null to indicate adding a new skill
    setShowModal(true);
  };

  return (
    <div className='flex justify-center content-center flex-col'>
      <Sidebar />
      <div className="flex justify-between content-center items-center mt-20">
        <h1 className='text-4xl font-bold font-serif text-[#2C3E50]'>My Skills</h1>
        <button
          onClick={handleAddSkill}
          className="bg-pink-500 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:shadow-lg hover:scale-105">
          Add Skill
        </button>
      </div>

      <div className="skills-wrapper mt-8">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div className="card" key={skill._id}>
              <div className="image w-20">
                <img src={skill.logo || "https://via.placeholder.com/150"} alt={skill.name} className='w-40' />
              </div>
              <h3 className="text-lg font-semibold mt-20">{skill.name}</h3>
              <p className="text-sm text-gray-600 mt-2">
                  <strong>Experience:</strong> {skill.yearsExperience} years
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Description:</strong> {skill.description}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Rating:</strong> {skill.rating}/5
                </p>
              <ul className="list-disc list-inside">
                {skill.projectUrl && skill.projectUrl.length > 0 ? (
                  skill.projectUrl.map((urlObj, index) => (
                    <li key={index}>
                      <a
                        href={urlObj.url} // Assuming the object has a `url` property
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline">
                        {urlObj.name} {/* Assuming the object has a `name` property */}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No projects available</li>
                )}
              </ul>
              <div className="button">
                <button
                  onClick={() => handleUpdateSkill(skill)}
                  className=''>
                  Update {skill.name}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No skills available.</p>
        )}
      </div>

      {showModal && (
        <div className='flex justify-center content-center items-center absolute z-30 inset-0'>
          <UpdateSkill
            showModal={setShowModal}
            skill={selectedSkill} // Pass the selected skill (or null) to the modal
          />
        </div>
      )}
    </div>
  );
};

export default Skills;

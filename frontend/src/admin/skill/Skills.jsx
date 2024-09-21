import React, { useEffect, useState } from 'react';
import './skill.css'; // Updated CSS file path
import Sidebar from "../Sidebar";
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL; // Replace with your actual base URL

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

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

  const handleAddSkill = (id) => {
    navigate("/createSkill");
  };

  const handleUpdateSkill = (id) => {
    navigate(`/updateSkill/${id}`)
  }

  return (
    <>
      <Sidebar />
      <div className="absolute top-20 right-20 p-4">
        <button onClick={handleAddSkill} className="bg-pink-500 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out transform hover:bg-green-500 hover:shadow-lg hover:scale-105">
          Add Skill
        </button>
      </div>

      <div className="skills-wrapper mt-30"> {/* Added margin-top for spacing */}
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div className="card" key={skill._id}>
              <div className="image">
                <img
                  className="w-24 h-24 object-cover rounded-full"
                  src={skill.logo || "https://via.placeholder.com/150"}
                  alt={skill.name}
                />
              </div>

              <h3 className="text-lg font-semibold">{skill.name}</h3>
              <p>{skill.description}</p>
              <div className="button">
                <button onClick={() => handleUpdateSkill(skill._id)}>{skill.name}</button>
              </div>
            </div>
          ))
        ) : (
          <p>No skills available.</p>
        )}
      </div>
    </>
  );
};

export default Skills;

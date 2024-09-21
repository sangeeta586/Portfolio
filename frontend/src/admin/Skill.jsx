import React, { useEffect, useState } from 'react';

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

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

  const handleAddSkill = () => {
    // Add functionality to add a new skill
  };

  const handleEditSkill = (id) => {
    // Add functionality to edit a skill
  };

  const handleDeleteSkill = (id) => {
    // Add functionality to delete a skill
  };

  return (
    <section className="skills bg-white lg:px-60 px-10 py-10 shadow-md rounded-lg">
      <div className="max-width">
        <h2 className="title text-2xl font-bold mb-4">My Skills</h2>
        <div className="skills-content flex">
          <div className="column left w-1/3 pr-4">
            <div className="text mb-2">My creative skills & experiences.</div>
            <p className="text-sm mb-4">
              Since beginning my journey as a freelance developer nearly 1 month ago...
              <br />
              Visit my <a href="https://www.facebook.com/heemal.himalpun" target="_blank" rel="noopener noreferrer" className="text-blue-500">Facebook</a> for more details or <a href="#contact" className="text-blue-500">contact</a> me.
            </p>
            <button onClick={handleAddSkill} className="bg-blue-500 text-white py-2 px-4 rounded">Add Skill</button>
          </div>
          <div className="column right w-2/3">
            <div className="mini-bar mb-4 flex justify-between">
              {skills.map((skill) => (
                <div className="flex items-center" key={skill._id}>
                  <button onClick={() => handleEditSkill(skill._id)} className="text-yellow-500 hover:text-yellow-600">Edit</button>
                  <button onClick={() => handleDeleteSkill(skill._id)} className="text-red-500 hover:text-red-600 ml-2">Delete</button>
                </div>
              ))}
            </div>
            {skills.map((skill) => (
              <div className="bars mb-2" key={skill._id}>
                <div className="info flex justify-between">
                  <span className="font-semibold">{skill.name}</span>
                  <span>{skill.rating * 20}%</span>
                </div>
                <div className="line bg-blue-300 h-2 rounded" style={{ width: `${skill.rating * 20}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;

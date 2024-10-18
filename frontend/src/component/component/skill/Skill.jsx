import React, { useEffect, useState } from 'react';
import { useTheme } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useTheme();
  const navigate = useNavigate()

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

  const handleSkill = ()=>{
    navigate("/View-skill", { state: { skills } });


  }

  return (
    <section
      className={`skills ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} lg:px-60 px-10 py-10`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 border-b-2">
          <h2 className="text-3xl font-bold">My Skills</h2>
          <span className="block w-20 h-1 bg-blue-800 mx-auto mt-2"></span>
          <div className="text-lg font-semibold mb-4 text-red-600">My technical skills & experiences.</div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-20">
          <div className="column left lg:w-1/2 pr-4">
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              As a developer specializing in both the MERN stack and Java full-stack technologies, I have gained experience in building scalable web applications and dynamic user interfaces. I have successfully created projects using MongoDB, Express.js, React, and Node.js, as well as Java-based technologies such as Spring Boot and Hibernate.
              <br /><br />
              My expertise lies in developing responsive websites that are optimized for performance and user experience. I am skilled in implementing RESTful APIs, managing databases, and ensuring cross-platform compatibility. I also focus on utilizing best practices for coding and design to deliver high-quality web solutions.
              <br /><br />
              I have experience collaborating with cross-functional teams to deliver projects on time and with precision, leveraging agile methodologies to adapt to changing requirements and client needs.
              <br />
            </p>
            <div className='flex justify-center content-center items-center my-4 mt-10'>
              <button class="skillbtn-12" onClick={handleSkill}><span>Click!</span><span>Read More</span></button>
            </div>
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

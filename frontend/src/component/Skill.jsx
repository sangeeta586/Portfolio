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

  return (
    <section className="skills bg-white lg:px-60 px-10 py-10">
      <div className="max-width">
        <h2 className="title">My Skills</h2>
        <div className="skills-content">
          <div className="column left">
            <div className="text">My creative skills & experiences.</div>
            <p>
              Since beginning my journey as a freelance developer nearly 1 month ago, I’ve done remote work for agencies, consulted for startups, and collaborated with talented people to create web products for both business and consumer use.
              <br /><br />
              I create successful responsive websites that are fast, easy to use, and built with best practices. The main area of my expertise is front-end development, HTML, CSS, JS, building small and medium web apps, custom plugins, features, animations, and coding interactive layouts.
              <br /><br />
              I also have full-stack developer experience with popular open-source CMS like (WordPress, bubble.io and others).
              <br />
              Visit my <a href="https://www.facebook.com/heemal.himalpun" target="_blank" rel="noopener noreferrer" id="link">Facebook</a> for more details or <a href="#contact" id="link">contact</a> me.
            </p>
            <a href="#contact">Learn more</a>
          </div>
          <div className="column right">
            {skills.map((skill) => (
              <div className="bars" key={skill._id}>
                <div className="info">
                  <span>{skill.name}</span>
                  <span>{skill.rating * 20}%</span>
                </div>
                <div className="line wordpress" style={{ width: `${skill.rating * 20}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;

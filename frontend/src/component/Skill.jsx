import React from 'react';

const Skill = () => {
  return (
    <section className="skills bg-white  px-20 py-10" >
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
            <div className="bars">
              <div className="info">
                <span>HTML</span>
                <span>90%</span>
              </div>
              <div className="line html"></div>
            </div>
            <div className="bars">
              <div className="info">
                <span>CSS</span>
                <span>60%</span>
              </div>
              <div className="line css"></div>
            </div>
            <div className="bars">
              <div className="info">
                <span>JavaScript</span>
                <span>50%</span>
              </div>
              <div className="line js"></div>
            </div>
            <div className="bars">
              <div className="info">
                <span>Adobe Photoshop</span>
                <span>50%</span>
              </div>
              <div className="line photoshop"></div>
            </div>
            <div className="bars">
              <div className="info">
                <span>Corel Draw</span>
                <span>85%</span>
              </div>
              <div className="line corel"></div>
            </div>
            <div className="bars">
              <div className="info">
                <span>WordPress</span>
                <span>75%</span>
              </div>
              <div className="line wordpress"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;

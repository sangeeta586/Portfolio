import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is installed
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { motion } from 'framer-motion';


export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Get dark mode state

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/projects/getAll`); // Adjust the endpoint accordingly
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleOnClick = (project) => {
    navigate("/about-project", { state: { project } });
  };

  if (loading) return <p className='flex justify-center items-center content-center'><span className="loader"></span></p>;
  if (error) return <p>Error: {error}</p>;

  const lightModeStyles = {
    backgroundImage: 'url("https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg?w=900&t=st=1709066598~exp=1709067198~hmac=c5c0995a7289d90e1e59f33310d419716d3975cedc8f97a8f31c119f7619dcaf")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    overflowX: 'hidden',

  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, scale: 0.9, y: -50 }} // Start off-screen from the top
      animate={{ opacity: 1, scale: 1, y: 0 }} // Slide into position
      exit={{ opacity: 0, scale: 0.9, y: -50 }} // Optional: exit animation
      transition={{ duration: 0.5 }}
    >
      <section
        id="projects"
        style={isDarkMode ? {} : lightModeStyles} // Apply light mode styles only when not in dark mode
        className={`py-12 px-10 ${isDarkMode ? 'bg-gray-900 text-white' : 'text-black'}`} // Adjust classes for text color
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">My Projects</h2>
          <span className="block w-20 h-1 bg-blue-800 mx-auto mt-2"></span>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className={`rounded-lg shadow-lg overflow-hidden relative group transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} // Adjust card color

            >
              {/* Image */}
              <img
                src={project.imageUrl[0] || 'https://via.placeholder.com/500'}
                alt={project.name}
                className="w-full h-48 object-cover rounded-t-lg cursor-pointer"
                onClick={() => handleOnClick(project)} />

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <div
                  className={`mb-4 line-clamp-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  dangerouslySetInnerHTML={{ __html: project?.description }} // Assuming skill.description contains the rich text
                />

                <p className="mb-2"><strong>Role:</strong> {project.role}</p>
                <p className="mb-4">
                  <strong>Technologies Used:</strong>
                  {Array.isArray(project.technologiesUsed)
                    ? project.technologiesUsed.join(', ') 
                    : project.technologiesUsed} 
                </p>

              </div>

              {/* Buttons (Show on hover) */}
              <div className='flex justify-center content-center items-center gap-4 p-4 flex-wrap'>
                <a href={project.url} className={`buttonView1 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                  View Project
                </a>
                {project.githubLink && (
                  <a href={project.githubLink} className={`buttonGitHub ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    GitHub
                  </a>
                )}
                {project.liveDemoLink && (
                  <a href={project.liveDemoLink} className={`buttonLive-Demo ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

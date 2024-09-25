import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import { useNavigate } from 'react-router-dom';

export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate  = useNavigate()

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

  const handleOnclick = (project) => {
    navigate("/Project-Details", { state: { project } });
  }

  if (loading) return <p className='flex justify-center items-center content-center'><span className="loader"></span></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="projects" className="py-12 px-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">My Projects</h2>
        <span className="block w-20 h-1 bg-blue-800 mx-auto mt-2"></span>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project._id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden relative group transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => handleOnclick(project)}
          >
            {/* Image */}
            <img 
              src={project.imageUrl[0] || 'https://via.placeholder.com/500'} 
              alt={project.name} 
              className="w-full h-48 object-cover rounded-t-lg" 
            />

            {/* Project Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-gray-700 mb-4 line-clamp-4">{project.description}</p>
              <p className="text-gray-500 mb-2"><strong>Role:</strong> {project.role}</p>
              <p className="text-gray-500 mb-4"><strong>Technologies Used:</strong> {JSON.parse(project.technologiesUsed[0]).join(', ')}</p>
            </div>

            {/* Buttons (Show on hover) */}
            <div className='flex justify-center content-center items-center gap-4 p-4 flex-wrap'>
              <a href={project.url} className="buttonView1">
                View Project
              </a>
              {project.githubLink && (
                <a href={project.githubLink} className="buttonGitHub">
                  GitHub
                </a>
              )}
              {project.liveDemoLink && (
                <a href={project.liveDemoLink} className="buttonLive-Demo">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

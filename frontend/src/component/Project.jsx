import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is installed

export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return<p className='flex justify-center items-center content-center'><span class="loader"></span></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section id="projects" className="py-12 px-10 ">
      <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project._id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden relative group transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Image */}
            <img 
              src={project.imageUrl || 'https://via.placeholder.com/500'} 
              alt={project.name} 
              className="w-full h-48 object-cover" 
            />

            {/* Project Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-gray-700 mb-4 line-clamp-4">{project.description}</p>
              <p className="text-gray-500 mb-2"><strong>Role:</strong> {project.role}</p>
              <p className="text-gray-500 mb-4"><strong>Technologies Used:</strong> {project.technologiesUsed.join(', ')}</p>
            </div>

            {/* Buttons (Show on hover) */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a href={project.url} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                View Project
              </a>
              {project.githubLink && (
                <a href={project.githubLink} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors mt-2">
                  GitHub
                </a>
              )}
              {project.liveDemoLink && (
                <a href={project.liveDemoLink} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors mt-2">
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

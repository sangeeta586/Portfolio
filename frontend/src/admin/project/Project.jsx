import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import UpdateProject from './UpdateProject';

export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project for edit

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/projects/getAll`);
        setProjects(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="flex justify-center items-center content-center"><span className="loader"></span></p>;
  if (error) return <p>Error: {error}</p>;

  const handleUpdateProject = (project) => {
    setSelectedProject(project); // Set the selected project for editing
    setShowModal(true); // Open the modal for editing
  };

  const handleAddProject = () => {
    setSelectedProject(null); // Set to null to indicate adding a new project
    setShowModal(true); // Open the modal for adding
  };

  return (
    <div>
      <Sidebar />

      <div className="flex justify-between content-center items-center my-20">
        <h1 className="text-4xl font-bold font-serif text-[#2C3E50]">My Projects</h1>
        <button
          className="bg-pink-500 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:shadow-lg hover:scale-105"
          onClick={handleAddProject}
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <p className="text-gray-700 mb-4">{project.description}</p>
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
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors mt-2"
                onClick={() => handleUpdateProject(project)}
              >
                Edit Project
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding/Updating Project */}
      {showModal && (
        <div className="flex justify-center content-center items-center absolute z-30 inset-0">
          <UpdateProject
            showModal={setShowModal}
            project={selectedProject} // Pass the selected project (or null) to the modal
          />
        </div>
      )}
    </div>
  );
};

export default Project;

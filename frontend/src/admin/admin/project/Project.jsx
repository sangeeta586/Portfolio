import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import UpdateProject from './UpdateProject';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Track selected project for edit
  const navigate  = useNavigate()

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    

    fetchProjects();
  }, []);


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
  

  const handleUpdateProject = (project) => {
    setSelectedProject(project); // Set the selected project for editing
    setShowModal(true); // Open the modal for editing
  };

  const handleAddProject = () => 
    {
    setSelectedProject(null); // Set to null to indicate adding a new project
    setShowModal(true); // Open the modal for adding
  };

  const handleOnclick = (project) => {
    navigate("/Project-Details", { state: { project } });
  }

  
    return (
      <motion.div 
      className="form-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex  content-center items-center flex-col pl-20 pr-2  pt-20 pb-20'>
        
    
        <div className="flex justify-between lg:px-4 md:px-3 gap-5 my-8 w-full ">
          <h1 className="lg:text-4xl text-xl font-bold font-serif text-[#feffff]">My Projects</h1>
          <button
            className="buttonLive-Demo font-semibold border-2 "
            onClick={handleAddProject}
          >
            Add Project
          </button>
        </div>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-[#222222] rounded-xl shadow-lg overflow-hidden relative group transform transition-transform hover:scale-105 hover:shadow-2xl text-white pb-4"
            >
              {/* Image */}
              <div className='flex justify-center items-center content-center my-4'  onClick={()=>handleOnclick(project)}>
                <img
                  src={project?.imageUrl[0] || 'https://via.placeholder.com/500'}
                  alt={project.name}
                 className='lg:w-52 lg:h-52 md:w-32 md:h-32 w-40 h-40 rounded-full object-cover border-4 border-red-600 hover:border-white cursor-pointer'
                />
              </div>
    
              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-center">{project.name}</h3>
                

                <div
                  className="text-gray-200 mb-4 line-clamp-4 text-justify"
                  dangerouslySetInnerHTML={{ __html: project?.description }} // Assuming skill.description contains the rich text
                />
    
                <p className="text-gray-300 mb-2"><strong>Role:</strong> {project.role}</p>
                <p className="text-gray-200 mb-4"><strong>Technologies Used:</strong> {project.technologiesUsed.join(', ')}</p>
              </div>
    
              {/* Buttons (Show on hover) */}
              <div className="flex flex-col justify-center items-center   ">
                <div className=' flex flex-wrap justify-center items-center content-center gap-4'>
                <a href={project.url} className="buttonView">
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
                <button
                  className="buttonLive-Demo"
                  onClick={() => handleUpdateProject(project)}
                >
                  Update Project
                </button>
                </div>
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
              fetchProjects={fetchProjects}
            />
          </div>
        )}
      </div>
      </motion.div>
    );
  }   


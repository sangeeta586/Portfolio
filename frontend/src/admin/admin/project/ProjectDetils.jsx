import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const ProjectDetils = () => {
  const location = useLocation();
  const { project } = location.state || {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (!project) {
    return (
      <div className="text-center text-red-500 font-bold text-xl">
        Project details not available
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project.imageUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project.imageUrl.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto p-6 md:p-12 pl-20">
      <div className="overflow-hidden">

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-6 text-white bg-blue-500 hover:bg-blue-700 p-2 px-5 rounded-md focus:outline-none"
        >
          ⬅ Back
        </button>

        {/* Carousel */}
        {project.imageUrl && (
          <div className="relative">
            <img
              className="w-full h-full object-cover rounded-md"
              src={project.imageUrl[currentImageIndex]}
              alt={`${project.name} - ${currentImageIndex + 1}`}
            />

            {/* Carousel controls */}
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-full focus:outline-none"
            >
              ❮
            </button>

            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-full focus:outline-none"
            >
              ❯
            </button>
          </div>
        )}

        <div className="p-6">
          {/* Project Name */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            {project.name}
          </h1>

          {/* Project Description */}
          {project.description ? (
            <div
              className="text-gray-700 mb-6 whitespace-pre-line text-sm md:text-lg"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          ) : (
            <p className="text-gray-700 mb-6">No description available</p>
          )}

          {/* Project Dates */}
          <div className="text-gray-600 text-sm md:text-base mb-6">
            <span className="font-bold">Start Date:</span> {formatDate(project.startDate)}
            <br />
            <span className="font-bold">End Date:</span> {formatDate(project.endDate)}
          </div>

          {/* Role */}
          <div className="mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Role: <span className="text-green-600">{project.role}</span>
            </h2>
          </div>

          {/* Technologies Used */}
          <div className="mb-6">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Technologies Used:
            </h3>
            <ul className="list-disc pl-5 text-sm md:text-lg">
              {Array.isArray(project.technologiesUsed)
                ? project.technologiesUsed.map((tech, index) => (
                  <li key={index} className="text-gray-700">{tech}</li>
                ))
                : project.technologiesUsed &&
                  project.technologiesUsed.split(',').map((tech, index) => (
                    <li key={index} className="text-gray-700">{tech.trim()}</li>
                  ))
              }
            </ul>
          </div>

          {/* Links */}
          <div className="flex space-x-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-semibold transition duration-300 transform hover:scale-105"
              >
                GitHub Repository
              </a>
            )}
            {project.liveDemoLink && (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 font-semibold transition duration-300 transform hover:scale-105"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetils;

import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateProject = ({ showModal, project ,fetchProjects }) => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    role: '',
    technologiesUsed: [''],
    url: '',
    imageFiles: [],
    githubLink: '',
    liveDemoLink: '',
    startDate: '',
    endDate: ''
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setProjectData({
        name: project.name,
        description: project.description,
        role: project.role,
        technologiesUsed: project.technologiesUsed.length > 0 ? project.technologiesUsed : [''],
        url: project.url,
        githubLink: project.githubLink,
        liveDemoLink: project.liveDemoLink,
        startDate: project.startDate ? project.startDate.split('T')[0] : '',
        endDate: project.endDate ? project.endDate.split('T')[0] : '',
        imageFiles: []
      });
      setImagePreviews(project.imageUrl || []);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleTechnologyChange = (index, e) => {
    const updatedTechnologies = [...projectData.technologiesUsed];
    updatedTechnologies[index] = e.target.value;
    setProjectData((prevData) => ({
      ...prevData,
      technologiesUsed: updatedTechnologies
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newFiles = files.map(file => {
        const url = URL.createObjectURL(file);
        return file; // Keep the file object for upload
      });
      setImagePreviews(prev => [...prev, ...newFiles.map(file => URL.createObjectURL(file))]);
      setProjectData((prevData) => ({
        ...prevData,
        imageFiles: [...prevData.imageFiles, ...newFiles]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const url = project
        ? `${BASE_URL}/api/projects/update/${project._id}`
        : `${BASE_URL}/api/projects/create`;
      const method = project ? 'PUT' : 'POST';

      const formData = new FormData();
      formData.append('name', projectData.name);
      formData.append('description', projectData.description);
      formData.append('role', projectData.role);
      formData.append('technologiesUsed', JSON.stringify(projectData.technologiesUsed));
      formData.append('url', projectData.url);
      formData.append('githubLink', projectData.githubLink);
      formData.append('liveDemoLink', projectData.liveDemoLink);
      formData.append('startDate', projectData.startDate);
      formData.append('endDate', projectData.endDate);

      for (const file of projectData.imageFiles) {
        formData.append('imageUrl', file);
      }

      const response = await fetch(url, {
        method: method,
        body: formData
      });

      if (response.ok) {
        console.log(project ? 'Project updated successfully!' : 'Project added successfully!');
        showModal(false);
        fetchProjects();
      } else {
        const message = await response.text();
        setError(`Failed to save project: ${message}`);
      }
    } catch (error) {
      setError('Error saving project: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto p-4 rounded-lg shadow-lg max-h-screen overflow-y-auto w-[90%]">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">{project ? 'Update Project' : 'Add Project'}</h2>
          <IoMdClose onClick={() => showModal(false)} className="text-2xl cursor-pointer" />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700">Project Name</label>
            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <input
              type="text"
              name="role"
              value={projectData.role}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Technologies Used</label>
            {projectData.technologiesUsed.map((tech, index) => (
              <input
                key={index}
                type="text"
                name={`technology-${index}`}
                placeholder="Technology"
                value={tech}
                onChange={(e) => handleTechnologyChange(index, e)}
                className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500 mb-2"
              />
            ))}

          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Project URL</label>
            <input
              type="url"
              name="url"
              value={projectData.url}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Upload Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              name="imageFiles"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
            {/* {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt="Preview"
                className="mt-2 w-full h-32 object-cover"
              />
            ))} */}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">GitHub Link</label>
            <input
              type="url"
              name="githubLink"
              value={projectData.githubLink}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Live Demo Link</label>
            <input
              type="url"
              name="liveDemoLink"
              value={projectData.liveDemoLink}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={projectData.startDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={projectData.endDate}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>


        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Project Description</label>
          <ReactQuill
            value={projectData.description}
            onChange={(value) => setProjectData((prevData) => ({ ...prevData, description: value }))}
            className="mt-1 border border-gray-300 rounded"
          />
        </div>
        <div className='flex items-center content-center gap-4'>
          <button
            type="button"
            onClick={() =>
              setProjectData((prevData) => ({
                ...prevData,
                technologiesUsed: [...prevData.technologiesUsed, '']
              }))
            }
            className="bg-blue-500 text-white py-2 px-4 rounded "
          >
            Add Technology
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-2 px-4 rounded ${loading && 'opacity-50 cursor-not-allowed'}`}
          >
            {loading ? 'Saving...' : project ? 'Update Project' : 'Add Project'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default UpdateProject;

import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import CreateEducation from './CreateEducation';

const Education = () => {
  const [edus, setEdus] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/educations/getAllEdu`);
        const data = await response.json();
        setEdus(data);
      } catch (error) {
        console.error('Error fetching educations:', error);
      }
    };

    fetchEducations();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAddEducation = () => {
    setSelectedEdu(null);
    setShowModel(true);
  };

  const handleUpdateEducation = (edu) => {
    setSelectedEdu(edu);
    setShowModel(true);
  };

  return (
    <div className="flex flex-col items-center w-full p-4 px-5">
      <div className="fixed top-12 right-12 p-4">
        <button
          onClick={handleAddEducation}
          className="bg-pink-500 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out transform hover:bg-green-500 hover:shadow-lg hover:scale-105"
        >
          Add Education
        </button>
      </div>

      <div className="w-full grid grid-cols-1 gap-8 ml-20 py-20">
        {edus.map((edu) => (
          <div key={edu._id} className="flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-lg overflow-hidden p-4">
            <div className="w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0">
              <img
                className="object-cover w-full h-48 lg:h-auto"
                src={edu.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Emmanuel_College_Front_Court%2C_Cambridge%2C_UK_-_Diliff.jpg'}
                alt="Education"
              />
            </div>
            <div className="w-full lg:w-1/2 lg:px-20 md:px-10 px-5 ">
              <p className="font-bold text-2xl md:text-4xl uppercase text-gray-600 tracking-wide">{edu.degree}</p>
              <h1 className="text-lg md:text-2xl text-gray-800 my-2">{edu.instituteName}</h1>
              <p className="text-gray-600 mb-4">{edu.description}</p>
              <p className="text-xl font-bold text-green-700">{edu.percentage}%</p>
              <p className="text-gray-600 text-sm ml-2">
                {formatDate(edu.session.start)} - {formatDate(edu.session.end)}
              </p>
              <button
                className="block text-center mt-4 border border-gray-600 p-2 text-black hover:text-white font-bold rounded hover:bg-blue-700 hover:border-none transition"
                onClick={() => handleUpdateEducation(edu)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModel && (
        <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50">
          <CreateEducation showmodel={setShowModel} selectedEdu={selectedEdu} />
        </div>
      )}
    </div>
  );
};

export default Education;

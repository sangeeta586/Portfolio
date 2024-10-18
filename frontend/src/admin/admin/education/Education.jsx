import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateEducation from './CreateEducation';
import { motion } from 'framer-motion';

const Education = () => {
  const [edus, setEdus] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [selectedEdu, setSelectedEdu] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    

    fetchEducations();
  }, []);


  const fetchEducations = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/educations/getAllEdu`);
      const data = await response.json();
      setEdus(data);
    } catch (error) {
      console.error('Error fetching educations:', error);
    }
  };

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
    <motion.div 
      className="form-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
    <div className="flex flex-col items-center w-full p-4 px-5">
      <div className="fixed top-12 right-12 p-4">
        <button
          onClick={handleAddEducation}
          className="button font-semibold border-2"
        >
          Add Education
        </button>
      </div>

      <div className="w-full grid grid-cols-1 gap-8 ml-20 py-20">
        {edus.length > 0 ? (
          edus.map((edu) => (
            <div
              key={edu._id}
              className="flex flex-col lg:flex-row items-center  rounded-lg overflow-hidden p-4"
            >
              <div className="w-full lg:w-1/2 flex justify-center mb-4 lg:mb-0">
                <img
                  className="object-cover w-full h-48 lg:h-auto"
                  src={
                    edu.
                    image
                     ||
                    'https://upload.wikimedia.org/wikipedia/commons/b/bd/Emmanuel_College_Front_Court%2C_Cambridge%2C_UK_-_Diliff.jpg'
                  }
                  alt="Education"
                />
              </div>
              <div className="w-full lg:w-1/2 lg:px-20 md:px-10 px-5">
                <p className="font-bold text-2xl md:text-4xl uppercase text-gray-600 tracking-wide">
                  {edu.degree}
                </p>
                <h1 className="text-lg md:text-2xl text-gray-800 my-2">
                  {edu.instituteName}
                </h1>
                <div
                   className="text-lg md:text-2xl text-gray-800 my-2"
                  dangerouslySetInnerHTML={{ __html: edu?.description }} // Assuming skill.description contains the rich text
                />

                <p className="text-xl font-bold text-green-700">
                  {edu.percentage}%
                </p>
                <p className="text-gray-600 text-sm ml-2">
                  {formatDate(edu.session.start)} - {formatDate(edu.session.end)}
                </p>
                <button
                  className="button my-4"
                  onClick={() => handleUpdateEducation(edu)}
                >
                  Update Education
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No education records found.
          </div>
        )}
      </div>

      {showModel && (
        <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50 z-10">
         <CreateEducation setShowModel={setShowModel} selectedEdu={selectedEdu} fetchEducations={fetchEducations} />

        </div>
      )}
    </div>
    </motion.div>
  );
};

export default Education;

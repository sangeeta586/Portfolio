import React, { useEffect, useState } from 'react';
import UpdateSkill from './UpdateSkill';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';  // Import SweetAlert2
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/skills/getAllSkills`);
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const handleUpdateSkill = (skill) => {
    setSelectedSkill(skill);
    setShowModal(true);
  };

  const handleAddSkill = () => {
    setSelectedSkill(null);
    setShowModal(true);
  };

  // Helper function to render star ratings
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {Array(filledStars).fill('★').map((star, index) => (
          <span key={index} className="text-yellow-400 text-lg">{star}</span>
        ))}
        {Array(emptyStars).fill('☆').map((star, index) => (
          <span key={index} className="text-yellow-400 text-lg">{star}</span>
        ))}
      </>
    );
  };

  const handleDelete = async (id) => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${BASE_URL}/api/skills/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,  // Send the token in the Authorization header
              },
            }

          );
          setSkills(skills.filter((skill) => skill._id !== id)); // Update the state to remove the deleted skill
          Swal.fire('Deleted!', 'Your skill has been deleted.', 'success');  // Show success message
        } catch (error) {
          console.error('Error deleting skill:', error);
          Swal.fire('Error!', 'There was an error deleting the skill.', 'error');  // Show error message
        }
      }
    });
  };

  const handleNagisition = async (skill) => {

    navigate("/admin-View-skill",
      {
        state: {
          skill: skill
        }
      }
    )

  }

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex justify-center items-center flex-col lg:px-0 md:mx-0 ml-20  md:px-0 px-5 py-20'>
        <div className="flex justify-between items-center w-full lg:px-32 ">
          <h1 className='lg:text-4xl text-2xl font-bold font-serif text-[#2C3E50]'>My Skills</h1>
          <div>
            <button
              onClick={handleAddSkill}
              className="bg-pink-500 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:shadow-lg hover:scale-105">
              Add Skill
            </button>

          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-8 mt-8">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div
                key={skill._id}
                className="flex flex-col max-w-96 min-h-[500px] bg-[#2C3E50] p-4 rounded-xl shadow-md shadow-white"
              >
                {/* Image with hover effect */}
                <div className="flex justify-center items-center flex-grow" onClick={() => handleNagisition(skill)}>
                  <img
                    src={skill.logo || "https://via.placeholder.com/150"}
                    alt={skill.name}
                    className='lg:w-40 lg:h-40 md:w-32 md:h-32  w-20 h-20 rounded-full object-cover border-4 border-red-600 hover:border-white'
                  />
                </div>

                <h3 className="my-4 text-2xl font-semibold text-white text-center">{skill.name}</h3>
                <p className="text-xl text-gray-50 mt-2 text-center"><strong>Experience:</strong> {skill.yearsExperience} years</p>
                <div
                  className={`overflow-hidden line-clamp-4 text-gray-300`}
                  dangerouslySetInnerHTML={{ __html: skill.description }} // Assuming skill.description contains the rich text
                />

                {/* Star Rating */}
                <div className="text-center mt-2">
                  {renderStars(skill.rating)}
                </div>

                {/* Projects List */}
                <div className="mt-2 flex justify-start gap-5 flex-wrap">
                  {skill.projectUrl && skill.projectUrl.length > 0 ? (
                    skill.projectUrl.map((urlObj, index) => (
                      <a
                        key={index}
                        href={urlObj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {urlObj.name}
                      </a>
                    ))
                  ) : (
                    <li className="text-gray-500 text-center">No projects available</li>
                  )}
                </div>

                {/* Update and Delete buttons */}
                <div className="flex justify-center gap-4 my-4 items-center content-center flex-wrap">
                  <button
                    onClick={() => handleUpdateSkill(skill)}
                    className="button1"
                  >
                    Update {skill.name}
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="buttonDelete"
                  >
                    Delete {skill.name}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No skills available.</p>
          )}
        </div>

        {showModal && (
          <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-50'>
            <UpdateSkill showModal={setShowModal} skill={selectedSkill} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Skills;

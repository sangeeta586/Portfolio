import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { useTheme } from '../../ThemeContext'; // Assuming useTheme comes from a global context
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Font Awesome icons

const ShowParticularSkill = () => {
    const location = useLocation();
    const { skills } = location.state || {}; // Get the skills data from location state

    const [selectedSkill, setSelectedSkill] = useState(null); // State to track the selected skill

    // Get the dark mode state from useTheme
    const { isDarkMode } = useTheme();

    const navigate = useNavigate();

    const handleSkillClick = (skill) => {
        setSelectedSkill(skill); // Set the selected skill when clicked
    };

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    // Function to render stars based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (i - rating < 1 && i > rating) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500" />);
            }
        }
        return stars;
    };

    return (
        <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
            {/* Navbar */}
            <Navbar />
            <div className="flex mt-20 lg:px-40 px-5">
                <button
                    onClick={handleBack}
                    className={`mb-6 text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'} p-2 px-5 rounded-md focus:outline-none`}
                >
                    ⬅ Back
                </button>
            </div>
            <div className="flex flex-grow flex-col md:flex-row p-4 lg:px-40">
                {/* Left Section - Skills List */}
                <div className={`w-full md:w-1/5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-4 mb-4 md:mb-0 md:mr-6`}>
                    <h2 className={`text-2xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} pb-4`}>
                        Skills
                    </h2>
                    <ul className="space-y-4">
                        {skills && skills.map((skill) => (
                            <li
                                key={skill._id}
                                className={`cursor-pointer p-3 rounded-lg text-lg font-medium transition duration-200 
                                ${selectedSkill && selectedSkill._id === skill._id
                                        ? `${isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white'}`
                                        : `${isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 text-gray-800'}`
                                    }`}
                                onClick={() => handleSkillClick(skill)}
                            >
                                {skill.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Section - Skill Details */}
                <div className={`w-full md:w-2/3 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-4`}>
                    {selectedSkill ? (
                        <div className="space-y-4">
                            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>{selectedSkill.name}</h2>
                            <img
                                src={selectedSkill.logo}
                                alt={selectedSkill.name}
                                className="w-full max-h-96 object-fill mb-4 rounded-lg shadow-md"
                            />
                            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <span className="font-semibold">Years of Experience:</span> {selectedSkill.yearsExperience}
                            </p>
                          
                            <div
                                className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                                dangerouslySetInnerHTML={{ __html: selectedSkill.description }} // Assuming skill.description contains the rich text
                            />

                            <p className={`text-lg flex font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                {renderStars(selectedSkill.rating)}
                            </p>

                            {/* Project URLs */}
                            <div>
                                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Projects:</h3>
                                <ul className={`list-disc pl-5 space-y-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                                    {selectedSkill.projectUrl.map((project) => (
                                        <li key={project._id}>
                                            {project.name ? (
                                                <a
                                                    href={project.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {project.name}
                                                </a>
                                            ) : (
                                                "No project available"
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>Click on a skill to see the details</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowParticularSkill;

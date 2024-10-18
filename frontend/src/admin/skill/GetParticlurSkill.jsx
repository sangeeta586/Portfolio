import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UpdateSkill from './UpdateSkill';

export const GetParticlurSkill = () => {
    const location = useLocation();
    const { skill } = location.state || {};
    const [showModal, setShowModal] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);

    // Carousel state for images (this can be removed if only a single logo is used)
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Navigate hook
    const navigate = useNavigate();

    // Function to handle back navigation
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    if (!skill) {
        return <div className="text-center text-red-500 font-bold text-xl">Skill details not available</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Handlers to move through carousel images (remove if not using an array)
    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === skill.logo.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? skill.logo.length - 1 : prevIndex - 1
        );
    };

    // Function to render star ratings
    const renderStars = (rating) => {
        const totalStars = 5;
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 inline-block ${i <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 15.27L16.18 20 14.54 12.97 20 8.18l-7.19-.61L10 0 7.19 7.57 0 8.18l5.46 4.79L3.82 20z" />
                </svg>
            );
        }

        return stars;
    };

    const handleUpdateSkill = (skill) => {
        setSelectedSkill(skill);
        setShowModal(true);
    };

    return (
        <div className="container mx-auto p-6 md:p-12 pl-20">
            <div className="overflow-hidden">

                {/* Back Button */}
                <div className='flex justify-between content-center items-center gap-4'>
                    <button
                        onClick={handleBack}
                        className="mb-6 text-white bg-blue-500 hover:bg-blue-700 p-2 px-5 rounded-md focus:outline-none"
                    >
                        ⬅ Back
                    </button>
                    <button
                        onClick={() => handleUpdateSkill(skill)}
                        className="mb-6 text-white bg-green-500 hover:bg-green-700 p-2 px-5 rounded-md focus:outline-none"
                    >
                        Update
                    </button>
                </div>

                {/* Carousel (can be simplified to just show one logo if only one is available) */}
                {skill.logo && (
                    <div className="relative">
                        <img
                            className="w-full max-h-96 object-contain rounded-md"
                            src={skill.logo}
                            alt={`${skill.name}`}
                        />

                        {/* Carousel controls (can be removed if only one logo) */}
                        {/* <button
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
                        </button> */}
                    </div>
                )}

                <div className="p-6">
                    {/* Skill Name */}
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{skill.name}</h1>

                    {/* Skill Description */}
                    <div
                        className={`overflow-hidden line-clamp-4 text-gray-800 my-2 `}
                        dangerouslySetInnerHTML={{ __html: skill.description }} // Assuming skill.description contains the rich text
                    />

                    {/* Skill Ratings */}
                    <div className="mb-6 ">
                        <span className="text-gray-600">Rating: </span>
                        <span className="font-bold text-gray-800 flex items-center">
                            {renderStars(skill.rating)} {/* Call the function to render stars */}
                        </span>
                    </div>

                    {/* Skill Experience */}
                    <div className="mb-6">
                        <span className="text-gray-600">Years of Experience: </span>
                        <span className="font-bold text-gray-800">{skill.yearsExperience}</span>
                    </div>

                    {/* Skill Projects */}
                    {skill.projectUrl && skill.projectUrl.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects:</h2>
                            <ul className="list-disc pl-5">
                                {skill.projectUrl.map((project) => (
                                    <li key={project._id.$oid}>
                                        <a href={project.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                            {project.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {showModal && (
                        <div className='fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-75 z-50'>
                            <UpdateSkill showModal={setShowModal} skill={selectedSkill} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

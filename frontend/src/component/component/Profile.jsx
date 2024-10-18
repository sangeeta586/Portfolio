import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

export const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const typedRef = useRef(null);
    const URI = import.meta.env.VITE_API_URL;
    const { isDarkMode } = useTheme();

    // Fetch user profile data on component mount
    useEffect(() => {
        fetchUserProfile();
    }, []); 

    // Initialize Typed.js for typing animation
    useEffect(() => {
        if (userProfile && typedRef.current) {
            const typed = new Typed(typedRef.current, {
                strings: [userProfile.title || "Full Stack Web Developer"],
                typeSpeed: 90,
                backSpeed: 100,
                backDelay: 1000,
                loop: true,
            });

            return () => {
                typed.destroy(); // Clean up the Typed instance on component unmount
            };
        }
    }, [userProfile]);

    // Fetch user profile data from the API
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${URI}/api/users/getUser`);
            console.log("Fetched data:", response.data.users); // Log fetched data
            setUserProfile(response.data.users);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    // Loader while fetching data
    if (!userProfile) return (
        <p className='flex justify-center items-center content-center'>
            <span className="loader"></span>
        </p>
    );

    // Handle cases where userProfile might be empty or missing fields
    if (!userProfile.name || !userProfile.socialMedia) {
        return <p className='flex justify-center items-center content-center'>User data is not available.</p>;
    }

    return (
        <section id="home" className="flex md:flex-col flex-col-reverse lg:flex-row items-center justify-between p-6 max-w-7xl mx-auto">
            <div className="lg:w-2/3 text-center lg:text-left">
                <motion.h1 
                    className="text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    👋 Hello, I am {userProfile.name}
                </motion.h1>
                <p className="text-xl mb-4">
                    I am a <span ref={typedRef} className="font-bold"></span>
                </p>
                <div className="flex justify-center lg:justify-start space-x-4 mb-6 mt-10 text-3xl">
                    {userProfile.socialMedia.length ? userProfile.socialMedia.map((platform) => (
                        <a key={platform._id} href={platform.url} className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                            {getIcon(platform.name)}
                        </a>
                    )) : <p>No social media links available.</p>}
                </div>
            </div>
            
            <div className="lg:w-1/3 text-center mb-6 lg:mb-0 z-0 relative">
                <img
                    src={userProfile.image || "https://i.postimg.cc/Px1cN7b9/111.png"}
                    alt={`${userProfile.name} profile`}
                    className="w-72 h-72 duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg hover:shadow-red-400 cursor-pointer object-cover rounded-full border"
                />
            </div>
        </section>
    );
};

// Function to get the icon based on the platform name
const getIcon = (platformName) => {
    switch (platformName.toLowerCase()) {
        case 'linkedin':
            return <i className="fa-brands fa-linkedin text-blue-600"></i>;
        case 'instagram':
            return <i className="fa-brands fa-instagram text-pink-500"></i>;
        case 'facebook':
            return <i className="fa-brands fa-facebook text-blue-800"></i>;
        case 'twitter':
            return <i className="fa-brands fa-twitter text-blue-400"></i>;
        case 'youtube':
            return <i className="fa-brands fa-youtube text-red-600"></i>;
        case 'github':
            return <i className="fa-brands fa-github text-gray-800"></i>;
        default:
            return null;
    }
};

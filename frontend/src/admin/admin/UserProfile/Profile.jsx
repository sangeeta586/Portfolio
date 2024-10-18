import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import Modal from './Modal'; // Import your Modal component here
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import CreateProfile from './CreateProfile';
import { FaMessage } from "react-icons/fa6";
import RightDrawer from '../contact/RightDrawer';
import Swal from 'sweetalert2';


export const Profile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messages, setMessages] = useState([]); // Change from message to messages array
    const typedRef = useRef(null);
    const URI = import.meta.env.VITE_API_URL;
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchUserProfile();
    }, []);

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
                typed.destroy();
            };
        }
    }, [userProfile]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(`${URI}/api/users/getUser`);
            setUserProfile(response.data.users);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${URI}/api/contactme/`);
            setMessages(response.data); // Update this to set an array of messages
            console.log('Fetched user messages:', response.data); // For debugging
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages(); // Fetch messages on component mount
    }, [URI]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        // Create a preview of the selected image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleImageUpload = async () => {
        if (!selectedImage) return;
    
        const formData = new FormData();
        formData.append('image', selectedImage);
    
        try {
            const response = await axios.put(`${URI}/api/users/update/${userProfile._id}`, formData);
            console.log('Response from server:', response.data);
    
            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Profile updated successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            setShowModalUpdate(false);
        } catch (error) {
            console.error('Error updating profile:', error);
    
            // Show error message using SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was an error updating the profile.',
            });
        }
    };
    

    // Display loader while fetching user profile
    if (!userProfile) return (
        <p className='flex justify-center items-center'>
            <span className="loader"></span>
        </p>
    );

    const handleOnclick = () => {
        setShowModalUpdate(!showModalUpdate);
    };

    return (
        <div className='flex flex-col w-full max-w-7xl mx-auto lg:mx-0 md:mx-0 ml-8 lg:px-0 md:px-0 px-5'>
            <div className="flex items-center justify-between content-center lg:ml-0 md:ml-0 ml-10">
                <div onClick={handleOnclick}>
                    <Button name={userProfile ? "Update Bio" : "Create Profile"} />
                </div>
                <div className="relative">
                     <RightDrawer/>
                        <div className="absolute top-[-20px] right-[28px] bg-red-500 text-white w-7 h-7 text-sm flex justify-center items-center text-center  rounded-full px-2">
                            <p>{messages.length}</p>
                        </div>
                </div>
            </div>
            <div className="flex md:flex-col flex-col-reverse lg:flex-row items-center justify-between p-6 pl-0 gap-10 w-full">
                <div className="lg:w-1/2 text-center lg:text-left">
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
                        {userProfile.socialMedia.length ? userProfile.socialMedia.map(platform => (
                            <a key={platform._id} href={platform.url} className="hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                                {getIcon(platform.name)}
                            </a>
                        )) : <p>No social media links available.</p>}
                    </div>
                </div>

                <div className="lg:w-1/2 text-center mb-6 lg:mb-0">
                    <img
                        src={userProfile.image || "https://i.postimg.cc/Px1cN7b9/111.png"}
                        alt={`${userProfile.name} profile`}
                        className="w-72 h-72 duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg cursor-pointer object-cover rounded-full border"
                        onClick={() => setShowModal(true)}
                    />
                </div>

                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">Update Profile Image</h2>
                            <input type="file" onChange={handleImageChange} className="mb-4" />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mb-4 rounded" />
                            )}
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={handleImageUpload}
                            >
                                Upload
                            </button>
                        </div>
                    </Modal>
                )}

                {showModalUpdate && (
                    <div className='flex justify-center content-center items-center '>
                        <CreateProfile userProfile={userProfile} setShowModalUpdate={setShowModalUpdate} />
                    </div>
                )}
            </div>
        </div>
    );
};

// Function to get the icon based on the platform name
const getIcon = (platformName) => {
    const icons = {
        linkedin: <i className="fa-brands fa-linkedin text-blue-600"></i>,
        instagram: <i className="fa-brands fa-instagram text-pink-500"></i>,
        facebook: <i className="fa-brands fa-facebook text-blue-800"></i>,
        twitter: <i className="fa-brands fa-twitter text-blue-400"></i>,
        youtube: <i className="fa-brands fa-youtube text-red-600"></i>,
        github: <i className="fa-brands fa-github text-gray-800"></i>,
    };
    return icons[platformName.toLowerCase()] || null;
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import './ContactUs.css';
import { useTheme } from '../ThemeContext';

const ContactUs = () => {
    const { isDarkMode } = useTheme();
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        address: ''
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const URI = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${URI}/api/users/getUser`);
                setUserProfile(response.data.users);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [URI]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URI}/api/contactme/create`, formData);
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <section className={`contact ${isDarkMode ? 'bg-gray-800 text-white ' : 'bg-white text-black'} py-12`} id="contact">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-10 border-b-2 ">
                    <h2 className="text-3xl font-bold">Contact me</h2>
                    <span className="block w-20 h-1 bg-blue-800 mx-auto mt-2"></span>
                    <div className=" text-lg font-semibold mb-4 text-red-600">Get in Touch</div>


                </div>

                <div className="lg:flex md:flex block items-center gap-10 my-4">
                    <div className="column left w-full md:w-1/2">

                        <p className="text-justify mb-4">
                            If you are interested in working together? Please fill out the form aside with some info about your project and I will get back to you as soon as I can. Please allow a couple days for me to respond.
                        </p>
                        <div className="icons space-y-4">
                            <div className="row flex items-center">
                                <FaUser className="text-crimson text-2xl" />
                                <div className="info ml-4">
                                    <div className="head font-medium">Name</div>
                                    <div className={`sub-title ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{userProfile.name}</div>
                                </div>
                            </div>
                            <div className="row flex items-center">
                                <FaMapMarkerAlt className="text-crimson text-2xl" />
                                <div className="info ml-4">
                                    <div className="head font-medium">Address</div>
                                    <div className={`sub-title ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{userProfile.address}</div>
                                </div>
                            </div>
                            <div className="row flex items-center">
                                <FaEnvelope className="text-crimson text-2xl" />
                                <div className="info ml-4">
                                    <div className="head font-medium">Email</div>
                                    <div className={`sub-title ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>{userProfile.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column right w-full md:w-1/2 ">
                        <div className="text text-lg font-semibold my-4">Message me</div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="fields flex flex-wrap gap-4">
                                <div className="field name flex-1">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Name"
                                        required
                                        className={`h-12 w-full border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-light-gray'} rounded-lg px-4 text-lg font-medium focus:border-gray-400`}
                                    />
                                </div>
                                <div className="field email flex-1">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Email"
                                        required
                                        className={`h-12 w-full border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-light-gray'} rounded-lg px-4 text-lg font-medium focus:border-gray-400`}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Subject"
                                    required
                                    className={`h-12 w-full border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-light-gray'} rounded-lg px-4 text-lg font-medium focus:border-gray-400`}
                                />
                            </div>
                            <div className="field textarea">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    cols="30"
                                    rows="10"
                                    placeholder="Message.."
                                    required
                                    className={`h-20 w-full border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-light-gray'} rounded-lg px-4 text-lg font-medium resize-none focus:border-gray-400`}>
                                </textarea>
                            </div>
                            <div className="button-area flex items-center">
                                <button
                                    type="submit"
                                    className={`w-40 h-12 border-2 border-crimson ${isDarkMode ? 'text-gray-300 hover:bg-crimson hover:text-white' : 'text-crimson hover:bg-crimson hover:text-white'} font-medium rounded-lg transition-all`}>
                                    Send message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;

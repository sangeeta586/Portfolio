import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';

const ContactMe = () => {
    const [userProfile, setUserProfile] = useState([]); // Initialize with an empty array
    const URI = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${URI}/api/contactme/`);
                setUserProfile(response.data);
                console.log('Fetched user profile:', response.data); // For debugging
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile(); // Call the function without parameters
    }, [URI]);

    return (
        <>
            <Sidebar />
            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">Contact Information</h1>
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                                <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider">Message</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {userProfile?.length > 0 ? (
                                userProfile.map((user, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-indigo-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                    >
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500">{user.email}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500">{user.subject}</td>
                                        <td className="py-4 px-6 text-sm text-gray-500">{user.message}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-6 text-center text-sm text-gray-500">
                                        No contact information available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ContactMe;

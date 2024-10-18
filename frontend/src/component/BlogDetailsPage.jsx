import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { PostComment } from './PostComment';
import axios from 'axios';

export const BlogDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { blog } = location.state || {};
    const { isDarkMode } = useTheme();
    
    // Initialize state for likes
    const [likes, setLikes] = useState(blog.likes || 0);
    
    // Handle back button click
    const handleBack = () => {
        navigate(-1);
    };
    
    const BASE_URL = import.meta.env.VITE_API_URL;

    const handleLike = () => {
        axios.post(`${BASE_URL}/api/Blogs/posts/${blog._id}/like`)
            .then((response) => {
                console.log("Blog liked successfully!");
                // Increment likes count
                setLikes(prevLikes => prevLikes + 1);
            })
            .catch((error) => {
                console.error("Error liking blog:", error);
            });
    };

    if (!blog) {
        return (
            <div className={`container mx-auto p-6 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
                Blog not found!
            </div>
        );
    }

    return (
        <div className={`p-6 py-20 min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
            <Navbar />
            <div className="flex flex-col">
                <button
                    onClick={handleBack}
                    className={`mb-6 w-40 text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'} p-2 px-5 rounded-md focus:outline-none`}
                >
                    ⬅ Back
                </button>
                <div className='grid lg:grid-cols-2 gap-10 md:grid-cols-2 grid-cols-1'>
                    <div>
                        {blog.image && (
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-auto md:h-full object-cover rounded-xl"
                            />
                        )}
                        {blog.video && (
                            <video
                                src={blog.video}
                                alt={blog.title}
                                controls
                                autoPlay
                                muted
                                className="w-full h-auto md:h-full object-cover rounded-xl"
                            />
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
                        <div className="mb-4" dangerouslySetInnerHTML={{ __html: blog.content }} />
                        <div className='mt-2'>
                            {blog.categories.map((category) => (
                                <span key={category._id} className='text-blue-500 mr-2 cursor-pointer'>#{category.name}</span>
                            ))}
                        </div>
                        {/* Display the number of likes with an icon */}
                        <div className="mt-4 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-red-500 mr-1 cursor-pointer"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                onClick={handleLike}
                            >
                                <path d="M10 18l-1.44-1.21C4.2 13.28 0 9.67 0 6.5 0 3.42 2.69 1 5.5 1c1.74 0 3.41.81 4.5 2.09C11.09 1.81 12.76 1 14.5 1 17.31 1 20 3.42 20 6.5c0 3.17-4.2 6.78-8.56 10.29L10 18z" />
                            </svg>
                            <span className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                {likes} {/* Use the likes state instead of blog.likes */}
                            </span>
                        </div>
                    </div>
                </div>
                {/* Pass blog ID to PostComment component */}
                <PostComment blog={blog} />
            </div>
        </div>
    );
};

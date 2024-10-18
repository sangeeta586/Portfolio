import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import axios from 'axios';
import { IoIosContact } from "react-icons/io";

export const PostComment = ({ blog }) => {
    const { isDarkMode } = useTheme();
    const [comments, setComments] = useState(blog.comments || []); // Use existing comments
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [commentText, setCommentText] = useState('');
    const BASE_URL = import.meta.env.VITE_API_URL;

    console.log("Blog Data:", blog); // Log blog data
    console.log("Comments Data:", comments); // Log comments data

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() && email.trim() && commentText.trim()) {
            const newComment = {
                id: Date.now(), // Unique ID based on timestamp
                name,
                email,
                content: commentText,
            };

            try {
                const resp = await axios.post(`${BASE_URL}/api/blogs/posts/${blog._id}/comments`, newComment);
                console.log('Response:', resp.data); // Log API response
                setComments([...comments, newComment]);
                setName(''); // Clear the input
                setEmail(''); // Clear the input
                setCommentText(''); // Clear the input
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        } else {
            alert("All fields are required!"); // Handle validation error
        }
    };

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>

            <div className='grid sm:grid-cols-2 gap-4'>
                <div className="flex space-x-4">
                    <div className="flex-1">
                        {comments.map((comment) => (
                            <div key={comment._id} className={`p-4 rounded-md ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'}`}>
                                <div className='flex content-center items-center gap-1'>
                                    <IoIosContact size={24} className="text-blue-600 mr-2" />
                                    <p className="font-bold">{comment.email}</p>
                                </div>
                                <p className='pl-10'>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleCommentSubmit} className="mb-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`border w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-700' : 'border-gray-300'}`}
                        placeholder="Your Name"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`border w-full p-2 rounded-md mt-2 ${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-700' : 'border-gray-300'}`}
                        placeholder="Your Email"
                        required
                    />
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows="3"
                        className={`border w-full p-2 rounded-md mt-2 ${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-700' : 'border-gray-300'}`}
                        placeholder="Add a comment..."
                        required
                    />
                    <button
                        type="submit"
                        className={`mt-2 w-32 text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'} p-2 rounded-md focus:outline-none`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

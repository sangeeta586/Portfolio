import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoIosContact } from 'react-icons/io';
import UpdateBlog from './UpdateBlog';
import Swal from 'sweetalert2'; // Import SweetAlert2

export const BlogDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { blog } = location.state || {};

    // Initialize state for likes and comments
    const [likes, setLikes] = useState(blog.likes || 0);
    const [comments, setComments] = useState(blog.comments || []);

    // Handle back button click
    const handleBack = () => {
        navigate(-1);
    };

    const BASE_URL = import.meta.env.VITE_API_URL;

    const handleLike = () => {
        axios.post(`${BASE_URL}/api/Blogs/posts/${blog._id}/like`)
            .then((response) => {
                console.log("Blog liked successfully!");
                setLikes(prevLikes => prevLikes + 1);
            })
            .catch((error) => {
                console.error("Error liking blog:", error);
            });
    };

    const handleDeleteComment = async (id) => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${BASE_URL}/api/Blogs/posts/${blog._id}/comments/${id}`);
                console.log("Comment deleted successfully!");
                // Update comments state to remove the deleted comment
                setComments(prevComments => prevComments.filter(comment => comment._id !== id));
                Swal.fire(
                    'Deleted!',
                    'Your comment has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error("Error deleting comment:", error);
                Swal.fire(
                    'Error!',
                    'There was an error deleting the comment.',
                    'error'
                );
            }
        }
    };

    const handleUpdateBlog = (Blog) => {
        setSelectedBlog(Blog);
        setShowModal(true);
    };

    if (!blog) {
        return (
            <div className="container mx-auto p-6 bg-white text-gray-800">
                Blog not found!
            </div>
        );
    }

    return (
        <div className="p-6 py-20 min-h-screen bg-white text-gray-800 ml-20">
            <div className="flex flex-col">
                <div className='flex justify-between content-center gap-4 items-center'>
                    <button
                        onClick={handleBack}
                        className="mb-6 w-40 text-white bg-blue-500 hover:bg-blue-700 p-2 px-5 rounded-md focus:outline-none"
                    >
                        ⬅ Back
                    </button>
                    <button
                        onClick={() => handleUpdateBlog(blog)}
                        className="mb-6 w-40 text-white bg-blue-500 hover:bg-blue-700 p-2 px-5 rounded-md focus:outline-none"
                    >
                        Update
                    </button>
                </div>
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
                                className="w-full h-auto md:h-full object-cover rounded-xl"
                                controls
                                autoPlay
                                muted
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
                            <span className="text-lg font-semibold text-gray-800">
                                {likes} {/* Use the likes state instead of blog.likes */}
                            </span>
                        </div>

                        <div className="flex-1 mt-4">
                            {comments.length > 0 ? comments.map((comment) => (
                                <div key={comment._id} className={`p-4  rounded-md bg-gray-100 mb-2`}>
                                    <div className='flex content-center items-center gap-1'>
                                        <IoIosContact size={24} className="text-blue-600 " />
                                        <p className="font-bold">{comment.email}</p>
                                        <button onClick={() => handleDeleteComment(comment._id)} className="ml-auto text-red-500 hover:text-red-700 flex">
                                            Delete
                                        </button>
                                    </div>
                                    <p className='lg:pl-10 md:pl-10'>{comment.content}</p>
                                </div>
                            )) : <p>No comments yet.</p>}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <UpdateBlog blog={selectedBlog} onClose={() => setShowModal(false)} />
                </div>
            )}
        </div>
    );
};

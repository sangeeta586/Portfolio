import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaThumbsUp, FaThumbsDown, FaRegComment } from 'react-icons/fa';
import UpdateBlog from './UpdateBlog';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const Blog = () => {
    const [Blogs, setBlogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedStates, setExpandedStates] = useState({});
    const [showMoreButton, setShowMoreButton] = useState(false); // State for showing "Show More" button
    const navigate = useNavigate()

    // Ref to track content height
    const contentRefs = useRef({});

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/Blogs/posts`);
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching Blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleUpdateBlog = (Blog) => {
        setSelectedBlog(Blog);
        setShowModal(true);
    };

    const handleAddBlog = () => {
        setSelectedBlog(null);
        setShowModal(true);
    };

    const handleDeleteBlog = async (Blog) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${Blog.title}. This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`${BASE_URL}/api/Blogs/posts/${Blog._id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setBlogs((prevBlogs) =>
                        prevBlogs.filter((cert) => cert._id !== Blog._id)
                    );
                    Swal.fire('Deleted!', `${Blog.title} has been deleted.`, 'success');
                } else {
                    throw new Error('Failed to delete the Blog.');
                }
            } catch (error) {
                console.error('Error deleting Blog:', error);
                Swal.fire('Error!', 'There was an error deleting the Blog.', 'error');
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Search filter logic
    const filteredBlogs = Blogs.filter((Blog) => {
        const authorName = Blog.author?.name.toLowerCase() || '';
        const authorEmail = Blog.author?.email.toLowerCase() || '';
        const title = Blog.title.toLowerCase();
        const categories = Blog.categories.map(cat => cat.name.toLowerCase()).join(' ');

        return (
            title.includes(searchQuery.toLowerCase()) ||
            authorName.includes(searchQuery.toLowerCase()) ||
            authorEmail.includes(searchQuery.toLowerCase()) ||
            categories.includes(searchQuery.toLowerCase())
        );
    });

    const toggleExpand = (blogId) => {
        setExpandedStates((prev) => ({
            ...prev,
            [blogId]: !prev[blogId],
        }));
    };

    useEffect(() => {
        // Check the heights of content after render
        const checkContentHeight = () => {
            filteredBlogs.forEach((Blog) => {
                const contentRef = contentRefs.current[Blog._id];
                if (contentRef) {
                    // Check if the content height exceeds a certain threshold (e.g., height for 4 lines)
                    const lineHeight = parseFloat(getComputedStyle(contentRef).lineHeight);
                    const maxHeight = lineHeight * 4; // Set to 4 lines
                    setShowMoreButton((prev) => ({
                        ...prev,
                        [Blog._id]: contentRef.scrollHeight > maxHeight,
                    }));
                }
            });
        };

        checkContentHeight();
    }, [filteredBlogs, expandedStates]);


    const handleOnclick = (blog) => {
        console.log(blog);
        navigate("/blog-details", { state: { blog } });
    };

    return (
        <motion.div
            className="form-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className='flex justify-center items-center flex-col lg:px-0 md:mx-0 md:px-0 px-5 pl-20 py-20'>
                <div className="flex justify-between items-center w-full lg:px-32">
                    <h1 className='lg:text-4xl text-2xl font-bold font-serif text-[#2C3E50]'>My Blogs</h1>
                    <button
                        onClick={handleAddBlog}
                        className="bg-pink-500 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out transform hover:bg-blue-800 hover:shadow-lg hover:scale-105">
                        Add Blog
                    </button>
                </div>
                <div className='flex justify-between items-center w-full lg:px-32 pl-32"'>

                    <input
                        type="text"
                        placeholder="Search by title, author name, email, or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="my-4  p-2 border rounded w-[100%]"
                    />

                </div>

                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 justify-start lg:px-32'>
                    {filteredBlogs.map((Blog) => {
                        const isExpanded = expandedStates[Blog._id] || false; // Get the expanded state for this blog

                        return (
                            <div key={Blog._id} className='border p-4 rounded-md shadow-md'>
                                <h1 className="text-lg md:text-2xl text-gray-800 my-2 flex justify-start items-center content-center gap-4">
                                    <FaUserCircle /> {Blog.author.name}
                                </h1>
                                <h2 className='text-xl font-bold my-2'>{Blog.title}</h2>

                                {/* Display the blog image if available */}
                                {Blog.image && <img src={Blog.image} alt={Blog.title} className='w-full h-96 rounded-md mb-2 cursor-pointer'
                                    onClick={() => handleOnclick(Blog)}
                                />}
                                {Blog.video && (
                                    <video
                                        src={Blog.video}
                                        alt={Blog.title}
                                        className="w-full h-auto md:h-full object-cover rounded-xl cursor-pointer"
                                        controls
                                    />
                                )}

                                <div className='mt-2'>
                                    {/* Limit content to 4 lines with Show More option */}
                                    <div
                                        ref={el => contentRefs.current[Blog._id] = el} // Attach ref to content div
                                        className={`overflow-hidden ${isExpanded ? '' : 'line-clamp-4'}`}
                                        dangerouslySetInnerHTML={{ __html: Blog.content }}
                                    />

                                    {showMoreButton[Blog._id] && ( // Show button if content exceeds 4 lines
                                        <button
                                            className='text-blue-500 mt-2'
                                            onClick={() => toggleExpand(Blog._id)} // Toggle expansion for this specific blog
                                        >
                                            {isExpanded ? 'Show Less' : 'Show More'}
                                        </button>
                                    )}
                                </div>
                                <div className='mt-2'>
                                    {Blog.categories.map((category) => (
                                        <span key={category._id} className='text-blue-500 mr-2'>#{category.name}</span>
                                    ))}
                                </div>

                                <div className='flex items-center mt-4'>
                                    <button className='flex items-center text-blue-500 mr-4'>
                                        <FaThumbsUp className='mr-1' />
                                        {Blog.likes || 0}
                                    </button>
                                    <button className='flex items-center text-red-500'>
                                        <FaThumbsDown className='mr-1' />
                                        {Blog.dislikes || 0}
                                    </button>

                                    {Blog.comments && Blog.comments.length > 0 ? (
                                        <button className='flex items-center text-gray-500 ml-4'>
                                            <FaRegComment className='mr-1' />
                                            {Blog.comments.length}
                                        </button>
                                    ) : (
                                        <span className='text-gray-400 ml-4'>No comments</span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm my-2">
                                    {formatDate(Blog.createdAt)} - {formatDate(Blog.updatedAt)}
                                </p>
                                <div className='flex justify-between mt-4'>
                                    <button onClick={() => handleUpdateBlog(Blog)} className='text-blue-500'>
                                        Update
                                    </button>
                                    <button onClick={() => handleDeleteBlog(Blog)} className='text-red-500'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {showModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <UpdateBlog blog={selectedBlog} onClose={() => setShowModal(false)} />
                </div>
            )}
        </motion.div>
    );
};

export default Blog;

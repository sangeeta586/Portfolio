import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FiPaperclip } from 'react-icons/fi';
import Swal from 'sweetalert2';
import axios from 'axios';
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateBlog = ({ onClose, blog }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    author: '',
    categories: '',
    image: null,
    video: null,
    audio: null,
    documents: [],
  });

  const token = localStorage.getItem('token');
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFileType, setSelectedFileType] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (blog) {
      setBlogData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        // Join category names into a comma-separated string
        categories: blog.categories.map(category => category.name).join(', '),
        image: null,
        video: null,
        audio: null,
        documents: [],
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Quill content change
  const handleQuillChange = (content) => {
    setBlogData((prevData) => ({
      ...prevData,
      content: content,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlogData((prevData) => ({
      ...prevData,
      [selectedFileType]: file,
    }));
    setShowFileOptions(false);
    setSelectedFileType('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before API call
    const formDataToSubmit = new FormData();

    formDataToSubmit.append('title', blogData.title);
    formDataToSubmit.append('content', blogData.content);
    // Split the categories string into an array
    formDataToSubmit.append('categories', blogData.categories.split(',').map(category => category.trim()));
    formDataToSubmit.append('author', localStorage.getItem("userId"));
   
    if (blogData.image) formDataToSubmit.append('image', blogData.image);
    if (blogData.video) formDataToSubmit.append('video', blogData.video);
    if (blogData.audio) formDataToSubmit.append('audio', blogData.audio);
    if (blogData.documents.length > 0) {
      blogData.documents.forEach(doc => {
        formDataToSubmit.append('documents', doc);
      });
    }

    try {
      const url = blog
        ? `${BASE_URL}/api/blogs/posts/${blog._id}`
        : `${BASE_URL}/api/blogs/posts`;

      const method = blog ? 'put' : 'post';

      const response = await axios({
        method: method,
        url: url,
        data: formDataToSubmit,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: 'success',
        title: `Blog ${blog ? 'Updated' : 'Created'}!`,
        text: `The blog has been ${blog ? 'updated' : 'created'} successfully.`,
      });

      setBlogData({
        title: '',
        content: '',
        author: '',
        categories: '',
        image: null,
        video: null,
        audio: null,
        documents: [],
      });
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `There was an error ${blog ? 'updating' : 'creating'} the blog. Please try again.`,
      });
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full p-4 rounded-lg shadow-lg h-[90%] overflow-y-auto">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg relative">
        <div className='flex justify-between content-center items-center'>
          <h2 className="text-2xl font-bold mb-4">{blog ? 'Update Blog' : 'Add Blog'}</h2>
          <IoMdClose onClick={() => onClose()} className='text-2xl cursor-pointer' />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Categories (comma-separated)</label>
          <input
            type="text"
            name="categories"
            value={blogData.categories}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <ReactQuill
            theme="snow"
            value={blogData.content}
            onChange={handleQuillChange}
            className="mt-1 w-full h-40 border rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        {selectedFileType && (
          <div className="mb-4">
            <label className="block text-gray-700">{selectedFileType.charAt(0).toUpperCase() + selectedFileType.slice(1)} Upload</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
            />
          </div>
        )}

        <div className='flex items-center gap-4 content-center relative my-4'>
          <button
            type="button"
            onClick={() => setShowFileOptions(!showFileOptions)}
            className="cursor-pointer"
          >
            <FiPaperclip className="mr-2 text-2xl" />
          </button>

          {loading ? (
            <span className="send"></span> // Show loader when loading
          ) : (
            <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
              {blog ? 'Update Blog' : 'Add Blog'}
            </button>
          )}

          {showFileOptions && (
            <ul className=' bg-slate-600 w-auto h-40 flex flex-col items-center justify-center rounded-xl'>
              <li onClick={() => { setSelectedFileType('image'); setShowFileOptions(false); }} className='text-white p-2 hover:text-black cursor-pointer w-full text-center'>Photo</li>
              <li onClick={() => { setSelectedFileType('video'); setShowFileOptions(false); }} className='text-white p-2 hover:text-black cursor-pointer w-full text-center'>Video</li>
              <li onClick={() => { setSelectedFileType('documents'); setShowFileOptions(false); }} className='text-white p-2 hover:text-black cursor-pointer w-full text-center'>Document</li>
              <li onClick={() => { setSelectedFileType('audio'); setShowFileOptions(false); }} className='text-white p-2 hover:text-black cursor-pointer w-full text-center'>Audio</li>
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;

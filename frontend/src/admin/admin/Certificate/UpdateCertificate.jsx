import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Swal from 'sweetalert2';
import axios from 'axios';
import ReactQuill from 'react-quill'; // Import ReactQuill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const BASE_URL = import.meta.env.VITE_API_URL;

const UpdateCertificate = ({ showModal, certificate }) => {
  const [certificateData, setCertificateData] = useState({
    name: '',
    description: '', // Now this will be a string with HTML content from Quill
    organization: '',
    issuedDate: '',
    startDate: '',
    endDate: '',
    image: null,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (certificate) {
      setCertificateData({
        name: certificate.name,
        description: certificate.description || '', // Initialize description
        organization: certificate.organization,
        issuedDate: certificate.issuedDate,
        startDate: certificate.session.start,
        endDate: certificate.session.end,
        image: null
      });
    }
  }, [certificate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setCertificateData((prevData) => ({
      ...prevData,
      description: value, // Save the rich text content
    }));
  };

  const handleImageChange = (e) => {
    setCertificateData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', certificateData.name);
    formDataToSubmit.append('description', certificateData.description); // This will contain HTML from Quill
    formDataToSubmit.append('organization', certificateData.organization);
    formDataToSubmit.append('issuedDate', certificateData.issuedDate);
    formDataToSubmit.append('startDate', certificateData.startDate);
    formDataToSubmit.append('endDate', certificateData.endDate);

    if (certificateData.image) {
      formDataToSubmit.append('image', certificateData.image);
    }

    try {
      const url = certificate 
        ? `${BASE_URL}/api/certificates/update/${certificate._id}` 
        : `${BASE_URL}/api/certificates/create`;

      const method = certificate ? 'put' : 'post';

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
        title: `Certificate ${certificate ? 'Updated' : 'Created'}!`,
        text: `The certificate has been ${certificate ? 'updated' : 'created'} successfully.`,
      });

      setCertificateData({
        name: '',
        description: '',
        organization: '',
        issuedDate: '',
        startDate: '',
        endDate: '',
        image: null,
      });
      showModal(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `There was an error ${certificate ? 'updating' : 'creating'} the certificate. Please try again.`,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 rounded-lg shadow-lg h-[90%] overflow-y-auto">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
        <div className='flex justify-between content-center items-center'>
          <h2 className="text-2xl font-bold mb-4">{certificate ? 'Update Certificate' : 'Add Certificate'}</h2>
          <IoMdClose onClick={() => showModal(false)} className='text-2xl cursor-pointer' />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Certificate Name</label>
          <input
            type="text"
            name="name"
            value={certificateData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <ReactQuill
            value={certificateData.description}
            onChange={handleDescriptionChange} // Rich text handler
            className="mt-1 bg-white"
            theme="snow"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Organization</label>
          <input
            type="text"
            name="organization"
            value={certificateData.organization}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Issued Date</label>
          <input
            type="date"
            name="issuedDate"
            value={certificateData.issuedDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={certificateData.startDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={certificateData.endDate}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-pink-500"
          />
        </div>

        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded">
          {certificate ? 'Update Certificate' : 'Add Certificate'}
        </button>
      </form>
    </div>
  );
};

export default UpdateCertificate;

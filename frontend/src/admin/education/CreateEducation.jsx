import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";

const BASE_URL = import.meta.env.VITE_API_URL;

const CreateEducation = ({ showmodel, selectedEdu }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    degree: '',
    specialization: '',
    instituteName: '',
    percentage: '',
    address: '',
    session: { start: '', end: '' },
    description: '',
    image: null,
    achievements: [''],
  });

  useEffect(() => {
    if (selectedEdu) {
      setFormData({
        degree: selectedEdu.degree,
        specialization: selectedEdu.specialization || '',
        instituteName: selectedEdu.instituteName,
        percentage: selectedEdu.percentage,
        address: selectedEdu.address || '',
        session: {
          start: selectedEdu.session.start.split('T')[0],
          end: selectedEdu.session.end.split('T')[0],
        },
        description: selectedEdu.description,
        image: null,
        achievements: selectedEdu.achievements || [''],
      });
    } else {
      setFormData({
        degree: '',
        specialization: '',
        instituteName: '',
        percentage: '',
        address: '',
        session: { start: '', end: '' },
        description: '',
        image: null,
        achievements: [''],
      });
    }
  }, [selectedEdu]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name.startsWith('achievements')) {
      const index = parseInt(name.split('-')[1]);
      const updatedAchievements = [...formData.achievements];
      updatedAchievements[index] = value;
      setFormData({ ...formData, achievements: updatedAchievements });
    } else if (name === 'start' || name === 'end') {
      setFormData({
        ...formData,
        session: { ...formData.session, [name]: value },
      });
    } else if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, ''],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          formDataToSend.append(`${key}[${index}]`, item);
        });
      } else if (key === 'image') {
        formDataToSend.append(key, formData.image);
      } else if (key === 'session') {
        formDataToSend.append('session[start]', new Date(formData.session.start).toISOString());
        formDataToSend.append('session[end]', new Date(formData.session.end).toISOString());
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      if (selectedEdu) {
        const response = await axios.put(`${BASE_URL}/api/educations/update/${selectedEdu._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Education updated:', response.data);
      } else {
        const response = await axios.post(`${BASE_URL}/api/educations/create`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Education created:', response.data);
      }
      showmodel(false);
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg bg-white md:h-auto h-[80vh] overflow-y-auto md:overflow-visible">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-4">{selectedEdu ? 'Update Education' : 'Add Education'}</h2>
        <MdClose onClick={() => showmodel(false)} />
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Horizontal Fields for Update Form */}
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Degree</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Institute Name</label>
          <input
            type="text"
            name="instituteName"
            value={formData.instituteName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Percentage</label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="start"
            value={formData.session.start}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="end"
            value={formData.session.end}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {formData.achievements.map((achievement, index) => (
          <div className="col-span-2" key={index}>
            <label className="block text-sm font-medium text-gray-700">Achievement {index + 1}</label>
            <input
              type="text"
              name={`achievements-${index}`}
              value={achievement}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddAchievement}
          className="mb-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 col-span-2"
        >
          Add Achievement
        </button>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required={!selectedEdu} // Make it required only for new entries
          />
        </div>

        <button
          type="submit"
          className="col-span-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          {selectedEdu ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateEducation;

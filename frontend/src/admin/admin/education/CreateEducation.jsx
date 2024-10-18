import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const BASE_URL = import.meta.env.VITE_API_URL;

const CreateEducation = ({ setShowModel, selectedEdu, fetchEducations }) => {
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
    }
  }, [selectedEdu]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (name.startsWith('achievements')) {
      const index = parseInt(name.split('-')[1]);
      const updatedAchievements = [...formData.achievements];
      updatedAchievements[index] = value;
      setFormData(prev => ({ ...prev, achievements: updatedAchievements }));
    } else if (name === 'start' || name === 'end') {
      setFormData(prev => ({
        ...prev,
        session: { ...prev.session, [name]: value },
      }));
    } else if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, ''],
    }));
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
      const url = selectedEdu 
        ? `${BASE_URL}/api/educations/update/${selectedEdu._id}` 
        : `${BASE_URL}/api/educations/create`;
      const method = selectedEdu ? axios.put : axios.post;

      const response = await method(url, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(selectedEdu ? 'Education updated:' : 'Education created:', response.data);
      setShowModel(false);
      fetchEducations(); // Fetch updated educations after successful save
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-lg bg-white md:h-auto h-[80vh] overflow-y-auto md:overflow-visible">
      <div className='flex justify-between items-center'>
        <h2 className="text-2xl font-bold mb-4">{selectedEdu ? 'Update Education' : 'Add Education'}</h2>
        <MdClose onClick={() => setShowModel(false)} className="cursor-pointer" />
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Horizontal Fields for Update Form */}
        <InputField label="Degree" name="degree" value={formData.degree} onChange={handleChange} required />
        <InputField label="Specialization" name="specialization" value={formData.specialization} onChange={handleChange} />
        <InputField label="Institute Name" name="instituteName" value={formData.instituteName} onChange={handleChange} required />
        <InputField label="Percentage" name="percentage" type="number" value={formData.percentage} onChange={handleChange} required />
        <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
        
        <DateInput label="Start Date" name="start" value={formData.session.start} onChange={handleChange} required />
        <DateInput label="End Date" name="end" value={formData.session.end} onChange={handleChange} required />
        
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <ReactQuill
            name="description"
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
          />
        </div>

        {formData.achievements.map((achievement, index) => (
          <InputField 
            key={index} 
            label={`Achievement ${index + 1}`} 
            name={`achievements-${index}`} 
            value={achievement} 
            onChange={handleChange} 
          />
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

const InputField = ({ label, name, value, onChange, type = 'text', required = false }) => (
  <div className="md:col-span-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      aria-label={label}
    />
  </div>
);

const DateInput = ({ label, name, value, onChange, required }) => (
  <div className="md:col-span-1">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
    />
  </div>
);

export default CreateEducation;

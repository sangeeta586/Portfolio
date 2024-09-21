import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const CreateProfile = ({ userProfile, setShowModalUpdate }) => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
        defaultValues: {
            name: userProfile.name,
            email: userProfile.email,
            title: userProfile.title,
            Bio: userProfile.Bio,
            socialMedia: userProfile.socialMedia || [] // Set default values for social media
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'socialMedia',
    });
    
    const URI = import.meta.env.VITE_API_URL;

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${URI}/api/users/update/${userProfile._id}`, data);
            console.log('Response from server:', response.data);
            reset();
            alert('Profile updated successfully!');
            setShowModalUpdate(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('There was an error updating the profile.');
        }
    };

    return (
        <motion.div
            className="lg:w-[80%] md:w-[80%] w-full m-5 flex justify-center items-center flex-col bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 absolute inset-16 z-50 bg-opacity-90 min-h-[300px] max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center w-full">
                <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Update Profile</h2>
                <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => setShowModalUpdate(false)}
                >
                    <FaTimes size={20} />
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                {/* Name */}
                <div className="form-group">
                    <label className="font-semibold mb-2 text-gray-700 block">Name:</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your name"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="form-group">
                    <label className="font-semibold mb-2 text-gray-700 block">Email:</label>
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email format'
                            }
                        })}
                    />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>

                {/* Title */}
                <div className="form-group">
                    <label className="font-semibold mb-2 text-gray-700 block">Title:</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your title"
                        {...register('title', { required: 'Title is required' })}
                    />
                    {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
                </div>

                {/* Bio */}
                <div className="form-group">
                    <label className="font-semibold mb-2 text-gray-700 block">Bio:</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Tell us about yourself"
                        {...register('Bio')}
                    />
                </div>

                {/* Social Media Links */}
                <div>
                    <h3 className="font-semibold mb-2 text-gray-700">Social Media:</h3>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                {...register(`socialMedia.${index}.name`)}
                                defaultValue={field.name} // Default value for name
                            />
                            <input
                                type="text"
                                placeholder="URL"
                                className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                {...register(`socialMedia.${index}.url`)}
                                defaultValue={field.url} // Default value for URL
                            />
                            <button
                                type="button"
                                className="text-red-500"
                                onClick={() => remove(index)}
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="text-blue-500"
                        onClick={() => append({ name: '', url: '' })}
                    >
                        Add Social Media
                    </button>
                </div>

                <button type="submit" className="w-40 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200">
                    Save Changes
                </button>
                
            </form>
        </motion.div>
    );
};

export default CreateProfile;

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles

const CreateProfile = ({ userProfile, setShowModalUpdate }) => {
    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm({
        defaultValues: {
            name: userProfile.name,
            email: userProfile.email,
            title: userProfile.title,
            bio: userProfile.bio,
            socialMedia: userProfile.socialMedia || [],
            address: userProfile.address // Ensure address is included in default values
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'socialMedia',
    });

    const URI = import.meta.env.VITE_API_URL;

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`${URI}/api/users/update/${userProfile._id}`, data);
            console.log('Response from server:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'User updated successfully!',
                showConfirmButton: false,
                timer: 1500
            });
            setShowModalUpdate(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'There was an error updating the user.',
            });
        }
    };

    const handleBioChange = (value) => {
        setValue('bio', value); // Set the bio value in react-hook-form
    };

    const ErrorMessage = ({ message }) => (
        <p className="text-red-600 text-sm">{message}</p>
    );

    return (
        <motion.div
            className="lg:w-[90%] md:w-[90%] w-[75%] lg:pt-96 pt-60 m-5 flex justify-center items-center flex-col bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 absolute inset-16 z-50 bg-opacity-90 min-h-[300px] max-h-[800px] overflow-y-auto"
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
                    {errors.name && <ErrorMessage message={errors.name.message} />}
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
                    {errors.email && <ErrorMessage message={errors.email.message} />}
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
                    {errors.title && <ErrorMessage message={errors.title.message} />}
                </div>

                {/* Address */}
                <div className="form-group">
                    <label className="font-semibold mb-2 text-gray-700 block">Address:</label>
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        placeholder="Enter your address"
                        {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <ErrorMessage message={errors.address.message} />}
                </div>

                {/* Bio */}
                <div className="form-group">
                    <label className="font-semibold mb-2 text-gray-700 block">Bio:</label>
                    <ReactQuill
                        value={userProfile.bio} // Set initial value
                        onChange={handleBioChange} // Update bio on change
                        placeholder="Write something about yourself..."
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
                            />
                            <input
                                type="text"
                                placeholder="URL"
                                className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                {...register(`socialMedia.${index}.url`)}
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

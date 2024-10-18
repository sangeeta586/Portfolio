import React from 'react'; 
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import axios from 'axios';
import './CreateProfile.css'; // Custom CSS for styling
import Swal from 'sweetalert2'; // Import SweetAlert2

const UserForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Post the form data to the backend
      const response = await axios.post('/api/users/register', data); // Update the URL as needed
      console.log('Response from server:', response.data);

      // Reset form on successful submission
      reset();

      Swal.fire({
        icon: 'success',
        title: 'User registered successfully!',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error('Error registering user:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There was an error registering the user.',
      });
    }
  };

  return (
    <motion.div 
      className="form-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="form-title">User Registration</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        {/* Name */}
        <div className="form-group">
          <label>Name:</label>
          <input 
            type="text" 
            placeholder="Enter your name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Enter your email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Invalid email format'
              }
            })}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            placeholder="Enter your password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error-msg">{errors.password.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="form-group">
          <label>Phone Number:</label>
          <input 
            type="number" 
            placeholder="Enter your phone number"
            {...register('phoneNo')}
          />
        </div>

        {/* Title */}
        <div className="form-group">
          <label>Title:</label>
          <input 
            type="text" 
            placeholder="Enter your title"
            {...register('title')}
          />
        </div>

        {/* Bio */}
        <div className="form-group">
          <label>Bio:</label>
          <textarea 
            placeholder="Enter a short bio"
            {...register('Bio')}
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address:</label>
          <input 
            type="text" 
            placeholder="Enter your address"
            {...register('address')}
          />
        </div>

        {/* Social Media */}
        <div className="form-group">
          <label>Social Media (Optional):</label>
          <div className="social-media-inputs">
            <input 
              type="text" 
              placeholder="Social media platform"
              {...register('socialMediaName')}
            />
            <input 
              type="text" 
              placeholder="Social media link"
              {...register('socialMediaUrl')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="submit-btn"
        >
          Register
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UserForm;


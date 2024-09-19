import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Aboutme = () => {
  const [userProfile, setUserProfile] = useState(null); // Initialize state as null
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch data only on component mount

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${URI}/api/users/getUser`);
      console.log("Fetching user profile", response);
      // Assuming the first user in the response is the desired user profile
      setUserProfile(response.data.users);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!userProfile) return <p>Loading...</p>;

  // Find the resume URL in the socialMedia array
  const resumeLink = userProfile.socialMedia.find((social) => social.name === 'resume')?.url;

  return (
    <section id="about" className="py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <p className="text-lg mb-6">
        {userProfile.bio}
      </p>
      <div className="flex space-x-4">
        {/* Display resume link if it exists */}
        {resumeLink && (
          <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            View Resume
          </a>
        )}
        <a href="#contact" className="border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-100">Contact Me</a>
      </div>
    </section>
  );
};

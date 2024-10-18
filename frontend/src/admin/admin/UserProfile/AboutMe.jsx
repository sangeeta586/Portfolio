import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const AboutMe = () => {
  const [userProfile, setUserProfile] = useState(null); // Initialize state as null
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch data only on component mount

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${URI}/api/users/getUser`);

      // Assuming the first user in the response is the desired user profile
      setUserProfile(response.data.users);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  if (!userProfile) return <p className='flex justify-center items-center content-center'><span class="loader"></span></p>;
  console.log("Fetching user profile", userProfile.bio);
  // Find the resume URL in the socialMedia array
  const resumeLink = userProfile.socialMedia.find((social) => social.name === 'resume')?.url;

  return (
    <section className="py-12 max-w-7xl mx-auto lg:mx-0 md:mx-0 ml-20  lg:px-0 md:px-0 px-5">
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <div
        className={`text-lg mb-6  `}
        dangerouslySetInnerHTML={{ __html: userProfile?.bio }} // Assuming skill.description contains the rich text
      />

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

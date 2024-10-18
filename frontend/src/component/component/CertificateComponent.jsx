import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '../ThemeContext';
import { motion } from 'framer-motion';

export const CertificateComponent = () => {
  const [certificateRecords, setCertificateRecords] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchCertificateRecords = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/certificates/gettAllcertificates`);
        setCertificateRecords(response.data);
      } catch (error) {
        console.error('Error fetching Certificate records:', error);
      }
    };

    fetchCertificateRecords();
  }, [BASE_URL]);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      handleNextImage();
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(autoScroll); // Cleanup interval on unmount
  }, [currentImageIndex, certificateRecords]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === certificateRecords.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? certificateRecords.length - 1 : prevIndex - 1
    );
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <motion.div
      className="form-container"
      initial={{ opacity: 0, scale: 0.9, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <section
        id="certificate"
        className={`py-12 w-screen ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
      >
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Certificate
          </h2>
          <span className={`block w-20 h-1 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-800'} mx-auto mt-2`}></span>
        </div>

        {certificateRecords.length > 0 && (
          <div className="lg:flex md:flex block justify-between items-start px-10">
            {/* Image Section */}
            <div className="relative w-full lg:w-1/2 h-[60vh] overflow-hidden">
              <img
                className={`w-full h-full object-contain rounded-md transition-transform duration-500 hover:scale-150`}
                src={certificateRecords[currentImageIndex].image}
                alt={`${certificateRecords[currentImageIndex].name} - ${currentImageIndex + 1}`}
              />

              {/* Carousel controls */}
              <button
                onClick={handlePrevImage}
                className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full focus:outline-none ${isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
              >
                ❮
              </button>

              <button
                onClick={handleNextImage}
                className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full focus:outline-none ${isDarkMode ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-700'}`}
              >
                ❯
              </button>
            </div>

            {/* Details Section */}
            <div className={`w-full lg:w-1/2 lg:px-20 md:px-10 px-5 mt-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              <p className="font-bold text-2xl md:text-4xl uppercase tracking-wide">
                {certificateRecords[currentImageIndex].name}
              </p>
              <h1 className="text-lg md:text-2xl my-2">
                {certificateRecords[currentImageIndex].organization}
              </h1>
              
              <div
                className={`mb-4 text-justify ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                dangerouslySetInnerHTML={{ __html: certificateRecords[currentImageIndex].description }} // Assuming skill.description contains the rich text
              />
              <p className={`text-sm ml-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {formatDate(certificateRecords[currentImageIndex].session.start)} - {formatDate(certificateRecords[currentImageIndex].session.end)}
              </p>
              <p className={`mt-2 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <strong>Issued Date:</strong> {formatDate(certificateRecords[currentImageIndex].issuedDate)}
              </p>
            </div>
          </div>
        )}
      </section>
    </motion.div>
  );
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Education = () => {
  const [educationRecords, setEducationRecords] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEducationRecords = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/educations/getAllEdu`); // Adjust the API endpoint as needed
       
        setEducationRecords(response.data);
      } catch (error) {
        console.error('Error fetching education records:', error);
      }
    };

    fetchEducationRecords();
  }, []);

  return (
    <section id="education" className="py-12 bg-gray-100 w-screen">
      <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Education</h2>
          <span className="block w-20 h-1 bg-blue-800 mx-auto mt-2"></span>
        </div>
      <div className="relative overflow-hidden">
        <div className="flex flex-nowrap gap-8 animate-slide w-full justify-center ">
          {educationRecords.length === 0 ? (
            <p className="text-center text-gray-600 text-lg w-full">No education records found</p>
          ) : (
            educationRecords.map((education) => (
              <div key={education._id} className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl flex-shrink-0 w-80">
                <div className="flex items-center mb-4">
                  <i className="fa-solid fa-graduation-cap text-4xl text-blue-600"></i>
                  <div className="ml-4">
                    <h3 className="text-2xl font-semibold text-gray-800">{education.degree}</h3>
                    <p className="text-sm text-gray-500">({new Date(education.session.start).getFullYear()}-{new Date(education.session.end).getFullYear()})</p>
                  </div>
                </div>
                <p className="text-gray-700 font-medium">{education.instituteName}</p>
                <p className="text-gray-600">Percentage: <span className="font-semibold">{education.percentage}%</span></p>
                {education.description && <p className="mt-4 text-gray-600">{education.description}</p>}
              </div>
            ))
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          50% { transform: translateX(-10%); }
          100% { transform: translateX(0); }
        }

        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

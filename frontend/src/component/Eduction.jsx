import React from 'react'

export const Eduction = () => {
  return (
    <section id="education" className="py-12 bg-gray-100">
          <h2 className="text-3xl font-bold text-center mb-6">Education</h2>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <i className="fa-solid fa-graduation-cap text-3xl mb-4"></i>
              <h3 className="text-xl font-bold">BCA (2022-2024)</h3>
              <p className="text-gray-600">SILVER OAK UNIVERSITY</p>
              <p className="text-gray-600">Passed the examination in 2024.</p>
            </div>
          </div>
        </section>
  )
}

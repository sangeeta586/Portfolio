import React from 'react'

export const ContactUs = () => {
  return (
    <section id="contact" className="py-12">
          <h2 className="text-3xl font-bold text-center mb-6">Contact Me</h2>
          <div className="max-w-4xl mx-auto">
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Full Name</label>
                <input type="text" id="name" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">Your Message</label>
                <textarea id="message" rows="4" className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50" required></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send Message</button>
            </form>
          </div>
        </section> 
  )
}

import React from 'react'

export const Project = () => {
  return (
    <section id="projects" className="py-12">
          <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2plY3R8ZW58MHx8MHx8fDA%3D" alt="Project 1" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Project 1</h3>
                <p className="text-gray-700 mb-4">Description of Project 1</p>
                <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Project</a>
              </div>
            </div>
            {/* Repeat similar blocks for other projects */}
          </div>
        </section>

  )
}

import React from 'react'

export const Aboutme = () => {
  return (
    <section id="about" className="py-12 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-lg mb-6">
            I am a highly motivated Bachelor of Computer Applications (BCA) graduate from Silver Oak University in Ahmedabad, Gujarat...
          </p>
          <div className="flex space-x-4">
            <a href="https://drive.google.com/file/d/1EF-Udc1UV2yxhBXXKRy1kfCt-O-nktV0/view?usp=sharing" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">My Resume</a>
            <a href="#contact" className="border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-100">Contact Me</a>
          </div>
        </section>
  )
}

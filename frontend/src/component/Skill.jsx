import React from 'react'

export const Skill = () => {
  return (
    <section id="skills" className="py-12">
          <h2 className="text-3xl font-bold text-center mb-6">My Skills</h2>
          <div className="flex flex-wrap justify-center space-x-6 text-4xl">
            <i className="fa-brands fa-html5 text-orange-500" title="HTML5"></i>
            <i className="fa-brands fa-css3 text-blue-500" title="CSS3"></i>
            <i className="fa-brands fa-js text-yellow-500" title="JavaScript"></i>
            <i className="fa-brands fa-bootstrap text-purple-600" title="Bootstrap"></i>
            <i className="fa-brands fa-java text-red-500" title="Java"></i>
            <i className="fa-brands fa-c text-gray-700" title="C"></i>
            <i className="fa-brands fa-python text-blue-400" title="Python"></i>
          </div>
        </section>
  )
}

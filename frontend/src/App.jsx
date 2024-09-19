import React from 'react';
import './App.css'; // Assuming your CSS is in App.css
import AOS from 'aos';
import 'aos/dist/aos.css';
import TypeIt from 'typeit';

const App = () => {
  React.useEffect(() => {
    const typeItInstance = new TypeIt("#typed-text", {
      speed: 200,
      waitUntilVisible: true,
      loop: true
    })
    .type("web developer.")
    .pause(200)
    .delete(14)
    .type("Freelancer.")
    .delete(10)
    .pause(200)
    .delete(10)
    .type("Student.")
    .go();

    return () => {
      typeItInstance.destroy(); // Clean up the TypeIt instance
    };
  }, []);

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 bg-[#dcf0f1] shadow-md z-50" data-aos="fade-down">
        <nav className="navbar navbar-expand-lg">
          <div className="container mx-auto">
            <a className="navbar-brand" href="#">
              <img src="https://i.postimg.cc/XJFMdqW2/signature.png" alt="signature" width="100" />
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa-solid fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link nav-hover" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-hover" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-hover" href="#education">Education</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-hover" href="#skills">Skills</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-hover" href="#projects">Projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link nav-hover" href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section id="home" className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/blue-toned-collection-paper-sheets-with-copy-space_23-2148320445.jpg?w=900&t=st=1709066598~exp=1709067198~hmac=c5c0995a7289d90e1e59f33310d419716d3975cedc8f97a8f31c119f7619dcaf')" }}>
          <div className="container mx-auto flex flex-wrap-reverse">
            <div className="w-full md:w-2/3 flex flex-col justify-center" data-aos="fade-right">
              <h1 className="text-5xl font-bold mb-3">👋 Hello I am YASH KOLADIYA</h1>
              <p className="text-xl">I am a <span id="typed-text"></span></p>
              <div className="flex gap-3 text-3xl mt-4">
                <a href="https://www.linkedin.com/in/yash-koladiya/" className="text-blue-600 hover:text-blue-800"><i className="fa-brands fa-linkedin"></i></a>
                <a href="https://www.instagram.com/mr_yash_koladiya/" className="text-pink-600 hover:text-pink-800"><i className="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=100080077067443" className="text-blue-700 hover:text-blue-900"><i className="fa-brands fa-facebook"></i></a>
                <a href="https://x.com/YashKoladiya913" className="text-blue-500 hover:text-blue-700"><i className="fa-brands fa-twitter"></i></a>
              </div>
            </div>
            <div className="w-full md:w-1/3 text-center" data-aos="fade-left">
              <img src="https://i.postimg.cc/Px1cN7b9/111.png" className="mx-auto border rounded-full" alt="YASH KOLADIYA profile" width="300" />
            </div>
          </div>
          <button className="fixed bottom-5 right-5 bg-black text-white p-3 rounded-full shadow-lg">
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </section>
        <section id="about" className="py-5 mb-5">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold mb-3" data-aos="fade-up">About Me</h1>
            <p className="text-lg" data-aos="fade-up">I am a highly motivated Bachelor of Computer Applications (BCA) graduate from Silver Oak University in Ahmedabad, Gujarat. With a strong passion for software development, I have honed my skills in Java, Python, HTML, CSS, and JavaScript through various hands-on projects. My experience includes designing and developing a personal portfolio website and an eCommerce website, which showcase my ability to create responsive and dynamic web applications. I am proficient in user authentication, data security, and advanced search and filtering options. Additionally, I hold certifications in Google Analytics and Data Studio. I am eager to contribute to a dynamic team, leveraging my strong communication, problem-solving, and creative skills to tackle challenging projects. Fluent in English and Gujarati, I am ready to bring my expertise to a collaborative and innovative work environment. Thank you for visiting my website. Feel free to contact me or connect with me on social media.</p>
            <div className="flex gap-4 mt-5" data-aos="fade-up">
              <a href="https://drive.google.com/file/d/1EF-Udc1UV2yxhBXXKRy1kfCt-O-nktV0/view?usp=sharing" className="btn btn-dark">
                <button type="button" className="bg-black text-white px-4 py-2 rounded">My Resume</button>
              </a>
              <a href="#contact" className="bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">Contact Me</a>
            </div>
          </div>
        </section>
        <section id="education" className="py-5">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold border-b-2 border-dark mb-5" data-aos="fade-up">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-teal-100 rounded shadow-md" data-aos="flip-right">
                <i className="fa-solid fa-graduation-cap text-3xl mb-4"></i>
                <h3 className="text-xl font-semibold">BCA (2022-2024)</h3>
                <p className="text-lg">SILVER OAK UNIVERSITY</p>
                <p>Passed the examination in 2024.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="skills" className="py-5">
          <h2 className="text-center text-2xl font-bold mb-5" data-aos="fade-up">My Skills</h2>
          <div className="container mx-auto flex flex-wrap gap-4 justify-center">
            <i className="fa-brands fa-html5 text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
            <i className="fa-brands fa-css3 text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
            <i className="fa-brands fa-js text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
            <i className="fa-brands fa-bootstrap text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
            <i className="fa-brands fa-java text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
            <i className="fa-brands fa-python text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
            <i className="fa-brands fa-node text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
            <i className="fa-brands fa-react text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
            <i className="fa-brands fa-php text-5xl p-4 bg-gray-100 rounded-full shadow-md hover:scale-105 transition-transform" data-aos="zoom-in"></i>
          </div>
        </section>
        <section id="projects" className="py-5">
          <h2 className="text-center text-2xl font-bold mb-5" data-aos="fade-up">My Projects</h2>
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded shadow-md" data-aos="fade-up">
              <h3 className="text-xl font-semibold mb-2">Personal Portfolio</h3>
              <p>A personal portfolio website showcasing my projects, skills, and contact information.</p>
            </div>
            <div className="p-4 bg-gray-100 rounded shadow-md" data-aos="fade-up">
              <h3 className="text-xl font-semibold mb-2">eCommerce Website</h3>
              <p>An eCommerce platform developed to handle product listings, user authentication, and payment processing.</p>
            </div>
          </div>
        </section>
        <section id="contact" className="py-5">
          <h2 className="text-center text-2xl font-bold mb-5" data-aos="fade-up">Contact Me</h2>
          <div className="container mx-auto">
            <form action="https://formspree.io/f/myformid" method="POST" className="max-w-lg mx-auto">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded mb-4" required />
              <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full p-2 border border-gray-300 rounded mb-4" required />
              <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
              <textarea id="message" name="message" rows="4" className="w-full p-2 border border-gray-300 rounded mb-4" required></textarea>
              <button type="submit" className="bg-black text-white px-4 py-2 rounded">Send Message</button>
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-[#dcf0f1] py-4 text-center" data-aos="fade-up">
        <p className="text-sm">© 2024 YASH KOLADIYA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

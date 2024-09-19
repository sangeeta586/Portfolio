import React from 'react'

export const Profile = () => {
    return (
        <section id="home" className="flex flex-col lg:flex-row items-center justify-between p-6 max-w-7xl mx-auto">
            <div className="lg:w-2/3 text-center lg:text-left">
                <h1 className="text-4xl font-bold mb-4">👋 Hello I am YASH KOLADIYA</h1>
                <p className="text-xl mb-4">
                    I am a <span id="typed-text" className="font-bold">Full Stack Web Developer</span>
                </p>
                <div className="flex justify-center lg:justify-start space-x-4 mb-6">
                    <a href="https://www.linkedin.com/in/yash-koladiya/" className="text-blue-600 hover:text-blue-800"><i className="fa-brands fa-linkedin"></i></a>
                    <a href="https://www.instagram.com/mr_yash_koladiya/" className="text-pink-500 hover:text-pink-700"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.facebook.com/profile.php?id=100080077067443" className="text-blue-800 hover:text-blue-900"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://x.com/YashKoladiya913" className="text-blue-400 hover:text-blue-600"><i className="fa-brands fa-twitter"></i></a>
                </div>
            </div>
            <div className="lg:w-1/3 text-center mb-6 lg:mb-0">
                <img src="https://i.postimg.cc/Px1cN7b9/111.png" alt="YASH KOLADIYA profile" className="w-72 h-72 object-cover rounded-full border" />
            </div>
        </section>
    )
}

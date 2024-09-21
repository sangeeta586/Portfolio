import React, { useState } from 'react';

const Button = ({name}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const animateButton = (e) => {
    e.preventDefault();
    setIsAnimating(true);

    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  return (
    <button
      className={`relative inline-block px-8 py-4 mt-24 mb-16 font-sans text-white bg-pink-500 rounded shadow-lg transition-transform duration-100 ease-in ${isAnimating ? 'animate' : ''}`}
      onClick={animateButton}
    >
      {name}
      <span className={`absolute inset-0 transition-all duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
        {/* Top bubbles animation */}
        <span className="absolute  h-full bg-pink-500 rounded-full opacity-50 animate-bubble1"></span>
        {/* Add more bubble spans as needed */}
      </span>
      <style jsx>{`
        @keyframes topBubbles {
          0% {
            background-position: 5% 90%;
          }
          50% {
            background-position: 0% 80%;
          }
          100% {
            background-position: 0% 70%;
          }
        }
        @keyframes bottomBubbles {
          0% {
            background-position: 10% -10%;
          }
          50% {
            background-position: 0% 80%;
          }
          100% {
            background-position: 0% 90%;
          }
        }
        .animate-bubble1 {
          animation: topBubbles 0.75s forwards;
        }
        /* Define additional animations for other bubbles here */
      `}</style>
    </button>
  );
};

export default Button;

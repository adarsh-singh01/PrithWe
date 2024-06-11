import React from 'react';
import image from "../assets/error.png";

const NotFound = () => {
  return (
    <div 
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Content */}
      <div className="relative z-10 bg-white bg-opacity-75 p-10 rounded-lg shadow-lg text-center max-w-md mx-auto -mt-20">
        <h1 className="text-6xl md:text-9xl font-bold text-gray-800">404</h1>
        <p className="text-xl md:text-2xl font-medium text-gray-600 mt-4">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist.
        </p>
        <a href="/" className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

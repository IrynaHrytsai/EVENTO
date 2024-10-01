import React from 'react';

const Success = () => {
  return (
    <div className="success-message flex flex-col items-center justify-center min-h-screen bg-gradient-to-r  text-white">
      <h1 className="text-5xl font-extrabold mb-4 animate-bounce">
        Registration Successful!
      </h1>
      
      <a href="/" className="mt-6 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
        Go back to homepage
      </a>
    </div>
  );
};

export default Success;

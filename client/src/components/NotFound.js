import React from 'react';
import notFoundImage from 'C:\Users\iravi\Desktop\Test\client\src\assets\error.png'; 

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center">
      <img 
        src={notFoundImage} 
        alt="Page Not Found" 
        className="w-1/2 h-auto mb-6" 
      />
      <h2 className="text-5xl font-bold text-red-600">404</h2>
      <p className="text-xl font-semibold mt-2">Page Not Found</p>
      <p className="mt-4 text-gray-600">Unfortunately, this page does not exist!</p>
      <a 
        href="/" 
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Return to Home
      </a>
    </div>
  );
};

export default NotFound;

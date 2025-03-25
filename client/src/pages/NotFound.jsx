import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <motion.div 
      className="container mx-auto px-4 py-16 mt-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto text-center">
        <div className="text-7xl font-extrabold text-blue-700 mb-6">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Oops! Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-#FFAB00 font-medium py-3 px-8 rounded-lg shadow-md transition duration-300"
        >
          Return to Homepage
        </Link>

        <div className="mt-10 p-6 bg-blue-50 rounded-lg shadow-md">
          <h2 className="font-medium text-blue-800 mb-2">Can't find what you're looking for?</h2>
          <p className="text-blue-700 text-sm mb-4">
            Try visiting one of these sections:
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['News', 'Events', 'Gallery', 'Admissions', 'Contact'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;
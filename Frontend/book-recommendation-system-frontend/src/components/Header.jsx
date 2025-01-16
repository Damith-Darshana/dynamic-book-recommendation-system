import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-white text-2xl font-bold">Book Recommendations</h1>
          <div className="space-x-4">
            <Link to="/" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Home
            </Link>
            <Link to="/recommendation" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Recommendations
            </Link>
            <Link to="/profile" className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

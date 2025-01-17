import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully.');
    navigate('/');
    window.location.reload(); // Refresh to clear user context
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-300"
            >
              BookRecommender
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-x-6 hidden sm:flex">
            <Link
              to="/"
              className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/recommendation"
              className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
            >
              Recommendations
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <img
                  src={user.profile_picture || 'https://via.placeholder.com/40'}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover border border-white"
                />
                <span className="text-white text-sm font-medium">
                  {user.username}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? You will need to log in again to access your account.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

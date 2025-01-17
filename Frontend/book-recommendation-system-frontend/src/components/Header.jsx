import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully.');
    navigate('/');
    window.location.reload(); // Refresh to clear user context
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="flex justify-between items-center h-16 px-4">
        <div className="flex items-center space-x-3">
          {user && (
            <div className="flex items-center space-x-2">
              <img
                src={user.profile_picture || 'https://via.placeholder.com/40'}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border"
              />
              <span className="text-white text-sm font-medium">{user.username}</span>
            </div>
          )}
        </div>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Home
          </Link>
          <Link
            to="/recommendation"
            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Recommendations
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

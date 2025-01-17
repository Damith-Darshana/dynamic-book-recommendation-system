import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-lg font-bold mb-2">Book Recommendation System</h2>

        {/* Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/Damith-Darshana/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 .5C5.62.5.5 5.62.5 12c0 5.08 3.3 9.36 7.87 10.87.58.1.79-.25.79-.55v-2.1c-3.21.7-3.89-1.39-3.89-1.39-.53-1.36-1.3-1.72-1.3-1.72-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.79 2.76 1.27 3.43.97.1-.76.41-1.27.75-1.56-2.56-.3-5.26-1.29-5.26-5.75 0-1.27.45-2.3 1.2-3.1-.12-.31-.52-1.56.12-3.23 0 0 .97-.31 3.17 1.19a10.91 10.91 0 0 1 5.77 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.67.24 2.92.12 3.23.75.8 1.2 1.83 1.2 3.1 0 4.47-2.7 5.45-5.27 5.75.42.37.79 1.09.79 2.2v3.25c0 .3.21.66.8.55C20.7 21.36 24 17.08 24 12c0-6.38-5.12-11.5-12-11.5z" />
            </svg>
          </a>
          <a
            href="http://www.linkedin.com/in/damith-darshana-bandara"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 20h-3v-10h3v10zm-1.5-11.5c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.5h-3v-5.25c0-1.219-.024-2.781-1.688-2.781-1.688 0-1.945 1.319-1.945 2.688v5.344h-3v-10h2.813v1.366h.041c.391-.738 1.344-1.512 2.719-1.512 2.906 0 3.438 1.912 3.438 4.394v5.752z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Book Recommendation System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import BookList from '../components/BookList';

const HomePage = () => {
  return (
    <div>
      <header className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="absolute inset-0 bg-opacity-50" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Book Recommendation System</h1>
          <p className="text-lg mb-6">Discover your next favorite book with personalized recommendations</p>
          <input
            type="text"
            placeholder="Search for books..."
            className="px-4 py-2 rounded-lg text-gray-700 w-full max-w-md mx-auto"
          />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Collection</h2>
        <BookList />
      </main>
    </div>
  );
};

export default HomePage;

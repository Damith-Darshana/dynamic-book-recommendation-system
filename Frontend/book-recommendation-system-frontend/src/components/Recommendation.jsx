import React, { useState } from 'react';
import API from '../services/api';
import BookCard from './BookCard';

const Recommendation = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    if (!bookTitle.trim()) {
      setError('Please enter a book title!');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await API.get(`/recommend/?title=${encodeURIComponent(bookTitle)}`);
      const data = response.data;

      if (data.recommended_books.some((item) => item.error)) {
        setError(data.recommended_books[0].error);
        setRecommendedBooks([]);
      } else {
        setRecommendedBooks(data.recommended_books);
      }
    } catch (error) {
      setError('Error fetching recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-700 min-h-screen text-white">
      {/* Hero Section */}
      <div className="py-16 text-center bg-gradient-to-b from-purple-700 to-purple-900 shadow-lg">
        <h1 className="text-5xl font-bold mb-4">Discover Your Next Favorite Book</h1>
        <p className="text-lg text-gray-200 mb-8">
          Enter the name of a book you love, and we’ll recommend similar books you'll enjoy!
        </p>
        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Enter a book title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="px-4 py-2 rounded-md w-full max-w-lg text-gray-900 shadow-md focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={fetchRecommendations}
            className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition"
          >
            Get Recommendations
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-blue-400"></div>
            <p className="ml-4 text-lg text-white">Loading recommendations...</p>
          </div>
        ) : recommendedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedBooks.map((book, index) => (
              <BookCard
                key={index}
                book={{
                  id: index,
                  cover_image: book['Image-URL-L'], // Add cover image URL if available
                  title: book['Book-Title'],
                  author: book['Book-Author'],
                  publisher: book['Publisher'],
                }}
              />
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-300 mt-6">
              No recommendations available. Try searching for a different book title.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Recommendation;

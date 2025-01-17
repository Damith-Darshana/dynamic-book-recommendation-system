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
    try {
      const response = await API.get(`/recommend/?title=${encodeURIComponent(bookTitle)}`);
      setRecommendedBooks(response.data.recommended_books);
      setError('');
    } catch (error) {
      setError('Error fetching recommendations!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Book Recommendations</h1>
      
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Enter a book title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md shadow-sm"
        />
        <button
          onClick={fetchRecommendations}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Get Recommendations
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedBooks.length > 0 ? (
          recommendedBooks.map((book, index) => (
            <BookCard 
              key={index} 
              book={{
                id: index, // Temporary ID if not provided
                cover_image: null, // Update with real cover image if available
                title: book['Book-Title'],
                author: book['Book-Author'],
                publisher: book['Publisher'],
              }} 
            />
          ))
        ) : (
          !loading && <p className="text-center text-gray-500">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;

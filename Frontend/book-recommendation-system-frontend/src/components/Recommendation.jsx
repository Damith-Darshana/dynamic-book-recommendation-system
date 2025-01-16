import React, { useState } from 'react';
import API from '../services/api';

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
    <div className="max-w-2xl mx-auto mt-16">
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

      <ul className="space-y-4">
        {recommendedBooks.map((book, index) => (
          <li key={index} className="p-4 border rounded-md shadow-md bg-gray-50">
            <strong>{book['Book-Title']}</strong> by {book['Book-Author']} ({book['Publisher']})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;

import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination'; // Import Pagination Component
import API from '../services/api';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async (searchQuery = '', page = 1) => {
    setLoading(true);
    try {
      const response = await API.get(`books/?search=${encodeURIComponent(searchQuery)}&page=${page}`);
      setBooks(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 12)); // Calculate total pages
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(query, currentPage); // Fetch books when the page or query changes
  }, [query, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page on search
    fetchBooks(query, 1);
  };

  return (
    <div>
      <header className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to the Book Recommendation System</h1>
          <p className="text-lg mb-6">Discover your next favorite book with personalized recommendations</p>
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded-lg text-gray-700 w-full max-w-md shadow-sm"
            />
            <button
              onClick={handleSearch}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-sm"
            >
              Search
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Collection</h2>
        {loading ? (
          <div className="text-center">Loading books...</div>
        ) : (
          <>
            <BookList books={books} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;

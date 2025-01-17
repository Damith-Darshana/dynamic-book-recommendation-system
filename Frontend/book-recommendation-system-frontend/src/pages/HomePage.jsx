import React, { useState, useEffect } from 'react';
import BookList from '../components/BookList';
import Pagination from '../components/Pagination';
import API from '../services/api';
import useDebounce from '../hooks/useDebounce'; // Import the debounce hook

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Debounced query to delay API calls
  const debouncedSearchQuery = useDebounce(query, 300);

  const fetchBooks = async (searchQuery = '', page = 1) => {
    setLoading(true);
    try {
      const response = await API.get(`books/?search=${encodeURIComponent(searchQuery)}&page=${page}`);
      setBooks(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 12)); // Update total pages
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch books when the debounced search query or current page changes
  useEffect(() => {
    fetchBooks(debouncedSearchQuery, currentPage);
  }, [debouncedSearchQuery, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 when performing a manual search
    fetchBooks(query, 1);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 shadow-lg">
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to <span className="text-yellow-300">Book Recommender</span>
          </h1>
          <p className="text-lg mb-6">
            Discover books you’ll love! Enter a title and let us recommend similar books for you.
          </p>
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={handleSearchChange}
              className="px-4 py-3 rounded-lg text-gray-700 w-full max-w-lg shadow-lg focus:ring-2 focus:ring-yellow-300"
            />
            <button
              onClick={handleSearch}
              className="ml-4 px-10 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 shadow-lg transition-transform transform hover:scale-105"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Explore Our Collection
        </h2>
        {loading ? (
          <div className="flex justify-center items-center text-gray-500 text-lg">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full mr-4"></div>
            Loading books...
          </div>
        ) : books.length > 0 ? (
          <>
            <BookList books={books} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-6">
            No books found. Try searching with a different title.
          </p>
        )}
      </main>
    </div>
  );
};

export default HomePage;

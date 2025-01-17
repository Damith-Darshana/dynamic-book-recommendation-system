import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <img
        src={book.cover_image || 'https://via.placeholder.com/120x180'}
        alt={book.title}
        className="h-40 w-full object-cover rounded-t-lg"
      />
      <div className="p-3">
        <h3 className="text-md font-semibold text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-500 truncate">Author: {book.author}</p>
        <p className="mt-1 text-sm text-gray-600 truncate">
          {book.publisher ? `Publisher: ${book.publisher}` : 'No publisher info'}
        </p>
        <Link
          to={`/book/${book.id}`}
          className="mt-3 inline-block text-sm text-blue-500 font-medium hover:text-blue-700"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default BookCard;

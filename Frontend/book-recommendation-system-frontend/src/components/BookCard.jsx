import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
      <img
        src={book.cover_image || 'https://via.placeholder.com/150'}
        alt={book.title}
        className="h-60 w-full object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-500">Author: {book.author}</p>
        <p className="mt-2 text-sm text-gray-600">
          {book.publisher ? book.publisher.slice(0, 80) : 'No publisher info available.'}
        </p>
        <Link
          to={`/book/${book.id}`}
          className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default BookCard;

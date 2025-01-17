import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.length > 0 ? (
        books.map((book) => <BookCard key={book.id} book={book} />)
      ) : (
        <div className="text-center col-span-full text-gray-500">
          No books found. Try searching for something else.
        </div>
      )}
    </div>
  );
};

export default BookList;

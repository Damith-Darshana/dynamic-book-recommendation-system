import React from 'react';
import BookDetail from '../components/BookDetail';

const BookPage = () => {
  return (
    <div>
      <header className="bg-gray-900 text-white py-12">
        <h1 className="text-4xl font-bold text-center">Book Details</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <BookDetail />
      </main>
    </div>
  );
};

export default BookPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await API.get(`books/${id}/`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading book details...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-8">
        <img
          src={book.cover_image || 'https://via.placeholder.com/300'}
          alt={book.title}
          className="rounded-lg shadow-md sm:w-1/3"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h1>
          <p className="text-sm text-gray-500 mb-2">Author: {book.author}</p>
          <p className="text-sm text-gray-500 mb-4">Publisher: {book.publisher}</p>
          <p className="text-gray-700">{book.description || 'No description available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;

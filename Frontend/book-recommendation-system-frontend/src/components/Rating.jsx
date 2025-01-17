import React, { useState } from 'react';
import API from '../services/api';

const Rating = ({ bookId, initialRating, onRatingSubmit }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async () => {
    try {
      await API.post('user-ratings/', { book: bookId, rating });
      if (onRatingSubmit) onRatingSubmit(rating);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((value) => (
        <svg
          key={value}
          xmlns="http://www.w3.org/2000/svg"
          fill={value <= (hoverRating || rating) ? 'gold' : 'gray'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer"
          onMouseEnter={() => setHoverRating(value)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setRating(value)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.758l2.214 6.824h7.17L15.892 15.7l2.214 6.824L12 18.352l-6.106 4.172 2.214-6.824L2.617 11.58h7.17L12 4.758z"
          />
        </svg>
      ))}
      <button
        onClick={handleSubmit}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
};

export default Rating;

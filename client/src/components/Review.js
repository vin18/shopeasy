import React from 'react';
import StarIcon from '../assets/icons/StarIcon';

const Review = ({ product }) => {
  return (
    <div className="inline-flex items-center bg-indigo-500 text-indigo-100 py-1 px-2 rounded mt-1">
      <span className="text-sm">{product.averageRating}</span> <StarIcon />
    </div>
  );
};

export default Review;

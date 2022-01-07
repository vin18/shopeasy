import React from 'react';
import StarIcon from '../assets/icons/StarIcon';

const Review = ({ product }) => {
  return (
    <div className="inline-flex items-center bg-blue-600 text-blue-100 p-1 rounded mt-1">
      <span className="text-sm">{product.rating}</span> <StarIcon />
    </div>
  );
};

export default Review;

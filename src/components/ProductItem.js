import React from 'react';
import Review from './Review';

const ProductItem = ({ product }) => {
  return (
    <div className="p-5 shadow-lg border-4 rounded transition ease-out-in hover:-translate-y-1   hover:border-t-blue-500 ">
      <div className="w-64 mx-auto">
        <img src={product.image}></img>
      </div>

      <div className="mt-4">
        <Review product={product} />
        <p className="text-lg text-gray-800 mt-1">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;

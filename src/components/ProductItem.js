import React from 'react';
import StarIcon from '../assets/icons/StarIcon';

const ProductItem = ({ product }) => {
  return (
    <div className="p-5 shadow-lg border-4 rounded transition ease-out-in hover:-translate-y-1   hover:border-t-blue-500 ">
      <div className="w-64 mx-auto">
        <img src={product.image}></img>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">{product.name}</h3>
          <div className="inline-flex items-center bg-blue-600 text-blue-100 p-1 rounded mt-1">
            <span className="text-sm">{product.rating}</span> <StarIcon />
          </div>
        </div>

        <p className="text-lg text-gray-800 mt-1">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;

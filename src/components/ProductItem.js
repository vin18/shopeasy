import React from 'react';
import Review from './Review';

const ProductItem = ({ product }) => {
  return (
    <div className="p-5 border border-b-4 rounded transition ease-out-in hover:-translate-y-1 hover:border-b-blue-500 ">
      <div className="w-64 mx-auto">
        <img src={product.image}></img>
      </div>

      <h3 className="text-xl text-center pt-5">{product.name}</h3>

      <div className="flex justify-between mt-4">
        <Review product={product} />
        <p className="text-lg text-gray-800 mt-1">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;

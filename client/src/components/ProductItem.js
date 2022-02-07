import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUpdateWishlist } from '../store/slices/wishlists';
import Review from './Review';

const ProductItem = ({
  product,
  isLoggedIn = false,
  isProductBookmarked = false,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="p-5 border border-b-4 rounded transition ease-out-in hover:-translate-y-1 hover:border-b-blue-500 ">
      {isLoggedIn && (
        <div className="flex justify-end">
          <FaHeart
            onClick={() => dispatch(createUpdateWishlist(product._id))}
            className={`text-xl ${
              isProductBookmarked ? 'text-red-500' : 'text-gray-400'
            } `}
          />
        </div>
      )}
      <Link key={product?._id} to={`/product/${product?._id}`}>
        <div className="w-92 mx-auto">
          <img className="w-100 h-100" src={product?.image?.url}></img>
        </div>

        <h3 className="text-xl text-center pt-5">{product.name}</h3>
      </Link>

      <div className="flex justify-between mt-4">
        <Review product={product} />
        <p className="text-lg text-gray-800 mt-1">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductItem;

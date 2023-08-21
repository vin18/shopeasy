import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { createUpdateWishlist } from '../store/slices/wishlists'
import Review from './Review'

const ProductItem = ({
  product,
  isLoggedIn = false,
  isProductBookmarked = false,
}) => {
  const dispatch = useDispatch()

  return (
    <div className="relative p-4 border border-b-4 rounded transition ease-out-in hover:-translate-y-1 hover:border-b-indigo-500 ">
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

        <h3 className="text-xl text-gray-800 font-semibold text-center pt-5">
          {product.name}
        </h3>

        <div className="flex justify-between mt-4">
          <Review product={product} />
          <div className="flex items-center mt-1">
            <p className="text-xl text-gray-700 font-semibold">
              ₹
              {Math.abs(
                parseFloat(product.price) -
                  parseFloat(product.price) *
                    (parseFloat(product.discount) / 100)
              )}
              {product.discount > 0 && (
                <strike className="text-sm ml-1 text-gray-500">
                  ₹{product.price}
                </strike>
              )}
            </p>
          </div>
        </div>

        {product.discount > 0 && (
          <span class="absolute left-2 top-4 inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-bold leading-none text-red-100 bg-green-600 rounded-full">
            {product.discount}% off
          </span>
        )}
      </Link>
    </div>
  )
}

export default ProductItem

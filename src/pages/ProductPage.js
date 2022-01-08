import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import LeftArrowIcon from '../assets/icons/LeftArrowIcon';
import Review from '../components/Review';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/slices/product';

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { productData: product, loading } = useSelector(
    (state) => state.product
  );
  const isProductAvailable = product.countInStock > 0;

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [productId]);

  if (loading) return <p>Loading..</p>;

  return (
    <div>
      <Link
        to="/"
        className="inline-flex bg-blue-800 px-4 py-2 rounded shadow text-blue-50"
      >
        <LeftArrowIcon />
        <span className="ml-2">Back to products</span>
      </Link>

      <div className="mt-16 flex">
        <div className="flex-1">
          <img style={{ maxWidth: '450px' }} src={product.image} alt="" />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-3xl">{product.name}</h3>
          <p>Description: {product.description}</p>
          <Review product={product} /> ({product.numReviews} reviews)
          <div>Category: {capitalizeFirstLetter(product.category)}</div>
          <div>Price: ₹{product.price}</div>
          <div className="flex">
            Status: &nbsp;
            <p
              className={isProductAvailable ? 'text-green-600' : 'text-red-600'}
            >
              {isProductAvailable ? 'Available' : 'Not Available'}
            </p>
          </div>
          <button className="bg-blue-800 text-blue-100 py-2 px-6 rounded transition ease-out hover:bg-blue-600">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

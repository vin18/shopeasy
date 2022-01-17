import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem.js';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/products.js';

const Home = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { productsData: products, loading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [keyword]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1 className="text-3xl text-blue-500 font-bold mb-5">
        Popular Products
      </h1>

      <div className="grid grid-cols-3 gap-8">
        {products?.map((product) => (
          <Link key={product?._id} to={`/product/${product?._id}`}>
            <ProductItem product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

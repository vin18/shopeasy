import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem.js';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/products.js';
import Paginate from '../components/Paginate';
import Loader from './Loader.js';

const Home = () => {
  const dispatch = useDispatch();
  const { keyword = '', pageNumber = 1 } = useParams();
  const {
    productsData: products,
    loading,
    pages,
    page,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [keyword, pageNumber]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl text-blue-500 font-bold mb-5">
        Popular Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <Link key={product?._id} to={`/product/${product?._id}`}>
            <ProductItem product={product} />
          </Link>
        ))}
      </div>

      <Paginate pages={pages} page={page} keyword={keyword} />
    </div>
  );
};

export default Home;

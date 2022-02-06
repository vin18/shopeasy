import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem.js';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/products.js';
import Paginate from '../components/Paginate';
import Loader from './Loader.js';
import useWindowWidth from '../hooks/useWindowWidth.js';
import Search from './Search.js';

const Home = () => {
  const dispatch = useDispatch();
  const { keyword = '', pageNumber = 1 } = useParams();
  const {
    productsData: products,
    loading,
    pages,
    page,
  } = useSelector((state) => state.products);
  const { isMobile } = useWindowWidth();

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [keyword, pageNumber]);

  if (loading) return <Loader />;

  if (products?.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center mt-32">
        <h3 className="text-3xl text-center mb-2">No products found!</h3>
        <Link className="bg-blue-500 text-blue-50 py-2 px-4 rounded" to="/">
          Back to Home page
        </Link>
      </div>
    );
  }

  return (
    <div>
      {isMobile && <Search />}
      <h1 className="text-3xl text-blue-500 font-bold mb-5">
        Popular Products
      </h1>

      <div
        style={{ minHeight: '70vh' }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
      >
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

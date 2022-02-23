import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem.js';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/products.js';
import {
  fetchWishlistedProducts,
  wishlistsReset,
} from '../store/slices/wishlists.js';
import Paginate from '../components/Paginate';
import Loader from './Loader.js';
import useWindowWidth from '../hooks/useWindowWidth.js';
import Search from './Search.js';
import Checkbox from './custom/Checkbox.js';
import StarIcon from '../assets/icons/StarIcon.js';

const Home = () => {
  const priceRange = [500, 1000, 1500, 2000, 2500];
  const dispatch = useDispatch();
  const [sort, setSort] = useState('');
  const { keyword = '', pageNumber = 1 } = useParams();
  const {
    productsData: products,
    loading,
    pages,
    page,
  } = useSelector((state) => state.products);
  const { isMobile } = useWindowWidth();
  const { userData } = useSelector((state) => state.user);
  const { wishlistsData, isBookmarkUpdated } = useSelector(
    (state) => state.wishlists
  );
  const isLoggedIn = userData?.email;

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber, sort));
  }, [keyword, pageNumber, sort]);

  useEffect(() => {
    if (isLoggedIn || isBookmarkUpdated) {
      dispatch(fetchWishlistedProducts());
      dispatch(wishlistsReset());
    }
  }, [isLoggedIn, isBookmarkUpdated]);

  if (loading) return <Loader />;

  if (products?.length <= 0) {
    return (
      <div className="flex flex-col justify-center items-center mt-32">
        <h3 className="text-3xl text-center mb-2">No products found!</h3>
        <Link className="bg-indigo-500 text-indigo-50 py-2 px-4 rounded" to="/">
          Back to Home page
        </Link>
      </div>
    );
  }

  return (
    <div>
      {isMobile && <Search />}

      <div className="flex max-w-7xl mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row mb-4">
            <span className="text-gray-900 font-bold mr-16">Sort by</span>
            <ul className="flex flex-col md:flex-row font-semibold md:space-x-6 cursor-pointer text-gray-700">
              <li
                className={
                  sort === 'newest' &&
                  'text-indigo-500 font-semibold md:border-b border-indigo-500'
                }
                onClick={() => setSort('newest')}
              >
                Newest First
              </li>
              <li
                className={
                  sort === 'high-to-low' &&
                  'text-indigo-500 font-semibold md:border-b border-indigo-500'
                }
                onClick={() => setSort('high-to-low')}
              >
                Price - High to Low
              </li>
              <li
                className={
                  sort === 'low-to-high' &&
                  'text-indigo-500 font-semibold md:border-b border-indigo-500'
                }
                onClick={() => setSort('low-to-high')}
              >
                Price - Low to High
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => {
              const isProductBookmarked =
                wishlistsData?.find((w) => w.product === product?.id) || false;

              return (
                <ProductItem
                  isLoggedIn={isLoggedIn}
                  product={product}
                  isProductBookmarked={isProductBookmarked}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Paginate pages={pages} page={page} keyword={keyword} />
    </div>
  );
};

export default Home;

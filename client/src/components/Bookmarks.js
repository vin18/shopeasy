import { useEffect } from 'react';
import Loader from './Loader';
import ProductItem from './ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWishlistedProducts,
  wishlistsReset,
} from '../store/slices/wishlists';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProducts } from '../store/slices/products';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { productsData: products, loading } = useSelector(
    (state) => state.products
  );
  const { keyword = '', pageNumber = 1 } = useParams();
  const { userData } = useSelector((state) => state.user);
  const { wishlistsData, isBookmarkUpdated } = useSelector(
    (state) => state.wishlists
  );
  const isLoggedIn = userData?.email;
  const history = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [keyword, pageNumber]);

  useEffect(() => {
    dispatch(fetchWishlistedProducts());
    if (isBookmarkUpdated) {
      dispatch(wishlistsReset());
    }
  }, [isBookmarkUpdated]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-3xl text-indigo-500 font-bold mb-5">
        Bookmarked Products
      </h1>

      {wishlistsData?.length === 0 && (
        <div className="flex flex-col items-center mt-32">
          <h2 className="text-4xl text-center mb-4">
            There are currently no items in your wihslist!
          </h2>
          <button
            onClick={() => history(`/products`)}
            className="bg-indigo-500 text-indigo-100 py-1 px-4 rounded"
          >
            Continue Shopping
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {products.map((product) => {
          const isProductBookmarked =
            wishlistsData?.find((w) => w.product === product?.id) || false;

          if (isProductBookmarked)
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
  );
};

export default Bookmarks;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { About, Home } from '../App';
import { getMe, logout } from '../store/slices/user';
import toast from 'react-hot-toast';
import Search from './Search';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaHeart, FaTimes } from 'react-icons/fa';
import useWindowWidth from '../hooks/useWindowWidth';
import CartIcon from '../assets/icons/CartIcon';
import UserIcon from '../assets/icons/UserIcon';
import LogoutIcon from '../assets/icons/LogoutIcon';
import { fetchProductsInCart } from '../store/slices/cart';

const Header = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const { cartData } = useSelector((state) => state.cart);
  const { wishlistsData } = useSelector((state) => state.wishlists);
  const isLoggedIn = Boolean(userData?.email);
  const itemsInTheCart = isLoggedIn ? cartData?.products?.length : 0;
  const itemsInTheWishlists = isLoggedIn ? wishlistsData?.length : 0;
  const isAdmin = userData?.role === 'admin';
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const { isMobile, isTab } = useWindowWidth();

  useEffect(() => {
    dispatch(getMe());
    dispatch(fetchProductsInCart());
  }, [isLoggedIn]);

  const handleLogout = () => {
    toast.success(`Logged out!`);
    dispatch(logout());
    history(`/products`);
  };

  return (
    <header className="relative bg-indigo-500 text-indigo-50 flex justify-between items-center py-4 px-8">
      <div>
        <Link to="/products">
          <h1 className="flex items-center text-xl font-bold">
            <CartIcon />
            <span className="ml-1">ShopEasy</span>
          </h1>
        </Link>
      </div>

      {!isMobile && <Search />}

      <div onClick={() => setOpen(!open)} className="block ml-4 lg:hidden">
        {!open ? (
          <GiHamburgerMenu className="text-2xl" />
        ) : (
          <FaTimes className="text-2xl" />
        )}
      </div>

      {open && isTab ? (
        <nav className="block z-10 lg:hidden absolute bg-indigo-500 w-full border-t border-t-indigo-200 top-14 left-0">
          <ul className="flex flex-col cursor-pointer mb-1">
            <li className="px-4 py-2">
              <Link title="cart" to="/cart">
                <CartIcon />
              </Link>
            </li>

            {!isLoggedIn && (
              <li className="px-4 py-2">
                <Link to="/login">Login</Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="px-4 py-2">
                <Link title="profile" to="/profile">
                  <UserIcon />
                </Link>
              </li>
            )}

            {isLoggedIn && isAdmin && (
              <li className="px-4 py-2">
                <Link to="/admin/products">Products</Link>
              </li>
            )}

            {isLoggedIn && isAdmin && (
              <li className="px-4 py-2">
                <Link to="/admin/orders">Orders</Link>
              </li>
            )}

            {isLoggedIn && isAdmin && (
              <li className="px-4 py-2">
                <Link to="/admin/users">Users</Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="flex relative px-4 py-2">
                {itemsInTheWishlists >= 1 && (
                  <span className="absolute sm:-top-1 sm:-right-2 left-6 sm:left-0 text-sm flex justify-center items-center bg-red-500 h-4 w-4 rounded-full">
                    {itemsInTheWishlists}
                  </span>
                )}
                <Link title="wishlisted products" to="/wishlists">
                  <FaHeart className="text-xl" />{' '}
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="px-4 py-2" onClick={handleLogout}>
                <LogoutIcon />
              </li>
            )}
          </ul>
        </nav>
      ) : (
        <nav className="hidden lg:block">
          <ul className="flex items-center space-x-6 cursor-pointer">
            {isLoggedIn && (
              <li className="mt-1 font-semibold">Hi, {userData?.name}</li>
            )}

            <li className="flex relative">
              <Link title="cart" to="/cart">
                <CartIcon />
              </Link>
              {itemsInTheCart >= 1 && (
                <span className="absolute -top-1 -right-2 text-sm flex justify-center items-center bg-red-500 h-4 w-4 rounded-full">
                  {itemsInTheCart}
                </span>
              )}
            </li>

            {!isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <Link title="profile" to="/profile">
                  <UserIcon />
                </Link>
              </li>
            )}

            {isLoggedIn && isAdmin && (
              <li>
                <Link to="/admin/products">Products</Link>
              </li>
            )}

            {isLoggedIn && isAdmin && (
              <li>
                <Link to="/admin/orders">Orders</Link>
              </li>
            )}

            {isLoggedIn && isAdmin && (
              <li>
                <Link to="/admin/users">Users</Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="flex relative">
                {itemsInTheWishlists >= 1 && (
                  <span className="absolute -top-1 -right-2 text-sm flex justify-center items-center bg-red-500 h-4 w-4 rounded-full">
                    {itemsInTheWishlists}
                  </span>
                )}
                <Link title="wishlisted products" to="/wishlists">
                  <FaHeart className="text-xl" />{' '}
                </Link>
              </li>
            )}

            {isLoggedIn && (
              <li onClick={handleLogout}>
                <LogoutIcon />
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { About, Home } from '../App';
import { getMe, logout } from '../store/slices/user';
import toast from 'react-hot-toast';
import Search from './Search';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';
import useWindowWidth from '../hooks/useWindowWidth';

const Header = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(userData?.email);
  const isAdmin = userData?.role === 'admin';
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const { isMobile, isTab } = useWindowWidth();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const handleLogout = () => {
    toast.success(`Logged out!`);
    dispatch(logout());
    history(`/`);
  };

  return (
    <header className="relative bg-blue-500 text-blue-50 flex justify-between items-center py-4 px-8">
      <div>
        <Link to="/">
          <h1 className="text-xl font-bold">ShopEasy</h1>
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
        <nav className="block lg:hidden absolute bg-blue-500 w-full border-t border-t-blue-200 top-14 left-0">
          <ul className="flex flex-col cursor-pointer mb-1">
            <li className="px-4 py-2">
              <Link to="/cart">Cart</Link>
            </li>

            {!isLoggedIn && (
              <li className="px-4 py-2">
                <Link to="/login">Login</Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="px-4 py-2">
                <Link to="/profile">Profile</Link>
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
              <li className="px-4 py-2" onClick={handleLogout}>
                Logout
              </li>
            )}
          </ul>
        </nav>
      ) : (
        <nav className="hidden lg:block">
          <ul className="flex space-x-4 cursor-pointer">
            <li className="flex">
              <Link to="/cart">Cart</Link>
            </li>

            {!isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            {isLoggedIn && (
              <li>
                <Link to="/profile">Profile</Link>
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

            {isLoggedIn && <li onClick={handleLogout}>Logout</li>}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

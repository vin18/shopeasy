import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { About, Home } from '../App';
import { getMe, logout } from '../store/slices/user';
import toast from 'react-hot-toast';
import Search from './Search';

const Header = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(userData?.email);
  const history = useNavigate();

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const handleLogout = () => {
    toast.success(`Logged out!`);
    dispatch(logout());
    history(`/`);
  };

  return (
    <header className="bg-blue-500 text-blue-50 flex justify-between items-center py-4 px-8">
      <div>
        <Link to="/">
          <h1 className="text-xl font-bold">ShopEasy</h1>
        </Link>
      </div>

      <Search />

      <nav>
        <ul className="flex space-x-4 cursor-pointer">
          <li className="flex">
            <Link to="/cart">Cart</Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}

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

          {isLoggedIn && <li onClick={handleLogout}>Logout</li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

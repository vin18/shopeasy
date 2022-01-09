import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { About, Home } from '../App';
import { getMe, logout } from '../store/slices/user';

const Header = () => {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.user);
  const isLoggedIn = Boolean(userData?.email);

  useEffect(() => {
    dispatch(getMe());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-blue-500 text-blue-50 flex justify-between items-center py-4 px-8">
      <div>
        <Link to="/">
          <h1 className="text-xl font-bold">ShopEasy</h1>
        </Link>
      </div>

      <nav>
        <ul className="flex space-x-4">
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

          {isLoggedIn && <li onClick={handleLogout}>Logout</li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

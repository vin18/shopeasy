import React from 'react';
import { Link } from 'react-router-dom';
import { About, Home } from '../App';

const Header = () => {
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

          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

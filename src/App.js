import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PlaceorderPage from './pages/PlaceorderPage';
import OrderItemPage from './pages/OrderItem';
import AdminUsers from './pages/AdminUsers';
import AdminUserEdit from './pages/AdminUserEdit';
import AdminOrders from './pages/AdminOrders';
import AdminProducts from './pages/AdminProducts';
import AdminProductEdit from './pages/AdminProductEdit';

function App() {
  return (
    <Router>
      <Header />
      <div
        className="container mx-auto my-5 px-32"
        style={{ minHeight: '80vh' }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:keyword" element={<HomePage />} />
          <Route path="/page/:pageNumber" element={<HomePage />} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            element={<HomePage />}
          />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/placeorder" element={<PlaceorderPage />} />
          <Route path="/orders/:orderId" element={<OrderItemPage />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/:userId" element={<AdminUserEdit />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route
            path="/admin/products/:pageNumber"
            element={<AdminProducts />}
          />
          <Route
            path="/admin/products/:productId"
            element={<AdminProductEdit />}
          />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;

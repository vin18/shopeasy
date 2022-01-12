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
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/placeorder" element={<PlaceorderPage />} />
          <Route path="/orders/:orderId" element={<OrderItemPage />} />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;

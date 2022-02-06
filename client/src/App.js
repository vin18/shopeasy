import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Header from './components/Header';
import {
  HomePage,
  ProductPage,
  CartPage,
  RegisterPage,
  LoginPage,
  ProfilePage,
  ShippingPage,
  PlaceorderPage,
  OrderItemPage,
  AdminUsersPage,
  AdminProductEditPage,
  AdminOrdersPage,
  AdminProductsPage,
  AdminUserEditPage,
  AdminProductCreatePage,
} from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div
        className="container mx-auto my-5  px-8 md:px-12 lg:px-18"
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
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/users/:userId" element={<AdminUserEditPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route
            path="/admin/products/:pageNumber"
            element={<AdminProductsPage />}
          />
          <Route
            path="/admin/products/edit/:productId"
            element={<AdminProductEditPage />}
          />
          <Route
            path="/admin/products/create"
            element={<AdminProductCreatePage />}
          />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;

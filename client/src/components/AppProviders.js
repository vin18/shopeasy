import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './Footer';
import Header from './Header';
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
} from '../pages';
import ProtectedRoute from './ProtectedRoute';

function AppProviders() {
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
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <ShippingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/placeorder"
            element={
              <ProtectedRoute>
                <PlaceorderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderItemPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/:userId"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminUserEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/:pageNumber"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/edit/:productId"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminProductEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products/create"
            element={
              <ProtectedRoute isAdmin={true}>
                <AdminProductCreatePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default AppProviders;
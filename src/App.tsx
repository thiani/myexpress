import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { PaymentProvider } from './context/PaymentContext';
import MainLayout from './components/layout/MainLayout';
import AdminLayout from './components/admin/layout/AdminLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Main Routes
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Brands from './pages/Brands';
import About from './pages/About';
import Contact from './pages/Contact';



// Admin Routes
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import Settings from './pages/admin/Settings';
import ProductsList from './pages/admin/Products/ProductsList';
import CreateProduct from './pages/admin/Products/CreateProduct';
import EditProduct from './pages/admin/Products/EditProduct';
import CategoriesList from './pages/admin/Categories/CategoriesList';
import CreateCategory from './pages/admin/Categories/CreateCategory';
import EditCategory from './pages/admin/Categories/EditCategory';

// Error Pages
const NotFound = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
    <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <PaymentProvider>
              <Routes>
              {/* Main Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />} />
                <Route path="brands" element={<Brands />} />
                <Route path="product/:slug" element={<ProductDetail />} />
                <Route path="cart" element={<Cart />} />
                <Route path="about" element={<About />} />
                <Route path="catalog" element={<Products />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Auth Routes */}
              <Route path="/auth/login" element={<Login />} />

              {/* Admin Routes - All protected */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['admin', 'manager']}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={
                  <ProtectedRoute allowedRoles={['admin', 'manager']}>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="settings" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                {/* Products */}
                <Route path="products">
                  <Route index element={
                    <ProtectedRoute allowedRoles={['admin', 'manager']}>
                      <ProductsList />
                    </ProtectedRoute>
                  } />
                  <Route path="create" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <CreateProduct />
                    </ProtectedRoute>
                  } />
                  <Route path=":id/edit" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <EditProduct />
                    </ProtectedRoute>
                  } />
                </Route>

                {/* Categories */}
                <Route path="categories">
                  <Route index element={
                    <ProtectedRoute allowedRoles={['admin', 'manager']}>
                      <CategoriesList />
                    </ProtectedRoute>
                  } />
                  <Route path="create" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <CreateCategory />
                    </ProtectedRoute>
                  } />
                  <Route path=":id/edit" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <EditCategory />
                    </ProtectedRoute>
                  } />
                </Route>
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
              </Routes>
            </PaymentProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
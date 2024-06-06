import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import FAQ from './components/FAQ';
import About from './components/About';
import PaymentForm from './components/PaymentForm';
import UserPage from './components/UserPage';
import CouponList from './components/CouponList';
import CreateCoupons from './components/CreateCoupons';
import ProductList from './components/ProductList';
import ProductList2 from './components/ProductList2';
import CreateProduct from './components/CreateProduct';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import AdminRoute from './components/AdminRoute';
import { CartProvider } from './context/CartContext';

const RequireAuth = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <CartProvider>
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-user" element={<AdminRoute><CreateUser /></AdminRoute>} />
          <Route path="/faq" element={<FAQ />} /> 
          <Route path="/payment" element={<PaymentForm />} /> 
          <Route path="/user" element={<RequireAuth><UserPage /></RequireAuth>} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products-list" element={<AdminRoute><ProductList2 /></AdminRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/users"
            element={
              <AdminRoute>
                <UserList />
              </AdminRoute>
            }
          />
          <Route
            path="/coupons"
            element={
              <AdminRoute>
                <CouponList />
              </AdminRoute>
            }
          />
          <Route
            path="/create-coupons"
            element={
              <AdminRoute>
                <CreateCoupons />
              </AdminRoute>
            }
          />
          <Route path="/create-product" element={<AdminRoute><CreateProduct /></AdminRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;

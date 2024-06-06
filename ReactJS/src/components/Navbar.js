import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://192.168.1.47:5000/check-admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    if (isAuthenticated) {
      checkAdmin();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-indigo-800 text-white p-4">
      <nav className="flex justify-between">
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about" className="mr-4">About</Link>
          <Link to="/faq" className="mr-4">FAQ</Link>
          {isAuthenticated ? (
            <>
              <Link to="/products" className="mr-4">Products</Link>
              <Link to="/cart" className="mr-4">Cart</Link>
              <Link to="/payment" className="mr-4">Payment</Link>
              <Link to="/user" className="mr-4">My Profile</Link>
              {isAdmin && (
                <>
                  <Link to="/users" className="mr-4">User List</Link>
                  <Link to="/create-user" className="mr-4">Create User</Link>
                  <Link to="/products-list" className="mr-4">Product List</Link>
                  <Link to="/create-product" className="mr-4">Create Product</Link>
                  <Link to="/coupons" className="mr-4">Coupons</Link>
                  <Link to="/create-coupons" className="mr-4">Create Coupons</Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="mr-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

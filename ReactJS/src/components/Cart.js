import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment');
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full mx-auto mt-8">
      <h2 className="mb-4 text-xl">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map(product => (
            <li key={product.id} className="mb-4 p-4 border rounded">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-green-500">{product.price}€</p>
              <button
                onClick={() => removeFromCart(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;

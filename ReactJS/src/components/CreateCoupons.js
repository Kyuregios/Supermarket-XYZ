import React, { useState } from 'react';
import axios from 'axios';

function CreateCoupons() {
  const [couponData, setCouponData] = useState({ code: '', discount: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.47:5000/coupons', couponData);
      setMessage('Coupon created successfully');
      setCouponData({ code: '', discount: '' });
    } catch (error) {
      console.error('Error creating coupon:', error);
      setMessage('Error creating coupon');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full mx-auto mt-8">
      <h2 className="mb-4 text-xl">Create Coupon</h2>
      {message && <p className="mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Coupon Code</label>
          <input
            type="text"
            name="code"
            value={couponData.code}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={couponData.discount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateCoupons;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaymentForm() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: 100, // Assume the initial amount is $100
  });
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discountedAmount, setDiscountedAmount] = useState(paymentData.amount);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://192.168.1.47:5000/coupons');
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  useEffect(() => {
    if (selectedCoupon) {
      const discount = (paymentData.amount * selectedCoupon.discount) / 100;
      setDiscountedAmount(paymentData.amount - discount);
    } else {
      setDiscountedAmount(paymentData.amount);
    }
  }, [selectedCoupon, paymentData.amount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleCouponChange = (e) => {
    const couponId = e.target.value;
    const coupon = coupons.find(coupon => coupon.id === parseInt(couponId));
    setSelectedCoupon(coupon);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the payment here
    console.log('Processing payment', paymentData, selectedCoupon, discountedAmount);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full mx-auto mt-8">
      <h2 className="mb-4 text-xl">Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={paymentData.expiryDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CVV</label>
          <input
            type="text"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Select Coupon</label>
          <select
            name="coupon"
            onChange={handleCouponChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a coupon</option>
            {coupons.map(coupon => (
              <option key={coupon.id} value={coupon.id}>
                {coupon.code} - {coupon.discount}%
              </option>
            ))}
          </select>
        </div>
        {selectedCoupon && (
          <div className="mb-4">
            <p>Discount: {selectedCoupon.discount}%</p>
            <p>Discounted Amount: {discountedAmount.toFixed(2)}€</p>
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Pay {discountedAmount.toFixed(2)}€
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;

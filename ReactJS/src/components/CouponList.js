import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [newCouponData, setNewCouponData] = useState({ code: '', discount: '' });

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.47:5000/coupons/${id}`);
      setCoupons(coupons.filter(coupon => coupon.id !== id));
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setNewCouponData({ code: coupon.code, discount: coupon.discount });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://192.168.1.47:5000/coupons/${editingCoupon.id}`, newCouponData);
      setCoupons(coupons.map(coupon => 
        coupon.id === editingCoupon.id ? { ...coupon, ...newCouponData } : coupon
      ));
      setEditingCoupon(null);
      setNewCouponData({ code: '', discount: '' });
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const handleCancel = () => {
    setEditingCoupon(null);
    setNewCouponData({ code: '', discount: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCouponData({ ...newCouponData, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full mx-auto mt-8">
      <h2 className="mb-4 text-xl">Coupon List</h2>
      <ul>
        {coupons.map((coupon) => (
          <li key={coupon.id} className="mb-2 border-b pb-2">
            {editingCoupon && editingCoupon.id === coupon.id ? (
              <div className="flex justify-between items-center">
                <input 
                  type="text" 
                  name="code" 
                  value={newCouponData.code} 
                  onChange={handleChange}
                  className="mr-2 p-1 border rounded"
                />
                <input 
                  type="number" 
                  name="discount" 
                  value={newCouponData.discount} 
                  onChange={handleChange}
                  className="mr-2 p-1 border rounded"
                />
                <button 
                  onClick={handleSave} 
                  className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button 
                  onClick={handleCancel} 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <span>{coupon.code}</span>
                <span>{coupon.discount}%</span>
                <div>
                  <button 
                    onClick={() => handleEdit(coupon)} 
                    className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(coupon.id)} 
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CouponList;

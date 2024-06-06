import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList2() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.47:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.1.47:5000/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setProductData({ name: product.name, description: product.description, price: product.price });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://192.168.1.47:5000/192.168.1.47/${id}`, productData);
      setProducts(products.map(product => (product.id === id ? { ...product, ...productData } : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full mx-auto mt-8">
      <h2 className="mb-4 text-xl">Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} className="mb-4 p-4 border rounded">
            {editingProduct === product.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mb-2"
                />
                <button
                  onClick={() => handleSave(product.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p className="text-green-500">{product.price}€</p>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList2;

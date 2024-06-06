import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://192.168.1.47:5000/login', { username, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-64 mx-auto mt-8">
      <h2 className="mb-4 text-xl">Login</h2>
      <div className="mb-4">
        <label className="block mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      <p>Don't have an account yet? <Link to="/register" class="text-blue-500">Register</Link></p>
    </form>
  );
}

export default Login;

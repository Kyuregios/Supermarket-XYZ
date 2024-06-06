import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserPage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://192.168.1.47:5000/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://192.168.1.47:5000/user/${user.id}`, {
        username,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow-md w-64 mx-auto mt-8">
      <h2 className="mb-4 text-xl">User Information</h2>
      <form onSubmit={handleUpdate} className="flex flex-col space-y-2">
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}

export default UserPage;

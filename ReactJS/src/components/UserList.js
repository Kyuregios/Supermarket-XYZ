import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://192.168.1.47:5000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://192.168.1.47:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditUsername(user.username);
    setEditPassword(''); // Set this to a blank string for security reasons.
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://192.168.1.47:5000/users/${editUserId}`, {
        username: editUsername,
        password: editPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => 
        user.id === editUserId ? { ...user, username: editUsername } : user
      ));
      setEditUserId(null);
      setEditUsername('');
      setEditPassword('');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-64 mx-auto mt-8">
      <h2 className="mb-4 text-xl">User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border-b py-2 flex justify-between items-center">
            {editUserId === user.id ? (
              <form onSubmit={handleUpdate} className="flex flex-col space-y-2">
                <input 
                  type="text" 
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="px-2 py-1 border rounded"
                  required
                />
                <input 
                  type="password"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  className="px-2 py-1 border rounded"
                  required
                />
                <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">
                  Update
                </button>
              </form>
            ) : (
              <>
                {user.username}
                <div>
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;

import React, { useState } from 'react';
import axios from 'axios';

const AdminRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8080/api/admin/create',
        { name, email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('Admin registered successfully.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setMessage('Failed to register admin.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-yellow-800 mb-4">Register New Admin</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="ADMIN">Admin</option>
            <option value="MODERATOR">Moderator</option>
            {/* Add more roles if needed */}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
        >
          Register Admin
        </button>
      </form>

      {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default AdminRegistration;

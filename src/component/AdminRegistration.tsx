import React, { useState } from 'react';
import axios from 'axios';

type AdminRegistrationProps = {
  onSuccess?: () => void;
};

const AdminRegistration: React.FC<AdminRegistrationProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'ADMIN' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(
        'http://localhost:8080/api/admin/create',
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Admin registered successfully.');
      setForm({ name: '', email: '', password: '', role: 'ADMIN' });
      if (onSuccess) onSuccess();
    } catch (error) {
      setMessage('Failed to register admin.');
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-yellow-800 mb-6 text-center">Register New Admin</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {['name', 'email', 'password'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={(form as any)[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-black bg-white"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-black bg-white"
            >
              <option value="ADMIN">Admin</option>
              <option value="MODERATOR">Moderator</option>
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
    </div>
  );
};

export default AdminRegistration;

import React, { useState } from 'react';
import apiService from '../apiservices/apiService';
import { IoIosCloseCircleOutline } from 'react-icons/io';

// Basic sanitizer to prevent script/SQL injection characters
const sanitizeInput = (value: string) => {
  return value.replace(/[<>"';`]/g, '');
};

type AdminRegistrationProps = {
  onSuccess?: () => void;
  onClose?: () => void;
};

const AdminRegistration: React.FC<AdminRegistrationProps> = ({ onSuccess, onClose }) => {
  const [form, setForm] = useState({ firstName: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: sanitizeInput(value) });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.registerAdmin(form);
      setMessage('Admin registered successfully.');
      setForm({ firstName: '', email: '', password: '' });
      if (onSuccess) onSuccess();
    } catch (error) {
      setMessage('Failed to register admin.');
      console.error(error);
    }
  };

  return (
    <div className="relative bg-gray-50 p-6 rounded-lg shadow-lg">
      {onClose && (
        <IoIosCloseCircleOutline
          onClick={onClose}
          className="absolute -top-3 -right-3 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
        />
      )}

      <h2 className="text-2xl font-bold text-yellow-800 mb-6 text-center">Register New Admin</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-black bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-black bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg text-black bg-white"
          />
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

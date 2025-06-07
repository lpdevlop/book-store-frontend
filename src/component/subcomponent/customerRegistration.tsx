import React, { useState } from 'react';
import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import apiService from '../apiservices/apiService';

type CustomerRegistrationProps = {
  onSuccess?: () => void;
  onClose?: () => void;
};

const CustomerRegistration: React.FC<CustomerRegistrationProps> = ({ onSuccess, onClose }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setPasswordError('Password must be at least 8 characters long.');
    } else if (!hasNumber) {
      setPasswordError('Password must include at least one number.');
    } else if (!hasSpecialChar) {
      setPasswordError('Password must include at least one special character.');
    } else {
      setPasswordError('');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const payload = {
        firstName: form.firstName,
        lastName:form.lastName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phone,
        address: form.address,
      };
      const response=apiService.registerCutomer(payload)
      setMessage('✅ Customer registered successfully.');
      setForm({ firstName: '', lastName: '', email: '', password: '', phone: '', address: '' });
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to register customer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative max-w-lg w-full max-h-[90vh] bg-white bg-opacity-95 rounded-2xl shadow-2xl overflow-y-auto p-6 sm:p-10 backdrop-blur-sm">
        {onClose && (
          <IoIosCloseCircleOutline
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
          />
        )}

        <h2 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
          Customer Registration
        </h2>

        <form onSubmit={handleRegister} className="space-y-4 text-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
            {passwordError && (
              <p className="text-xs text-red-600 mt-1">{passwordError}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={2}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading || passwordError !== ''}
              className="bg-yellow-600 text-white px-10 py-3 rounded-xl font-semibold hover:bg-yellow-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-800">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CustomerRegistration;

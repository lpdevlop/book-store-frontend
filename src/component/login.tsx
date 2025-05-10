import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080//api/v1/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Login successful.');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    }
  };

  return (
    <div
      className=" flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522204523234-8720121d2596?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-xl shadow-2xl p-10 w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-yellow-800 mb-6">Book Store Login</h2>

        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{' '}
          <a href="/signup" className="text-yellow-700 font-semibold hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiService from '../apiservices/apiService';
import { useUser } from './context/userContext';
import { jwtDecode } from 'jwt-decode';
import { IoIosCloseCircleOutline } from 'react-icons/io';

type LoginProps = {
  onLogin?: (token: string) => void;
  onClose?: () => void;
  onRegister?: () => void;
};

interface DecodedToken {
  uuid: string;
  sub?: string;
  role?: string;
}

interface UserProfilePayload {
  id: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, onClose, onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const { setUser } = useUser();

  const navigate = useNavigate();

  const sanitizeInput = (input: string): string => {
    return input.replace(/[',",;,--]/g, '');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sanitize inputs before submitting
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    try {
      const response = await apiService.login({ email: sanitizedEmail, password: sanitizedPassword });
      const token = response.data.data.token;
      localStorage.setItem('authToken', token);

      const decoded: DecodedToken = jwtDecode(token);
      const userData: UserProfilePayload = { id: decoded.sub! };

      const profileResponse = await apiService.getUserProfile(userData);
      const profile = profileResponse.data.userprofile;
      setUser(profile);

      if (onLogin) onLogin(token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    }
  };

  return (
    <div>
      {onClose && (
        <IoIosCloseCircleOutline
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
        />
      )}

      <div className="text-center mb-6">
        <div className="text-4xl">📚</div>
        <h2 className="text-2xl font-semibold mt-2 text-black">Login</h2>
      </div>

      {error && <p className="text-red-600 text-center text-sm mb-4">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="relative">
          <FaEnvelope className="absolute top-2.5 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-2.5 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: '#D97706', color: 'black' }}
          className="w-full py-2 text-sm rounded-md font-medium hover:bg-yellow-700 transition"
        >
          Log In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don’t have an account?{' '}
        <button
          onClick={onRegister}
          className="text-orange-600 font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;

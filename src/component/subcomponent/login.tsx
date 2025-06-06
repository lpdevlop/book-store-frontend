import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomerRegistration from './customerRegistration';
import apiService from '../apiservices/apiService';
import { useUser } from './context/userContext';
import { jwtDecode } from 'jwt-decode';

type LoginProps = {
  onLogin?: (token: string) => void;
};
interface DecodedToken {
  uuid: string;
  sub?: string;
  role?: string;
  // add other claims if needed
}

interface UserProfilePayload {
  id: string;
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true); // 🔧 new state
  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
     const response = await apiService.login({ email, password });
     const token = response.data.data.token;
     localStorage.setItem('authToken', token);
     const decoded: DecodedToken = jwtDecode(token);
     const userData: UserProfilePayload = { id: decoded.sub! };


      const profileResponse = await apiService.getUserProfile(userData);
      const profile = profileResponse.data.userprofile;
      setUser(profile);
      console.log('User Profile:', profile);

      if (onLogin) onLogin(token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    }
  };

  return (
    <>
      {}
      {showRegisterModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-full max-w-[90vw] h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-8">
            <button
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-6 text-gray-600 hover:text-black text-2xl"
              aria-label="Close registration form"
            >
              ×
            </button>
            <CustomerRegistration onSuccess={() => setShowRegisterModal(false)} />
          </div>
        </div>
      ) : (
        showLoginModal && ( // ✅ show login modal only if this is true
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-white w-full max-w-[500px] mx-4 md:mx-0 rounded-lg shadow-lg px-6 py-8 text-gray-700 relative">
              <button
                onClick={() => setShowLoginModal(false)} // ✅ closes login modal
                className="absolute top-4 right-6 text-gray-500 hover:text-black text-2xl"
                aria-label="Close"
              >
                ×
              </button>

              <div className="text-center mb-6">
                <div className="text-4xl">📚</div>
                <h2 className="text-2xl font-semibold mt-2">Login</h2>
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
                  onClick={() => {
                    setShowRegisterModal(true);
                    setShowLoginModal(false); // hide login when showing register
                  }}
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Login;

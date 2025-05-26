import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 👈 import useLocation
import { jwtDecode } from 'jwt-decode';
import { FaUser, FaShoppingBasket, FaSearch } from 'react-icons/fa';
import { IconButton, Button, Modal, Box } from '@mui/material';

interface DecodedToken {
  sub: string;
  role: string;
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current route
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Decode token from localStorage when route changes
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]); // 👈 trigger on location change

  const handleLoginSuccess = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      localStorage.setItem('authToken', token);
      setUser(decoded);
      setIsLoginOpen(false);

      // Role-based redirect
      if (decoded.role === 'ROLE_ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      alert('Failed to process login token');
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        📚 BookShop
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 w-[300px] bg-gray-200 rounded-full px-3 py-1">
        <FaSearch className="text-gray-600 cursor-pointer" onClick={handleSearch} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search books..."
          className="bg-transparent outline-none w-full text-black"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Login/Profile */}
        {user ? (
          <span className="text-gray-700 font-medium"> {user.sub}</span>
        ) : (
          <IconButton onClick={() => setIsLoginOpen(true)}>
            <FaUser />
          </IconButton>
        )}

        {/* Basket Button */}
        <Button
          variant="contained"
          startIcon={<FaShoppingBasket />}
          sx={{
            backgroundColor: 'gold',
            color: 'black',
            height: '36px',
            '&:hover': {
              backgroundColor: '#facc15',
            },
          }}
          onClick={() => navigate('/cart')}
        >
          Basket
        </Button>
      </div>

      {/* Login Modal */}
      <Modal open={isLoginOpen} onClose={() => setIsLoginOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 350,
            bgcolor: 'white',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <h2 className="text-lg font-semibold mb-4 text-center">Login</h2>
          <LoginForm onLogin={handleLoginSuccess} />
          <Button
            onClick={() => setIsLoginOpen(false)}
            sx={{ mt: 2, display: 'block', mx: 'auto', color: 'gray' }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

const LoginForm = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      if (data.token) {
        onLogin(data.token);
      } else {
        alert('Login response missing token');
      }
    } catch (error) {
      alert('Invalid credentials');
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block mb-1 font-medium">Username</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        sx={{ backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
      >
        Login
      </Button>
    </form>
  );
};

export default Header;

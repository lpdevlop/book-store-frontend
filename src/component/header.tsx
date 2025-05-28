import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaShoppingBasket, FaSearch, FaUser } from 'react-icons/fa';
import { IconButton, Button, Modal, Box } from '@mui/material';
import Login from './login'
interface DecodedToken {
  sub: string;
  role: string;
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Decode token on route change
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
  }, [location]);

  const handleLoginSuccess = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      localStorage.setItem('authToken', token);
      setUser(decoded);
      setIsLoginOpen(false);

      // Redirect by role
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate('/')}
      >
        📚 BookShop
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 w-[300px] bg-gray-200 rounded-full px-3 py-1">
        <FaSearch
          className="text-gray-600 cursor-pointer"
          onClick={handleSearch}
        />
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
        {/* 👤 User or Login/Logout Button */}
        {user ? (
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <FaUser />
            <span>{user.sub}</span>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{ color: 'black', borderColor: 'gray', textTransform: 'none' }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setIsLoginOpen(true)}
            sx={{ color: 'black', borderColor: 'gray', textTransform: 'none' }}
          >
            Login
          </Button>
        )}

        {/* 🧺 Basket */}
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

      {/* 🔐 Login Modal */}
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
          <Login onLogin={handleLoginSuccess} />
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

export default Header;

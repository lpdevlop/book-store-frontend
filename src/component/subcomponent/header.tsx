import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaShoppingBasket, FaSearch, FaUser } from 'react-icons/fa';
import { IconButton, Button, Modal, Box, Menu, MenuItem } from '@mui/material';
import Login from './login';
import AdminRegistration from '../subcomponent/AdminRegistration';
import BookManagment from './bookManagement';
import { useUser } from './context/userContext';

interface DecodedToken {
  sub: string;
  role: string;
  firstName?: string;
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useUser();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRegisterAdminOpen, setIsRegisterAdminOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false); // Added state

  const handleLoginSuccess = (token: string) => {
    try {
      if (user?.role === 'ADMIN') {
        setIsLoginOpen(false);
        navigate('/admin');
      } else {
        setIsLoginOpen(false);
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        📚 BookShop
      </div>

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
        {user ? (
          <>
            <IconButton onClick={handleMenuOpen}>
              <FaUser />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{ sx: { mt: 1.5 } }}
            >
              <MenuItem disabled>{user.firstName ? user.firstName : "User"}</MenuItem>

              {user.role === 'SUPER_ADMIN' && (
                <MenuItem
                  onClick={() => {
                    setIsRegisterAdminOpen(true);
                    handleMenuClose();
                  }}
                >
                  Register Admin
                </MenuItem>
              )}

              {(user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') && (
                <MenuItem
                  onClick={() => {
                    setIsBookModalOpen(true); // Open Book Management Modal
                    handleMenuClose();
                  }}
                >
                  Register Book
                </MenuItem>
              )}

              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setIsLoginOpen(true)}
            sx={{ color: 'black', borderColor: 'gray', textTransform: 'none' }}
          >
            Login
          </Button>
        )}

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
          <Login onLogin={handleLoginSuccess} />
          <Button
            onClick={() => setIsLoginOpen(false)}
            sx={{ mt: 2, display: 'block', mx: 'auto', color: 'gray' }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Admin Registration Modal */}
      <Modal
        open={isRegisterAdminOpen}
        onClose={() => setIsRegisterAdminOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            minWidth: 320,
            maxWidth: '90vw',
            width: 'fit-content',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            outline: 'none',
          }}
        >
          <AdminRegistration onSuccess={() => setIsRegisterAdminOpen(false)} />
          <Button
            onClick={() => setIsRegisterAdminOpen(false)}
            sx={{ mt: 2, display: 'block', mx: 'auto', color: 'gray' }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Book Management Modal */}
      <Modal
        open={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box
          sx={{
            minWidth: 400,
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            outline: 'none',
          }}
        >
          <BookManagment
            // pass any other props needed for add/update/delete
          />
          <Button
            onClick={() => setIsBookModalOpen(false)}
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

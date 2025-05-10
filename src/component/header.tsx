import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingBasket, FaUser } from 'react-icons/fa';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';

const Header = () => {
  const navigate = useNavigate(); // React Router hook

  return (
    <div className="flex items-center justify-between p-4 shadow-none">
      {/* BookShop Title */}
      <div className="text-xl font-bold">📚 BookShop</div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 h-[36px] px-3 rounded-full bg-gradient-to-r from-[#C8C8C8] via-[#D8D8D8] to-[#C8C8C8] shadow-sm w-[300px]">
        <FaSearch className="text-gray-700 text-sm" />
        <Input
          placeholder="Search"
          className="bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 shadow-none text-sm placeholder-gray-600 w-full h-full"
          style={{ boxShadow: 'none', border: 'none', outline: 'none' }}
        />
      </div>

      <div className="flex gap-4 items-center">
        {/* User Icon Button triggers login */}
        <IconButton
          color="default"
          style={{ fontSize: 20, padding: 10, border: '2px solid #999' }}
          onClick={() => navigate('/login')} // 👈 Navigate to /login
        >
          <FaUser style={{ color: 'white' }} />
        </IconButton>

        <Button
          variant="contained"
          startIcon={<FaShoppingBasket />}
          sx={{
            backgroundColor: 'yellow',
            width: '147px',
            height: '30px',
            color: 'black',
            '&:hover': {
              backgroundColor: 'gold',
            },
          }}
        >
          Basket
        </Button>
      </div>
    </div>
  );
};

// Input Component
interface InputProps {
  className?: string;
  [key: string]: any;
}

const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      className={`border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
};

export default Header;

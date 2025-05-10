
import React from 'react';
import { FaSearch, FaShoppingBasket, FaUser } from 'react-icons/fa';
import { AccountCircle } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';

const Footer = () => {
return (
<footer className="p-6 bg-gray-100 mt-10">
<div className="flex flex-wrap justify-between">
  <div>
    <h4 className="font-semibold mb-2">About</h4>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>Features</li>
      <li>Pricing</li>
      <li>Gallery</li>
      <li>Team</li>
    </ul>
  </div>
  <div>
    <h4 className="font-semibold mb-2">Subscribe</h4>
    <p className="text-sm text-gray-600 mb-2">Stay tuned for new product and latest updates.</p>
    <div className="flex gap-2">
      <Input placeholder="Enter your email address" />
      <Button>Subscribe</Button>
    </div>
  </div>
</div>
<div className="text-xs text-gray-500 mt-6 border-t pt-4 flex justify-between">
  <p>Privacy Policy | Terms of Use | Sales and Refunds | Legal</p>
  <div className="flex gap-2">
    <span>🌐</span>
    <span>📷</span>
    <span>📘</span>
  </div>
</div>
</footer>
);
};

// Input Component
interface InputProps {
  className?: string;
  [key: string]: any; // Allowing any other props for Input
}

const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      className={`border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
};

export default Footer;


import { FaSearch, FaHeart, FaUser, FaShoppingBasket } from 'react-icons/fa';
import './App.css';
import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    className?: string;
    [key: string]: any; // Allowing any other props for Button
  }
  
  const Button = ({ children, className = '', ...props }: ButtonProps) => {
    return (
      <button
        className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

const SearchForm = () => {
    return (
<form className="flex items-center max-w-xl mx-auto bg-white rounded-2xl shadow p-4">
<input type="text" placeholder="Search for books..." className="flex-grow p-2 border border-gray-300 rounded-l" />
<button type="submit" className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-r text-white">🔍</button>
</form>
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
  
  export default SearchForm;
  
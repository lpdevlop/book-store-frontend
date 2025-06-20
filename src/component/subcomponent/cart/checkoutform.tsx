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

const CheckoutForm = () => {
    return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-6">Checkout</h2>
        <form className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Shipping Details</h3>
            <div className="space-y-2">
              <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Address" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="City" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="Zip Code" className="w-full p-2 border rounded" required />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Payment</h3>
            <div className="space-y-2">
              <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded" required />
              <input type="text" placeholder="CVV" className="w-full p-2 border rounded" required />
            </div>
          </div>
          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded">Place Order</button>
        </form>
      </div>
    );
  };

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

  export default CheckoutForm;

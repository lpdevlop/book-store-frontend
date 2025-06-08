import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cart/cart';
import ShippingForm from './ShippingForm';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Order Successful!</h2>
        <button
          className="bg-yellow-400 px-4 py-2 rounded"
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <ShippingForm />
      </div>
      <div className="w-full lg:w-1/3 bg-white shadow p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>රු {((item.price || 0) * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="border-t mt-2 pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>රු {total.toLocaleString()}</span>
        </div>
        <button
          className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

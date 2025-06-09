import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cart';
import ShippingForm, { ShippingData }from './shippingform';
import PaymentForm, { CardData } from './paymentform';
import apiService from '../../apiservices/apiService';
import {OrderPayload} from '../../apiservices/apiTypes';
const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [shipping, setShipping] = useState<ShippingData | null>(null);
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };


  const handlePaymentSuccess = async (card: CardData) => {
    if (!shipping) return;

    const payload: OrderPayload = {
      items: cartItems.map((item) => ({
        id: item.id,
        orderQuantity: item.quantity,
      })),
      quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: total,
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      orderStatus: 'PLACED',
      finalAmount: total,
      shippingMethod: shipping.shippingMethod,
      firstName: shipping.firstName,
      lastName: shipping.lastName,
      streetAddress: shipping.address,
      city: shipping.city,
      zip: shipping.zip,
      country: shipping.country,
      province: shipping.state,
    };
    try {
          console.log('Submitting order!');
      await apiService.makeOrder(payload);
      const order = {
        items: cartItems,
        total,
        shipping,
        card,
        date: new Date().toISOString(),
      };
      localStorage.setItem('latestOrder', JSON.stringify(order));
      console.error('place order', JSON.stringify(order));

      setPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Failed to place order', error);
    }
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
        <ShippingForm onChange={setShipping} />
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
        {!showPayment ? (
          <button
            className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        ) : (
          <PaymentForm total={total} onSuccess={handlePaymentSuccess} />
        )}

      </div>
    </div>
  );
};

export default CheckoutPage;

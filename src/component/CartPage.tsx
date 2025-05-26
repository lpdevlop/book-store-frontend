import React from 'react';
import { useCart } from './cart';

const CartPage = () => {
  const { cartItems } = useCart();

  const getSubtotal = () => {
    return cartItems.reduce((sum, book) => sum + (book.price || 0), 0);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <table className="w-full border-t">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Item</th>
                <th className="py-2">Price</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((book) => (
                <tr key={book.id} className="border-b">
                  <td className="py-4 flex gap-4 items-center">
                    <img src={book.imageUrl} alt={book.title} className="w-20 h-28 object-cover border" />
                    <span className="text-blue-600 underline">{book.title}</span>
                  </td>
                  <td>රු {book.price?.toLocaleString()}</td>
                  <td>
                    <input type="number" value={1} readOnly className="w-12 border rounded text-center" />
                  </td>
                  <td>රු {book.price?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex gap-4 mt-4">
            <button className="border px-4 py-2 rounded">Continue Shopping</button>
            <button className="border px-4 py-2 rounded">Update Shopping Cart</button>
          </div>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-1/3 bg-white shadow p-6 rounded">
          <h2 className="text-xl font-bold mb-4">SUMMARY</h2>

          <div className="text-sm border-t pt-2 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>රු {getSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>රු 0.00</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Order Total</span>
              <span>රු {getSubtotal().toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">Apply Discount Code</label>
            <input type="text" className="mt-1 border rounded w-full px-2 py-1 text-sm" />
          </div>

          <button className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

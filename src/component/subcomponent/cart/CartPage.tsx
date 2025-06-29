import { useCart } from './cart';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/userContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeFromCart } = useCart();
  const DEFAULT_PRICE = 19.99;

  const { user } = useUser();

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  const getSubtotal = () =>
    cartItems.reduce(
      (sum, item) => sum + ((item.price ?? DEFAULT_PRICE) * item.quantity),
      0
    );


  const fmt = (value: number) =>
    value.toLocaleString('si-LK', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Cart Items --- */}
        <div className="flex-1">
          <table className="w-full border-t">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Item</th>
                <th className="py-2">Price</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Subtotal</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => {
                const priceNum = item.price ?? DEFAULT_PRICE;
                const lineTotal = priceNum * item.quantity;

                return (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 flex gap-4 items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-20 h-28 object-cover border"
                      />
                      <span className="text-blue-600 underline">
                        {item.title}
                      </span>
                    </td>
                    <td>රු {fmt(priceNum)}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        className="w-12 border rounded text-center"
                        onChange={e =>
                          updateQty(item.id, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>රු {fmt(lineTotal)}</td>
                    <td>
                      <button
                        className="text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="w-full lg:w-1/3 bg-white shadow p-6 rounded">
          <h2 className="text-xl font-bold mb-4">SUMMARY</h2>
          <div className="text-sm border-t pt-2 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>රු {fmt(getSubtotal())}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>රු {fmt(0)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Order Total</span>
              <span>රු {fmt(getSubtotal())}</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium">Apply Discount Code</label>
            <input
              type="text"
              className="mt-1 border rounded w-full px-2 py-1 text-sm"
            />
          </div>

          <button
            className="mt-6 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={handleCheckout}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

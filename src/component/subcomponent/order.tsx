import React, { useEffect, useState } from 'react';
import apiService from '../apiservices/apiService';
import { Order } from '../apiservices/apiTypes';
import { useUser } from './context/userContext';

const OrdersPage: React.FC = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let list: Order[] = [];

        if (user?.role === 'ADMIN') {
          const response = await apiService.getAllOrders();
          list = response.data?.data ?? [];
        } else if (user?.role === 'CUSTOMER') {
          const response = await apiService.getMyOrders();
          console.log('Customer orders response:', response);
          list = response.data.data ?? []; // ✅ use direct array
        }

        setOrders(list);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to fetch orders');
      }
    };

    if (user?.role) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        {user?.role === 'ADMIN' ? 'All Orders' : 'My Orders'}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      {!error && orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      {orders.length > 0 && (
        <table className="w-full border mt-4">
          <thead>
            <tr className="border-b text-left bg-gray-100">
              <th className="p-2">Tracking Number</th>
              <th className="p-2">Shipping Method</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Total</th>
              <th className="p-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">{o.trackingNumber ?? 'N/A'}</td>
                <td className="p-2">{o.shippingMethod ?? 'Unknown'}</td>
                <td className="p-2">{o.paymentMethod ?? 'N/A'}</td>
                <td className="p-2">{o.totalAmount?.toFixed(2) ?? '0.00'}</td>
                <td className="p-2">
                  {Array.isArray(o.orderItems) ? o.orderItems.length : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Optional: Debug output for development */}
  {/*     <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-x-auto">
        Debug Data:
        {JSON.stringify(orders, null, 2)}
      </pre> */}
    </div>
  );
};

export default OrdersPage;

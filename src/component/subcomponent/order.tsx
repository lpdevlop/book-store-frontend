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
        let response;

        if (user?.role === 'ADMIN') {
          response = await apiService.getAllOrders();
                    console.log(response)
        } else if (user?.role === 'CUSTOMER') {
          response = await apiService.getMyOrders();
                  console.log('ssssssssssssssssssss:', response);
        } else {
          response = { data: [] };
        }

        console.log('API response:', response);

        if (Array.isArray(response?.data)) {
          setOrders(response.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch orders');
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">
        {user?.role === 'ADMIN' ? 'All Orders' : 'My Orders'}
      </h2>

      {error && <p className="text-red-500">{error}</p>}
      {!orders.length && !error && <p className="text-gray-500">No orders found.</p>}

      {!!orders.length && (
        <table className="w-full border mt-4">
          <thead>
            <tr className="border-b text-left">
              <th className="p-2">Tracking Number</th>
              <th className="p-2">Shipping Method</th>
              <th className="p-2">Payment</th>
              <th className="p-2">Total</th>
              <th className="p-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{o.trackingNumber ?? 'N/A'}</td>
                <td className="p-2">{o.shippingMethod ?? 'Unknown'}</td>
                <td className="p-2">{o.paymentMethod ?? 'N/A'}</td>
                <td className="p-2">{o.totalAmount?.toFixed(2) ?? '0.00'}</td>
                <td className="p-2">{Array.isArray(o.items) ? o.items.length : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <pre className="mt-4 bg-gray-100 p-4 rounded text-sm">
        Debug Data:
        {JSON.stringify(orders, null, 2)}
      </pre>
    </div>
  );
};

export default OrdersPage;

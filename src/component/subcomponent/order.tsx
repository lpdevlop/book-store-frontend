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
          list = response.data?.data ?? [];
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
<div className="p-12 md:p-16 lg:p-20">
      <h2 className="text-2xl font-bold mb-4">
        {user?.role === 'ADMIN' ? 'All Orders' : 'My Orders'}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      {!error && orders.length === 0 && (
        <p className="text-gray-500">No orders found.</p>
      )}

      {orders.length > 0 && (
        <div className="overflow-x-auto border rounded shadow">
          <table className="w-full min-w-[700px] table-auto text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="text-left border-b border-gray-300">
                <th className="p-3 w-[200px]">Tracking Number</th>
                <th className="p-3 w-[180px]">Shipping Method</th>
                <th className="p-3 w-[150px]">Payment</th>
                <th className="p-3 w-[120px] text-right">Total</th>
                <th className="p-3 w-[100px] text-center">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((o, i) => (
                <tr key={i} className="hover:bg-gray-50 h-[48px]">
                  <td className="p-3 truncate">{o.trackingNumber ?? 'N/A'}</td>
                  <td className="p-3">{o.shippingMethod ?? 'Unknown'}</td>
                  <td className="p-3">{o.paymentMethod ?? 'N/A'}</td>
                  <td className="p-3 text-right">
                    {typeof o.totalAmount === 'number'
                      ? o.totalAmount.toFixed(2)
                      : '0.00'}
                  </td>
                  <td className="p-3 text-center">
                    {Array.isArray(o.orderItems) ? o.orderItems.length : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

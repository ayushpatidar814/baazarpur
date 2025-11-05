import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { backendUrl } from '../App';

const COLORS = ['#60a5fa', '#34d399', '#fbbf24', '#f87171'];

const OrdersStatusChart = ({ token }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(backendUrl + '/admin/ordersStatus', {headers: { token },
        });

        const statusData = res?.data?.statusData;
        if (statusData && typeof statusData === 'object') {
          const formatted = Object.entries(statusData).map(([name, value]) => ({
            name,
            value,
          }));
          setData(formatted);
        } else {
          console.warn('Invalid statusData format:', statusData);
          setData([]);
        }
      } catch (err) {
        console.error('Error fetching order status:', err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Order Status Breakdown</h2>

      {loading ? (
        <p className="text-gray-500 text-center mt-10">Loading...</p>
      ) : data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" label>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 mt-8 text-center">No order data available</p>
      )}
    </div>
  );
};

export default OrdersStatusChart;

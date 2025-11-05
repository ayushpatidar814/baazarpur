import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { backendUrl } from '../App';


const TopProductsChart = ({ token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!token) return;

    const fetchTopProducts = async () => {
      try {
        const response = await axios.get(backendUrl + '/admin/topProducts', {headers: { token } });
        setData(response.data.topProducts || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTopProducts();
  }, [token]);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-[300px]">
      <h2 className="text-lg font-semibold mb-2">Top 5 Products</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#34d399" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 mt-8 text-center">No product data available</p>
      )}
    </div>
  );
};

export default TopProductsChart;

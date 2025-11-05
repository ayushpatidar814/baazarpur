import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { backendUrl } from "../App";

const SubscribersTrend = ({ token }) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!token) return;
    
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(backendUrl + '/admin/subscribers', {headers: { token }});
        setData(response.data.subscribers || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubscribers();
  }, [token]);

  return (
    <div className="bg-white p-4 rounded-lg shadow h-[300px]">
      <h2 className="text-lg font-semibold mb-2">Subscribers Growth (6 Months)</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#6366f1" fill="#a5b4fc" />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 mt-8 text-center">No subscriber data available</p>
      )}
    </div>
  );
};

export default SubscribersTrend;

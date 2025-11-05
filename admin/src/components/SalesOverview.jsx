import React from "react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from "../App";
import { useEffect } from "react";

const SalesOverview = ({ token }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
      if (!token) return;

    const fetchOverview = async () => {
        try {
            const response = await axios.get(backendUrl + '/admin/salesTrends', {headers: {token}})
            if(response.data.success) {
                setData(response.data.trends)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    fetchOverview();
  }, [token])

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">
        Sales Overview (Last 30 Days)
      </h2>
      <div className="w-full min-w-0 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesOverview;

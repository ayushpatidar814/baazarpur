import React from "react";
import { useEffect } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { backendUrl } from "../App";
import { useState } from "react";

const SummaryCards = ({ token }) => {
    const [overview, setOverview] = useState({});

  const items = [
    { label: "Total Sales", value: `₹${overview.totalSales || 0}` },
    { label: "Total Orders", value: overview.totalOrders || 0 },
    { label: "Total Users", value: overview.totalUsers || 0 },
    { label: "Total Products", value: overview.totalProducts || 0 },
  ];

  useEffect(() => {
    if (!token) return;

    const fetchOverview = async () => {
        try {
            const response = await axios.get(backendUrl + '/admin/overview', {headers: {token}})
            if(response.data.success) {
                setOverview(response.data.overview)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    fetchOverview();
  }, [token])

  if (!overview) return <p>Loading overview...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-5 border border-slate-200"
        >
          <h2 className="text-slate-600 text-sm font-medium mb-1">
            {item.label}
          </h2>
          <p className="text-2xl font-semibold text-slate-800">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;

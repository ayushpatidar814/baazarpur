import SummaryCards from "../components/SummaryCards.jsx";
import SalesOverview from "../components/SalesOverview.jsx";
import OrdersStatusChart from "../components/OrderStatusChart.jsx";
import TopProductsChart from "../components/TopProductsChart.jsx";
import SubscribersTrend from "../components/SubscribersTrend.jsx";

const Dashboard = ({ token }) => {
  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">
        Admin Dashboard
      </h1>

      <SummaryCards token={token} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <SalesOverview token={token} />
        <OrdersStatusChart token={token} />
        <TopProductsChart token={token} />
        <SubscribersTrend token={token} />
      </div>
    </div>
  );
};

export default Dashboard;

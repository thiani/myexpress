import React from 'react';
import { Users, Package, CreditCard, TrendingUp } from 'lucide-react';
import AdminHeader from '../../components/admin/common/AdminHeader';
import StatCard from '../../components/admin/dashboard/StatCard';
import OrdersChart from '../../components/admin/dashboard/OrdersChart';
import RevenueChart from '../../components/admin/dashboard/RevenueChart';
import StockAlerts from '../../components/admin/dashboard/StockAlerts';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: 'KES 892,458',
      change: 12.5,
      icon: CreditCard
    },
    {
      title: 'Total Orders',
      value: '456',
      change: 8.2,
      icon: Package
    },
    {
      title: 'Total Customers',
      value: '2,345',
      change: 5.6,
      icon: Users
    },
    {
      title: 'Average Order Value',
      value: 'KES 1,958',
      change: -2.3,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Dashboard"
        onMenuClick={() => {}}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
        <RevenueChart />
        <OrdersChart />
      </div>

      {/* Low Stock Alerts */}
      <div className="px-6">
        <StockAlerts />
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">New order #1234</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
                <span className="px-3 py-1 text-sm bg-brand-blue-50 text-brand-blue-500 rounded-full">
                  KES 12,500
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
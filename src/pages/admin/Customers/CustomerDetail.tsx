import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Calendar, Package, CreditCard } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import StatusBadge from '../../../components/admin/common/StatusBadge';
import AdminTable from '../../../components/admin/common/AdminTable';
import { formatDate } from '../../../utils/helpers';
import { OrderStatus, mapOrderStatusToStatusType } from '../../../types/status';

interface CustomerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'inactive';
  dateJoined: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: number;
}

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCustomer({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+254712345678',
        address: '123 Main St, Nairobi, Kenya',
        status: 'active',
        dateJoined: '2023-08-01',
        totalOrders: 15,
        totalSpent: 125000,
        lastOrder: '2024-03-15'
      });

      setOrders([
        {
          id: 'ORD-001',
          date: '2024-03-15',
          status: 'completed',
          total: 25000,
          items: 3
        },
        {
          id: 'ORD-002',
          date: '2024-02-28',
          status: 'processing',
          total: 18000,
          items: 2
        }
      ]);

      setIsLoading(false);
    };

    fetchCustomer();
  }, [id]);

  const orderColumns = [
    {
      key: 'id',
      title: 'Order ID',
      render: (order: Order) => (
        <Link
          to={`/admin/orders/${order.id}`}
          className="font-medium text-brand-blue-500 hover:text-brand-blue-600"
        >
          {order.id}
        </Link>
      )
    },
    {
      key: 'date',
      title: 'Date',
      render: (order: Order) => formatDate(order.date)
    },
    {
      key: 'status',
      title: 'Status',
      render: (order: Order) => (
        <StatusBadge status={mapOrderStatusToStatusType(order.status)} size="sm" />
      )
    },
    {
      key: 'items',
      title: 'Items',
      render: (order: Order) => order.items
    },
    {
      key: 'total',
      title: 'Total',
      render: (order: Order) => (
        <span className="font-medium">
          KES {order.total.toLocaleString()}
        </span>
      )
    }
  ];

  if (isLoading || !customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb 
        items={[
          { label: 'Customers', href: '/admin/customers' },
          { label: customer.name }
        ]} 
      />

      <AdminHeader 
        title="Customer Details"
        onMenuClick={() => {}} // Add empty handler for menu click
        actions={
          <Link
            to={`/admin/customers/${id}/edit`}
            className="px-4 py-2 bg-brand-blue-500 text-white rounded-lg 
              hover:bg-brand-blue-600 transition-colors"
          >
            Edit Customer
          </Link>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info Card */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Customer Information</h3>
              <StatusBadge status={customer.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <div className="font-medium">{customer.name}</div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{customer.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{customer.phone}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{customer.address}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-500">Member Since</label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{formatDate(customer.dateJoined)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-6">Customer Stats</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Package className="w-5 h-5 mr-2" />
                <span>Total Orders</span>
              </div>
              <span className="font-medium">{customer.totalOrders}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <CreditCard className="w-5 h-5 mr-2" />
                <span>Total Spent</span>
              </div>
              <span className="font-medium">
                KES {customer.totalSpent.toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Last Order</span>
              </div>
              <span>{formatDate(customer.lastOrder)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium">Order History</h3>
        </div>
        <AdminTable
          columns={orderColumns}
          data={orders}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CustomerDetail;
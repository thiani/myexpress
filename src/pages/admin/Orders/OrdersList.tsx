// src/pages/admin/Orders/OrdersList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, FileDown } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminTable from '../../../components/admin/common/AdminTable';
import AdminSearch from '../../../components/admin/common/AdminSearch';
import StatusBadge from '../../../components/admin/common/StatusBadge';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import { formatPrice, formatDate } from '../../../utils/helpers';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  total: number;
  items: number;
  date: string;
  paymentMethod: string;
}

const OrdersList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders([
          {
            id: '1',
            orderNumber: 'ORD-001',
            customer: {
              id: 'CUST001',
              name: 'John Doe',
              email: 'john@example.com'
            },
            status: 'completed',
            paymentStatus: 'paid',
            total: 21960,
            items: 3,
            date: '2024-03-20T10:30:00',
            paymentMethod: 'M-PESA'
          },
          {
            id: '2',
            orderNumber: 'ORD-002',
            customer: {
              id: 'CUST002',
              name: 'Jane Smith',
              email: 'jane@example.com'
            },
            status: 'processing',
            paymentStatus: 'pending',
            total: 15500,
            items: 2,
            date: '2024-03-19T15:45:00',
            paymentMethod: 'M-PESA'
          }
        ]);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      key: 'orderNumber',
      title: 'Order',
      render: (order: Order) => (
        <div>
          <Link 
            to={`/admin/orders/${order.id}`}
            className="font-medium text-gray-900 hover:text-brand-blue-500"
          >
            {order.orderNumber}
          </Link>
          <div className="text-sm text-gray-500">
            {formatDate(order.date)}
          </div>
        </div>
      )
    },
    {
      key: 'customer',
      title: 'Customer',
      render: (order: Order) => (
        <div>
          <Link 
            to={`/admin/customers/${order.customer.id}`}
            className="font-medium text-gray-900 hover:text-brand-blue-500"
          >
            {order.customer.name}
          </Link>
          <div className="text-sm text-gray-500">{order.customer.email}</div>
        </div>
      )
    },
    {
      key: 'payment',
      title: 'Payment',
      render: (order: Order) => (
        <div>
          <StatusBadge status={order.paymentStatus} size="sm" />
          <div className="text-sm text-gray-500 mt-1">{order.paymentMethod}</div>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (order: Order) => (
        <StatusBadge status={order.status} size="sm" />
      )
    },
    {
      key: 'total',
      title: 'Total',
      render: (order: Order) => (
        <div>
          <div className="font-medium">{formatPrice(order.total)}</div>
          <div className="text-sm text-gray-500">{order.items} items</div>
        </div>
      )
    },
    {
      key: 'actions',
      title: '',
      render: (order: Order) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/admin/orders/${order.id}`}
            className="p-2 text-gray-400 hover:text-brand-blue-500 transition-colors"
          >
            <Eye className="w-5 h-5" />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Add export logic
            }}
            className="p-2 text-gray-400 hover:text-brand-blue-500 transition-colors"
          >
            <FileDown className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = orders.filter(order => {
    if (selectedStatus !== 'all' && order.status !== selectedStatus) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <AdminBreadcrumb items={[{ label: 'Orders', href: '/admin/orders' }]} />
      
      <AdminHeader 
        title="Orders"
        actions={
          <div className="flex items-center space-x-4">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 
                focus:ring-brand-blue-500/20 focus:border-brand-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="w-64">
              <AdminSearch 
                placeholder="Search orders..." 
                onSearch={setSearchTerm}
              />
            </div>
            <button
              onClick={() => {/* Add export logic */}}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 
                inline-flex items-center space-x-2"
            >
              <FileDown className="w-5 h-5" />
              <span>Export</span>
            </button>
          </div>
        }
      />

      <div className="bg-white rounded-lg shadow-sm">
        <AdminTable
          columns={columns}
          data={filteredOrders}
          isLoading={isLoading}
          onRowClick={(order) => window.location.href = `/admin/orders/${order.id}`}
        />
      </div>
    </div>
  );
};

export default OrdersList;
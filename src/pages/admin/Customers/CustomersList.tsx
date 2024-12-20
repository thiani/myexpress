// src/pages/admin/Customers/CustomersList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Edit, Search } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminTable from '../../../components/admin/common/AdminTable';
import AdminSearch from '../../../components/admin/common/AdminSearch';
import StatusBadge from '../../../components/admin/common/StatusBadge';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import { formatDate } from '../../../utils/helpers';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastOrder: string;
  dateJoined: string;
}

const CustomersList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Mock data fetch - replace with actual API call
    const fetchCustomers = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCustomers([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+254712345678',
          totalOrders: 15,
          totalSpent: 125000,
          status: 'active',
          lastOrder: '2024-03-15',
          dateJoined: '2023-08-01'
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+254723456789',
          totalOrders: 8,
          totalSpent: 85000,
          status: 'active',
          lastOrder: '2024-03-10',
          dateJoined: '2023-09-15'
        }
      ]);
      setIsLoading(false);
    };

    fetchCustomers();
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Customer',
      render: (customer: Customer) => (
        <div>
          <Link 
            to={`/admin/customers/${customer.id}`}
            className="font-medium text-gray-900 hover:text-brand-blue-500"
          >
            {customer.name}
          </Link>
          <div className="text-sm text-gray-500">{customer.email}</div>
        </div>
      )
    },
    {
      key: 'contact',
      title: 'Contact',
      render: (customer: Customer) => (
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-1" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-1" />
            <span>{customer.email}</span>
          </div>
        </div>
      )
    },
    {
      key: 'orders',
      title: 'Orders',
      render: (customer: Customer) => (
        <div>
          <div className="font-medium">{customer.totalOrders}</div>
          <div className="text-sm text-gray-500">
            Last: {formatDate(customer.lastOrder)}
          </div>
        </div>
      )
    },
    {
      key: 'spent',
      title: 'Total Spent',
      render: (customer: Customer) => (
        <div className="font-medium">
          KES {customer.totalSpent.toLocaleString()}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (customer: Customer) => (
        <StatusBadge 
          status={customer.status} 
          size="sm"
        />
      )
    },
    {
      key: 'actions',
      title: '',
      render: (customer: Customer) => (
        <Link
          to={`/admin/customers/${customer.id}`}
          className="p-2 text-gray-400 hover:text-brand-blue-500 transition-colors"
        >
          <Edit className="w-5 h-5" />
        </Link>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb 
        items={[{ label: 'Customers', href: '/admin/customers' }]} 
      />
      
      <AdminHeader 
        title="Customers"
        actions={
          <div className="w-64">
            <AdminSearch 
              placeholder="Search customers..." 
              onSearch={setSearchTerm}
            />
          </div>
        }
      />

      <div className="bg-white rounded-lg shadow-sm">
        <AdminTable
          columns={columns}
          data={customers}
          isLoading={isLoading}
          onRowClick={(customer) => window.location.href = `/admin/customers/${customer.id}`}
        />
      </div>
    </div>
  );
};

// src/components/admin/dashboard/StockAlerts.tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StockItem {
  id: string;
  name: string;
  stock: number;
  threshold: number;
}

const items: StockItem[] = [
  { id: '1', name: 'Brake Pads', stock: 5, threshold: 10 },
  { id: '2', name: 'Oil Filters', stock: 3, threshold: 8 },
  { id: '3', name: 'Spark Plugs', stock: 4, threshold: 15 }
];

const StockAlerts: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
        <Link to="/admin/products" className="text-brand-blue-500 text-sm hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-red-600">{item.stock} remaining</p>
              </div>
            </div>
            <Link 
              to={`/admin/products/${item.id}`}
              className="px-3 py-1 text-sm bg-white rounded-lg hover:bg-gray-50"
            >
              Update
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockAlerts;
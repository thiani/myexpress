import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import AdminSearch from './AdminSearch';

interface AdminHeaderProps {
  onMenuClick?: () => void; // Make it optional
  title: string;
  actions?: React.ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  onMenuClick = () => {}, // Provide default empty function
  title,
  actions 
}) => {
  return (
    <header className="bg-white border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-500" />
          </button>
          
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block w-64">
            <AdminSearch />
          </div>
          
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-red-500 rounded-full" />
          </button>

          {/* Action Buttons */}
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
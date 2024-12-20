// src/components/admin/common/AdminSearch.tsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface AdminSearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const AdminSearch: React.FC<AdminSearchProps> = ({ 
  placeholder = 'Search...',
  onSearch 
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setSearchValue('');
    onSearch?.('');
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-8 py-2 border rounded-lg focus:ring-2 
          focus:ring-brand-blue-500/20 focus:border-brand-blue-500"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      
      {searchValue && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
            hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default AdminSearch;
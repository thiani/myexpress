// src/components/admin/common/AdminTable.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Column<T> {
  key: keyof T | string;
  title: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  selectable?: boolean;
  onSelect?: (selectedItems: T[]) => void;
  onRowClick?: (item: T) => void;
}

const AdminTable = <T extends { id: string }>({
  columns,
  data,
  isLoading,
  selectable,
  onSelect,
  onRowClick
}: AdminTableProps<T>) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSort = (key: keyof T | string) => {
    setSortConfig(current => ({
      key,
      direction: current?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelected = checked ? data.map(item => item.id) : [];
    setSelectedItems(newSelected);
    onSelect?.(data.filter(item => newSelected.includes(item.id)));
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(current => {
      const newSelected = current.includes(id)
        ? current.filter(itemId => itemId !== id)
        : [...current, id];
      
      onSelect?.(data.filter(item => newSelected.includes(item.id)));
      return newSelected;
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-200 rounded-t-lg mb-1" />
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-gray-100 mb-1" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-y">
          <tr>
            {selectable && (
              <th className="px-6 py-3 w-4">
                <input
                  type="checkbox"
                  checked={selectedItems.length === data.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded text-brand-blue-500 focus:ring-brand-blue-500/20"
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-sm font-medium text-gray-500
                  ${column.width ? `w-${column.width}` : ''}`}
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center space-x-1 group"
                  >
                    <span>{column.title}</span>
                    <span className="text-gray-400 group-hover:text-gray-600">
                      {sortConfig?.key === column.key ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((item, rowIndex) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
            >
              {selectable && (
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded text-brand-blue-500 focus:ring-brand-blue-500/20"
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {column.render ? column.render(item) : 
                    String(item[column.key as keyof T])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
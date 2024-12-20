import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminTable from '../../../components/admin/common/AdminTable';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import StatusBadge from '../../../components/admin/common/StatusBadge';
import DeleteConfirmModal from '../../../components/admin/common/DeleteConfirmModal';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productsCount: number;
  status: 'active' | 'inactive';
  featured: boolean;
  createdAt: string;
}

const CategoriesList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Mock data
  const categories: Category[] = [
    {
      id: '1',
      name: 'Engine Parts',
      slug: 'engine-parts',
      description: 'All engine related parts and components',
      productsCount: 245,
      status: 'active',
      featured: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Brake System',
      slug: 'brake-system',
      description: 'Brake pads, rotors, and related components',
      productsCount: 189,
      status: 'active',
      featured: true,
      createdAt: '2024-01-16'
    },
    // Add more mock categories as needed
  ];

  const columns = [
    {
      key: 'name',
      title: 'Name',
      render: (category: Category) => (
        <div>
          <p className="font-medium text-gray-900">{category.name}</p>
          <p className="text-sm text-gray-500">{category.slug}</p>
        </div>
      )
    },
    {
      key: 'description',
      title: 'Description',
      render: (category: Category) => (
        <p className="text-gray-600 truncate max-w-xs">{category.description}</p>
      )
    },
    {
      key: 'productsCount',
      title: 'Products',
      render: (category: Category) => (
        <span className="text-gray-900">{category.productsCount}</span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (category: Category) => (
        <StatusBadge 
          status={category.status === 'active' ? 'success' : 'inactive'}
          text={category.status}
          size="sm"
        />
      )
    },
    {
      key: 'featured',
      title: 'Featured',
      render: (category: Category) => (
        <StatusBadge 
          status={category.featured ? 'success' : 'inactive'}
          text={category.featured ? 'Yes' : 'No'}
          size="sm"
        />
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (category: Category) => (
        <div className="flex space-x-2">
          <Link
            to={`/admin/categories/${category.id}/edit`}
            className="px-3 py-1 text-sm bg-brand-blue-50 text-brand-blue-500 
              rounded-lg hover:bg-brand-blue-100 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDeleteClick(category)}
            className="px-3 py-1 text-sm bg-red-50 text-red-500 
              rounded-lg hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      )
    }
  ];

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedCategory) {
      // API call to delete category
      console.log('Deleting category:', selectedCategory.id);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Categories"
        onMenuClick={() => {}}
        actions={
          <Link 
            to="/admin/categories/create"
            className="inline-flex items-center px-4 py-2 bg-brand-blue-500 
              text-white rounded-lg hover:bg-brand-blue-600 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Category
          </Link>
        }
      />

      <div className="px-6">
        <AdminBreadcrumb
          items={[
            { label: 'Categories' }
          ]}
        />

        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <AdminTable
            columns={columns}
            data={categories}
            onRowClick={(category) => {
              window.location.href = `/admin/categories/${category.id}/edit`;
            }}
          />
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? All associated products will be uncategorized."
        itemName={selectedCategory?.name}
      />
    </div>
  );
};

export default CategoriesList;
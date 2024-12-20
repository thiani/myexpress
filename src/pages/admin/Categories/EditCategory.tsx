import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import CategoryForm from '../../../components/admin/forms/CategoryForm';
import DeleteConfirmModal from '../../../components/admin/common/DeleteConfirmModal';

interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: string;
  featured: boolean;
  parentCategory?: string;
}

const EditCategory: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  // Mock data - replace with actual API call
  const category: Category = {
    id: '1',
    name: 'Engine Parts',
    description: 'All engine related parts and components',
    slug: 'engine-parts',
    icon: 'engine',
    featured: true
  };

  const handleSubmit = async (data: any) => {
    try {
      // API call to update category
      console.log('Updating category:', data);
      navigate('/admin/categories');
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // API call to delete category
      console.log('Deleting category:', id);
      setIsDeleteModalOpen(false);
      navigate('/admin/categories');
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Edit Category"
        onMenuClick={() => {}}
        actions={
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          >
            Delete Category
          </button>
        }
      />

      <div className="p-6 bg-white rounded-lg shadow-sm">
        <AdminBreadcrumb
          items={[
            { label: 'Categories', href: '/admin/categories' },
            { label: 'Edit Category' }
          ]}
        />

        <div className="mt-6">
          <CategoryForm
            initialData={category}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        itemName={category.name}
      />
    </div>
  );
};

export default EditCategory;
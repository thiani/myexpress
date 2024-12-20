import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import CategoryForm from '../../../components/admin/forms/CategoryForm';
import type { CategoryFormData } from '../../../types/admin';

const CreateCategory: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Mock API call - replace with actual API endpoint
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate
            resolve({
              id: 'new-category-id',
              ...data,
              productsCount: 0,
              createdAt: new Date().toISOString()
            });
          } else {
            reject(new Error('Failed to create category'));
          }
        }, 1000);
      });

      navigate('/admin/categories', { 
        state: { 
          message: 'Category created successfully',
          type: 'success'
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader 
        title="Create Category"
        onMenuClick={() => {}}
        actions={
          <button
            onClick={() => navigate('/admin/categories')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 
              rounded-lg shadow-sm text-sm font-medium text-gray-700 
              bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-brand-blue-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </button>
        }
      />

      <div className="px-6">
        <AdminBreadcrumb 
          items={[
            { label: 'Categories', href: '/admin/categories' },
            { label: 'Create Category' }
          ]} 
        />

        <div className="mt-6 max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Category Information
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg 
                  flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div className="flex-1 text-sm text-red-500">{error}</div>
                </div>
              )}

              <CategoryForm 
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                initialData={{
                  status: 'active',
                  featured: false,
                  parentCategory: '',
                  icon: 'default',
                  metaTitle: '',
                  metaDescription: '',
                  displayOrder: 0
                }}
              />
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-blue-50 rounded-lg p-6">
            <h3 className="text-sm font-medium text-blue-800 mb-4">
              Tips for Creating Categories
            </h3>
            <ul className="space-y-3 text-sm text-blue-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Use clear, descriptive names that accurately represent the products within
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Create a logical hierarchy using parent categories for better organization
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Set featured categories to highlight them in the store front
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Optimize SEO with relevant meta titles and descriptions
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
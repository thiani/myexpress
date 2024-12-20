// src/pages/admin/Products/CreateProduct.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import ProductForm from '../../../components/admin/forms/ProductForm';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  images: File[];
}

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductFormData) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="space-y-6">
      <AdminBreadcrumb 
        items={[
          { label: 'Products', href: '/admin/products' },
          { label: 'Create Product' }
        ]} 
      />

      <AdminHeader 
        title="Create Product"
        actions={
          <button
            onClick={() => navigate('/admin/products')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        }
      />

      <div className="max-w-4xl bg-white rounded-lg shadow-sm p-6">
      <ProductForm
  onSubmit={handleSubmit}
  submitText="Create Product"
/>
      </div>
    </div>
  );
};

export default CreateProduct;
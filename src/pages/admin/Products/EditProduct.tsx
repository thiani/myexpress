import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import ProductForm from '../../../components/admin/forms/ProductForm';
import DeleteConfirmModal from '../../../components/admin/common/DeleteConfirmModal';
import type { Product, ProductFormData } from '../../../types/product';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProduct({
          id: '1',
          name: 'Premium Brake Pads',
          description: 'High-quality brake pads for optimal performance',
          price: 8500,
          category: 'Brake System',
          brand: 'BrakeMaster',
          sku: 'BP-001',
          stock: 25,
          images: [
            {
              url: '/api/placeholder/400/400',
              alt: 'Premium Brake Pads'
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Convert product data to form data format
  const convertProductToFormData = (product: Product): Partial<ProductFormData> => {
    const { id, images, ...rest } = product;
    return {
      ...rest,
      images: [] // Initialize with empty array as we can't convert URLs to Files
    };
  };

  const handleSubmit = async (formData: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically:
      // 1. Upload any new images first
      // 2. Get the uploaded image URLs
      // 3. Create the updated product object with new image URLs
      // 4. Send the update to your API

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/admin/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-brand-blue-500 rounded-full animate-spin" />
          <p className="text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-4">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/admin/products')}
          className="inline-flex items-center text-brand-blue-500 hover:text-brand-blue-600"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminBreadcrumb 
        items={[
          { label: 'Products', href: '/admin/products' },
          { label: product.name }
        ]} 
      />

      <AdminHeader 
        title="Edit Product"
        onMenuClick={() => {}}
        actions={
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/products')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 
                transition-colors"
            >
              Delete Product
            </button>
          </div>
        }
      />

      <div className="bg-white rounded-lg shadow-sm p-6">
        <ProductForm 
          initialData={convertProductToFormData(product)}
          onSubmit={handleSubmit}
          submitText="Update Product"
          isSubmitting={isSubmitting}
        />
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        itemName={product.name}
      />
    </div>
  );
};

export default EditProduct;
// src/pages/admin/Products/ProductsList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminHeader from '../../../components/admin/common/AdminHeader';
import AdminTable from '../../../components/admin/common/AdminTable';
import AdminSearch from '../../../components/admin/common/AdminSearch';
import StatusBadge from '../../../components/admin/common/StatusBadge';
import AdminBreadcrumb from '../../../components/admin/common/AdminBreadcrumb';
import DeleteConfirmModal from '../../../components/admin/common/DeleteConfirmModal';
import { formatPrice } from '../../../utils/helpers';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts([
        {
          id: '1',
          name: 'Premium Brake Pads',
          sku: 'BP-001',
          price: 8500,
          stock: 25,
          category: 'Brake System',
          status: 'active'
        },
        {
          id: '2',
          name: 'Oil Filter Set',
          sku: 'OF-002',
          price: 2500,
          stock: 50,
          category: 'Engine Parts',
          status: 'active'
        }
      ]);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!selectedProduct) return;
    // Add delete logic here
    setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const columns = [
    {
      key: 'name',
      title: 'Product',
      render: (product: Product) => (
        <div>
          <Link 
            to={`/admin/products/${product.id}/edit`}
            className="font-medium text-gray-900 hover:text-brand-blue-500"
          >
            {product.name}
          </Link>
          <div className="text-sm text-gray-500">SKU: {product.sku}</div>
        </div>
      )
    },
    {
      key: 'category',
      title: 'Category',
      render: (product: Product) => product.category
    },
    {
      key: 'price',
      title: 'Price',
      render: (product: Product) => (
        <div className="font-medium">
          {formatPrice(product.price)}
        </div>
      )
    },
    {
      key: 'stock',
      title: 'Stock',
      render: (product: Product) => (
        <div className={`font-medium ${product.stock < 10 ? 'text-red-500' : ''}`}>
          {product.stock} units
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (product: Product) => (
        <StatusBadge status={product.status} size="sm" />
      )
    },
    {
      key: 'actions',
      title: '',
      render: (product: Product) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/admin/products/${product.id}/edit`}
            className="p-2 text-gray-400 hover:text-brand-blue-500 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
              setDeleteModalOpen(true);
            }}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <AdminBreadcrumb 
        items={[{ label: 'Products', href: '/admin/products' }]} 
      />
      
      <AdminHeader 
        title="Products"
        actions={
          <div className="flex items-center space-x-4">
            <div className="w-64">
              <AdminSearch 
                placeholder="Search products..." 
                onSearch={setSearchTerm}
              />
            </div>
            <Link
              to="/admin/products/create"
              className="inline-flex items-center px-4 py-2 bg-brand-blue-500 
                text-white rounded-lg hover:bg-brand-blue-600 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Link>
          </div>
        }
      />

      <div className="bg-white rounded-lg shadow-sm">
        <AdminTable
          columns={columns}
          data={products}
          isLoading={isLoading}
          onRowClick={(product) => window.location.href = `/admin/products/${product.id}/edit`}
        />
      </div>

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        itemName={selectedProduct?.name}
      />
    </div>
  );
};

export default ProductsList;
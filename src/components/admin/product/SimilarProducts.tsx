// src/components/admin/product/SimilarProducts.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const SimilarProducts: React.FC<{
  products: Product[];
  currentProductId: string;
}> = ({ products, currentProductId }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Similar Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.filter(p => p.id !== currentProductId).map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-32 object-contain mb-4"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold">KES {product.price}</span>
              <Link
                to={`/admin/products/${product.id}/edit`}
                className="p-2 text-gray-600 hover:text-brand-blue-500"
              >
                <Edit className="h-5 w-5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronRight, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

// Import product images
import brakePadImage from '../../assets/images/products/brake pad.png';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  slug: string;
  brand: string;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Brake Pads',
    price: 8500,
    rating: 4.5,
    reviewCount: 128,
    image: brakePadImage,
    slug: 'premium-brake-pads',
    brand: 'BrakeMaster'
  },
  {
    id: '2',
    name: 'Oil Filter Set',
    price: 2999,
    rating: 4.8,
    reviewCount: 96,
    image: brakePadImage, // Replace with actual oil filter image when available
    slug: 'oil-filter-set',
    brand: 'FilterPro'
  },
  {
    id: '3',
    name: 'Spark Plug Kit',
    price: 4500,
    rating: 4.6,
    reviewCount: 84,
    image: brakePadImage, // Replace with actual spark plug image when available
    slug: 'spark-plug-kit',
    brand: 'SparkTech'
  },
  {
    id: '4',
    name: 'Air Filter',
    price: 3200,
    rating: 4.7,
    reviewCount: 112,
    image: brakePadImage, // Replace with actual air filter image when available
    slug: 'air-filter',
    brand: 'AirFlow'
  }
];

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Link 
            to="/products"
            className="text-brand-blue-500 hover:text-brand-blue-600 font-medium 
              flex items-center transition-colors"
          >
            View All Products
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/product/${product.slug}`}>
                <div className="h-48 bg-gray-100 rounded-t-lg relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 rounded-t-lg 
                      hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link 
                  to={`/product/${product.slug}`}
                  className="block group"
                >
                  <p className="text-sm text-brand-blue-500 mb-1">
                    {product.brand}
                  </p>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-brand-blue-500 
                    transition-colors mb-2">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {product.rating}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">
                    {product.reviewCount} reviews
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <button
                    className="inline-flex items-center px-3 py-2 bg-brand-green-500 
                      hover:bg-brand-green-600 text-white rounded-lg transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
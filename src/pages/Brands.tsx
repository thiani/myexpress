// src/pages/Brands.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  productCount: number;
  categories: string[];
}

// Mock brands data - replace with API call
const BRANDS: Brand[] = [
  {
    id: '1',
    name: 'BrakeMaster',
    logo: '/api/placeholder/200/200',
    description: 'Leading manufacturer of high-performance brake systems',
    productCount: 156,
    categories: ['Brakes', 'Suspension']
  },
  {
    id: '2',
    name: 'FilterPro',
    logo: '/api/placeholder/200/200',
    description: 'Premium filters for all vehicle makes and models',
    productCount: 89,
    categories: ['Engine', 'Air Filters', 'Oil Filters']
  },
  {
    id: '3',
    name: 'SparkTech',
    logo: '/api/placeholder/200/200',
    description: 'Innovative ignition and electrical components',
    productCount: 124,
    categories: ['Electrical', 'Engine']
  },
  {
    id: '4',
    name: 'AirFlow',
    logo: '/api/placeholder/200/200',
    description: 'Advanced air intake systems and filters',
    productCount: 78,
    categories: ['Engine', 'Air Filters']
  },
  {
    id: '5',
    name: 'RidePro',
    logo: '/api/placeholder/200/200',
    description: 'Premium suspension and steering components',
    productCount: 92,
    categories: ['Suspension', 'Steering']
  },
  {
    id: '6',
    name: 'LightMaster',
    logo: '/api/placeholder/200/200',
    description: 'Innovative lighting solutions for all vehicles',
    productCount: 143,
    categories: ['Lighting', 'Electrical']
  }
];

const BrandsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBrands = BRANDS.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <Helmet>
        <title>Featured Brands | Auto Parts Store</title>
        <meta 
          name="description" 
          content="Discover our wide selection of trusted auto parts brands. Quality parts from leading manufacturers."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Brands
          </h1>
          <p className="text-xl text-gray-600">
            Discover quality auto parts from trusted manufacturers
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search brands or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white border rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-brand-blue-500/20 
                focus:border-brand-blue-500"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brands/${brand.id}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-brand-blue-500 
                    transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {brand.productCount} products
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {brand.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {brand.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 
              bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No brands found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-brand-blue-500 hover:text-brand-blue-600 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BrandsPage;
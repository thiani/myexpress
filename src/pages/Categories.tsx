// src/pages/Categories.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import { categories, type Category } from '../data/categories';

const CategoriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter((category: Category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some((sub: string) => 
      sub.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Helmet>
        <title>All Categories | AutoParts</title>
        <meta 
          name="description" 
          content="Browse our complete catalog of auto parts categories. Find exactly what you need for your vehicle."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse All Categories
          </h1>
          <p className="text-xl text-gray-600">
            Explore our comprehensive selection of auto parts and accessories
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <Input
            type="search"
            placeholder="Search categories..."
            icon="search"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              setSearchQuery(e.target.value)
            }
            fullWidth
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category: Category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg 
                  transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gray-50 relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-medium text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {category.count.toLocaleString()} products
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="w-6 h-6 text-brand-blue-500" />
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <div className="space-y-2">
                    {category.subcategories.slice(0, 4).map((sub: string, index: number) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-blue-500 mr-2" />
                        {sub}
                      </div>
                    ))}
                    {category.subcategories.length > 4 && (
                      <p className="text-sm text-brand-blue-500">
                        +{category.subcategories.length - 4} more subcategories
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 
              bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No categories found
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

export default CategoriesPage;
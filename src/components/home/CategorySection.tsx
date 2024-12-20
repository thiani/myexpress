import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { categories } from '../../data/categories';

const CategorySection = () => {
  // Get only featured categories
  const featuredCategories = categories.filter(cat => cat.featured);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <Link 
            to="/categories"
            className="hidden md:flex items-center text-brand-blue-500 hover:text-brand-blue-600 
              font-medium transition-colors"
          >
            View All Categories
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative flex flex-col items-center p-6 bg-gray-50 rounded-xl
                  hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full
                  bg-brand-blue-50 text-brand-blue-500 mb-4 group-hover:scale-110 
                  group-hover:bg-brand-blue-500 group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-base font-medium text-gray-900 text-center mb-1">
                  {category.name}
                </h3>
                
                <span className="text-sm text-gray-500">
                  {category.count.toLocaleString()} items
                </span>

                {/* Hover Indicator */}
                <div className="absolute inset-0 border-2 border-transparent rounded-xl
                  group-hover:border-brand-blue-500 transition-colors" />
              </Link>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/categories"
            className="inline-flex items-center text-brand-blue-500 hover:text-brand-blue-600 
              font-medium transition-colors"
          >
            View All Categories
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
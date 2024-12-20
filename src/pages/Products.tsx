// src/pages/Products.tsx
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronDown, 
  Filter, 
  Star, 
  ShoppingCart,
  Check,
  X 
} from 'lucide-react';
import Input from '../components/common/Input';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/helpers';

interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  stock: number;
  description: string;
}

interface FilterState {
  category: string[];
  brand: string[];
  priceRange: [number, number];
  rating: number | null;
}

// Define CartProduct interface
interface CartProduct {
  id: string;
  name: string;
  price: number;
  brand: string;
  description: string;
  category: string;
  stock: number;
  images: { url: string }[]; // Assuming images is an array of objects with a url property
}

// Mock data - replace with API call
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Brake Pads',
    price: 8500,
    brand: 'BrakeMaster',
    rating: 4.5,
    reviewCount: 128,
    image: '/api/placeholder/400/320',
    category: 'Brakes',
    stock: 15,
    description: 'High-performance ceramic brake pads'
  },
  {
    id: '2',
    name: 'Oil Filter Set',
    price: 2999,
    brand: 'FilterPro',
    rating: 4.8,
    reviewCount: 96,
    image: '/api/placeholder/400/320',
    category: 'Engine',
    stock: 25,
    description: 'Premium oil filter set'
  },
  {
    id: '3',
    name: 'Spark Plug Kit',
    price: 4500,
    brand: 'SparkTech',
    rating: 4.6,
    reviewCount: 84,
    image: '/api/placeholder/400/320',
    category: 'Engine',
    stock: 30,
    description: 'High-performance spark plugs'
  },
  {
    id: '4',
    name: 'Suspension Kit',
    price: 25000,
    brand: 'RidePro',
    rating: 4.9,
    reviewCount: 75,
    image: '/api/placeholder/400/320',
    category: 'Suspension',
    stock: 10,
    description: 'Complete suspension kit'
  },
  {
    id: '5',
    name: 'LED Headlight Set',
    price: 12000,
    brand: 'LightMaster',
    rating: 4.7,
    reviewCount: 156,
    image: '/api/placeholder/400/320',
    category: 'Lighting',
    stock: 20,
    description: 'Bright LED headlights'
  }
];

const CATEGORIES = ['Brakes', 'Engine', 'Suspension', 'Electrical', 'Lighting'];
const BRANDS = ['BrakeMaster', 'FilterPro', 'SparkTech', 'RidePro', 'LightMaster'];

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    brand: [],
    priceRange: [0, 50000],
    rating: null
  });

  const [sortBy, setSortBy] = useState<string>('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(MOCK_PRODUCTS);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      description: product.description,
      category: product.category,
      stock: product.stock,
      images: [{ url: product.image }] // Convert single image to ProductImage array
    };
  
    addToCart(cartProduct);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };
  // Filter products
  const filteredProducts = products.filter(product => {
    if (filters.category.length && !filters.category.includes(product.category)) return false;
    if (filters.brand.length && !filters.brand.includes(product.brand)) return false;
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    if (filters.rating && product.rating < filters.rating) return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shop Auto Parts | AutoParts</title>
        <meta 
          name="description" 
          content="Browse our extensive collection of auto parts. Find the right parts for your vehicle."
        />
      </Helmet>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg 
          shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <Check className="h-5 w-5" />
          Item added to cart
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Auto Parts</h1>
          <p className="text-gray-600">Find the perfect parts for your vehicle</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={() => setFilters({
                    category: [],
                    brand: [],
                    priceRange: [0, 50000],
                    rating: null
                  })}
                  className="text-sm text-brand-blue-500 hover:text-brand-blue-600"
                >
                  Reset All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-brand-blue-500 rounded"
                        checked={filters.category.includes(category)}
                        onChange={(e) => {
                          setFilters(prev => ({
                            ...prev,
                            category: e.target.checked
                              ? [...prev.category, category]
                              : prev.category.filter(c => c !== category)
                          }));
                        }}
                      />
                      <span className="ml-2 text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                  {BRANDS.map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox text-brand-blue-500 rounded"
                        checked={filters.brand.includes(brand)}
                        onChange={(e) => {
                          setFilters(prev => ({
                            ...prev,
                            brand: e.target.checked
                              ? [...prev.brand, brand]
                              : prev.brand.filter(b => b !== brand)
                          }));
                        }}
                      />
                      <span className="ml-2 text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={filters.priceRange[0]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [+e.target.value, prev.priceRange[1]]
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], +e.target.value]
                    }))}
                  />
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-medium mb-3">Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-brand-blue-500"
                        checked={filters.rating === rating}
                        onChange={() => setFilters(prev => ({ ...prev, rating }))}
                      />
                      <span className="ml-2 flex items-center text-gray-700">
                        {rating}+ <Star className="h-4 w-4 ml-1 fill-yellow-400" />
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg 
                  border shadow-sm text-gray-700"
              >
                <Filter className="h-5 w-5" />
                Filters
              </button>

              <select
                className="px-4 py-2 bg-white rounded-lg border shadow-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filters Modal */}
            {showFilters && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
                <div className="absolute inset-y-0 right-0 w-full max-w-xs bg-white">
                  <div className="p-6 h-full overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-semibold text-gray-900">Filters</h2>
                      <button onClick={() => setShowFilters(false)}>
                        <X className="h-6 w-6 text-gray-400" />
                      </button>
                    </div>
                    {/* Add mobile filter controls here - same as desktop */}
                  </div>
                </div>
              </div>
            )}

            {/* Sort Bar - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {sortedProducts.length} results
              </p>
              <select
                className="px-4 py-2 bg-white rounded-lg border shadow-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popularity">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 
                  bg-gray-100 rounded-full mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => setFilters({
                    category: [],
                    brand: [],
                    priceRange: [0, 50000],
                    rating: null
                  })}
                  className="text-brand-blue-500 hover:text-brand-blue-600 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-50 rounded-t-lg relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 hover:scale-105 
                          transition-transform duration-300"
                      />
                      {product.stock < 5 && product.stock > 0 && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white 
                          px-2 py-1 rounded text-sm">
                          Low Stock
                        </div>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white 
                          px-2 py-1 rounded text-sm">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-brand-blue-500 mb-1">{product.brand}</p>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
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
                          onClick={() => handleAddToCart(product)}
                          disabled={product.stock === 0}
                          className={`inline-flex items-center px-3 py-2 rounded-lg
                            transition-colors ${
                              product.stock === 0
                                ? 'bg-gray-200 cursor-not-allowed text-gray-500'
                                : 'bg-brand-green-500 hover:bg-brand-green-600 text-white'
                            }`}
                          aria-label={product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                      {product.stock > 0 && product.stock < 5 && (
                        <p className="text-sm text-yellow-600 mt-2">
                          Only {product.stock} left in stock
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination - Optional */}
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 bg-white border rounded-lg text-gray-500
                  hover:text-brand-blue-500 transition-colors">
                  Previous
                </button>
                <button className="px-3 py-2 bg-brand-blue-500 text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 bg-white border rounded-lg text-gray-500
                  hover:text-brand-blue-500 transition-colors">
                  2
                </button>
                <button className="px-3 py-2 bg-white border rounded-lg text-gray-500
                  hover:text-brand-blue-500 transition-colors">
                  3
                </button>
                <button className="px-3 py-2 bg-white border rounded-lg text-gray-500
                  hover:text-brand-blue-500 transition-colors">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

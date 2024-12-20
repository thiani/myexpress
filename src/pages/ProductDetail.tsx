import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Star, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  ArrowLeft, 
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CartProduct } from '../types/product'; 

// Types
interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductFeature {
  icon: string;
  text: string;
}

interface ProductDetails {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  stockCount: number;
  rating: number;
  reviewCount: number;
  specs: ProductSpec[];
  features: ProductFeature[];
  images: ProductImage[];
  relatedProducts: RelatedProduct[];
}

interface RelatedProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  image: string;
}

// Mock data
const mockProductData: ProductDetails = {
  id: "1",
  name: "Premium Ceramic Brake Pads",
  slug: "premium-ceramic-brake-pads",
  brand: "BrakeMaster",
  category: "Brake System",
  price: 8500,
  description: "Professional-grade ceramic brake pads engineered for superior stopping power and minimal brake dust. Designed for high-performance vehicles and daily drivers alike.",
  stockCount: 15,
  rating: 4.5,
  reviewCount: 128,
  specs: [
    { label: "Material", value: "Ceramic Composite" },
    { label: "Position", value: "Front" },
    { label: "Fitment", value: "Direct OE Replacement" },
    { label: "Warranty", value: "2 Years" },
    { label: "Breaking-in Required", value: "Yes" },
    { label: "Width", value: "130mm" },
    { label: "Height", value: "60mm" },
    { label: "Thickness", value: "15mm" }
  ],
  features: [
    { icon: "🔧", text: "Advanced ceramic compound for superior braking" },
    { icon: "🌡️", text: "High temperature resistance" },
    { icon: "🔇", text: "Low noise operation" },
    { icon: "✨", text: "Minimal brake dust production" },
    { icon: "⚡", text: "Quick break-in period" },
    { icon: "♻️", text: "Environmentally friendly materials" }
  ],
  images: [
    {
      id: "1",
      url: "/api/placeholder/600/600",
      alt: "Front view of brake pad"
    },
    {
      id: "2",
      url: "/api/placeholder/600/600",
      alt: "Side view showing thickness"
    },
    {
      id: "3",
      url: "/api/placeholder/600/600",
      alt: "Backing plate detail"
    },
    {
      id: "4",
      url: "/api/placeholder/600/600",
      alt: "Installation guide reference"
    }
  ],
  relatedProducts: [
    {
      id: "2",
      name: "Performance Brake Rotors",
      slug: "performance-brake-rotors",
      brand: "BrakeMaster",
      price: 12500,
      image: "/api/placeholder/400/400"
    },
    {
      id: "3",
      name: "Brake Caliper Kit",
      slug: "brake-caliper-kit",
      brand: "BrakeMaster",
      price: 15000,
      image: "/api/placeholder/400/400"
    },
    {
      id: "4",
      name: "Brake Line Set",
      slug: "brake-line-set",
      brand: "BrakeMaster",
      price: 5500,
      image: "/api/placeholder/400/400"
    }
  ]
};

// Utility function for formatting prices
const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount);
};

// Components
const ImageGallery: React.FC<{
  images: ProductImage[];
  productName: string;
}> = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handlePrevious = () => {
    setActiveImage((current) => (current - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveImage((current) => (current + 1) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
        <img
          src={images[activeImage].url}
          alt={images[activeImage].alt}
          className="w-full h-full object-contain p-4"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                bg-white/80 hover:bg-white shadow-lg transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full
                bg-white/80 hover:bg-white shadow-lg transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2
                transition-all hover:opacity-100 ${
                  index === activeImage
                    ? 'border-brand-blue-500 opacity-100'
                    : 'border-gray-200 opacity-70'
                }`}
            >
              <img
                src={image.url}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductFeatures: React.FC<{
  features: ProductFeature[];
}> = ({ features }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Key Features</h3>
    <ul className="grid gap-3">
      {features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="text-xl">{feature.icon}</span>
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ProductSpecs: React.FC<{
  specs: ProductSpec[];
}> = ({ specs }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Specifications</h3>
    <div className="grid gap-2">
      {specs.map((spec, index) => (
        <div
          key={index}
          className="flex justify-between py-2 border-b border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-500">{spec.label}</span>
          <span className="font-medium">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const RelatedProducts: React.FC<{
  products: RelatedProduct[];
}> = ({ products }) => (
  <div className="space-y-4">
    <h3 className="font-semibold text-lg">Related Products</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.slug}`}
          className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div className="aspect-square p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-brand-blue-500">{product.brand}</p>
            <h4 className="font-medium text-gray-900 group-hover:text-brand-blue-500 transition-colors">
              {product.name}
            </h4>
            <p className="mt-2 font-bold">{formatPrice(product.price)}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// Main Component
export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProduct(mockProductData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand,
      description: product.description,
      category: product.category,
      stock: product.stockCount,
      images: product.images
    };
    
    addToCart(cartProduct, quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
              <div className="h-24 bg-gray-200 rounded" />
              <div className="h-12 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
          <p className="mt-2 text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 inline-flex items-center text-brand-blue-500 hover:text-brand-blue-600"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Auto Parts Store`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg 
          shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <Check className="h-5 w-5" />
          Item added to cart
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-brand-blue-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>
        </div>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <p className="text-brand-blue-500 text-lg">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-600">{product.reviewCount} reviews</span>
              </div>
            </div>

            {/* Price and Description */}
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                {formatPrice(product.price)}
              </div>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Purchase Section */}
            <div className="p-6 bg-gray-50 rounded-lg space-y-6">
              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.stockCount > 0 ? (
                  <>
                    <div className="h-3 w-3 bg-green-500 rounded-full" />
                    <span className="text-green-700 font-medium">
                      In Stock
                    </span>
                    <span className="text-gray-600">
                      ({product.stockCount} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="h-3 w-3 bg-red-500 rounded-full" />
                    <span className="text-red-700 font-medium">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center border-x py-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                    className="p-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-600">
                  Total: {formatPrice(product.price * quantity)}
                </span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stockCount === 0}
                className="w-full bg-brand-green-500 hover:bg-brand-green-600 
                  disabled:bg-gray-300 disabled:cursor-not-allowed
                  text-white font-medium py-3 rounded-lg
                  transition-all transform hover:scale-[1.02]
                  flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              {/* Delivery & Warranty */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck className="h-5 w-5 text-brand-blue-500" />
                  <span>Free delivery in Nairobi</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="h-5 w-5 text-brand-blue-500" />
                  <span>2 Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Features and Specs */}
            <div className="grid md:grid-cols-2 gap-6">
              <ProductFeatures features={product.features} />
              <ProductSpecs specs={product.specs} />
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="border-t pt-8">
          <RelatedProducts products={product.relatedProducts} />
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-12">
          <div className="border-b">
            <nav className="flex gap-8">
              <button className="px-4 py-2 font-medium text-brand-blue-500 border-b-2 border-brand-blue-500">
                Description
              </button>
              <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">
                Reviews ({product.reviewCount})
              </button>
              <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">
                Shipping
              </button>
            </nav>
          </div>
          <div className="py-6">
            <div className="prose max-w-none">
              <h3>Product Description</h3>
              <p>{product.description}</p>
              
              <h4>Installation Notes</h4>
              <ul>
                <li>Professional installation recommended</li>
                <li>Requires basic hand tools</li>
                <li>Break-in period: 500-1000 km</li>
                <li>Regular maintenance required for optimal performance</li>
              </ul>

              <h4>Compatibility</h4>
              <p>
                Please check your vehicle's specifications or consult with our support team
                to ensure compatibility before purchase.
              </p>

              <h4>Package Contents</h4>
              <ul>
                <li>4x Premium Ceramic Brake Pads</li>
                <li>Installation Hardware Kit</li>
                <li>Installation Manual</li>
                <li>Warranty Card</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t">
          <div className="text-center">
            <Truck className="h-8 w-8 mx-auto text-brand-blue-500 mb-2" />
            <h4 className="font-medium">Free Shipping</h4>
            <p className="text-sm text-gray-600">On orders above KES 5,000</p>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto text-brand-blue-500 mb-2" />
            <h4 className="font-medium">2 Year Warranty</h4>
            <p className="text-sm text-gray-600">100% genuine products</p>
          </div>
          <div className="text-center">
            <Check className="h-8 w-8 mx-auto text-brand-blue-500 mb-2" />
            <h4 className="font-medium">Secure Payment</h4>
            <p className="text-sm text-gray-600">100% secure checkout</p>
          </div>
          <div className="text-center">
            <Star className="h-8 w-8 mx-auto text-brand-blue-500 mb-2" />
            <h4 className="font-medium">24/7 Support</h4>
            <p className="text-sm text-gray-600">Dedicated customer service</p>
          </div>
        </div>
      </div>
    </>
  );
}

// src/types/product.ts

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: ProductImage[];
  stock: number;
  rating?: number;
  brand: string;
  sku?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  sku: string;
  stock: number;
  images: File[];
}

// Helper functions
export const getProductMainImage = (product: Product): string => {
  return product.images?.[0]?.url || '/api/placeholder/400/400';
};

// Helper type for mapping API product to cart
export interface CartProduct extends Pick<Product, 'id' | 'name' | 'price' | 'brand' | 'description' | 'category' | 'stock'> {
  images: ProductImage[];
}
import { Product } from './product';

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  deliveryFee: number;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => CartTotals;
}
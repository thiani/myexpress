// src/hooks/useCart.ts
import { useContext } from 'react';
import CartContext from '../context/CartContext';
import type { CartContextType } from '../types/cart';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export {};
// src/context/CartContext.tsx
import React, { createContext, useState, useCallback } from 'react';
import type { CartItem, Cart, CartContextType, CartTotals } from '../types/cart';
import type { Product } from '../types/product';

const DELIVERY_FEE_THRESHOLD = 5000; // Free delivery above 5000 KES
const DELIVERY_FEE = 200;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    deliveryFee: 0
  });

  const calculateTotals = useCallback((): CartTotals => {
    const subtotal = cart.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
    const deliveryFee = subtotal >= DELIVERY_FEE_THRESHOLD ? 0 : DELIVERY_FEE;
    const total = subtotal + deliveryFee;

    return { subtotal, total, deliveryFee };
  }, [cart.items]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.productId === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevCart.items, { productId: product.id, quantity, product }];
      }

      const { total, deliveryFee } = calculateTotals();
      
      return {
        items: newItems,
        total,
        deliveryFee
      };
    });
  }, [calculateTotals]);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.productId !== productId);
      const { total, deliveryFee } = calculateTotals();
      
      return {
        items: newItems,
        total,
        deliveryFee
      };
    });
  }, [calculateTotals]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0);

      const { total, deliveryFee } = calculateTotals();

      return {
        items: newItems,
        total,
        deliveryFee
      };
    });
  }, [calculateTotals]);

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0, deliveryFee: 0 });
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      calculateTotals
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
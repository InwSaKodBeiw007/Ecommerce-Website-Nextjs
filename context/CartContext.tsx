"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products } from '@/data/products'; // Assuming products data is available

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: number, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Initialize with empty array

  useEffect(() => {
    // Load cart from localStorage only on the client side after initial render
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: number, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
          return [...prevCart, { productId, quantity }];
        }
      }
      return prevCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      const product = products.find(p => p.id === cartItem.productId);
      return total + (product ? product.price * cartItem.quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, cartItem) => count + cartItem.quantity, 0);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

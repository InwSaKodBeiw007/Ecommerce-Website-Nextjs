"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// The product data is now passed directly to the cart, so we define the shape here.
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Data validation: Check if the cart is an array and items have the new structure
        if (Array.isArray(parsedCart) && (parsedCart.length === 0 || (parsedCart[0] && parsedCart[0].price !== undefined))) {
          setCart(parsedCart);
        } else {
          // Old format detected or data is corrupt, clear it for a fresh start.
          localStorage.removeItem('cart');
        }
      }
    } catch (error) {
      // If parsing fails for any reason, clear the corrupt data.
      console.error("Failed to parse cart from localStorage, clearing it.", error);
      localStorage.removeItem('cart');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Add the full product details to the cart item
        return [...prevCart, { 
          productId: product.id, 
          quantity,
          name: product.name,
          price: product.price,
          image: product.image,
        }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    // Prevent quantity from being less than 1
    if (newQuantity < 1) {
      return removeFromCart(productId);
    }
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
    // Calculate total directly from cart item prices
    return cart.reduce((total, cartItem) => {
      return total + (cartItem.price * cartItem.quantity);
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

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  price?: number;
  isAvailable: boolean;
  [key: string]: any;
}

export type CartItem = Book & { quantity: number };

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  updateQty: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (book: Book) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === book.id);
      if (existing) return prevItems;
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const updateQty = (id: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// If needed:
// export default CartProvider;  // Optional, only if you want default export

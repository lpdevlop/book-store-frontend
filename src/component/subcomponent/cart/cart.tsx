import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  publicationDate?: string;
  price?: number;
  language?: string;
  genre?: string;
  stockQuantity?: number;
  description?: string;
  averageRating?: number;
  pageCount?: number;
  format?: string;
  imageUrl?: string;
  isAvailable: boolean;
}


export type CartItem = {
  id: number;
  title: string;
  author: string;
  price: number;          // now required
  imageUrl?: string;
  isAvailable: boolean;
  quantity: number;
};

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
    console.log("useCart() context:", context);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;       
}
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (book: Book) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === book.id);
      if (existing) return prevItems;
      return [...prevItems,  {
          id: book.id,
          title: book.title,
          author: book.author,
          imageUrl: book.imageUrl,
          isAvailable: book.isAvailable,
          price: book.price != null ? book.price : 12,
          quantity: 1,
        }];
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

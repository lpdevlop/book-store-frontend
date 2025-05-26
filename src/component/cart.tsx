import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
  isAvailable: boolean;
  [key: string]: any;
}

interface CartContextType {
  cartItems: Book[];
  addToCart: (book: Book) => void;
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
  const [cartItems, setCartItems] = useState<Book[]>([]);

  const addToCart = (book: Book) => {
    setCartItems((prevItems) => {
      if (prevItems.find((item) => item.id === book.id)) return prevItems;
      return [...prevItems, book];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// If needed:
// export default CartProvider;  // Optional, only if you want default export

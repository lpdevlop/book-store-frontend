import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number | null;
  originalPrice?: number;
  imageUrl: string;
  isAvailable: boolean;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = '' }: CardContentProps) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

const Recomondation = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/book/recommendations')
      .then((res) => {
        const data = res.data['Reccomondations books fetched successfully'];
        const booksWithPrices = data.map((book: any) => ({
          ...book,
          price: book.price ?? 24.99,
          originalPrice: book.price ? book.price + 5 : 29.99, // fallback pricing
        }));
        setBooks(booksWithPrices);
      })
      .catch((err) => {
        console.error('Error fetching recommendation books:', err);
      });
  }, []);

  return (
    <section className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recommendations</h2>
        <select className="border p-1 rounded">
          <option>Choose a genre</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {books.map((book, idx) => (
          <Card key={idx} className="p-2">
            <img src="https://m.media-amazon.com/images/I/61ZKNw0xixL._AC_UF1000,1000_QL80_.jpg" alt={book.title} className="w-full h-48 object-cover rounded" />
            <CardContent>
              <h3 className="font-semibold text-sm mt-2">{book.title}</h3>
              <p className="text-xs text-gray-500">{book.author}</p>
              <div className="text-sm mt-1">
                ${book.price?.toFixed(2)}{' '}
                <span className="line-through text-gray-400 text-xs">
                  ${book.originalPrice?.toFixed(2)}
                </span>
              </div>
              <Button className="mt-2" disabled={!book.isAvailable}>
                {book.isAvailable ? 'Add to basket' : 'Out of stock'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Recomondation;

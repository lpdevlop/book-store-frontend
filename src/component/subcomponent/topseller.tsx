import React, { useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import apiService from '../apiservices/apiService';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number | null;
  originalPrice?: number;
  imageUrl: string;
  isAvailable: boolean;
}

const Topseller = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    apiService
      .getTopBooks()
      .then((data) => {
        // Assuming data has a structure like { someKey: Book[] }
        const booksList: Book[] = Object.values(data)[0];
        const booksWithPrices = booksList.map((book) => ({
          ...book,
          price: book.price ?? 29.99,
          originalPrice: book.price ? book.price + 5 : 34.99,
        }));
        setBooks(booksWithPrices);
      })
      .catch((error) => {
        console.error('Error fetching top sellers:', error);
      });
  }, []);

  return (
    <section className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Top Sellers</h2>
        <select className="border p-1 rounded">
          <option>Choose a genre</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {books.map((book) => (
          <Card key={book.id} className="p-2">
            <img
              src={book.imageUrl || 'https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg'}
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <div className="p-4">
              <h3 className="font-semibold text-sm mt-2">{book.title}</h3>
              <p className="text-xs text-gray-500">{book.author}</p>
              <div className="text-sm mt-1">
                ${book.price?.toFixed(2)}{' '}
                <span className="line-through text-gray-400 text-xs">
                  ${book.originalPrice?.toFixed(2)}
                </span>
              </div>
              <Button
                className="mt-2"
                variant="contained"
                color={book.isAvailable ? 'primary' : 'secondary'}
                disabled={!book.isAvailable}
              >
                {book.isAvailable ? 'Add to basket' : 'Out of stock'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Topseller;

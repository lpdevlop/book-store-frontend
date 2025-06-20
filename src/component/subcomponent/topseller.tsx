import React, { useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import apiService from '../apiservices/apiService';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  isAvailable: boolean;
}

const Topseller = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    apiService
      .getTopBooks()
      .then(res => res.data)
      .then(data => {
        // pull out the array—your API wraps it under one key
        const bookArray = Object.values(data)[0] as any[]; 
        const formattedBooks = bookArray.map(book => ({
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price ?? 19.99,
          originalPrice: book.price != null ? book.price + 5 : 24.99,
          imageUrl: "https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1690383373/catalog/1684212490015363072/diszt1zxtjqnixyjx27f.jpg",
          isAvailable: book.isAvailable,
        }));
        setBooks(formattedBooks);
      })
      .catch(error => {
        console.error('Error fetching top sellers:', error);
      });
  }, []);

  return (
    <section className="p-6">
{       <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Top Sellers</h2>
{/*         <select className="border p-1 rounded">
          <option>Choose a genre</option>
        </select> */}
      </div> }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {books.map(book => (
          <Card key={book.id} className="p-2">
            <img
              src={
                book.imageUrl ||
                'https://blog-cdn.reedsy.com/directories/gallery/248/large_65b0ae90317f7596d6f95bfdd6131398.jpg'
              }
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <div className="p-4">
              <h3 className="font-semibold text-sm mt-2">
                {book.title}
              </h3>
              <p className="text-xs text-gray-500">
                {book.author}
              </p>
              <div className="text-sm mt-1">
                ${book.price.toFixed(2)}{' '}
                <span className="line-through text-gray-400 text-xs">
                  ${book.originalPrice.toFixed(2)}
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

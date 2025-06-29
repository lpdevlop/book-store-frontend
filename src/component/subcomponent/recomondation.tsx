import React, { ReactNode, useEffect, useState } from 'react';
import { Button, Card } from '@mui/material';
import apiService from '../apiservices/apiService';
  const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  isAvailable: boolean;
}

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

const ContentWrapper = ({ children, className = '' }: ContentWrapperProps) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Recommendation = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    apiService.recomondedBooks()
      .then(({ data }) => {
        // take the first value in the response object,
        // which should be your array of books:
        const [rawArray] = Object.values(data) as any[][];
        const normalized: Book[] = (rawArray || []).map((book: any) => ({
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price ?? 24.99,
          originalPrice: book.price != null ? book.price + 5 : 29.99,
          imageUrl: book.imageUrl,
          isAvailable: book.isAvailable,
        }));
        setBooks(normalized);
      })
      .catch(err => {
        console.error('Error fetching recommendation books:', err);
      });
  }, []);

  return (
    <section className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recommendations</h2>
{/*         <select className="border p-1 rounded">
          <option>Choose a genre</option>
        </select>
 */}      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {books.map(book => (
          <Card key={book.id} className="p-2">
            <img
              src={`${IMAGE_BASE_URL}${book.imageUrl}`}
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <ContentWrapper>
              <h3 className="font-semibold text-sm mt-2">{book.title}</h3>
              <p className="text-xs text-gray-500">{book.author}</p>
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
            </ContentWrapper>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Recommendation;

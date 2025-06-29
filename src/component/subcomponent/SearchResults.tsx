import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useCart } from './cart/cart';
import apiService from '../apiservices/apiService';
import { PaginatedResponse, Books } from '../apiservices/apiTypes';
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const SearchResults: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';

  const { addToCart } = useCart();

  const [results, setResults]         = useState<Books[]>([]);
  const [page, setPage]               = useState<number>(0);
  const [totalPages, setTotalPages]   = useState<number>(1);
  const [loading, setLoading]         = useState<boolean>(false);
  const size = 12; // items per page

  // Reset to first page when the query changes
  useEffect(() => {
    setPage(0);
  }, [query]);

  // Fetch whenever `query` or `page` changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setResults([]);
        setTotalPages(1);
        return;
      }
      setLoading(true);

      try {
        const response = await apiService.searchBooks({
          title:query,
          page,
          size
        });
        const pageData =response.data;
        setResults(pageData.book_searched_successfully.content);
        setTotalPages(pageData.book_searched_successfully.totalPages);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  const handleAddToCart = (book: Books) => {
    console.log("sssssssssss",book);
    addToCart(book);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <h5 className="text-xl font-bold mb-4">
        Search Results for: “{query}”
      </h5>

      {loading ? (
        <p>Loading…</p>
      ) : results.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((book) => (
              <div
                key={book.id}
                className="border rounded p-2 shadow flex flex-col h-[320px]"
              >
                <img
                  src={`${IMAGE_BASE_URL}${book.imageUrl}`}
                  alt={book.title}
                  className="w-full h-28 object-contain rounded"
                />
                <h2 className="text-sm font-semibold mt-2 line-clamp-1">
                  {book.title}
                </h2>
                  <h2 className="text-sm font-semibold mt-2 line-clamp-1">
                  {book.price}
                </h2>
                <p className="text-xs text-gray-600 line-clamp-1">
                  {book.author}
                </p>
                <p className="text-xs line-clamp-1">
                  {book.genre} | {book.format}
                </p>
                <p className="text-xs mb-2">
                  {book.isAvailable ? 'Available' : 'Out of Stock'}
                </p>
                <div className="mt-auto">
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    disabled={!book.isAvailable || loading}
                    onClick={() => handleAddToCart(book)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6 gap-2">
            <Button
              variant="outlined"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0 || loading}
            >
              Previous
            </Button>
            <span className="px-3 py-1">
              Page {page + 1} of {totalPages}
            </span>
            <Button
              variant="outlined"
              onClick={() => handlePageChange(page + 1)}
              disabled={page + 1 >= totalPages || loading}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;

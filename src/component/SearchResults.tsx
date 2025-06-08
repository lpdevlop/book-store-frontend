import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useCart } from './subcomponent/cart';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  const { addToCart } = useCart();

  const [results, setResults] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const size = 12; // Items per page
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async () => {
    if (!query) return;
    setLoading(true);

    const payload = {
      title: query,
      author: null,
      isbn: null,
      description: null,
      page,
      size
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/book/search', payload);
      const data = response.data;

      setResults(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [query, page]);

  const handleAddToCart = (book: any) => {
    addToCart(book);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6">
      <h5 className="text-xl font-bold mb-4">Search Results for: "{query}"</h5>

      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((book) => (
              <div key={book.id} className="border rounded p-2 shadow flex flex-col h-[320px]">
                <img src={book.imageUrl} alt={book.title} className="w-full h-28 object-cover rounded" />
                <h2 className="text-sm font-semibold mt-2 line-clamp-1">{book.title}</h2>
                <p className="text-xs text-gray-600 line-clamp-1">{book.author}</p>
                <p className="text-xs line-clamp-1">{book.genre} | {book.format}</p>
                <p className="text-xs mb-2">{book.isAvailable ? 'Available' : 'Out of Stock'}</p>
                <div className="mt-auto">
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="small"
                    disabled={!book.isAvailable}
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
              disabled={page === 0}
            >
              Previous
            </Button>
            <span className="px-3 py-1">{`Page ${page + 1} of ${totalPages}`}</span>
            <Button
              variant="outlined"
              onClick={() => handlePageChange(page + 1)}
              disabled={page + 1 >= totalPages}
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

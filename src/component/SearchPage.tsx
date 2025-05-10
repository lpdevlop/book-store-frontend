import React, { useState } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/books?search=${searchTerm}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-yellow-800 mb-6">Search Books</h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Search by title or author..."
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-gray-600">Loading...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((book) => (
            <div key={book.id} className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
              {book.imageUrl && (
                <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover rounded-lg mb-2" />
              )}
              <h2 className="text-xl font-semibold text-yellow-800">{book.title}</h2>
              <p className="text-sm text-gray-700">By {book.author}</p>
              <p className="text-sm text-gray-500 mt-2">{book.description.slice(0, 100)}...</p>
              <p className="mt-2 font-bold text-yellow-700">${book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

import React, { useState } from 'react';
import apiService from '../apiservices/apiService';

interface BookForm {
  id?: number;
  isbn: string;
  title: string;
  author: string;
  price: string;
  imageUrl: string;
  isAvailable: boolean;
}

type BookManagementProps = {
  onClose?: () => void;
};

const emptyBook: BookForm = {
  id: undefined,
  isbn: '',
  title: '',
  author: '',
  price: '',
  imageUrl: '',
  isAvailable: true,
};

const BookManagement: React.FC<BookManagementProps> = ({ onClose }) => {
  const [searchIsbn, setSearchIsbn] = useState('');
  const [form, setForm] = useState<BookForm>(emptyBook);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchIsbn.trim()) return;
    setLoading(true);
    setMessage('');
    try {
      const res = await apiService.searchBookByIsbn(searchIsbn.trim());
      const bookss = res.data.book_searched_successfully;
const book = res.data.book_searched_successfully as {
  id?: number;
  isbn: string;
  title: string;
  author: string;
  price: number ;
  imageUrl: string;
  isAvailable: boolean;
};

      setForm({ ...emptyBook, ...book, price: book.price?.toString() });
    } catch (err) {
      setForm({ ...emptyBook, isbn: searchIsbn.trim() });
      setMessage('Book not found. Fill form to add new book.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof BookForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
      };
      if (form.id) {
        await apiService.updateBook(payload);
        setMessage('Book updated successfully');
      } else {
        await apiService.addBook(payload);
        setMessage('Book added successfully');
      }
      onClose?.();
    } catch (err) {
      setMessage('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!form.id) return;
    setLoading(true);
    try {
      await apiService.deactivateBook(form.id);
      setMessage('Book deactivated');
      onClose?.();
    } catch (err) {
      setMessage('Failed to deactivate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 w-full max-w-md bg-white rounded shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Book Management</h2>
      <div className="flex gap-2 mb-4">
        <label htmlFor="searchIsbn" className="sr-only">Search ISBN</label>
        <input
          id="searchIsbn"
          className="flex-grow border p-2 rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          type="text"
          placeholder="Search ISBN"
          value={searchIsbn}
          onChange={e => setSearchIsbn(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
          onClick={handleSearch}
          disabled={loading}
        >
          Search
        </button>
      </div>
      <div className="grid gap-4">
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">ISBN</label>
          <input
            id="isbn"
            className="mt-1 block w-full border p-2 rounded bg-gray-50 text-gray-900"
            type="text"
            placeholder="ISBN"
            value={form.isbn}
            onChange={e => handleChange('isbn', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            className="mt-1 block w-full border p-2 rounded bg-gray-50 text-gray-900"
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
          <input
            id="author"
            className="mt-1 block w-full border p-2 rounded bg-gray-50 text-gray-900"
            type="text"
            placeholder="Author"
            value={form.author}
            onChange={e => handleChange('author', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            id="price"
            className="mt-1 block w-full border p-2 rounded bg-gray-50 text-gray-900"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e => handleChange('price', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            id="imageUrl"
            className="mt-1 block w-full border p-2 rounded bg-gray-50 text-gray-900"
            type="text"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={e => handleChange('imageUrl', e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        {form.id && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={handleDeactivate}
            disabled={loading}
          >
            Deactivate
          </button>
        )}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleSave}
          disabled={loading}
        >
          {form.id ? 'Update Book' : 'Add Book'}
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default BookManagement;

import React, { useState } from 'react';
import apiService from '../apiservices/apiService';
import { IoIosCloseCircleOutline } from 'react-icons/io';

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

// ✅ Sanitization helper
const sanitizeInput = (value: string) => {
  return value.replace(/[<>"';`]/g, '');
};

const BookManagement: React.FC<BookManagementProps> = ({ onClose }) => {
  const [searchIsbn, setSearchIsbn] = useState('');
  const [form, setForm] = useState<BookForm>(emptyBook);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const cleanIsbn = sanitizeInput(searchIsbn.trim());
    if (!cleanIsbn) return;

    setLoading(true);
    setMessage('');
    try {
      const res = await apiService.searchBookByIsbn(cleanIsbn);
      const book = res.data.book_searched_successfully as {
        id?: number;
        isbn: string;
        title: string;
        author: string;
        price: number;
        imageUrl: string;
        isAvailable: boolean;
      };
      setForm({ ...emptyBook, ...book, price: book.price?.toString() });
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || 'Book not found. Fill form to add new book.';
      setForm({ ...emptyBook, isbn: cleanIsbn });
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof BookForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: sanitizeInput(value) }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
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
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || 'Operation failed';
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!form.id) return;
    setLoading(true);
    setMessage('');
    try {
      await apiService.deactivateBook(form.id);
      setMessage('Book deactivated');
      onClose?.();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || 'Failed to deactivate';
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-auto">
      {onClose && (
        <IoIosCloseCircleOutline
          onClick={onClose}
          className="absolute -top-3 -right-3 text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
        />
      )}

      <h2 className="text-xl font-bold text-gray-900 mb-4">Book Management</h2>

      <div className="flex gap-2 mb-4">
        <label htmlFor="searchIsbn" className="sr-only">Search ISBN</label>
        <input
          id="searchIsbn"
          className="flex-grow border p-2 rounded bg-gray-50 text-gray-900 placeholder-gray-500"
          type="text"
          placeholder="Search ISBN"
          value={searchIsbn}
          onChange={e => setSearchIsbn(sanitizeInput(e.target.value))}
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
        {(['isbn', 'title', 'author', 'price', 'imageUrl'] as (keyof BookForm)[]).map(field => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
              {field === 'imageUrl' ? 'Image URL' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              type={field === 'price' ? 'number' : 'text'}
              placeholder={field === 'imageUrl' ? 'Image URL' : field}
              className="mt-1 block w-full border p-2 rounded bg-gray-50 text-gray-900"
              value={(form as any)[field]}
              onChange={e => handleChange(field, e.target.value)}
            />
          </div>
        ))}
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

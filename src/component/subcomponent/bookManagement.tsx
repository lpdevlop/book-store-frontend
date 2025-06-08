import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import apiService from '../apiservices/apiService';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publisher?: string;
  publicationDate?: string;
  price?: number;
  language?: string;
  genre?: string;
  stockQuantity?: number;
  description?: string;
  averageRating?: number;
  pageCount?: number;
  format?: string;
  imageUrl?: string;
  isAvailable: boolean;
}

const initialBook: Book = {
  id: 0,
  title: "",
  author: "",
  isbn: "",
  isAvailable: true,
};

export default function BookManagement() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchIsbn, setSearchIsbn] = useState("");
  const [form, setForm] = useState<Book>(initialBook);
  const [foundBook, setFoundBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = () => {
    const book = books.find((b) => b.isbn === searchIsbn.trim());
    if (book) {
      setFoundBook(book);
      setForm(book);
    } else {
      setFoundBook(null);
      setForm({ ...initialBook, isbn: searchIsbn.trim() });
    }
  };

  const handleChange = (field: keyof Book, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.isbn || !form.title) {
      alert("ISBN and Title are required");
      return;
    }

    if (foundBook) {
      setBooks((prev) =>
        prev.map((b) => (b.id === form.id ? { ...form } : b))
      );
      alert("Book updated successfully!");
    } else {
      if (books.some((b) => b.isbn === form.isbn)) {
        alert("ISBN already exists");
        return;
      }
      setBooks((prev) => [...prev, { ...form, id: Date.now() }]);
      alert("Book added successfully!");
    }

    setForm(initialBook);
    setFoundBook(null);
    setSearchIsbn("");
  };

  const handleDeactivate = () => {
    if (foundBook) {
      setBooks((prev) =>
        prev.map((b) =>
          b.id === foundBook.id ? { ...b, isAvailable: false } : b
        )
      );
      alert("Book deactivated.");
      setIsModalOpen(false);
      setForm(initialBook);
      setFoundBook(null);
      setSearchIsbn("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-center mb-6">Book Management</h2>

      <div className="flex mb-6 space-x-2">
        <input
          type="text"
          placeholder="Search by ISBN"
          value={searchIsbn}
          onChange={(e) => setSearchIsbn(e.target.value)}
          className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700"
        >
          Search
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => handleChange("author", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ISBN *</label>
          <input
            type="text"
            value={form.isbn}
            onChange={(e) => handleChange("isbn", e.target.value)}
            required
            disabled={!!foundBook}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={form.price || ''}
            onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Publication Date</label>
          <input
            type="date"
            value={form.publicationDate || ''}
            onChange={(e) => handleChange("publicationDate", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={3}
            value={form.description || ''}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 col-span-2">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {foundBook ? "Update Book" : "Add Book"}
          </button>
          {foundBook && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Deactivate
            </button>
          )}
        </div>
      </form>

      {/* Books Table */}
      {books.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4">Books List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ISBN</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {books.map((b) => (
                  <tr key={b.id} className={`${!b.isAvailable ? 'opacity-50' : ''}`}>
                    <td className="px-4 py-2 text-sm text-gray-800">{b.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{b.isbn}</td>
                    <td className="px-4 py-2 text-center text-sm">
                      {b.isAvailable ? (
                        <span className="text-green-600 font-medium">Active</span>
                      ) : (
                        <span className="text-red-600 font-medium">Inactive</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Deactivate Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-30" />
        <Dialog.Panel className="bg-white p-6 rounded-md shadow-lg z-10 max-w-sm mx-auto">
          <Dialog.Title className="text-lg font-semibold">Confirm Deactivation</Dialog.Title>
          <p className="mt-2 text-sm text-gray-600">
            Are you sure you want to deactivate this book?
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleDeactivate}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Deactivate
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}

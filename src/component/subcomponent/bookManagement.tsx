import React, { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}
type AdminRegistrationProps = {
  onClose?: () => void;
};


const BookManagement: React.FC<AdminRegistrationProps> = ({ onClose }) => {

  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({ id: 0, title: '', author: '', price: 0, imageUrl: '' });
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Helper to safely parse price input to number
  const parsePrice = (value: string): number => {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleAddBook = () => {
    if (!newBook.title.trim() || !newBook.author.trim()) {
      alert('Title and Author are required');
      return;
    }
    setBooks([...books, { ...newBook, id: Date.now() }]);
    setNewBook({ id: 0, title: '', author: '', price: 0, imageUrl: '' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  const handleUpdateBook = () => {
    if (!editingBook) return;
    if (!editingBook.title.trim() || !editingBook.author.trim()) {
      alert('Title and Author are required');
      return;
    }
    setBooks(books.map((b) => (b.id === editingBook.id ? editingBook : b)));
    setEditingBook(null);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📚 Admin Book Management</h1>

      {/* Add Book */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            key="add-title"
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewBook({ ...newBook, title: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            key="add-author"
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewBook({ ...newBook, author: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            key="add-price"
            type="number"
            placeholder="Price"
            value={newBook.price === 0 ? '' : newBook.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewBook({ ...newBook, price: parsePrice(e.target.value) })
            }
            className="border p-2 rounded"
          />
          <input
            key="add-imageUrl"
            type="text"
            placeholder="Image URL"
            value={newBook.imageUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewBook({ ...newBook, imageUrl: e.target.value })
            }
            className="border p-2 rounded"
          />
        </div>
        <button onClick={handleAddBook} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          Add Book
        </button>
      </div>

      {/* Book Table */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Book List</h2>
        <table className="w-full text-sm table-auto">
          <thead className="border-b">
            <tr className="text-left">
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price (රු)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No books available
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} className="border-b hover:bg-gray-50">
                  <td>
                    {book.imageUrl ? (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price.toLocaleString()}</td>
                  <td className="space-x-2">
                    <button onClick={() => setEditingBook(book)} className="text-blue-600">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(book.id)} className="text-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Edit Book</h2>
            <input
              key="edit-title"
              type="text"
              placeholder="Title"
              value={editingBook.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditingBook({ ...editingBook, title: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              key="edit-author"
              type="text"
              placeholder="Author"
              value={editingBook.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditingBook({ ...editingBook, author: e.target.value })
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              key="edit-price"
              type="number"
              placeholder="Price"
              value={editingBook.price === 0 ? '' : editingBook.price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditingBook({ ...editingBook, price: parsePrice(e.target.value) })
              }
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              key="edit-imageUrl"
              type="text"
              placeholder="Image URL"
              value={editingBook.imageUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditingBook({ ...editingBook, imageUrl: e.target.value })
              }
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditingBook(null)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button onClick={handleUpdateBook} className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;

import React, { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  imageUrl: string;
}

const AdminBookDashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({ id: 0, title: '', author: '', price: 0, imageUrl: '' });
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleAddBook = () => {
    setBooks([...books, { ...newBook, id: Date.now() }]);
    setNewBook({ id: 0, title: '', author: '', price: 0, imageUrl: '' });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this book?')) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  const handleUpdateBook = () => {
    if (!editingBook) return;
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
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newBook.imageUrl}
            onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
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
            {books.map((book) => (
              <tr key={book.id} className="border-b hover:bg-gray-50">
                <td>
                  <img src={book.imageUrl} alt={book.title} className="w-16 h-20 object-cover rounded" />
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Edit Book</h2>
            <input
              type="text"
              placeholder="Title"
              value={editingBook.title}
              onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={editingBook.author}
              onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={editingBook.price}
              onChange={(e) => setEditingBook({ ...editingBook, price: parseFloat(e.target.value) })}
              className="border p-2 w-full mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editingBook.imageUrl}
              onChange={(e) => setEditingBook({ ...editingBook, imageUrl: e.target.value })}
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

export default AdminBookDashboard;

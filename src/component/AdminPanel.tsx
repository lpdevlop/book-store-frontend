import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs';
import { Pencil, Trash2 } from 'lucide-react';

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [orders] = useState([]);
  const [newBook, setNewBook] = useState({
    id: '', title: '', author: '', isbn: '', publisher: '', publicationDate: '',
    price: '', language: '', genre: '', stockQuantity: '', description: '',
    averageRating: '', pageCount: '', format: '', imageUrl: '', isAvailable: false
  });
  const [editBookId, setEditBookId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewBook({ ...newBook, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddOrUpdateBook = () => {
    if (!newBook.title || !newBook.author || !newBook.price) return;
    const bookData = { ...newBook, price: parseFloat(newBook.price), stockQuantity: parseInt(newBook.stockQuantity), averageRating: parseFloat(newBook.averageRating), pageCount: parseInt(newBook.pageCount) };
    if (editBookId !== null) {
      setBooks(books.map(book => book.id === editBookId ? { ...book, ...bookData } : book));
    } else {
      const newId = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
      setBooks([...books, { ...bookData, id: newId }]);
    }
    setEditBookId(null);
    setNewBook({
      id: '', title: '', author: '', isbn: '', publisher: '', publicationDate: '',
      price: '', language: '', genre: '', stockQuantity: '', description: '',
      averageRating: '', pageCount: '', format: '', imageUrl: '', isAvailable: false
    });
  };

  const handleEditBook = (book) => {
    setNewBook({ ...book });
    setEditBookId(book.id);
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">📚 Admin Panel</h1>

      <Tabs defaultValue="books" className="w-full">
        <TabsList className="flex space-x-2 bg-gray-100 rounded-lg p-2 mb-4">
          <TabsTrigger value="books" className="flex-1 px-4 py-2 text-sm font-medium">Books</TabsTrigger>
          <TabsTrigger value="orders" className="flex-1 px-4 py-2 text-sm font-medium">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {Object.entries({
              title: 'Title', author: 'Author', isbn: 'ISBN', publisher: 'Publisher', publicationDate: 'Publication Date',
              price: 'Price', language: 'Language', genre: 'Genre', stockQuantity: 'Stock Quantity',
              averageRating: 'Avg Rating', pageCount: 'Page Count', format: 'Format', imageUrl: 'Image URL'
            }).map(([field, label]) => (
              <input
                key={field}
                type={field === 'price' || field === 'stockQuantity' || field === 'pageCount' || field === 'averageRating' ? 'number' : 'text'}
                step={field === 'price' || field === 'averageRating' ? '0.01' : '1'}
                name={field}
                placeholder={label}
                value={newBook[field] || ''}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            ))}
            <textarea
              name="description"
              placeholder="Description"
              value={newBook.description}
              onChange={handleChange}
              className="border p-2 rounded col-span-full"
            />
            <label className="flex items-center gap-2 col-span-full">
              <input
                type="checkbox"
                name="isAvailable"
                checked={newBook.isAvailable}
                onChange={handleChange}
              />
              Available
            </label>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleAddOrUpdateBook}
          >
            {editBookId ? 'Update Book' : 'Add Book'}
          </button>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <div key={book.id} className="border rounded p-4 bg-white shadow">
                {book.imageUrl && <img src={book.imageUrl} alt={book.title} className="h-32 w-full object-cover rounded mb-2" />}
                <h2 className="font-semibold text-lg">{book.title}</h2>
                <p>Author: {book.author}</p>
                <p>Price: ${book.price.toFixed(2)}</p>
                <p>Stock: {book.stockQuantity}</p>
                <p className="text-sm text-gray-600">{book.description?.slice(0, 60)}...</p>
                <p className="mt-1">{book.isAvailable ? '✅ Available' : '❌ Out of Stock'}</p>
                <div className="flex mt-2 gap-3">
                  <button onClick={() => handleEditBook(book)} className="text-blue-600 hover:underline">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDeleteBook(book.id)} className="text-red-600 hover:underline">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-4">
            {orders.length === 0 && <p>No orders found.</p>}
            {orders.map((order) => (
              <div key={order.id} className="border rounded p-4 bg-white shadow-sm">
                <div className="font-semibold">Order #{order.id}</div>
                <div>Customer: {order.customerName}</div>
                <div>Items: {order.items.join(', ')}</div>
                <div>Total: ${order.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;

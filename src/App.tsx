import { ReactNode } from 'react';
import { FaSearch, FaHeart, FaUser, FaShoppingBasket } from 'react-icons/fa';
import './App.css';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  [key: string]: any; // Allowing any other props for Button
}

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps {
  className?: string;
  [key: string]: any; // Allowing any other props for Input
}

const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      className={`border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
};

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent = ({ children, className = '' }: CardContentProps) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

const books = [
  {
    title: 'The Time Has Come',
    author: 'Will Leitch',
    price: 27.89,
    originalPrice: 30.99,
    image: '/books/time-has-come.jpg',
  },
  {
    title: 'I Want a Better Catastrophe',
    author: 'Andrew Boyd',
    price: 26.99,
    originalPrice: 29.99,
    image: '/books/better-catastrophe.jpg',
  },
  // more books
];

function App() {
  return (
    <div className="font-sans text-gray-800">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b shadow-sm">
        <div className="text-xl font-bold">📚 BookShop</div>
        <div className="flex items-center gap-2">
          <FaSearch className="text-gray-600" />
          <Input placeholder="What are you looking for?" className="w-64" />
        </div>
        <div className="flex gap-4">
          <FaHeart />
          <FaUser />
          <FaShoppingBasket />
        </div>
      </div>

      {/* New Releases */}
      <section className="p-6">
        <div className='grid grid-cols-2'>
          <div>
          <h2 className="text-2xl font-semibold">New Releases This Week</h2>
        <p className="text-gray-600 mt-2 max-w-xl">
          It’s time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week’s new releases offer something for everyone.
        </p>
        <Button className="mt-4">Subscribe</Button>
          </div>
          <div>

          </div>
        </div>
      </section>

      {/* Top Sellers */}
      <section className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Top Sellers</h2>
          <select className="border p-1 rounded">
            <option>Choose a genre</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {books.map((book, idx) => (
            <Card key={idx} className="p-2">
              <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded" />
              <CardContent>
                <h3 className="font-semibold text-sm mt-2">{book.title}</h3>
                <p className="text-xs text-gray-500">{book.author}</p>
                <div className="text-sm mt-1">
                  ${book.price.toFixed(2)}{' '}
                  <span className="line-through text-gray-400 text-xs">${book.originalPrice.toFixed(2)}</span>
                </div>
                <Button size="sm" className="mt-2">Add to basket</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-gray-100 mt-10">
        <div className="flex flex-wrap justify-between">
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Features</li>
              <li>Pricing</li>
              <li>Gallery</li>
              <li>Team</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Subscribe</h4>
            <p className="text-sm text-gray-600 mb-2">Stay tuned for new product and latest updates.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email address" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-6 border-t pt-4 flex justify-between">
          <p>Privacy Policy | Terms of Use | Sales and Refunds | Legal</p>
          <div className="flex gap-2">
            <span>🌐</span>
            <span>📷</span>
            <span>📘</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

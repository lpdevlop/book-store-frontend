import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import apiService from '../apiservices/apiService';

interface Book {
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  description: string;
}

const Button = ({ children, className = '', ...props }: any) => (
  <button
    className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const NewRelease = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const data=apiService.newRelease();
  useEffect(() => {
    data
      .then((res) => res.data)
      .then((data) => {
        const bookArray = Object.values(data)[0] as any[];
        const formattedBooks = bookArray.map((book) => ({
          title: book.title,
          author: book.author,
          price: book.price || 19.99, // fallback if price is null
          originalPrice: book.originalPrice || (book.price ? book.price + 5 : 24.99),
          imageUrl: book.imageUrl,
          description: book.description,
        }));
        setBooks(formattedBooks);
      })
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  return (
    <section className="p-10 bg-white">
      <Swiper
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        loop
        className="w-full"
      >
        {books.map((book, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Left: Book text info */}
              <div>
                <h2 className="text-3xl font-semibold text-blue-900">New Releases This Week</h2>
                <h3 className="text-xl font-bold mt-4">{book.title}</h3>
                <p className="text-gray-700 mt-2 italic">{book.author}</p>
                <p className="text-gray-600 mt-4 max-w-xl">{book.description}</p>
                <div className="mt-4 text-sm">
                  <span className="text-green-600 font-bold">${book.price.toFixed(2)}</span>
                  {book.originalPrice && (
                    <span className="ml-2 text-gray-400 line-through">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
<Button variant="default" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white">
  Buy Now
</Button>
              </div>

              {/* Right: Image */}
              <div>
                <img
                  src="https://res.cloudinary.com/upwork-cloud/image/upload/c_scale,w_1000/v1690383373/catalog/1684212490015363072/diszt1zxtjqnixyjx27f.jpg"
                  alt={book.title}
                  className="w-full h-96 object-cover rounded shadow-md"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewRelease;

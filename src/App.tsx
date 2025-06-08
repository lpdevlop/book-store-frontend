import { ReactNode } from 'react';
import { FaSearch, FaHeart, FaUser, FaShoppingBasket } from 'react-icons/fa';
import './App.css';
import Headers from './component/subcomponent/header'
import SearchForm from './component/searchform';
import Topseller from './component/subcomponent/topseller';
import Footer from './component/subcomponent/footer';
import NewRelease  from './component/newrelease';
import Recomondation  from './component/recomondation';
import Login from './component/subcomponent/login';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './component/subcomponent/header';
//import Cart from './component/cart'
import SearchResults from './component/SearchResults';
import CartPage from './component/subcomponent/CartPage';
import CheckoutPage from './component/subcomponent/CheckoutPage'
import AdminRegistration from './component/subcomponent/AdminRegistration';
// Inside your Routes

const App: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="font-sans text-gray-800">
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NewRelease />
              <Topseller />
              <Recomondation />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
  {/*       <Route path="/cart" element={<Cart cart={[]} onQtyChange={function (id: number, qty: number): void {
          throw new Error('Function not implemented.');
        } } onRemove={function (id: number): void {
          throw new Error('Function not implemented.');
        } }/>} /> */}
  <Route path="/search" element={<SearchResults />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
  <Route path="/register-admin" element={<AdminRegistration />} />


      </Routes>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default App;

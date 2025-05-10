import { ReactNode } from 'react';
import { FaSearch, FaHeart, FaUser, FaShoppingBasket } from 'react-icons/fa';
import './App.css';
import Headers from './component/header'
import SearchForm from './component/searchform';
import Topseller from './component/topseller';
import Footer from './component/footer';
import NewRelease  from './component/newrelease';
import Recomondation  from './component/recomondation';
import Login from './component/login';
import SearchPage from './component/SearchPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './component/header';

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
        <Route path="/search" element={<SearchPage />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default App;

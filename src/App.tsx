import './App.css';
import Topseller from './component/subcomponent/topseller';
import Footer from './component/subcomponent/footer';
import NewRelease  from './component/subcomponent/newrelease';
import Recomondation  from './component/subcomponent/recomondation';
import Login from './component/subcomponent/login';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './component/subcomponent/header';
import CartPage from './component/subcomponent/cart/cartpage'
import SearchResults from './component/subcomponent/SearchResults';
import CheckoutPage from './component/subcomponent/cart/checkoutpage'
import AdminRegistration from './component/subcomponent/adminRegistration';
import OrdersPage from './component/subcomponent/order'

const App: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="font-sans text-gray-800">
      {!hideHeaderFooter && <Header />}
  <Routes>
  <Route path="/" element={<><NewRelease /><Topseller /><Recomondation /></>}/>
  <Route path="/login" element={<Login />} />
  <Route path="/search" element={<SearchResults />} />
  <Route path="/cart" element={<CartPage />} />
  <Route path="/orders" element={<OrdersPage />} />
  <Route path="/checkout" element={<CheckoutPage />} />
  <Route path="/register-admin" element={<AdminRegistration />} />
  </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default App;

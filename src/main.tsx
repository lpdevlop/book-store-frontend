import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import  CartProvider  from './component/subcomponent/cart/CartPage.tsx';
import { UserProvider } from './component/subcomponent/context/userContext.tsx'; 

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <UserProvider>
      <BrowserRouter>
          <CartProvider>
        <App />
            </CartProvider>

      </BrowserRouter>
        </UserProvider>
  </React.StrictMode>


)

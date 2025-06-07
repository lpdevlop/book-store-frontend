import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { CartProvider } from './component/cart.tsx';
import { UserProvider } from './component/subcomponent/context/userContext.tsx'; 

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <UserProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
        </UserProvider>
  </React.StrictMode>


)

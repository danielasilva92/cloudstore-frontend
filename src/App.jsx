import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider }  from './context/AuthContext';
import { CartProvider }  from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Navbar      from './components/layout/Navbar';
import Footer      from './components/layout/Footer';
import AuthModal   from './components/auth/AuthModal';
import CartSidebar from './components/cart/CartSidebar';
import HomePage   from './pages/HomePage';
import ShopPage   from './pages/ShopPage';
import OrdersPage from './pages/OrdersPage';
import './styles/globals.css';

function AppShell() {
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const openAuth = () => { setCartOpen(false); setAuthOpen(true); };
  const openCart = () => setCartOpen(true);

  return (
    <>
      <Navbar onCartOpen={openCart} onAuthOpen={openAuth} />
      <Routes>
        <Route path="/"       element={<HomePage   onAuthOpen={openAuth} />} />
        <Route path="/shop"   element={<ShopPage   onAuthOpen={openAuth} />} />
        <Route path="/orders" element={<OrdersPage onAuthOpen={openAuth} />} />
        <Route path="*"       element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      {cartOpen && <CartSidebar onClose={() => setCartOpen(false)} onAuthOpen={openAuth} />}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
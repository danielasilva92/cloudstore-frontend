import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

export default function Navbar({ onCartOpen, onAuthOpen }) {
  const { isLoggedIn, user, logout } = useAuth();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoMark}>◈</span>
          <span className={styles.logoText}>Cloud<em>Store</em></span>
        </Link>
        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <li><Link to="/" className={styles.link}>Hem</Link></li>
          <li><Link to="/shop" className={styles.link}>Butik</Link></li>
          <li><Link to="/wishlist">Favoriter</Link></li>
          {isLoggedIn && <li><Link to="/orders" className={styles.link}>Beställningar</Link></li>}
        </ul>
        <div className={styles.actions}>
          {isLoggedIn ? (
            <>
              <span className={styles.greeting}>Hej, {user?.username} ✦</span>
              <button className={styles.ghostBtn} onClick={logout}>Logga ut</button>
            </>
          ) : (
            <button className={styles.ghostBtn} onClick={onAuthOpen}>Logga in</button>
          )}
          <button className={styles.cartBtn} onClick={onCartOpen} aria-label="Varukorg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
          </button>
          <button className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ''}`} onClick={() => setMenuOpen(p => !p)}>
            <span/><span/><span/>
          </button>
        </div>
      </nav>
    </header>
  );
}
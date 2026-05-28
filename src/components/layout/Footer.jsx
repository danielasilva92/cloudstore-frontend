import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>◈ Cloud<em>Store</em></span>
          <p className={styles.tagline}>Kurerat med kärlek ✦</p>
        </div>
        <div className={styles.links}>
          <Link to="/">Hem</Link>
          <Link to="/shop">Butik</Link>
          <Link to="/orders">Beställningar</Link>
        </div>
        <p className={styles.copy}>© 2026 CloudStore · Alla rättigheter förbehållna</p>
      </div>
    </footer>
  );
}
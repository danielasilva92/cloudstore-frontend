import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.tag}>
          <span className={styles.tagDot} />
          Ny kollektion · 2026
        </div>
        <h1 className={styles.title}>Kurerat för<br /><em>ditt liv</em></h1>
        <p className={styles.body}>
          Noggrant utvalda produkter som sätter skönhet i vardagen.<br />
          Mode, smycken och elektronik.
        </p>
        <div className={styles.actions}>
          <Link to="/shop" className={styles.btnPrimary}>Utforska kollektionen</Link>
          <Link to="/shop" className={styles.btnGhost}>Se nyheter ↓</Link>
        </div>
        <div className={styles.stats}>
          {[['200+','Produkter'],['4.8★','Snittbetyg'],['Fri','Frakt'],['Enkel','Retur']].map(([n,l]) => (
            <div key={l} className={styles.stat}>
              <span className={styles.statNum}>{n}</span>
              <span className={styles.statLabel}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.visual}>
        <div className={styles.cardStack}>
          <div className={`${styles.floatCard} ${styles.cardA}`}>
            <img src="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg" alt="" />
          </div>
          <div className={`${styles.floatCard} ${styles.cardB}`}>
            <img src="https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg" alt="" />
          </div>
          <div className={styles.accentBadge}>✦ Toppval</div>
        </div>
      </div>
    </section>
  );
}
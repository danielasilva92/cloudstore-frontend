import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.tag}>
          <span className={styles.tagDot} />
          Ny kollektion · 2026
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>Det vackra</span>
          <span className={styles.titleLine}><em>i vardagen</em></span>
        </h1>

        <p className={styles.body}>
          Noggrant utvalda produkter som lyfter det vardagliga —
          mode, smycken och elektronik, samlat på ett ställe.
        </p>

        <div className={styles.actions}>
          <Link to="/shop" className={styles.btnPrimary}>
            Utforska kollektionen
            <span className={styles.btnArrow}>→</span>
          </Link>
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
          <div className={styles.glassRing} aria-hidden="true" />
          <div className={`${styles.floatCard} ${styles.cardA}`}>
            <img src="https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_FMwebp_QL65_.jpg" alt="" />
          </div>
          <div className={`${styles.floatCard} ${styles.cardB}`}>
            <img src="https://fakestoreapi.com/img/71HblAHs1xL._AC_UY879_-2.jpg" alt="" />
          </div>
          <div className={styles.accentBadge}>
            <span className={styles.badgeStar}>✦</span> Toppval
          </div>
          <div className={styles.priceTag}>
            <span className={styles.priceLabel}>Från</span>
            <span className={styles.priceNum}>109 kr</span>
          </div>
        </div>
      </div>
    </section>
  );
}
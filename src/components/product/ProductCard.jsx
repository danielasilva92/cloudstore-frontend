import { useState } from 'react';
import { formatPrice, truncate, capitalize } from '../../utils/formatters';
import styles from './ProductCard.module.css';

function StarRating({ rate = 0 }) {
  return (
    <div className={styles.stars}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= Math.round(rate) ? styles.starFilled : styles.starEmpty}>★</span>
      ))}
      <span className={styles.rateNum}>{Number(rate).toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product, onAddToCart, isLiked, onToggleWishlist }) {
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await onAddToCart(product);
    setTimeout(() => setAdding(false), 1000);
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {!imgError ? (
          <img src={product.image} alt={product.title} className={styles.image} onError={() => setImgError(true)} />
        ) : (
          <div className={styles.imageFallback}>◈</div>
        )}
        <span className={styles.category}>{capitalize(product.category)}</span>
        <button className={`${styles.wishlistBtn} ${isLiked ? styles.liked : ''}`} onClick={() => onToggleWishlist(product.id)}>
          {isLiked ? '♥' : '♡'}
        </button>
        <div className={styles.overlay}>
          <button className={`${styles.addBtn} ${adding ? styles.adding : ''}`} onClick={handleAdd} disabled={adding}>
            {adding ? '✓ Tillagd' : '+ Lägg i korg'}
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{truncate(product.title, 44)}</p>
        <StarRating rate={product.rating?.rate} />
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.rating?.count && <span className={styles.reviews}>{product.rating.count} rec.</span>}
        </div>
      </div>
    </article>
  );
}
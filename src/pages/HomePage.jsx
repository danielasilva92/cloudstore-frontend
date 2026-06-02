import Hero from '../components/ui/Hero';
import ProductGrid from '../components/product/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../hooks/useWishlist';
import styles from './HomePage.module.css';

export default function HomePage({ onAuthOpen }) {
  const { products, loading, error } = useProducts();
  const { addItem }    = useCart();
  const { isLoggedIn } = useAuth();
  const { show }       = useToast();
  const { isLiked, toggle } = useWishlist();

  const handleAddToCart = (product) => {
    if (!isLoggedIn) { onAuthOpen(); return; }
    addItem(product);
    show(`✦ ${product.title.slice(0, 30)}… tillagd`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.heroWrap}><Hero /></div>
      <div className={styles.shopSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>Sortiment</span>
            <span className={styles.eyebrowFill} />
          </div>
          <h2 className={styles.sectionTitle}>Alla <em>produkter</em></h2>
          <p className={styles.sectionSub}>Välkurerat sortiment direkt från FakeStore</p>
        </div>
        <ProductGrid products={products} loading={loading} error={error} onAddToCart={handleAddToCart} isLiked={isLiked} onToggleWishlist={toggle} />
      </div>
    </div>
  );
}
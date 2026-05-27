import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../hooks/useWishlist';
import ProductGrid from '../components/product/ProductGrid';
import styles from './ShopPage.module.css';

export default function ShopPage({ onAuthOpen }) {
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
      <div className={styles.header}>
        <h1 className={styles.title}>Butiken</h1>
        <p className={styles.sub}>Utforska hela vårt sortiment</p>
      </div>
      <div className={styles.content}>
        <ProductGrid products={products} loading={loading} error={error} onAddToCart={handleAddToCart} isLiked={isLiked} onToggleWishlist={toggle} />
      </div>
    </div>
  );
}
import { useWishlist } from '../hooks/useWishlist';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatters';
import Button from '../components/ui/Button';
import styles from './WishlistPage.module.css';

export default function WishlistPage({ onAuthOpen }) {
  const { wishlist, toggle } = useWishlist();
  const { products, loading } = useProducts();
  const { addItem }    = useCart();
  const { isLoggedIn } = useAuth();
  const { show }       = useToast();

  const liked = products.filter(p => wishlist.includes(p.id));

  const handleAddToCart = (product) => {
    if (!isLoggedIn) { onAuthOpen(); return; }
    addItem(product);
    show(`✦ ${product.title.slice(0, 30)}… tillagd`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mina <em>favoriter</em></h1>
        {!loading && (
          <p className={styles.sub}>{liked.length} sparade produkter</p>
        )}
      </div>

      <div className={styles.content}>
        {loading ? (
          <p className={styles.loading}>Laddar…</p>
        ) : liked.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>♡</span>
            <p className={styles.emptyTitle}>Inga favoriter ännu</p>
            <p className={styles.emptySub}>Klicka på hjärtat på en produkt för att spara den här</p>
            <Button href="/shop" size="lg" style={{ marginTop: 24 }}>Gå till butiken</Button>
          </div>
        ) : (
          <div className={styles.grid}>
            {liked.map(product => (
              <div key={product.id} className={styles.card}>
                <button
                  className={styles.removeBtn}
                  onClick={() => toggle(product.id)}
                  aria-label="Ta bort från favoriter"
                >♥</button>
                <div className={styles.imageWrap}>
                  <img src={product.image} alt={product.title} className={styles.image} />
                </div>
                <div className={styles.info}>
                  <p className={styles.category}>{product.category}</p>
                  <h3 className={styles.name}>
                    {product.title.length > 50 ? product.title.slice(0, 50) + '…' : product.title}
                  </h3>
                  <div className={styles.footer}>
                    <span className={styles.price}>{formatPrice(product.price)}</span>
                    <button
                      className={styles.cartBtn}
                      onClick={() => handleAddToCart(product)}
                    >Lägg i korg</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
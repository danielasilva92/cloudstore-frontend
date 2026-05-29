import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { createOrder } from '../../api/orderApi';
import { formatPrice, truncate } from '../../utils/formatters';
import Button from '../ui/Button';
import styles from './CartSidebar.module.css';

export default function CartSidebar({ onClose, onAuthOpen }) {
  const { items, removeItem, updateQty, clearCart, totalPrice, totalItems } = useCart();
  const { isLoggedIn } = useAuth();
  const { show } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isLoggedIn) { onClose(); onAuthOpen(); return; }
    setLoading(true);
    try {
      // Skicka hela korgen som EN beställning med flera items
      await createOrder({
        items: items.map(item => ({
          productId: item.id,
          quantity: item.qty,
        })),
      });
      clearCart(); onClose();
      show('✦ Beställning genomförd!');
    } catch {
      show('Något gick fel. Försök igen.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Din korg</h2>
            {totalItems > 0 && <p className={styles.subtitle}>{totalItems} {totalItems === 1 ? 'vara' : 'varor'}</p>}
          </div>
          <button className={styles.close} onClick={onClose}>✕</button>
        </div>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>◈</div>
            <p className={styles.emptyTitle}>Din korg är tom</p>
            <p className={styles.emptyText}>Lägg till produkter för att komma igång</p>
            <Button variant="secondary" size="sm" onClick={onClose} style={{ marginTop: 16 }}>Fortsätt handla</Button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemImg}><img src={item.image} alt={item.title} /></div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemTitle}>{truncate(item.title, 32)}</p>
                    <p className={styles.itemPrice}>{formatPrice(item.price * item.qty)}</p>
                    <div className={styles.qtyRow}>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span className={styles.qty}>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className={styles.remove} onClick={() => removeItem(item.id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Totalt</span>
                <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
              </div>
              <Button size="lg" loading={loading} onClick={handleCheckout} style={{ width: '100%' }}>
                {isLoggedIn ? 'Slutför köp' : 'Logga in för att köpa'}
              </Button>
              <button className={styles.clearBtn} onClick={clearCart}>Töm korgen</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
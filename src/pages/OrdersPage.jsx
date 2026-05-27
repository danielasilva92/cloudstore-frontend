import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchOrders } from '../api/orderApi';
import { formatPrice, formatDate, truncate } from '../utils/formatters';
import Button from '../components/ui/Button';
import styles from './OrdersPage.module.css';

export default function OrdersPage({ onAuthOpen }) {
  const { isLoggedIn } = useAuth();
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    fetchOrders().then(setOrders).catch(() => setOrders([])).finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) return (
    <div className={styles.gate}>
      <div className={styles.gateIcon}>◈</div>
      <h2 className={styles.gateTitle}>Logga in för att se dina beställningar</h2>
      <p className={styles.gateSub}>Du behöver ett konto för att handla och följa dina ordrar.</p>
      <Button onClick={onAuthOpen} size="lg" style={{ marginTop: 24 }}>Logga in</Button>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Mina <em>beställningar</em></h1>
        {!loading && <p className={styles.sub}>{orders.length} beställningar totalt</p>}
      </div>
      <div className={styles.content}>
        {loading ? (
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Laddar…</p>
        ) : orders.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>◈</span>
            <p className={styles.emptyTitle}>Inga beställningar ännu</p>
            <p className={styles.emptySub}>Dina framtida köp visas här</p>
          </div>
        ) : (
          <div className={styles.list}>
            {orders.map(order => (
              <div key={order.id} className={styles.card}>
                <div className={styles.cardLeft}>
                  <span className={styles.orderNum}>Beställning #{order.id}</span>
                  <p className={styles.productName}>{truncate(order.productTitle, 48)}</p>
                  <div className={styles.meta}>
                    <span>{order.quantity} st</span>
                    <span className={styles.dot}>·</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>
                <div className={styles.cardRight}>
                  <span className={styles.price}>{formatPrice(order.price * order.quantity)}</span>
                  <span className={styles.status}>✓ Bekräftad</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
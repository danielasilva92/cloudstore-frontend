import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { ProductSkeleton } from '../ui/Skeleton';
import styles from './ProductGrid.module.css';

const CATEGORIES = ['Alla', "men's clothing", "women's clothing", 'jewelery', 'electronics'];

export default function ProductGrid({ products, loading, error, onAddToCart, isLiked, onToggleWishlist }) {
  const [activeCategory, setActiveCategory] = useState('Alla');
  const [sortBy, setSortBy] = useState('default');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'Alla') list = list.filter(p => p.category === activeCategory);
    if (search.trim()) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if (sortBy === 'price-asc')  list.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (sortBy === 'rating')     list.sort((a,b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
    return list;
  }, [products, activeCategory, sortBy, search]);

  return (
    <section className={styles.section}>
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input className={styles.search} placeholder="Sök produkter…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className={styles.sort} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Sortera</option>
          <option value="price-asc">Pris: Lågt → Högt</option>
          <option value="price-desc">Pris: Högt → Lågt</option>
          <option value="rating">Bäst betyg</option>
        </select>
      </div>
      <div className={styles.filters}>
        {CATEGORIES.map(cat => (
          <button key={cat} className={`${styles.pill} ${activeCategory === cat ? styles.active : ''}`} onClick={() => setActiveCategory(cat)}>
            {cat === 'Alla' ? 'Alla produkter' : cat}
          </button>
        ))}
      </div>
      {!loading && !error && <p className={styles.count}>{filtered.length} produkter</p>}
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.grid}>
        {loading
          ? [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
          : filtered.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ProductCard product={p} onAddToCart={onAddToCart} isLiked={isLiked(p.id)} onToggleWishlist={onToggleWishlist} />
              </div>
            ))
        }
      </div>
      {!loading && filtered.length === 0 && !error && (
        <div className={styles.empty}><span>◈</span><p>Inga produkter hittades</p></div>
      )}
    </section>
  );
}
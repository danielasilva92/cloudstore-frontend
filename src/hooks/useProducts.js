import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, seedProducts } from '../api/productApi';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data = await fetchProducts();
      if (!data || data.length === 0) {
        data = await seedProducts();
      }
      setProducts(data);
    } catch {
      setError('Kunde inte ladda produkter.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { products, loading, error, reload: load };
}
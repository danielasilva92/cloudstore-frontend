import { useState, useCallback } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const toggle  = useCallback((id) => setWishlist(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]), []);
  const isLiked = useCallback((id) => wishlist.includes(id), [wishlist]);
  return { wishlist, toggle, isLiked };
}
import { useState, useCallback } from 'react';

const KEY = 'cs_wishlist';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState(load);

  const toggle = useCallback((id) => {
    setWishlist(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isLiked = useCallback((id) => wishlist.includes(id), [wishlist]);

  return { wishlist, toggle, isLiked };
}
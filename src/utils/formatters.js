export const formatPrice  = (p) => `$${Number(p).toFixed(2)}`;
export const formatDate   = (d) => new Date(d).toLocaleDateString('sv-SE');
export const truncate     = (s, n = 40) => s?.length > n ? s.slice(0, n) + '…' : s;
export const capitalize   = (s) => s?.charAt(0).toUpperCase() + s?.slice(1);
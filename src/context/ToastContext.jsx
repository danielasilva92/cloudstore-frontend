import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div style={{
        position: 'fixed', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999, display: 'flex', flexDirection: 'column',
        gap: 8, alignItems: 'center',
      }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: t.type === 'error' ? 'var(--terracotta)' : 'var(--ink)',
            color: 'white', padding: '12px 24px',
            borderRadius: 'var(--radius-pill)',
            fontSize: 13, letterSpacing: '0.04em',
            whiteSpace: 'nowrap', boxShadow: 'var(--shadow-md)',
            animation: 'toastIn 0.3s ease',
          }}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('cs_token'));
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('cs_user')); } catch { return null; }
  });

  const login = useCallback((newToken, userData) => {
    localStorage.setItem('cs_token', newToken);
    localStorage.setItem('cs_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('cs_token');
    localStorage.removeItem('cs_user');
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
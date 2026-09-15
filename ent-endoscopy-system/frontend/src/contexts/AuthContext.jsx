import { createContext, useContext, useState, useEffect } from 'react';
import { api, getToken, setToken, clearToken } from '../services/api';

const AuthContext = createContext(null);

function normalizeUser(u) {
  if (!u) return null;
  return {
    id: u.id, email: u.email, name: u.full_name || u.name, full_name: u.full_name || u.name,
    role: (u.role || 'patient').toLowerCase(), avatar: (u.full_name||u.name||'U').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase(),
    phone: u.phone, is_active: u.is_active
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (token) {
        try {
          const me = await api.get('/api/v1/auth/me');
          const n = normalizeUser(me);
          setUser(n); localStorage.setItem('medicore_user', JSON.stringify(n));
        } catch { clearToken(); localStorage.removeItem('medicore_user'); }
      }
      setLoading(false);
    };
    init();
  }, []);

  const login = async (email, password) => {
    // Real backend authentication only. Errors are surfaced, never masked
    // by a local mock login.
    const res = await api.post('/api/v1/auth/login', { email, password });
    setToken(res.access_token);
    const n = normalizeUser(res.user);
    setUser(n);
    localStorage.setItem('medicore_user', JSON.stringify(n));
    return n;
  };

  const register = async (payload) => {
    const res = await api.post('/api/v1/auth/register', payload);
    setToken(res.access_token);
    const n = normalizeUser(res.user);
    setUser(n);
    localStorage.setItem('medicore_user', JSON.stringify(n));
    return n;
  };

  const logout = () => {
    clearToken();
    setUser(null);
    localStorage.removeItem('medicore_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }

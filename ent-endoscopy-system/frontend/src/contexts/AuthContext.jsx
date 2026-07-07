import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = {
  patient: {
    id: 'p1', name: 'Arjun Sharma', email: 'patient@ent.demo', role: 'patient',
    avatar: 'AS', age: 34, phone: '+91 98765 43210', bloodGroup: 'O+',
    hospital: 'Apollo Hospital',
  },
  doctor: {
    id: 'd1', name: 'Dr. Sarah Jenkins', email: 'doctor@ent.demo', role: 'doctor',
    avatar: 'SJ', specialty: 'ENT Specialist', license: 'MCI-2019-ENT-4521',
    hospital: 'Apollo Hospital', experience: 12,
  },
  admin: {
    id: 'a1', name: 'Admin User', email: 'admin@ent.demo', role: 'admin',
    avatar: 'AU', department: 'System Administration',
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ent_user');
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    await new Promise(r => setTimeout(r, 800)); // simulate network
    const mockUser = MOCK_USERS[role];
    if (!mockUser) throw new Error('Invalid credentials');
    setUser(mockUser);
    localStorage.setItem('ent_user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ent_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

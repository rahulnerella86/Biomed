import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Topbar({ onMenuToggle, title, subtitle }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const initials = (user?.name || 'M').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  const patientsPath =
    user?.role === 'patient' ? '/patient/history' :
    user?.role === 'doctor' ? '/doctor/patients' :
    user?.role === 'admin' ? '/admin/patients' : '/nurse/patients';
  const notifPath =
    user?.role === 'patient' ? '/patient/notifications' :
    user?.role === 'doctor' ? '/doctor/dashboard' :
    user?.role === 'admin' ? '/admin/dashboard' : '/nurse/dashboard';

  return (
    <header className="app-topbar">
      <button className="btn-icon" onClick={onMenuToggle} aria-label="Toggle menu">
        <Menu size={19} strokeWidth={2} />
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: '0.98rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>}
        {subtitle && <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{subtitle}</div>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <form
          className="topbar-search"
          style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          onSubmit={(e) => { e.preventDefault(); navigate(patientsPath); }}
        >
          <Search size={14} style={{ position: 'absolute', left: 11, color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input className="form-input" placeholder="Search patients, doctors…" value={q} onChange={(e) => setQ(e.target.value)}
            style={{ width: 210, paddingLeft: 32, height: 36, fontSize: '0.82rem' }} />
        </form>
        <button className="btn-icon" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="btn-icon" aria-label="Notifications" onClick={() => navigate(notifPath)}>
          <Bell size={17} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 12px 5px 6px', border: '1px solid var(--border-color)', borderRadius: 999, background: 'var(--bg-card)', marginLeft: 6 }}>
          <div className="avatar avatar-sm">{user?.avatar || initials}</div>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>{user?.name?.split(' ')[0]}</div>
            <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{user?.role}</div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px){ .topbar-search{ display:none !important; } }`}</style>
    </header>
  );
}

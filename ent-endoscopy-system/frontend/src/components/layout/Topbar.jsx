import { useState } from 'react';
import { Bell, Search, Menu, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Topbar({ onMenuToggle, title, subtitle }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-topbar">
      {/* Hamburger */}
      <button className="btn-icon" onClick={onMenuToggle} style={{ marginRight: 16 }}>
        <Menu size={22} strokeWidth={2.5} />
      </button>

      {/* Page title */}
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1 }}>
            {title}
          </div>
        )}
        {subtitle && (
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input
            className="form-input"
            placeholder="Search..."
            style={{ width: 200, paddingLeft: 34, height: 40, fontSize: '0.82rem' }}
          />
        </div>

        {/* Theme */}
        <button className="btn-icon" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button className="btn-icon">
            <Bell size={18} />
          </button>
          <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, background: 'var(--brand-red)', border: '2px solid var(--bg-card)' }} />
        </div>

        {/* User chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', border: '2px solid var(--border-color)', background: 'var(--bg-hover)', marginLeft: 8 }}>
          <div style={{ width: 28, height: 28, background: 'var(--brand-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.75rem', color: '#fff' }}>
            {user?.avatar}
          </div>
          <div style={{ lineHeight: 1 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>{user?.name?.split(' ')[0]}</div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--brand-red)', textTransform: 'uppercase' }}>{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

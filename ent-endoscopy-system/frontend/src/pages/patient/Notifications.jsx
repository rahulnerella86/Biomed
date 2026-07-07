import { useState } from 'react';
import { mockNotifications } from '../../data/mockData';
import { Bell, Calendar, FileText, Pill, MessageSquare, CheckCheck, Trash2 } from 'lucide-react';

const typeConfig = {
  appointment: { icon: Calendar, color: '#2563eb', bg: '#eff6ff' },
  report:      { icon: FileText, color: '#0d9488', bg: '#f0fdfa' },
  prescription:{ icon: Pill,     color: '#7c3aed', bg: '#faf5ff' },
  message:     { icon: MessageSquare, color: '#f59e0b', bg: '#fffbeb' },
  followup:    { icon: Bell,     color: '#ef4444', bg: '#fef2f2' },
};

export default function Notifications() {
  const [notifs, setNotifs] = useState(mockNotifications);
  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const deleteNotif = id => setNotifs(n => n.filter(x => x.id !== id));
  const markRead = id => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));

  const unread = notifs.filter(n => !n.read).length;

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{unread} unread notification{unread !== 1 ? 's' : ''}</span>
        </div>
        <button className="btn btn-sm btn-ghost" onClick={markAllRead}><CheckCheck size={14} /> Mark all read</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifs.map(n => {
          const cfg = typeConfig[n.type] || typeConfig.appointment;
          const Icon = cfg.icon;
          return (
            <div key={n.id} className="card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14, background: n.read ? 'var(--bg-card)' : `linear-gradient(to right, ${cfg.bg}, var(--bg-card))`, border: n.read ? '1px solid var(--border-color)' : `1px solid ${cfg.color}20`, cursor: 'pointer' }} onClick={() => markRead(n.id)}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: cfg.bg, border: `1.5px solid ${cfg.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color={cfg.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontWeight: n.read ? 500 : 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{n.title}</span>
                  {!n.read && <span style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, flexShrink: 0 }}></span>}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 4 }}>{n.message}</p>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{n.time}</span>
              </div>
              <button className="btn-icon" style={{ padding: 6, flexShrink: 0 }} onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}><Trash2 size={14} /></button>
            </div>
          );
        })}
        {notifs.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: 60 }}>
            <Bell size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
            <p style={{ color: 'var(--text-muted)' }}>No notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}

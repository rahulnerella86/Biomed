import { mockDoctors, mockPatients, mockAppointments } from '../../data/mockData';
import { Stethoscope, Users, Activity, Shield, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const pendingDocs = mockDoctors.filter(d => d.status === 'pending');

  return (
    <div className="animate-fadeIn">
      {/* Hero header */}
      <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '4px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 12 }}>
          System <span style={{ color: 'var(--brand-red)' }}>Control.</span>
        </h1>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          {user?.name} / Administrator
        </p>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 48 }}>
        {[
          { label: 'Registered Doctors', value: mockDoctors.length, color: '#0a0a0a' },
          { label: 'Total Patients',      value: mockPatients.length, color: 'var(--brand-red)' },
          { label: 'Appointments (MTD)',  value: mockAppointments.length, color: '#0a0a0a' },
          { label: 'System Uptime',       value: '99.9%', color: '#0a0a0a' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: 8, marginBottom: 16 }}>{s.label}</div>
            <div className="stat-value" style={{ color: s.color, fontSize: '3.5rem' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        {/* Pending Doctor Approvals */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '24px 24px 16px', borderBottom: '2px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase' }}>Pending Approvals</h2>
            <span className="badge badge-red">{pendingDocs.length}</span>
          </div>
          {pendingDocs.length === 0 ? (
            <p style={{ padding: 24, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>No pending approvals.</p>
          ) : pendingDocs.map((d, i) => (
            <div key={d.id} style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto', gap: 16, alignItems: 'center', padding: '20px 24px', borderBottom: i < pendingDocs.length - 1 ? '2px solid var(--border-color)' : 'none' }}>
              <div style={{ width: 44, height: 44, background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, border: '2px solid var(--border-color)' }}>
                {d.avatar}
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase' }}>{d.name}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{d.specialty} · {d.license}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-sm" style={{ border: '2px solid var(--border-color)', color: 'var(--brand-red)', fontWeight: 800 }}>Reject</button>
                <button className="btn btn-sm btn-primary">Approve</button>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Log */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '24px 24px 16px', borderBottom: '2px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase' }}>System Audit Log</h2>
          </div>
          {[
            { time: '10:45 AM', event: 'New doctor registration: Dr. Meena Pillai', type: 'info' },
            { time: '09:30 AM', event: 'Hardware sync completed (ESP32-CAM-001)', type: 'success' },
            { time: '08:15 AM', event: 'AI Model TFLite weights updated to v2.4', type: 'info' },
            { time: 'Yesterday', event: 'Failed login attempt from IP 192.168.1.44', type: 'warning' },
            { time: 'Yesterday', event: 'Database backup completed successfully', type: 'success' },
          ].map((log, i, arr) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 12px 1fr', gap: 16, alignItems: 'flex-start', padding: '16px 24px', borderBottom: i < arr.length - 1 ? '2px solid var(--border-color)' : 'none' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{log.time}</div>
              <div style={{ width: 10, height: 10, background: log.type === 'success' ? 'var(--color-success)' : log.type === 'warning' ? 'var(--color-warning)' : 'var(--brand-red)', border: '2px solid var(--border-color)', marginTop: 2 }}></div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{log.event}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

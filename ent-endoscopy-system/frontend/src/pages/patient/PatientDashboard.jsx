import { mockAppointments, mockReports, mockNotifications, mockAIResults } from '../../data/mockData';
import { Calendar, FileText, Brain, Video, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const upcoming = mockAppointments.filter(a => a.status === 'confirmed' || a.status === 'waiting').slice(0, 3);
  const unread = mockNotifications.filter(n => !n.read).length;

  const quickActions = [
    { label: 'Book Appointment', icon: Calendar,  to: '/patient/book',       num: '01', color: 'var(--brand-red)' },
    { label: 'My Reports',       icon: FileText,  to: '/patient/reports',    num: '02', color: '#0a0a0a' },
    { label: 'AI Scan Results',  icon: Brain,     to: '/patient/ai-scan',    num: '03', color: '#0a0a0a' },
    { label: 'Teleconsultation', icon: Video,     to: '/patient/teleconsult',num: '04', color: '#0a0a0a' },
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero header */}
      <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '4px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 12 }}>
              Patient <span style={{ color: 'var(--brand-red)' }}>Hub.</span>
            </h1>
            <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              {user?.name} / Blood: {user?.bloodGroup}
            </p>
          </div>
          {unread > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, border: '2px solid var(--brand-red)', padding: '12px 20px', background: 'var(--bg-card)' }}>
              <AlertCircle size={20} color="var(--brand-red)" />
              <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.9rem' }}>{unread} Unread Alerts</span>
              <button className="btn btn-sm" style={{ background: 'var(--brand-red)', color: '#fff', border: 'none' }} onClick={() => navigate('/patient/notifications')}>View</button>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid-4" style={{ marginBottom: 48 }}>
        {[
          { label: 'Total Visits',       value: '09', change: 'Since 2024' },
          { label: 'Active Medications', value: '02', change: 'Currently prescribed' },
          { label: 'AI Scans Done',      value: '03', change: 'Processed by model' },
          { label: 'Upcoming Appts',     value: upcoming.length, change: 'Scheduled' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: 8, marginBottom: 16 }}>{s.label}</div>
            <div className="stat-value" style={{ color: i === 0 ? 'var(--brand-red)' : 'var(--text-primary)' }}>{s.value}</div>
            <div style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', marginTop: 12, color: 'var(--text-muted)' }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 48 }}>
        {/* Quick Actions grid */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderBottom: '2px solid var(--border-color)', paddingBottom: 12, marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Quick Actions</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {quickActions.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.to}
                  onClick={() => navigate(a.to)}
                  style={{ background: 'var(--bg-card)', border: '2px solid var(--border-color)', padding: 24, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 16, transition: 'all 0.15s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                >
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-red)' }}>{a.num}</div>
                  <Icon size={24} />
                  <div style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', fontSize: '1.05rem', marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                    {a.label} <ArrowRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '24px 24px 16px', borderBottom: '2px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Upcoming</h2>
          </div>
          {upcoming.length === 0 ? (
            <p style={{ padding: 24, color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>No appointments scheduled.</p>
          ) : upcoming.map((a, i) => (
            <div key={a.id} style={{ padding: '20px 24px', borderBottom: i < upcoming.length - 1 ? '2px solid var(--border-color)' : 'none', display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 16, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 900, lineHeight: 1 }}>{a.time.split(' ')[0]}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{a.time.split(' ')[1]}</div>
              </div>
              <div>
                <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.95rem' }}>{a.doctorName}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{a.type} · {a.reason}</div>
              </div>
              <span className="badge" style={{ background: a.status === 'waiting' ? 'var(--brand-red)' : '#0a0a0a', color: '#fff', border: 'none' }}>{a.status}</span>
            </div>
          ))}
          <div style={{ padding: '16px 24px', borderTop: '2px solid var(--border-color)' }}>
            <button className="btn btn-primary w-full" onClick={() => navigate('/patient/book')}>
              + Book New Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Recent AI Scans */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '24px 24px 16px', borderBottom: '2px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Latest AI Scans</h2>
          <button className="btn btn-sm btn-ghost" onClick={() => navigate('/patient/ai-scan')} style={{ fontWeight: 800 }}>View All →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {mockAIResults.map((r, i) => (
            <div key={r.id} style={{ padding: 24, borderRight: i < mockAIResults.length - 1 ? '2px solid var(--border-color)' : 'none', borderBottom: '2px solid transparent' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>{r.date}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 8 }}>{r.prediction}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ height: 4, flex: 1, background: 'var(--bg-hover)', border: '1px solid var(--border-color)' }}>
                  <div style={{ height: '100%', width: `${r.confidence * 100}%`, background: 'var(--brand-red)' }} />
                </div>
                <span style={{ fontWeight: 900, fontSize: '0.9rem' }}>{Math.round(r.confidence * 100)}%</span>
              </div>
              <span className="badge">{r.severity} severity</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

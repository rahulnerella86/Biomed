import { Calendar, FileText, Video, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: appts, loading: al, error: ae, reload: reloadAppts } = useApi('/api/v1/appointments?limit=20');
  const { data: notifs } = useApi('/api/v1/notifications?limit=20');
  const { data: recs } = useApi('/api/v1/medical-records?limit=20');

  const list = appts?.data || [];
  const upcoming = list.filter((a) => !['CANCELLED', 'COMPLETED'].includes((a.status || '').toUpperCase())).slice(0, 3);
  const unread = notifs?.unread ?? 0;
  const visits = recs?.total ?? (recs?.data || []).length;

  const quickActions = [
    { label: 'Book Appointment', icon: Calendar, to: '/patient/book' },
    { label: 'My Reports', icon: FileText, to: '/patient/reports' },
    { label: 'Submit Scan Image', icon: ArrowRight, to: '/patient/ai-scan' },
    { label: 'Teleconsultation', icon: Video, to: '/patient/teleconsult' },
  ];

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Patient portal · live from database</p>
          <h1 style={{ marginTop: 8 }}>Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}</h1>
          <p className="page-subtitle">Appointments, records, and next steps</p>
        </div>
        {unread > 0 && (
          <button className="btn btn-sm" onClick={() => navigate('/patient/notifications')}>{unread} unread alerts →</button>
        )}
      </div>

      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-label">Recorded visits</div><div className="stat-value">{recs ? visits : '—'}</div><div className="stat-change">In your medical history</div></div>
        <div className="stat-card"><div className="stat-label">Upcoming appointments</div><div className="stat-value">{al ? '—' : list.filter((a) => (a.status || '').toUpperCase() === 'SCHEDULED').length}</div><div className="stat-change">Scheduled</div></div>
        <div className="stat-card"><div className="stat-label">Unread notifications</div><div className="stat-value">{unread}</div><div className="stat-change">From the API inbox</div></div>
      </div>

      <div className="grid-2">
        <div>
          <div className="section-header"><span className="section-title" style={{ margin: 0 }}>Quick actions</span></div>
          <div className="grid-2">
            {quickActions.map((a) => (
              <button key={a.to} className="card" style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center' }} onClick={() => navigate(a.to)}>
                <a.icon size={18} /><span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden', alignSelf: 'start' }}>
          <div className="section-header" style={{ padding: '16px 18px 12px', margin: 0 }}>
            <span className="section-title" style={{ margin: 0 }}>Upcoming</span>
            <button className="btn btn-sm btn-ghost" onClick={reloadAppts}>Refresh</button>
          </div>
          {al && <div style={{ padding: 18 }}><Loading label="Loading appointments…" /></div>}
          {ae && <div style={{ padding: 18 }}><ErrorState error={ae} onRetry={reloadAppts} /></div>}
          {!al && !ae && upcoming.length === 0 && <div style={{ padding: 18 }}><EmptyState title="No upcoming appointments" hint="Book one to get started." /></div>}
          {upcoming.map((a) => (
            <div key={a.id} className="list-row">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{a.time}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{a.date}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{a.type} · {a.reason || 'No reason recorded'}</div>
              </div>
              <span className="badge">{a.status}</span>
            </div>
          ))}
          <div style={{ padding: 16 }}>
            <button className="btn btn-primary w-full" onClick={() => navigate('/patient/book')}>Book new appointment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

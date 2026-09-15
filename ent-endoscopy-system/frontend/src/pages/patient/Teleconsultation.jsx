import { useNavigate } from 'react-router-dom';
import { VideoOff, Calendar, FileText } from 'lucide-react';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Honest teleconsultation page. No WebRTC, signaling server, or video-call
 * infrastructure exists in this repository — the previous version rendered a
 * fake doctor video on canvas with scripted chat replies. This page now shows
 * the patient's real upcoming appointments (the schedulable, software-backed
 * part of a remote visit) and states plainly that live video is not configured.
 */
export default function Teleconsultation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isDoctor = user?.role === 'doctor';
  const { data, loading, error, reload } = useApi('/api/v1/appointments?limit=50');
  const appts = data?.data || [];
  const upcoming = appts.filter((a) => ['SCHEDULED', 'CONFIRMED'].includes((a.status || '').toUpperCase()));

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Remote visits</p>
          <h1 style={{ marginTop: 8 }}>Teleconsultation</h1>
          <p className="page-subtitle">{isDoctor ? 'Sessions on your schedule' : `${user?.name} — your scheduled remote sessions`}</p>
        </div>
        <span className="ai-flag"><VideoOff size={12} /> Live video not configured</span>
      </div>

      <div className="card" style={{ marginBottom: 16, maxWidth: 760 }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>How remote visits work here</div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          Book an appointment marked as a video/tele visit, and your doctor calls you at the
          scheduled time using the phone number on your profile. There is no in-browser video
          calling in this deployment — no WebRTC provider or signaling server is configured.
          Visit notes are recorded in your medical history like any other appointment.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
          {!isDoctor && <button className="btn btn-primary btn-sm" onClick={() => navigate('/patient/book')}><Calendar size={14} /> Book a tele visit</button>}
          <button className="btn btn-sm" onClick={() => navigate(isDoctor ? '/doctor/patients' : '/patient/history')}><FileText size={14} /> {isDoctor ? 'Open patients' : 'View visit notes'}</button>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 760, padding: 0, overflow: 'hidden' }}>
        <div className="section-header" style={{ padding: '16px 18px 12px', margin: 0 }}>
          <span className="section-title" style={{ margin: 0 }}>{isDoctor ? 'Upcoming sessions' : 'Your upcoming appointments'}</span>
          <button className="btn btn-sm btn-ghost" onClick={reload}>Refresh</button>
        </div>
        {loading && <div style={{ padding: 18 }}><Loading label="Loading appointments…" /></div>}
        {error && <div style={{ padding: 18 }}><ErrorState error={error} onRetry={reload} /></div>}
        {!loading && !error && upcoming.length === 0 && (
          <div style={{ padding: 18 }}><EmptyState title="No upcoming appointments" hint="Book a tele visit and it will appear here." /></div>
        )}
        {!loading && !error && upcoming.map((a) => (
          <div key={a.id} className="list-row">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{a.time}</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{a.date} · {(a.type || 'visit')}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{a.reason || 'No reason recorded'} · {a.status}</div>
            </div>
            <span className="badge">{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

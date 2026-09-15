import { useState } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useApi, Loading, ErrorState } from '../../hooks/useApi';

export default function PatientProfile() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useApi('/api/v1/patients?limit=5');
  const mine = data?.data?.[0];
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const current = form || (mine ? { phone: mine.phone || '', blood_group: mine.blood_group || '', age: mine.age || '' } : { phone: '', blood_group: '', age: '' });

  const save = async () => {
    if (!mine) return;
    setBusy(true); setMsg('');
    try {
      await api.put(`/api/v1/patients/${mine.id}`, {
        phone: current.phone, blood_group: current.blood_group,
        age: current.age === '' ? null : Number(current.age),
      });
      setEditing(false); setForm(null); reload();
      setMsg('Profile updated.');
    } catch (e) { setMsg(e?.message || 'Update failed.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 680, margin: '0 auto' }}>
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Account</p>
          <h1 style={{ marginTop: 8 }}>{user?.name}</h1>
          <p className="page-subtitle">{user?.email} · {user?.role}</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="section-header">
          <span className="section-title" style={{ margin: 0 }}>Patient record</span>
          {mine && !editing && <button className="btn btn-sm" onClick={() => setEditing(true)}>Edit</button>}
        </div>
        {loading && <Loading label="Loading record…" />}
        {error && <ErrorState error={error} onRetry={reload} />}
        {!loading && !error && !mine && <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>No patient record is linked to this login yet. Ask reception to create one for your email address.</p>}
        {!loading && !error && mine && (
          <div>
            <div className="kv"><span>Name</span><span>{mine.name}</span></div>
            <div className="kv"><span>Patient ID</span><span style={{ fontSize: '0.76rem' }}>{mine.id}</span></div>
            {editing ? (
              <div style={{ marginTop: 12 }}>
                <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={current.phone} onChange={(e) => setForm({ ...current, phone: e.target.value })} /></div>
                <div className="grid-2">
                  <div className="form-group"><label className="form-label">Blood group</label><input className="form-input" value={current.blood_group} onChange={(e) => setForm({ ...current, blood_group: e.target.value })} placeholder="e.g. O+" /></div>
                  <div className="form-group"><label className="form-label">Age</label><input className="form-input" type="number" value={current.age} onChange={(e) => setForm({ ...current, age: e.target.value })} /></div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-primary btn-sm" disabled={busy} onClick={save}>{busy ? 'Saving…' : 'Save changes'}</button>
                  <button className="btn btn-sm btn-ghost" onClick={() => { setEditing(false); setForm(null); }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 4 }}>
                <div className="kv"><span>Phone</span><span>{mine.phone || '—'}</span></div>
                <div className="kv"><span>Blood group</span><span>{mine.blood_group || '—'}</span></div>
                <div className="kv"><span>Age</span><span>{mine.age ?? '—'}</span></div>
              </div>
            )}
            {msg && <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 10 }}>{msg}</p>}
          </div>
        )}
      </div>

      <div className="card">
        <div className="section-title">Security</div>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Password changes, two-factor authentication, and audit-log export are not implemented
          in this deployment. Sessions are JWT Bearer tokens (60-minute expiry); use Sign out
          to end your session.
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { api } from '../../services/api';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';

const STAFF = ['admin', 'doctor', 'nurse', 'receptionist'];

export default function Beds() {
  const { user } = useAuth();
  const { data: rooms, loading: rl, error: re, reload: reloadRooms } = useApi('/api/v1/beds/rooms');
  const { data: beds, loading: bl, error: be, reload: reloadBeds } = useApi('/api/v1/beds?limit=100');
  const [patientId, setPatientId] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const canManage = STAFF.includes(user?.role);

  const list = beds?.data || [];
  const total = beds?.total ?? list.length;
  const occupied = list.filter((b) => (b.status || '').toLowerCase() === 'occupied').length;
  const reload = () => { reloadRooms(); reloadBeds(); };

  const admit = async (bedId) => {
    if (!patientId.trim()) { setMsg('Enter a patient ID first.'); return; }
    setBusy(true); setMsg('');
    try {
      await api.post('/api/v1/beds/admit', { bed_id: bedId, patient_id: patientId.trim() });
      setMsg('Patient admitted.');
      reload();
    } catch (e) { setMsg(e?.message || 'Admit failed.'); }
    finally { setBusy(false); }
  };

  const discharge = async () => {
    if (!patientId.trim()) { setMsg('Enter a patient ID first.'); return; }
    setBusy(true); setMsg('');
    try {
      await api.post(`/api/v1/beds/discharge/${encodeURIComponent(patientId.trim())}`, {});
      setMsg('Patient discharged.');
      reload();
    } catch (e) { setMsg(e?.message || 'Discharge failed.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Capacity · live from database</p>
          <h1 style={{ marginTop: 8 }}>Beds &amp; wards</h1>
          <p className="page-subtitle">{total} beds · {occupied} occupied{total ? ` · ${((occupied / total) * 100).toFixed(1)}%` : ''}</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-label">Total beds</div><div className="stat-value">{bl ? '—' : total}</div></div>
        <div className="stat-card"><div className="stat-label">Occupied</div><div className="stat-value">{bl ? '—' : occupied}</div></div>
        <div className="stat-card"><div className="stat-label">Available</div><div className="stat-value">{bl ? '—' : total - occupied}</div></div>
      </div>

      {canManage && (
        <div className="card" style={{ marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ margin: 0, flex: 1, minWidth: 220 }}>
            <label className="form-label">Patient ID for admit / discharge</label>
            <input className="form-input" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Paste patient UUID" />
          </div>
          <button className="btn btn-sm" disabled={busy} onClick={discharge}>Discharge patient</button>
          {msg && <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{msg}</span>}
        </div>
      )}

      {(rl || bl) && <Loading label="Loading beds…" />}
      {(re || be) && <ErrorState error={re || be} onRetry={reload} />}
      {!rl && !bl && !(re || be) && list.length === 0 && (
        <EmptyState title="No beds found" hint="Seed data or ask an admin to create rooms." />
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {(Array.isArray(rooms) ? rooms : []).map((r) => (
          <div key={r.id} className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 600 }}>{r.name}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{r.type || 'general'} · {r.total_beds} beds</div>
          </div>
        ))}
      </div>

      <div className="table-wrap" style={{ marginTop: 16 }}>
        <table className="clinical">
          <thead><tr><th>Bed</th><th>Status</th><th>Patient</th>{canManage && <th></th>}</tr></thead>
          <tbody>
            {list.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 600 }}>{b.bed_number || b.id}</td>
                <td><span className={`badge ${(b.status || '').toLowerCase() === 'occupied' ? 'badge-red' : 'badge-green'}`}>{b.status}</span></td>
                <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.patient_id || '—'}</td>
                {canManage && (
                  <td style={{ textAlign: 'right' }}>
                    {(b.status || '').toLowerCase() === 'available'
                      ? <button className="btn btn-sm" disabled={busy} onClick={() => admit(b.id)}>Admit</button>
                      : <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Occupied</span>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

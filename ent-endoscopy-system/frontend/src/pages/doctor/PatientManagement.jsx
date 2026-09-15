import { useState } from 'react';
import { api } from '../../services/api';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function PatientManagement() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const { data, loading, error, reload } = useApi(`/api/v1/patients?limit=50${search ? `&search=${encodeURIComponent(search)}` : ''}`);
  const { data: records, loading: rl } = useApi(selected ? `/api/v1/medical-records?patient_id=${selected.id}` : null, { auto: !!selected });
  const [diag, setDiag] = useState('');
  const [notes, setNotes] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const list = data?.data || [];
  const recList = records?.data || (Array.isArray(records) ? records : []);

  const addRecord = async (e) => {
    e.preventDefault();
    if (!selected || !diag.trim()) return;
    setBusy(true); setMsg('');
    try {
      await api.post('/api/v1/medical-records', { patient_id: selected.id, diagnosis: diag.trim(), notes: notes.trim() || undefined });
      setDiag(''); setNotes(''); setMsg('Record saved.');
    } catch (err) { setMsg(err?.message || 'Could not save record.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Care · live from database</p>
          <h1 style={{ marginTop: 8 }}>Patients</h1>
          <p className="page-subtitle">Search, review history, add clinical notes</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Search patients</label>
          <input className="form-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name, phone, or condition…" />
        </div>
      </div>

      <div className="grid-2">
        <div className="card" style={{ padding: 0, overflow: 'hidden', alignSelf: 'start' }}>
          <div className="section-header" style={{ padding: '16px 18px 12px', margin: 0 }}>
            <span className="section-title" style={{ margin: 0 }}>Results</span>
            <span className="eyebrow">{data?.total ?? list.length} total</span>
          </div>
          {loading && <div style={{ padding: 18 }}><Loading label="Searching…" /></div>}
          {error && <div style={{ padding: 18 }}><ErrorState error={error} onRetry={reload} /></div>}
          {!loading && !error && list.length === 0 && <div style={{ padding: 18 }}><EmptyState title="No patients found" /></div>}
          {list.map((p) => (
            <button key={p.id} onClick={() => { setSelected(p); setMsg(''); }}
              className="list-row" style={{ width: '100%', textAlign: 'left', background: selected?.id === p.id ? 'var(--sage)' : 'transparent', cursor: 'pointer', border: 'none', borderBottom: '1px solid var(--border-light)' }}>
              <div className="avatar avatar-sm">{p.avatar || (p.name || 'P').slice(0, 2).toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{p.age}y · {p.gender} · {p.condition || '—'}</div>
              </div>
              <span className="badge">{p.status}</span>
            </button>
          ))}
        </div>

        <div className="card" style={{ alignSelf: 'start' }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Patient detail</div>
          {!selected && <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Select a patient to see history and add notes.</p>}
          {selected && (
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{selected.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 12 }}>{selected.phone} · {selected.email || 'no email'} · ID {selected.id}</div>
              <div className="section-title">History</div>
              {rl && <Loading label="Loading history…" />}
              {!rl && recList.length === 0 && <EmptyState title="No records yet" />}
              {recList.map((r) => (
                <div key={r.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.86rem' }}>
                  <div style={{ fontWeight: 600 }}>{r.diagnosis || 'Note'}{r.is_ai_generated ? <span className="ai-flag" style={{ marginLeft: 8 }}>AI draft · review required</span> : null}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{r.notes}</div>
                </div>
              ))}
              <form onSubmit={addRecord} style={{ marginTop: 14 }}>
                <div className="form-group"><label className="form-label">Diagnosis</label><input className="form-input" value={diag} onChange={(e) => setDiag(e.target.value)} required /></div>
                <div className="form-group"><label className="form-label">Notes</label><textarea className="form-textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
                {msg && <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{msg}</p>}
                <button className="btn btn-primary btn-sm" disabled={busy}>{busy ? 'Saving…' : 'Add record'}</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { api } from '../../services/api';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Lab() {
  const { user } = useAuth();
  const { data: tests, loading: tl, error: te, reload: reloadTests } = useApi('/api/v1/labs/tests');
  const { data: reports, loading: rl, error: re, reload: reloadReports } = useApi('/api/v1/labs/reports?limit=50');
  const [patientId, setPatientId] = useState('');
  const [testId, setTestId] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [uploadId, setUploadId] = useState('');
  const canOrder = ['admin', 'doctor', 'labtech', 'nurse', 'receptionist'].includes(user?.role);
  const canUpload = ['admin', 'doctor', 'labtech'].includes(user?.role);
  const testList = Array.isArray(tests) ? tests : tests?.data || [];
  const reportList = reports?.data || [];
  const reload = () => { reloadTests(); reloadReports(); };

  const order = async (e) => {
    e.preventDefault();
    if (!patientId.trim() || !testId) { setMsg('Patient ID and test are required.'); return; }
    setBusy(true); setMsg('');
    try {
      await api.post('/api/v1/labs/reports', { patient_id: patientId.trim(), test_id: testId, ordered_by: user?.name });
      setMsg('Test ordered.');
      reloadReports();
    } catch (err) { setMsg(err?.message || 'Could not order test.'); }
    finally { setBusy(false); }
  };

  const upload = async (reportId, f) => {
    if (!f) return;
    setBusy(true); setMsg('');
    try {
      const token = localStorage.getItem('medicore_token');
      const fd = new FormData();
      fd.append('file', f);
      const res = await fetch(`${API_BASE}/api/v1/labs/reports/${reportId}/upload`, {
        method: 'POST', headers: token ? { Authorization: `Bearer ${token}` } : {}, body: fd,
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg('Report file stored on the API server (local disk — cloud storage not configured).');
      reloadReports();
    } catch (e) { setMsg(typeof e?.message === 'string' ? e.message : 'Upload failed.'); }
    finally { setBusy(false); setUploadId(''); }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Diagnostics · live from database</p>
          <h1 style={{ marginTop: 8 }}>Laboratory</h1>
          <p className="page-subtitle">Order tests, track reports, store result files locally</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      {canOrder && (
        <form onSubmit={order} className="card" style={{ marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ margin: 0, flex: 1, minWidth: 200 }}>
            <label className="form-label">Patient ID</label>
            <input className="form-input" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Paste patient UUID" />
          </div>
          <div className="form-group" style={{ margin: 0, flex: 1, minWidth: 200 }}>
            <label className="form-label">Test</label>
            <select className="form-select" value={testId} onChange={(e) => setTestId(e.target.value)}>
              <option value="">Select…</option>
              {testList.map((t) => <option key={t.id} value={t.id}>{t.name} · ₹{t.price}</option>)}
            </select>
          </div>
          <button className="btn btn-primary btn-sm" disabled={busy}>Order test</button>
          {msg && <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{msg}</span>}
        </form>
      )}

      <div className="grid-2">
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="section-header" style={{ padding: '16px 18px 12px', margin: 0 }}>
            <span className="section-title" style={{ margin: 0 }}>Reports</span>
            <span className="eyebrow">{reportList.length} shown</span>
          </div>
          {rl && <div style={{ padding: 18 }}><Loading label="Loading reports…" /></div>}
          {re && <div style={{ padding: 18 }}><ErrorState error={re} onRetry={reloadReports} /></div>}
          {!rl && !re && reportList.length === 0 && <div style={{ padding: 18 }}><EmptyState title="No lab reports" hint="Order a test above." /></div>}
          {reportList.map((r) => (
            <div key={r.id} className="list-row" style={{ gridTemplateColumns: '1fr auto' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.test_id} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.78rem' }}>· {r.patient_id}</span></div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{r.status}{r.priority ? ` · ${r.priority}` : ''}{r.result_file_url ? ` · stored: ${r.result_file_url}` : ''}</div>
                {canUpload && (
                  <label className="btn btn-sm btn-ghost" style={{ marginTop: 8, cursor: 'pointer' }}>
                    {uploadId === r.id ? 'Choose file…' : 'Upload result (PDF/JPG/PNG)'}
                    <input type="file" hidden accept="application/pdf,image/jpeg,image/png,text/plain"
                      onChange={(e) => { setUploadId(r.id); upload(r.id, e.target.files?.[0]); }} />
                  </label>
                )}
              </div>
              <span className={`badge ${r.status === 'COMPLETED' ? 'badge-green' : 'badge-yellow'}`}>{r.status}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ alignSelf: 'start' }}>
          <div className="section-title">Available tests</div>
          {tl && <Loading label="Loading tests…" />}
          {te && <ErrorState error={te} onRetry={reloadTests} />}
          {!tl && !te && testList.map((t) => (
            <div key={t.id} className="kv"><span>{t.name} · {t.turnaround}</span><span>₹{t.price}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

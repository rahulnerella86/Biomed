import { useState } from 'react';
import { api } from '../../services/api';
import { useApi, Loading, ErrorState } from '../../hooks/useApi';

export default function DoctorPrescription() {
  const { data: meds, loading: ml, error: me } = useApi('/api/v1/prescriptions/medicines?limit=100');
  const [patientId, setPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [lines, setLines] = useState([{ medicine_name: '', dosage: '', frequency: '', duration: '' }]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const medList = meds?.data || [];

  const setLine = (i, k, v) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, [k]: v } : l)));

  const save = async (e) => {
    e.preventDefault();
    setMsg(''); setErr('');
    const items = lines.filter((l) => l.medicine_name.trim());
    if (!patientId.trim() || items.length === 0) { setErr('Patient ID and at least one medicine are required.'); return; }
    setBusy(true);
    try {
      await api.post('/api/v1/prescriptions', { patient_id: patientId.trim(), diagnosis: diagnosis.trim() || undefined, items });
      setMsg('Prescription saved to the database.');
      setLines([{ medicine_name: '', dosage: '', frequency: '', duration: '' }]);
    } catch (e2) { setErr(e2?.message || 'Could not save prescription. Only doctor accounts may prescribe.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Prescribing · saved to database</p>
          <h1 style={{ marginTop: 8 }}>New prescription</h1>
          <p className="page-subtitle">Doctor accounts only, enforced server-side</p>
        </div>
      </div>

      <form onSubmit={save} className="card" style={{ maxWidth: 720 }}>
        <div className="grid-2">
          <div className="form-group"><label className="form-label">Patient ID</label><input className="form-input" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Paste patient UUID" required /></div>
          <div className="form-group"><label className="form-label">Diagnosis</label><input className="form-input" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} placeholder="e.g. Otitis media" /></div>
        </div>
        {ml && <Loading label="Loading formulary…" />}
        {me && <ErrorState error={me} />}
        {lines.map((l, i) => (
          <div key={i} className="grid-2" style={{ borderTop: '1px solid var(--border-light)', paddingTop: 12 }}>
            <div className="form-group">
              <label className="form-label">Medicine {i + 1}</label>
              <input className="form-input" list="formulary" value={l.medicine_name} onChange={(e) => setLine(i, 'medicine_name', e.target.value)} placeholder="Start typing…" />
              <datalist id="formulary">{medList.map((m) => <option key={m.id} value={m.name} />)}</datalist>
            </div>
            <div className="form-group"><label className="form-label">Dosage</label><input className="form-input" value={l.dosage} onChange={(e) => setLine(i, 'dosage', e.target.value)} placeholder="e.g. 500mg" /></div>
            <div className="form-group"><label className="form-label">Frequency</label><input className="form-input" value={l.frequency} onChange={(e) => setLine(i, 'frequency', e.target.value)} placeholder="e.g. twice daily" /></div>
            <div className="form-group"><label className="form-label">Duration</label><input className="form-input" value={l.duration} onChange={(e) => setLine(i, 'duration', e.target.value)} placeholder="e.g. 7 days" /></div>
          </div>
        ))}
        <button type="button" className="btn btn-sm" onClick={() => setLines((ls) => [...ls, { medicine_name: '', dosage: '', frequency: '', duration: '' }])}>Add line</button>
        {err && <p style={{ color: 'var(--color-error)', fontSize: '0.85rem', marginTop: 10 }}>{err}</p>}
        {msg && <p style={{ color: 'var(--color-success)', fontSize: '0.85rem', marginTop: 10 }}>{msg}</p>}
        <div><button className="btn btn-primary" style={{ marginTop: 14 }} disabled={busy}>{busy ? 'Saving…' : 'Save prescription'}</button></div>
      </form>
    </div>
  );
}

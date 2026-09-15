import { useState } from 'react';
import { api } from '../../services/api';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function BookAppointment() {
  const [search, setSearch] = useState('');
  const { data: doctors, loading: dl, error: de } = useApi(`/api/v1/doctors?limit=100${search ? `&search=${encodeURIComponent(search)}` : ''}`);
  const { data: mine } = useApi('/api/v1/patients?limit=5');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const docList = doctors?.data || (Array.isArray(doctors) ? doctors : []);
  const myPatient = mine?.data?.[0];

  const book = async (e) => {
    e.preventDefault();
    setMsg(''); setErr('');
    if (!myPatient) { setErr('No patient record is linked to your account yet. Ask reception to create one for your email.'); return; }
    if (!doctorId || !date || !time) { setErr('Doctor, date, and time are all required.'); return; }
    setBusy(true);
    try {
      const appt = await api.post('/api/v1/appointments', {
        patient_id: myPatient.id, doctor_id: doctorId, date, time,
        type: 'In-Person', status: 'SCHEDULED', reason: reason || undefined,
      });
      setMsg(`Booked for ${appt.date} at ${appt.time}. Double-booking is blocked server-side (409 if taken).`);
      setReason('');
    } catch (e2) { setErr(e2?.message || 'Booking failed.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Scheduling · double-booking blocked by database</p>
          <h1 style={{ marginTop: 8 }}>Book an appointment</h1>
          <p className="page-subtitle">{myPatient ? `Booking as ${myPatient.name}` : 'Your patient record will be detected automatically'}</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="eyebrow" style={{ marginBottom: 12 }}>1 · Find a doctor (live)</div>
          <div className="form-group">
            <label className="form-label">Search</label>
            <input className="form-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name or specialty…" />
          </div>
          {dl && <Loading label="Loading doctors…" />}
          {de && <ErrorState error={de} />}
          {!dl && !de && docList.length === 0 && <EmptyState title="No doctors found" />}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 340, overflowY: 'auto' }}>
            {docList.map((d) => (
              <button key={d.id} type="button" onClick={() => setDoctorId(d.id)}
                className="btn" style={doctorId === d.id ? { borderColor: 'var(--pine)', background: 'var(--sage)' } : { justifyContent: 'flex-start' }}>
                <span style={{ fontWeight: 600 }}>{d.name}</span>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{d.specialty}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={book} className="card" style={{ alignSelf: 'start' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>2 · Pick a slot</div>
          <div className="grid-2">
            <div className="form-group"><label className="form-label">Date</label><input className="form-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
            <div className="form-group"><label className="form-label">Time</label><input className="form-input" type="time" value={time} onChange={(e) => setTime(e.target.value)} required /></div>
          </div>
          <div className="form-group">
            <label className="form-label">Reason (optional)</label>
            <input className="form-input" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g. ear pain, follow-up" />
          </div>
          {err && <p style={{ color: 'var(--color-error)', fontSize: '0.85rem', marginBottom: 10 }}>{err}</p>}
          {msg && <p style={{ color: 'var(--color-success)', fontSize: '0.85rem', marginBottom: 10 }}>{msg}</p>}
          <button className="btn btn-primary w-full" disabled={busy}>{busy ? 'Booking…' : 'Confirm booking'}</button>
        </form>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Save, Plus, CheckCircle } from 'lucide-react';
import { mockPatients } from '../../data/mockData';

export default function DoctorPrescription() {
  const [patientId, setPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [remarks, setRemarks] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', frequency: '', duration: '' }]);
  const [saved, setSaved] = useState(false);

  const selectedPatient = mockPatients.find(p => p.id === patientId);
  const addMed = () => setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }]);
  const updateMed = (i, f, v) => { const m = [...medicines]; m[i][f] = v; setMedicines(m); };
  const removeMed = i => setMedicines(medicines.filter((_, j) => j !== i));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => { setSaved(false); setPatientId(''); setDiagnosis(''); setRemarks(''); setMedicines([{ name: '', dosage: '', frequency: '', duration: '' }]); }, 3000);
  };

  return (
    <div className="animate-fadeIn">
      <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '4px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 1 }}>
          Prescription <span style={{ color: 'var(--brand-red)' }}>Generator.</span>
        </h1>
      </div>

      <div className="grid-2" style={{ gap: 32, alignItems: 'flex-start' }}>
        {/* Form */}
        <div className="card">
          <div style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', borderBottom: '2px solid var(--border-color)', paddingBottom: 16, marginBottom: 24 }}>01 / Patient Details</div>

          <div className="form-group">
            <label className="form-label">Select Patient</label>
            <select className="form-select" value={patientId} onChange={e => setPatientId(e.target.value)}>
              <option value="">-- Choose Patient --</option>
              {mockPatients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.age}y, {p.gender})</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Primary Diagnosis</label>
            <input className="form-input" value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="e.g. Acute Otitis Media" />
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', borderBottom: '2px solid var(--border-color)', paddingBottom: 16, marginBottom: 24, marginTop: 32 }}>02 / Medications</div>

          {medicines.map((m, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 40px', gap: 8, marginBottom: 12, alignItems: 'flex-end' }}>
              <div><label className="form-label">Medicine</label><input className="form-input" placeholder="Name" value={m.name} onChange={e => updateMed(i, 'name', e.target.value)} /></div>
              <div><label className="form-label">Dosage</label><input className="form-input" placeholder="500mg" value={m.dosage} onChange={e => updateMed(i, 'dosage', e.target.value)} /></div>
              <div><label className="form-label">Frequency</label>
                <select className="form-select" value={m.frequency} onChange={e => updateMed(i, 'frequency', e.target.value)}>
                  <option value="">--</option><option>Once daily</option><option>Twice daily</option><option>Three times daily</option><option>As needed</option>
                </select>
              </div>
              <div><label className="form-label">Duration</label><input className="form-input" placeholder="7 days" value={m.duration} onChange={e => updateMed(i, 'duration', e.target.value)} /></div>
              {medicines.length > 1 && <button className="btn btn-icon" style={{ color: 'var(--brand-red)', alignSelf: 'flex-end', height: 42 }} onClick={() => removeMed(i)}>✕</button>}
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" onClick={addMed} style={{ marginTop: 8 }}><Plus size={14} /> Add Medicine</button>

          <div className="form-group" style={{ marginTop: 24 }}>
            <label className="form-label">Remarks & Instructions</label>
            <textarea className="form-textarea" rows={3} value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Specific instructions for the patient..." />
          </div>

          <button className="btn btn-primary w-full" style={{ marginTop: 24, padding: 16, fontSize: '1rem' }} onClick={handleSave} disabled={!patientId || !diagnosis || saved}>
            {saved ? <><CheckCircle size={18} /> Sent to Patient ✓</> : <><Save size={18} /> Save & Send Prescription</>}
          </button>
        </div>

        {/* Live Preview */}
        <div style={{ background: '#fff', border: '2px solid #0a0a0a', padding: 40, boxShadow: '6px 6px 0px #0a0a0a', color: '#0a0a0a', fontFamily: '"Inter", sans-serif' }}>
          <div style={{ borderBottom: '4px solid #0a0a0a', paddingBottom: 16, marginBottom: 24 }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>ENT Scope Pro</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#666' }}>Dr. Sarah Jenkins · ENT Specialist</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: 4 }}>Patient</div>
              <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1.1rem' }}>{selectedPatient ? selectedPatient.name : '—'}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', color: '#666', marginBottom: 4 }}>Date</div>
              <div style={{ fontWeight: 900 }}>{new Date().toLocaleDateString()}</div>
            </div>
          </div>

          <div style={{ background: '#0a0a0a', color: '#fff', padding: '8px 16px', marginBottom: 24 }}>
            <span style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.8rem' }}>Diagnosis: </span>
            <span style={{ fontWeight: 700 }}>{diagnosis || '—'}</span>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em', marginBottom: 16, fontStyle: 'italic' }}>Rx</div>
            {medicines.filter(m => m.name).length === 0 ? (
              <div style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic' }}>No medications added...</div>
            ) : medicines.map((m, i) => m.name && (
              <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #ccc' }}>
                <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1rem' }}>{i+1}. {m.name} {m.dosage && <span style={{ color: '#e64833' }}>({m.dosage})</span>}</div>
                <div style={{ fontWeight: 600, color: '#666', fontSize: '0.85rem', marginTop: 4 }}>Sig: {m.frequency} {m.duration && `for ${m.duration}`}</div>
              </div>
            ))}
          </div>

          {remarks && (
            <div style={{ border: '2px solid #0a0a0a', padding: 16, marginBottom: 24 }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>Instructions</div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.5 }}>{remarks}</p>
            </div>
          )}

          <div style={{ borderTop: '4px solid #0a0a0a', paddingTop: 16, marginTop: 40, textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em' }}>Dr. S. Jenkins</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#666' }}>Doctor's Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
}

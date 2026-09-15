import { useState } from 'react';
import { Bot, AlertTriangle, Clock, Building2 } from 'lucide-react';
import { api } from '../../services/api';
import { useApi } from '../../hooks/useApi';

const DISCLAIMER = "AI-generated information is for educational and administrative assistance only and is not a medical diagnosis. Always consult a qualified healthcare professional.";

export default function AITriage() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: deptData } = useApi('/api/v1/departments');
  const deptList = Array.isArray(deptData) ? deptData : deptData?.data || [];

  const runTriage = async () => {
    if (!symptoms.trim()) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const data = await api.post('/api/v1/ai/symptom-guidance', { symptoms });
      setResult(data.triage);
    } catch (e) {
      // No local fallback: fabricating triage guidance offline would be dishonest.
      setError(e?.message || 'Guidance service is unreachable. Check that the API is running and try again.');
    } finally { setLoading(false); }
  };

  const deptName = (id) => deptList.find((d) => d.id === id || d.slug === id)?.name || id;

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 800 }}>
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Guidance · rule-based unless a live model is configured</p>
          <h1 style={{ marginTop: 8 }}>Symptom guidance</h1>
          <p className="page-subtitle">Department suggestion + urgency — educational only</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <label style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: 8, display: 'block' }}>Your Symptoms</label>
        <textarea value={symptoms} onChange={e=>setSymptoms(e.target.value)} placeholder="e.g., Severe ear pain with discharge and mild fever for 2 days..." rows={4} style={{ width: '100%', border: '2px solid var(--border-color)', padding: 16, fontWeight: 600, resize: 'vertical' }} />
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {["Ear pain with fever","Chest pain & breathlessness","Knee fracture swelling","Child fever 102°F","Severe headache & vomiting"].map(ex => (
            <button key={ex} onClick={()=>setSymptoms(ex)} className="badge" style={{ cursor: 'pointer', background: 'var(--bg-hover)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', padding: '6px 10px' }}>{ex}</button>
          ))}
        </div>
        <button onClick={runTriage} disabled={loading || !symptoms.trim()} className="btn btn-primary" style={{ marginTop: 16, width: '100%', padding: 14 }}>
          {loading ? 'Requesting guidance…' : <><Bot size={18} style={{ marginRight: 8 }} /> Get guidance →</>}
        </button>
        {error && <p style={{ color: 'var(--color-error)', fontSize: '0.86rem', marginTop: 12 }}>{error}</p>}
      </div>

      {result && (
        <div className="card" style={{ border: `2px solid ${result.urgency==='emergency' ? 'var(--brand-red)' : 'var(--border-color)'}`, background: result.urgency==='emergency' ? '#fef2f2' : 'var(--bg-card)' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, background: result.urgency==='emergency'?'var(--brand-red)':'#0a0a0a', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid var(--border-color)' }}>
              {result.urgency==='emergency' ? <AlertTriangle size={22}/> : <Building2 size={22}/>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '1.2rem' }}>{deptName(result.department)}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.8rem' }}>Suggested: {result.suggestedDoctor}</div>
            </div>
            <span className="badge" style={{ background: result.urgency==='emergency'?'var(--brand-red)': result.urgency==='urgent'?'#f59e0b':'#0d9488', color:'#fff', padding: '8px 12px', textTransform: 'uppercase', fontWeight: 900 }}>{result.urgency}</span>
          </div>
          <p style={{ fontWeight: 600, marginBottom: 12 }}>{result.reasoning}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <div style={{ padding: 12, background: 'var(--bg-hover)', border: '2px solid var(--border-color)', display:'flex', gap:8, alignItems:'center' }}><Clock size={14}/> Wait: {result.estimatedWait}</div>
            <div style={{ padding: 12, background: 'var(--bg-hover)', border: '2px solid var(--border-color)' }}>Rule score: {(result.confidence*100).toFixed(0)}% (not a probability)</div>
          </div>
          <div style={{ marginTop: 8, height: 8, background: 'var(--bg-hover)', border: '1px solid var(--border-color)' }}><div style={{ width: `${result.confidence*100}%`, height: '100%', background: 'var(--brand-red)' }}/></div>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 6 }}>Rule-based score from keyword matching — not a calibrated probability. A live model is only used when the server sets AI_PROVIDER=azure with credentials.</p>
          <div style={{ marginTop:12, padding:10, background:'#fefce8', border:'2px solid #eab308', fontSize:'0.75rem', fontWeight:700 }}>{DISCLAIMER} {result.urgency==='emergency' && <span style={{ color:'#dc2626' }}> If emergency, call 102/108 or go to Emergency immediately.</span>}</div>
        </div>
      )}
    </div>
  );
}

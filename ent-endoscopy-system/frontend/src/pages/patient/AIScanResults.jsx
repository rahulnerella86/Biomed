import { useState, useRef, useEffect } from 'react';
import { Upload, Brain, AlertCircle, CheckCircle, Info, Zap, Loader } from 'lucide-react';
import { diseases } from '../../data/mockData';

const severityConfig = {
  'Normal Ear':                   { color: '#10b981', bg: '#f0fdf4', label: 'Normal',   next: 'No immediate action needed. Routine checkup in 6 months.' },
  'Ear Wax':                      { color: '#f59e0b', bg: '#fffbeb', label: 'Mild',     next: 'Use ear softening drops. Follow up in 2 weeks.' },
  'Otitis Media':                 { color: '#f97316', bg: '#fff7ed', label: 'Moderate', next: 'Antibiotic therapy recommended. Follow up in 1 week.' },
  'Tympanic Membrane Perforation':{ color: '#ef4444', bg: '#fef2f2', label: 'Severe',   next: 'Urgent ENT specialist consultation required.' },
  'Fungal Infection':             { color: '#8b5cf6', bg: '#faf5ff', label: 'Moderate', next: 'Antifungal ear drops prescribed. Avoid moisture.' },
  'External Ear Infection':       { color: '#f97316', bg: '#fff7ed', label: 'Moderate', next: 'Antibiotic and anti-inflammatory drops required.' },
  'Needs Specialist Review':      { color: '#6b7280', bg: '#f9fafb', label: 'Review',   next: 'Please consult a Head & Neck specialist immediately.' },
};

function HeatmapCanvas({ intensity = 0.7 }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 300, 200);
    // Draw simulated ear canal base
    const bg = ctx.createRadialGradient(150, 100, 10, 150, 100, 120);
    bg.addColorStop(0, '#ffe0d0'); bg.addColorStop(1, '#c06050');
    ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(150, 100, 110, 90, 0, 0, 2*Math.PI); ctx.fill();
    // Heatmap blobs
    [[130, 85, 60], [160, 110, 50], [120, 115, 40]].forEach(([x, y, r]) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(255,50,50,${intensity * 0.85})`);
      g.addColorStop(0.5, `rgba(255,150,0,${intensity * 0.5})`);
      g.addColorStop(1, 'rgba(255,255,0,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, 300, 200);
    });
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(150, 100, 110, 90, 0, 0, 2*Math.PI); ctx.stroke();
  }, [intensity]);
  return <canvas ref={ref} width={300} height={200} style={{ borderRadius: 12, width: '100%' }} />;
}

export default function AIScanResults() {
  const [image, setImage] = useState(null);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImage(url); setResult(null);
  };

  const runAI = async () => {
    setRunning(true); setResult(null);
    await new Promise(r => setTimeout(r, 2200));
    const label = diseases[Math.floor(Math.random() * diseases.length)];
    const confidence = 0.78 + Math.random() * 0.2;
    setResult({ label, confidence, severity: severityConfig[label]?.label || 'Unknown', heatmapIntensity: confidence - 0.1, alternatives: diseases.filter(d => d !== label).slice(0, 3).map(d => ({ label: d, confidence: Math.random() * 0.15 })) });
    setRunning(false);
  };

  const sc = result ? severityConfig[result.label] : null;

  return (
    <div className="animate-fadeIn">
      <div className="grid-2" style={{ gap: 24, alignItems: 'flex-start' }}>
        {/* Left: Upload + Image */}
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="section-header"><span className="section-title">Upload ENT Image</span></div>
            {!image ? (
              <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed var(--border-color)', borderRadius: 14, padding: 48, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: 'var(--bg-hover)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
                <Upload size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>Upload Endoscopy Image</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>JPG, PNG · Max 10MB</p>
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleUpload} />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <img src={image} alt="ENT Scan" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', maxHeight: 260 }} />
                <button className="btn btn-sm btn-ghost" style={{ position: 'absolute', top: 8, right: 8 }} onClick={() => { setImage(null); setResult(null); }}>✕ Remove</button>
              </div>
            )}
            <button className="btn btn-primary w-full" style={{ marginTop: 16 }} disabled={!image || running} onClick={runAI}>
              {running ? <><Loader size={16} className="animate-spin" /> Analyzing with TFLite…</> : <><Brain size={16} /> Run AI Diagnosis</>}
            </button>
          </div>

          {/* AI Pipeline Steps */}
          <div className="card">
            <div className="section-title" style={{ marginBottom: 14 }}>AI Pipeline</div>
            {['Image Capture','Image Enhancement','Noise Removal','Region Detection','Disease Classification','Confidence Score','Heatmap Generation'].map((step, i) => {
              const done = result && !running;
              const active = running && i === 4;
              return (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: done ? '#10b981' : active ? '#2563eb' : 'var(--bg-hover)', border: `2px solid ${done ? '#10b981' : active ? '#2563eb' : 'var(--border-color)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}>
                    {done ? <span style={{ fontSize: 11, color: '#fff' }}>✓</span> : active ? <Loader size={12} color="#fff" className="animate-spin" /> : <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700 }}>{i+1}</span>}
                  </div>
                  <span style={{ fontSize: '0.82rem', color: done ? 'var(--text-primary)' : active ? '#2563eb' : 'var(--text-muted)', fontWeight: done || active ? 600 : 400 }}>{step}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Results */}
        <div>
          {!result && !running && (
            <div className="card" style={{ textAlign: 'center', padding: 60 }}>
              <Brain size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8 }}>No Analysis Yet</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Upload an ENT scan image and click "Run AI Diagnosis" to get results.</p>
            </div>
          )}
          {running && (
            <div className="card" style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eff6ff', border: '3px solid #2563eb30', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', animation: 'pulse 1.5s infinite' }}>
                <Brain size={32} color="#2563eb" />
              </div>
              <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Analyzing ENT Scan…</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>TFLite model processing. This takes ~2 seconds.</p>
            </div>
          )}
          {result && sc && (
            <div className="animate-bounceIn">
              {/* Main Result Card */}
              <div className="card" style={{ border: `2px solid ${sc.color}30`, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: sc.bg, border: `2px solid ${sc.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {result.label === 'Normal Ear' ? <CheckCircle size={24} color={sc.color} /> : <AlertCircle size={24} color={sc.color} />}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.2rem', color: sc.color }}>{result.label}</div>
                    <span className={`badge ${sc.label === 'Normal' ? 'badge-green' : sc.label === 'Mild' ? 'badge-yellow' : sc.label === 'Moderate' ? 'badge-yellow' : 'badge-red'}`}>{sc.label} Severity</span>
                  </div>
                </div>

                {/* Confidence */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>AI Confidence</span>
                    <span style={{ fontWeight: 800, color: sc.color, fontFamily: 'Outfit,sans-serif', fontSize: '1rem' }}>{(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${result.confidence * 100}%`, background: `linear-gradient(90deg, ${sc.color}, ${sc.color}88)` }} />
                  </div>
                </div>

                {/* Heatmap */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Abnormality Heatmap</div>
                  <HeatmapCanvas intensity={result.heatmapIntensity} />
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 6 }}>Red regions indicate areas of highest abnormality detected by the AI model.</p>
                </div>

                {/* Action */}
                <div style={{ background: sc.bg, border: `1px solid ${sc.color}20`, borderRadius: 10, padding: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: sc.color, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}><Zap size={14} />Suggested Action</div>
                  <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{sc.next}</p>
                </div>
              </div>

              {/* Alternative diagnoses */}
              <div className="card">
                <div className="section-title" style={{ marginBottom: 12 }}>Differential Diagnoses</div>
                {result.alternatives.map(a => (
                  <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span style={{ flex: 1, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{a.label}</span>
                    <div style={{ width: 80 }} className="progress-bar"><div className="progress-fill" style={{ width: `${a.confidence * 100}%`, background: '#94a3b8' }} /></div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', minWidth: 36, textAlign: 'right' }}>{(a.confidence * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

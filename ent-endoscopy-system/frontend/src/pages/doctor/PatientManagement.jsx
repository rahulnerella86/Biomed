import { useState } from 'react';
import { mockPatients, mockReports } from '../../data/mockData';
import { Search, Filter, Eye, FileText, Upload, ChevronRight } from 'lucide-react';

export default function PatientManagement() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = mockPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  );

  const patientReports = mockReports.filter(r => r.patientId === selected?.id);

  return (
    <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap: 20 }}>
      {/* Patient List */}
      <div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="input-wrapper" style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Search size={15} style={{ position: 'absolute', left: 12, color: 'var(--text-muted)' }} />
              <input className="form-input" placeholder="Search patients…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
            </div>
            <button className="btn btn-ghost btn-sm"><Filter size={14} /> Filter</button>
          </div>
        </div>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-hover)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px', gap: 12 }}>
            {['Patient', 'Last Visit', 'Condition', ''].map(h => (
              <div key={h} style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</div>
            ))}
          </div>
          {filtered.map(p => (
            <div key={p.id} onClick={() => setSelected(selected?.id === p.id ? null : p)} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', background: selected?.id === p.id ? 'var(--bg-active)' : 'transparent', transition: 'background 0.15s' }}
              onMouseEnter={e => { if (selected?.id !== p.id) e.currentTarget.style.background = 'var(--bg-hover)'; }}
              onMouseLeave={e => { if (selected?.id !== p.id) e.currentTarget.style.background = 'transparent'; }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar avatar-sm" style={{ background: '#eff6ff', color: '#2563eb', fontWeight: 700, fontSize: '0.75rem' }}>{p.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{p.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.age}y · {p.gender} · {p.bloodGroup}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>{p.lastVisit}</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className={`badge ${p.condition === 'Normal' ? 'badge-green' : p.condition === 'Ear Wax' ? 'badge-yellow' : 'badge-red'}`} style={{ fontSize: '0.7rem' }}>{p.condition}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <ChevronRight size={16} color="var(--text-muted)" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Detail Panel */}
      {selected && (
        <div className="animate-slideLeft">
          <div className="card" style={{ marginBottom: 16, background: 'linear-gradient(135deg,#eff6ff,#f0fdfa)', border: '1px solid #2563eb20' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div className="avatar avatar-lg" style={{ background: 'linear-gradient(135deg,#2563eb,#0d9488)', color: '#fff', fontSize: '1.1rem', border: 'none' }}>{selected.avatar}</div>
              <div>
                <h3 style={{ fontFamily: 'Outfit,sans-serif', fontSize: '1.2rem', fontWeight: 800 }}>{selected.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{selected.age}y · {selected.gender} · {selected.bloodGroup}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <span className={`badge ${selected.condition === 'Normal' ? 'badge-green' : 'badge-yellow'}`}>{selected.condition}</span>
                </div>
              </div>
              <button className="btn btn-sm btn-ghost" style={{ marginLeft: 'auto' }} onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Phone', selected.phone], ['Email', selected.email], ['Last Visit', selected.lastVisit]].map(([k, v]) => (
                <div key={k}><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{v}</div></div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <button className="btn btn-sm btn-primary"><FileText size={13} /> Add Report</button>
            <button className="btn btn-sm btn-secondary"><Upload size={13} /> Upload Scan</button>
            <button className="btn btn-sm btn-outline"><Eye size={13} /> Full History</button>
          </div>

          <div className="card">
            <div className="section-title" style={{ marginBottom: 12 }}>Patient Reports</div>
            {patientReports.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center', padding: 20 }}>No reports for this patient.</p>
            ) : patientReports.map(r => (
              <div key={r.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: 2 }}>{r.diagnosis}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6 }}>{r.date} · AI: {r.aiResult.label} ({(r.aiResult.confidence*100).toFixed(0)}%)</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.remarks}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

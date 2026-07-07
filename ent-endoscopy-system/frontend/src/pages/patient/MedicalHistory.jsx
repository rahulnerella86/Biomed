import { mockMedicalHistory } from '../../data/mockData';
import { AlertTriangle, Pill, Scissors, Users, History, Calendar } from 'lucide-react';

const Section = ({ icon: Icon, color, bg, title, children }) => (
  <div className="card" style={{ marginBottom: 20 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} color={color} /></div>
      <span className="section-title">{title}</span>
    </div>
    {children}
  </div>
);

export default function MedicalHistory() {
  const h = mockMedicalHistory;
  return (
    <div className="animate-fadeIn">
      <div className="grid-2">
        <div>
          <Section icon={AlertTriangle} color="#ef4444" bg="#fef2f2" title="Allergies">
            {h.allergies.length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No known allergies.</p> : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {h.allergies.map(a => <span key={a} className="badge badge-red" style={{ padding: '5px 12px', fontSize: '0.82rem' }}>{a}</span>)}
              </div>
            )}
          </Section>

          <Section icon={Pill} color="#2563eb" bg="#eff6ff" title="Current Medications">
            {h.medications.length === 0 ? <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No current medications.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {h.medications.map(m => (
                  <div key={m} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'var(--bg-hover)', borderRadius: 8 }}>
                    <Pill size={14} color="#2563eb" /><span style={{ fontSize: '0.875rem' }}>{m}</span>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section icon={Scissors} color="#8b5cf6" bg="#faf5ff" title="Surgeries & Procedures">
            {h.surgeries.map((s, i) => (
              <div key={i} style={{ border: '1px solid var(--border-color)', borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{s.procedure}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>📅 {s.date}</span>
                  <span>🏥 {s.hospital}</span>
                  <span>👨‍⚕️ {s.surgeon}</span>
                </div>
              </div>
            ))}
          </Section>

          <Section icon={Users} color="#f59e0b" bg="#fffbeb" title="Family History">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {h.familyHistory.map(f => <span key={f} className="badge badge-yellow" style={{ padding: '5px 12px', fontSize: '0.82rem' }}>{f}</span>)}
            </div>
          </Section>
        </div>

        <div>
          <Section icon={History} color="#0d9488" bg="#f0fdfa" title="Visit History">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {h.visits.map((v, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: 16, marginBottom: 16, borderBottom: i < h.visits.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0d9488', flexShrink: 0 }}></div>
                    {i < h.visits.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border-color)' }}></div>}
                  </div>
                  <div style={{ flex: 1, paddingBottom: 4 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: 2 }}>{v.reason}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                      <Calendar size={11} style={{ display: 'inline', marginRight: 4 }} />{v.date} · {v.doctor}
                    </div>
                    <span className="badge badge-teal">{v.diagnosis}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

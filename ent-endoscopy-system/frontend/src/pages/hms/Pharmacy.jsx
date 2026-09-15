import { useState } from 'react';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function Pharmacy() {
  const [search, setSearch] = useState('');
  const { data: meds, loading, error, reload } = useApi(`/api/v1/prescriptions/medicines${search ? `?search=${encodeURIComponent(search)}` : ''}`);
  const { data: rx } = useApi('/api/v1/prescriptions?limit=20');
  const list = meds?.data || [];
  const scripts = rx?.data || [];
  const low = list.filter((m) => (m.stock ?? 0) <= (m.threshold ?? 20));

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Dispensary · live from database</p>
          <h1 style={{ marginTop: 8 }}>Pharmacy</h1>
          <p className="page-subtitle">{list.length} medicines · {low.length} low-stock</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      {low.length > 0 && (
        <div className="card" style={{ marginBottom: 12, borderColor: '#E3B7A9' }}>
          <span className="eyebrow" style={{ color: 'var(--color-error)' }}>Low stock</span>
          <p style={{ fontSize: '0.86rem', marginTop: 4 }}>{low.map((m) => `${m.name} (${m.stock})`).join(', ')}</p>
        </div>
      )}

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label">Search inventory</label>
          <input className="form-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Medicine name…" />
        </div>
      </div>

      {loading && <Loading label="Loading inventory…" />}
      {error && <ErrorState error={error} onRetry={reload} />}
      {!loading && !error && list.length === 0 && <EmptyState title="No medicines found" hint="Seed data includes a starter formulary." />}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 12 }}>
        {list.map((m) => (
          <div key={m.id} className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ fontWeight: 600 }}>{m.name}</div>
              <span className={`badge ${(m.stock ?? 0) <= (m.threshold ?? 20) ? 'badge-red' : 'badge-green'}`}>{m.stock} {m.unit}</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>{m.category || 'general'} · threshold {m.threshold}</div>
            <div style={{ fontWeight: 600, marginTop: 8 }}>₹{m.price}/unit</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginTop: 16 }}>
        <div className="section-header" style={{ padding: '16px 18px 12px', margin: 0 }}>
          <span className="section-title" style={{ margin: 0 }}>Recent prescriptions</span>
        </div>
        {scripts.length === 0 && <div style={{ padding: 18 }}><EmptyState title="No prescriptions yet" /></div>}
        {scripts.map((p) => (
          <div key={p.id} className="list-row" style={{ gridTemplateColumns: '1fr auto' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{p.patient_id}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.diagnosis || 'No diagnosis recorded'}</div>
            </div>
            <span className="badge">{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

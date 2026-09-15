import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { api } from '../../services/api';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';

export default function Departments() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useApi('/api/v1/departments');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const canManage = ['admin'].includes(user?.role);
  const list = Array.isArray(data) ? data : data?.data || [];

  const create = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true); setFormError('');
    try {
      await api.post('/api/v1/departments', { name: name.trim(), slug: name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') });
      setName(''); reload();
    } catch (err) { setFormError(err?.message || 'Could not create department.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Organization</p>
          <h1 style={{ marginTop: 8 }}>Departments</h1>
          <p className="page-subtitle">Live catalog from the database</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      {canManage && (
        <form onSubmit={create} className="card" style={{ marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ margin: 0, flex: 1, minWidth: 220 }}>
            <label className="form-label">New department</label>
            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. ENT" />
          </div>
          <button className="btn btn-primary btn-sm" disabled={busy}>{busy ? 'Adding…' : 'Add department'}</button>
          {formError && <span style={{ color: 'var(--color-error)', fontSize: '0.82rem' }}>{formError}</span>}
        </form>
      )}

      {loading && <Loading label="Loading departments…" />}
      {error && <ErrorState error={error} onRetry={reload} />}
      {!loading && !error && list.length === 0 && <EmptyState title="No departments yet" hint="An admin can add the first department above." />}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {list.map((d) => (
          <div key={d.id} className="card">
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <div className="avatar avatar-md"><Building2 size={16} /></div>
              <div style={{ fontWeight: 600 }}>{d.name}</div>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{d.slug || d.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
